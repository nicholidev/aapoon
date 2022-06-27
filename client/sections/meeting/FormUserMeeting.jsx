/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import {
  TextField,
  Alert,
  Checkbox,
  Stack,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  ButtonBase,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Iconify from '../../components/Iconify';
const { listTimeZones, findTimeZone, getUnixTime } = require('timezone-support');
import { IconButtonAnimate } from '../../components/animate';
import { getCountry } from '../../api/user';
import { scheduleMeeting, removeMeeting } from '../../api/meeting';
import { useRouter } from 'next/router';
import moment from 'moment';
import { differenceInDays } from 'date-fns';
import { addTocalender } from '../../utils/addToCalender/AddToCalander';
// ----------------------------------------------------------------------

export default function FormUserMeeting(props) {
  const { user } = useAuth();

  const { isCustomerAdmin } = props;
  const router = useRouter();
  const timeZones = listTimeZones();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isSubmitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});
  const [meetingType, setMeetingType] = useState('oneTime');
  const [waitInLobby, setWaitInLobby] = useState(true);
  const [confirmation, setConfirmation] = useState(false);

  const RegisterSchema = Yup.object().shape({
    meetingTopic: Yup.string().min(2, 'Too Short!').required('Meeting topic required'),
    meetingDescription: Yup.string().min(2, 'Too Short!'),
    timeZone: Yup.string().required('TimeZone is required'),
    estimatedDuration: Yup.string().required('Duration is required'),
    password: Yup.string(),
    meetingDateTime: Yup.date().required('Please enter valid date'),
    meetingEndDate: Yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      meetingTopic: '',
      meetingDescription: '',
      lobby: true,
      reccurring: false,
      estimatedDuration: '15',
      password: '',
      meetingDateTime: new Date(),
      meetingEndDate: new Date(),
      timeZone: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const tz = findTimeZone(values.timeZone);

      const nativeDate = values.meetingDateTime;
      let meetingEndDate = values.meetingEndDate;
      const DateTime = {
        year: nativeDate.getFullYear(),
        month: nativeDate.getMonth() + 1,
        day: nativeDate.getDate(),
        hours: nativeDate.getHours(),
        minutes: nativeDate.getMinutes(),
      };
      const DateTimeEnd = {
        year: meetingEndDate.getFullYear(),
        month: meetingEndDate.getMonth() + 1,
        day: meetingEndDate.getDate(),
        hours: meetingEndDate.getHours(),
        minutes: meetingEndDate.getMinutes(),
      };
      let myDate = getUnixTime(DateTime, tz);
      let myEndDate = getUnixTime(DateTimeEnd, tz);
      setSubmitting(true);

      try {
        let meetingData = await scheduleMeeting({ scheduleAt: myDate, reccuringEndDate: myEndDate, ...values });

        enqueueSnackbar('New meeting scheduled', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        setSubmitting(false);
        setSubmitted(true);
        setData(meetingData.data);
        resetForm();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Error in scheduling meeting , Please try again', {
          variant: 'error',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    getCountry().then((res) => {
      setFieldValue('timeZone', res.data.timezone);
    });
  }, []);

  const copyTocb = (data) => {
    navigator.clipboard.writeText(data);
    enqueueSnackbar('Meeting link copied to clipboard', {
      variant: 'success',
      action: (key) => (
        <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
          <Iconify icon={'eva:close-fill'} />
        </IconButtonAnimate>
      ),
    });
  };

  const recudays = data?.reccurring
    ? differenceInDays(new Date(data?.reccuringEndDate?._seconds * 1000), new Date(data?.scheduledAt?._seconds * 1000))
    : false;

  const addCalender = (type) => {
    let event = {
      title: data.title,
      link: window.origin + '/meeting?meetingid=' + data?.id,
      password: data.password,
      description: data?.description,
      startTime: new Date(data.scheduledAt._seconds * 1000),
      endTime: new Date(data.endAt._seconds * 1000),
      recur: data?.reccurring ? `RRULE:FREQ=DAILY;COUNT=${recudays + 1}` : '',
    };
    addTocalender(event, type, false);
  };

  const handleMeetingType = (event) => {
    setMeetingType(event.target.value);
    if (event.target.value === 'recurring') {
      formik.setValues({ ...formik.values, meetingEndDate: new Date(), reccurring: true });
      RegisterSchema.fields.meetingEndDate.required('Please enter valid date');
    } else {
      let newValues = { ...formik.values, reccurring: false };
      delete newValues.meetingEndDate;
      formik.setValues(newValues);
      RegisterSchema.fields.meetingEndDate.notRequired();
    }
  };

  const handleMeetingLobby = (event) => {
    setWaitInLobby(event.target.checked);
    formik.setValues({ ...formik.values, lobby: event.target.checked });
  };

  const removeHandler = () => {
    removeMeeting(data?.publicId)
    .then(() => {
      setConfirmation(false);
      router.reload();
    })
  };

  console.log(data)

  return (
    <div>
      {isSubmitted ? (
        <Stack>
            <Dialog open={confirmation} maxWidth={'xs'}>
              <DialogTitle id="alert-dialog-title">Are you sure remove this meeting?</DialogTitle>
              <DialogContent style={{ paddingBottom: '10px' }}>
              </DialogContent>
              <DialogActions style={{ paddingTop: '10px' }}>
                <Button
                  onClick={() => {
                    setConfirmation(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={removeHandler}>
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
            <Stack>
              <div style={{ padding: '40px' }}>
                <Stack spacing={1} justifyContent="center">
                  <Typography variant="h5" sx={{ textTransform: 'capitalize' }} style={{overflowWrap: 'break-word'}}>
                    <Iconify icon="akar-icons:square-fill" color="success.main" />
                    &nbsp;&nbsp;
                    {data?.title}
                  </Typography>
                  {data?.password && (
                    <Typography variant="body" style={{wordBreak: 'break-word'}}>Meeting Password : {data?.password}</Typography>
                  )}

                  <br />
                  <Box display="flex" alignItems="center">
                    <Iconify icon="ci:clock" width="20px" height="20px" color="text.secondary" /> &nbsp;&nbsp;
                    <Typography variant="body2">
                      {moment(new Date(((data?.endAt?._seconds) - (parseInt(data?.duration)) || (data?.endAt?._seconds) - 900))*1000).format('LLL')}&nbsp;<span style={{ fontWeight: 700 }}> To </span>&nbsp;
                      {moment(new Date(data?.endAt?._seconds * 1000)).format('LLL')}
                    </Typography>
                  </Box>
                  <Box display={'flex'} style={{ marginTop: '16px' }}>
                    <Button
                      variant="outlined"
                      onClick={() => router.push(window.origin + '/meeting?meetingid=' + data?.id)}
                      style={{textTransform: 'inherit'}}
                    >
                      <img src="/favicon/favicon-32x32.png" />
                      &nbsp;&nbsp; Join aapoon meeting
                    </Button>
                  </Box>
                  <Divider style={{ margin: '16px 0 8px' }} />
                  <Box style={{overflowWrap: 'break-word'}}>
                    <Iconify icon="fluent:text-description-24-filled" width="24px" height="24px" color="text.secondary" />{' '}
                    &nbsp;&nbsp;
                    <Typography variant="body2">{data?.description || 'N/A'}</Typography>
                  </Box>
                  <Divider style={{ margin: '16px 0 8px' }} />
                  <Box display="flex" alignItems={'center'}>
                    <Iconify icon="akar-icons:link-chain" width="24px" height="24px" color="text.secondary" /> &nbsp;&nbsp;
                    <Typography variant="body2">{window.origin + '/meeting?meetingid=' + data?.id}</Typography>&nbsp;&nbsp;
                    <Button
                      onClick={() => copyTocb(window.origin + '/meeting?meetingid=' + data?.id)}
                      endIcon={<Iconify icon="lucide:copy" />}
                    >
                      Copy
                    </Button>
                  </Box>
                  <Divider style={{ margin: '16px 0 8px' }} />

                  <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex' }} gutterBottom>
                    Add To Calendar
                  </Typography>

                  <Stack spacing={2} direction={'column'}>
                    <Box display={'flex'} alignItems="center" justifyContent="space-between">
                      <Box display={'flex'} alignItems="center">
                        <Iconify icon="ant-design:apple-filled" sx={{ fontSize: 24, color: '#000' }} />
                        &nbsp;&nbsp;
                        <Typography variant="subtitle2">Apple Calendar</Typography>
                      </Box>
                      <Button onClick={() => addCalender('apple')}>
                        Download&nbsp;&nbsp;
                        <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                      </Button>
                    </Box>
                    <Box display={'flex'} alignItems="center" justifyContent="space-between">
                      <Box display={'flex'} alignItems="center">
                        <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 24, color: '#225082' }} />
                        &nbsp;&nbsp;
                        <Typography variant="subtitle2">Outlook Web</Typography>
                      </Box>
                      <Button onClick={() => addCalender('outlookcom')}>
                        Download&nbsp;&nbsp;
                        <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                      </Button>
                    </Box>{' '}
                    <Box display={'flex'} alignItems="center" justifyContent="space-between">
                      <Box display={'flex'} alignItems="center">
                        <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 24, color: '#225082' }} />
                        &nbsp;&nbsp;
                        <Typography variant="subtitle2">Outlook Client</Typography>
                      </Box>
                      <Button onClick={() => addCalender('apple')}>
                        Download&nbsp;&nbsp;
                        <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                      </Button>
                    </Box>{' '}
                    <Box display={'flex'} alignItems="center" justifyContent="space-between">
                      <Box display={'flex'} alignItems="center">
                        <Iconify icon="flat-color-icons:google" sx={{ fontSize: 24, color: '#225082' }} />
                        &nbsp;&nbsp;
                        <Typography variant="subtitle2">Google Calendar</Typography>
                      </Box>
                      <Button onClick={() => addCalender('google')}>
                        Download&nbsp;&nbsp;
                        <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                      </Button>
                    </Box>
                  </Stack>

                  <Divider style={{ margin: '16px 0 8px' }} />
                  <Box display={'flex'} style={{ marginTop: '16px' }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setConfirmation(true);
                      }}
                    >
                      Remove Meeting
                    </Button>
                  </Box>
                </Stack>
              </div>
            </Stack>
        </Stack>
      ) : (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 500 }}>Meeting topic * </Typography>
                <TextField
                  fullWidth
                  placeholder="Type meeting topic"
                  {...getFieldProps('meetingTopic')}
                  error={Boolean(touched.meetingTopic && errors.meetingTopic)}
                  helperText={touched.meetingTopic && errors.meetingTopic}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 500, display: 'flex' }}>
                  Meeting Description{' '}
                  <Typography
                    style={{ color: '#E25630' }}
                    sx={{ fontWeight: 500, color: 'primary', ml: 1 }}
                    color="primary"
                    variant={'span'}
                  >
                    {' '}
                    (optional)
                  </Typography>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Type meeting description"
                  {...getFieldProps('meetingDescription')}
                  error={Boolean(touched.meetingDescription && errors.meetingDescription)}
                  helperText={touched.meetingDescription && errors.meetingDescription}
                />
              </Stack>

              {/* <Stack direction={'row'} spacing={5}>
                <Box display={'flex'} alignItems={'center'}>
                  <Radio checked={meetingType == 'oneTime'} onChange={handleMeetingType} value={'oneTime'} />
                  &nbsp;
                  <Typography variant="subtitle1" color="initial">
                    One Time
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Radio checked={meetingType == 'recurring'} onChange={handleMeetingType} value={'recurring'} />
                  &nbsp;
                  <Typography variant="subtitle1" color="initial">
                    Recurring
                  </Typography>
                </Box>
              </Stack> */}

              <Grid container rowSpacing={3} columnSpacing={0} justifyContent={'space-between'}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginRight: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}> Start Time * </Typography>
                    <Stack spacing={1} direction="row">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileTimePicker
                          {...getFieldProps('meetingDateTime')}
                          onChange={(newValue) => {
                            formik.setFieldValue('meetingDateTime', newValue);
                          }}
                          minDateTime={new Date()}
                          variant="dialog"
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              error={Boolean(touched.meetingDateTime && errors.meetingDateTime)}
                              helperText={touched.meetingDateTime && errors.meetingDateTime}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginLeft: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}> Estimated Duration * </Typography>

                    {user?.activeLicenses?.count || user?.assignedToMe?.length ? (
                      <Select
                        {...getFieldProps('estimatedDuration')}
                        error={Boolean(touched.estimatedDuration && errors.estimatedDuration)}
                        helperText={touched.estimatedDuration && errors.estimatedDuration}
                      >
                        <MenuItem key={15} value={'15'}>
                          15 Minutes
                        </MenuItem>
                        <MenuItem key={30} value={'30'}>
                          30 Minutes
                        </MenuItem>
                        <MenuItem key={45} value={'45'}>
                          45 Minutes
                        </MenuItem>
                        <MenuItem key={60} value={'60'}>
                          1 hour
                        </MenuItem>
                        <MenuItem key={90} value={'90'}>
                          1.5 hours
                        </MenuItem>
                        <MenuItem key={120} value={'120'}>
                          2 hours
                        </MenuItem>
                        <MenuItem key={150} value={'150'}>
                          2.5 hours
                        </MenuItem>
                        <MenuItem key={180} value={'180'}>
                          3 hours
                        </MenuItem>
                        <MenuItem key={210} value={'210'}>
                          3.5 hours{' '}
                        </MenuItem>
                        <MenuItem key={240} value={'240'}>
                          4 hours
                        </MenuItem>
                        <MenuItem key={270} value={'270'}>
                          4.5 hours
                        </MenuItem>
                        <MenuItem key={300} value={'300'}>
                          5 hours
                        </MenuItem>
                        <MenuItem key={330} value={'330'}>
                          5.5 hours
                        </MenuItem>
                        <MenuItem key={360} value={'360'}>
                          6 hours
                        </MenuItem>
                        <MenuItem key={390} value={'390'}>
                          6.5 hours{' '}
                        </MenuItem>
                        <MenuItem key={420} value={'420'}>
                          7 hours
                        </MenuItem>
                        <MenuItem key={450} value={'450'}>
                          7.5 hours
                        </MenuItem>
                        <MenuItem key={480} value={'480'}>
                          8 hours
                        </MenuItem>
                        <MenuItem key={510} value={'510'}>
                          8.5 hours
                        </MenuItem>
                        <MenuItem key={540} value={'540'}>
                          9 hours
                        </MenuItem>
                        <MenuItem key={570} value={'570'}>
                          9.5 hours{' '}
                        </MenuItem>
                        <MenuItem key={600} value={'600'}>
                          10 hours
                        </MenuItem>
                        <MenuItem key={630} value={'630'}>
                          10.5 hours
                        </MenuItem>
                        <MenuItem key={660} value={'660'}>
                          11 hours
                        </MenuItem>
                        <MenuItem key={690} value={'690'}>
                          11.5 hours
                        </MenuItem>
                        <MenuItem key={720} value={'720'}>
                          12 hours
                        </MenuItem>
                        <MenuItem key={750} value={'750'}>
                          12.5 hours
                        </MenuItem>
                        <MenuItem key={780} value={'780'}>
                          13 hours
                        </MenuItem>
                        <MenuItem key={810} value={'810'}>
                          13.5 hours
                        </MenuItem>
                        <MenuItem key={840} value={'840'}>
                          14 hours
                        </MenuItem>
                        <MenuItem key={870} value={'870'}>
                          14.5 hours
                        </MenuItem>
                        <MenuItem key={900} value={'900'}>
                          15 hours
                        </MenuItem>
                        <MenuItem key={930} value={'930'}>
                          15.5 hours
                        </MenuItem>
                        <MenuItem key={960} value={'960'}>
                          16 hours
                        </MenuItem>
                        <MenuItem key={990} value={'990'}>
                          16.5 hours
                        </MenuItem>
                        <MenuItem key={1020} value={'1020'}>
                          17 hours
                        </MenuItem>
                        <MenuItem key={1050} value={'1050'}>
                          17.5 hours
                        </MenuItem>
                        <MenuItem key={1080} value={'1080'}>
                          18 hours
                        </MenuItem>
                        <MenuItem key={1110} value={'1110'}>
                          18.5 hours
                        </MenuItem>
                        <MenuItem key={1140} value={'1140'}>
                          19 hours
                        </MenuItem>
                        <MenuItem key={1170} value={'1170'}>
                          19.5 hours
                        </MenuItem>
                        <MenuItem key={1200} value={'1200'}>
                          20 hours
                        </MenuItem>
                        <MenuItem key={1230} value={'1230'}>
                          20.5 hours
                        </MenuItem>
                        <MenuItem key={1260} value={'1260'}>
                          21 hours
                        </MenuItem>
                        <MenuItem key={1290} value={'1290'}>
                          21.5 hours
                        </MenuItem>
                        <MenuItem key={1320} value={'1320'}>
                          22 hours
                        </MenuItem>
                        <MenuItem key={1350} value={'1350'}>
                          22.5 hours
                        </MenuItem>
                        <MenuItem key={1380} value={'1380'}>
                          23 hours
                        </MenuItem>
                        <MenuItem key={1410} value={'1410'}>
                          23.5 hours
                        </MenuItem>
                        <MenuItem key={1440} value={'1440'}>
                          24 hours
                        </MenuItem>
                      </Select>
                    ) : (
                      <Select
                        {...getFieldProps('estimatedDuration')}
                        error={Boolean(touched.estimatedDuration && errors.estimatedDuration)}
                        helperText={touched.estimatedDuration && errors.estimatedDuration}
                      >
                        <MenuItem key={`mt-15`} value={'15'}>
                          15 Minutes
                        </MenuItem>
                        <MenuItem key={`mt-30`} value={'30'}>
                          30 Minutes
                        </MenuItem>
                        <MenuItem key={`mt-45`} value={'45'}>
                          45 Minutes
                        </MenuItem>
                        <MenuItem key={`mt-55`} value={'55'}>
                          55 Minutes
                        </MenuItem>
                      </Select>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginRight: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {meetingType === 'recurring' ? 'Meeting Start date *' : 'Meeting Date *'}{' '}
                    </Typography>
                    <Stack spacing={1} direction="row">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          {...getFieldProps('meetingDateTime')}
                          onChange={(newValue) => {
                            formik.setFieldValue('meetingDateTime', newValue);
                          }}
                          minDate={new Date()}
                          variant="dialog"
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              error={Boolean(touched.meetingDateTime && errors.meetingDateTime)}
                              helperText={touched.meetingDateTime && errors.meetingDateTime}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Stack>
                </Grid>
                {meetingType === 'recurring' && (
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1} sx={{ marginLeft: { sm: '20px', xs: 0 } }}>
                      <Typography sx={{ fontWeight: 500 }}>Meeting End date *</Typography>
                      <Stack spacing={1} direction="row">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            {...getFieldProps('meetingEndDate')}
                            onChange={(newValue) => {
                              formik.setFieldValue('meetingEndDate', newValue);
                            }}
                            minDate={new Date()}
                            variant="dialog"
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                {...params}
                                error={Boolean(touched.meetingEndDate && errors.meetingEndDate)}
                                helperText={touched.meetingEndDate && errors.meetingEndDate}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Stack>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <Stack
                    spacing={1}
                    sx={{ margin: { sm: meetingType === 'recurring' ? '0 20px 0 0' : '0 0 0 20px', xs: 0 } }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>Time Zone * </Typography>
                    <Select
                      autoComplete="username"
                      placeholder="Business Website"
                      {...getFieldProps('timeZone')}
                      error={Boolean(touched.timeZone && errors.timeZone)}
                      helperText={touched.timeZone && errors.timeZone}
                    >
                      {timeZones.map((item, index) => (
                        <MenuItem value={item} key={`timezone-${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    spacing={1}
                    sx={{ margin: { sm: meetingType === 'recurring' ? '0  0 0 20px' : '0 20px 0 0', xs: 0 } }}
                  >
                    <Typography sx={{ fontWeight: 500 }}> Meeting Password </Typography>
                    <Stack spacing={1} direction="row">
                      <TextField
                        fullWidth
                        autoComplete="state"
                        placeholder="Set password (optional)"
                        {...getFieldProps('password')}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {isCustomerAdmin && (
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ margin: { sm: meetingType === 'recurring' ? '40px 20px 0 0' : '40px 0 0 20px', xs: 0 } }}
                    >
                      <Checkbox
                        icon={<Iconify icon="akar-icons:square" width="30px" height="30px" />}
                        checkedIcon={
                          <Iconify icon="feather:check-square" color="primary.main" width="30px" height="30px" />
                        }
                        checked={waitInLobby}
                        onChange={handleMeetingLobby}
                        name="lobbyWait"
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          Waiting Lobby
                        </Typography>
                        <Typography variant="caption" color="GrayText">
                          Only users admitted by the host can join the meeting
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Grid>
              </Grid>

              <Stack
                justifyContent={'flex-end'}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <LoadingButton size="large" color="primary" onClick={() => router.replace('/dashboard/calendar')}>
                  <Typography variant="subtitle1" color="GrayText">
                    Cancel
                  </Typography>
                </LoadingButton>
                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Schedule
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      )}
    </div>
  );
}
