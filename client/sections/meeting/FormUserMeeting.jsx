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
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  ButtonBase,
  FormHelperText,
  Radio,
  ListItem,
  Button,
  ListItemText,
  withStyles,
  Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Iconify from '../../components/Iconify';
const { listTimeZones, findTimeZone, getZonedTime, getUnixTime } = require('timezone-support');
import { IconButtonAnimate } from '../../components/animate';
import PhoneInput from 'react-phone-number-input/input';
import CustomPhone from '../../components/Phonenumber';
import InputLabel from '@mui/material/InputLabel';
import { FileUploader } from 'react-drag-drop-files';
import { acceptInvitation, getCountry } from '../../api/user';
import { scheduleMeeting } from '../../api/meeting';
import { useRouter } from 'next/router';
import moment from 'moment';
import { differenceInDays } from 'date-fns';
import { addTocalender } from '../../utils/addToCalender/AddToCalander';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';

export default function FormUserMeeting(props) {
  const { registerBusiness, user } = useAuth();

  const { isCustomerAdmin } = props;
  const router = useRouter();
  const timeZones = listTimeZones();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
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
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      console.log('submitting');
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
        // window.open('https://meet.aapoon.com/' + meetingData.data.id);
        // router.replace(`/dashboard/calendar`);
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
      // try {
      //   await registerBusiness(values);
      //   enqueueSnackbar('Business details updates', {
      //     variant: 'success',
      //     action: (key) => (
      //       <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
      //         <Iconify icon={'eva:close-fill'} />
      //       </IconButtonAnimate>
      //     ),
      //   });

      //   if (localStorage.getItem('inviteToken'))
      //     acceptInvitation({ email: user.email, token: localStorage.getItem('inviteToken') });
      //   localStorage.setItem('isAuthenticated', true)

      //   window?.location = "/dashboard/one";
      //   if (isMountedRef.current) {
      //     setSubmitting(false);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   if (isMountedRef.current) {
      //     setErrors({ afterSubmit: ErrorMessages[error.code] });
      //     setSubmitting(false);
      //   }
      // }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
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
      password: data?.password,
      description: data?.description,
      recur: data?.reccurring ? `RRULE:FREQ=DAILY;COUNT=${recudays + 1}` : '',
    };
    addTocalender(event, type, false);
  };

  const [meetingType, setMeetingType] = useState('oneTime');
  const [waitInLobby, setWaitInLobby] = useState(true);

  const handleMeetingType = (event) => {
    setMeetingType(event.target.value);
    if (event.target.value == 'recurring') {
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

  console.log(data);

  return (
    <div>
      {isSubmitted ? (
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
          {data.password && <Typography variant="body">Meeting Password : {data.password}</Typography>}

          <br />
          <Typography variant="body2">
            {moment(new Date(data.scheduledAt?._seconds * 1000)).format('LLL')}&nbsp;
            <span style={{ fontWeight: 700 }}> To </span>&nbsp;
            {data?.reccurring
              ? moment(new Date(data?.reccuringEndDate?._seconds * 1000)).format('LLL')
              : moment(new Date(data.endAt?._seconds * 1000)).format('LLL')}
          </Typography>
          {data?.reccurring && (
            <Typography variant="caption">
              Reccuring ( {moment(new Date(data.scheduledAt?._seconds * 1000)).format('LT')} -{' '}
              {moment(new Date(data.endAt?._seconds * 1000)).format('LT')} )
            </Typography>
          )}
          {/* <Typography variant="body2">
            {moment(new Date(data.scheduledAt?._seconds * 1000)).format('LLL') +
              ' to ' +
              moment(new Date(data.endAt?._seconds * 1000)).format('LLL')}
          </Typography> */}
          <Box
            component={ButtonBase}
            onClick={() => copyTocb(window.origin + '/meeting?meetingid=' + data.id)}
            sx={{
              border: '1px solid #DDDDDD',
              borderRadius: 1,
              padding: 1,
              pl: 2,
              pr: 2,
              backgroundColor: '#F9F9F9',
              mb: 4,
            }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle2"
              align="center"
              sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}
            >
              {window.origin + '/meeting?meetingid=' + data.id}
            </Typography>
            <Iconify icon="fluent:copy-20-filled" sx={{ fontSize: 24, ml: 2, color: 'text.secondary' }} />
          </Box>
          <br />
          <Button variant="outlined" onClick={() => router.push(window.origin + '/meeting?meetingid=' + data?.id)}>
            <Typography variant="h6">Join Now</Typography>
          </Button>
          <br />
          <Typography sx={{ fontWeight: 500, display: 'flex' }} variant="body" gutterBottom>
            Add To Calander
          </Typography>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row', mt: 2 }} justifyContent="center" alignItems="center">
            <Box
              component={ButtonBase}
              onClick={() => addCalender('apple')}
              width="160px"
              sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon="ant-design:apple-filled" sx={{ fontSize: 40, color: '#000' }} />
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
              >
                Apple calendar
              </Typography>
            </Box>
            <Box
              component={ButtonBase}
              onClick={() => addCalender('apple')}
              width="160px"
              sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
              display="flex"
              teamsize
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 40, color: '#225082' }} />

              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
              >
                Outlook Web
              </Typography>
            </Box>
            <Box
              component={ButtonBase}
              onClick={() => addCalender('outlookcom')}
              width="160px"
              sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
              display="flex"
              teamsize
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 40, color: '#225082' }} />

              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
              >
                Outlook Client
              </Typography>
            </Box>
            <Box
              component={ButtonBase}
              width="160px"
              sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
              display="flex"
              onClick={() => addCalender('google')}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon="flat-color-icons:google" sx={{ fontSize: 40, color: '#225082' }} />

              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
              >
                Google calendar
              </Typography>
            </Box>
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
                   
                      {user?.activeLicenses?.count || user?.assignedToMe?.length?
                       <Select
                       {...getFieldProps('estimatedDuration')}
                       error={Boolean(touched.estimatedDuration && errors.estimatedDuration)}
                       helperText={touched.estimatedDuration && errors.estimatedDuration}
                     >
                        <MenuItem value={'15'}>15 Minutes</MenuItem>
                      <MenuItem value={'30'}>30 Minutes</MenuItem>
                      <MenuItem value={'55'}>45 Minutes</MenuItem>
                      <MenuItem value={'60'}>1 hour</MenuItem>
                      <MenuItem value={'90'}>1.5 hours</MenuItem>
                      <MenuItem value={'120'}>2 hours</MenuItem>
                      <MenuItem value={'150'}>2.5 hours</MenuItem>
                      <MenuItem value={'180'}>3 hours</MenuItem>
                      <MenuItem value={'210'}>3.5 hours </MenuItem>
                      <MenuItem value={'240'}>4 hours</MenuItem>
                      <MenuItem value={'270'}>4.5 hours</MenuItem>
                      <MenuItem value={'300'}>5 hours</MenuItem>
                      <MenuItem value={'330'}>5.5 hours</MenuItem>
                      <MenuItem value={'360'}>6 hours</MenuItem>
                      <MenuItem value={'390'}>6.5 hours </MenuItem>
                      <MenuItem value={'420'}>7 hours</MenuItem>
                      <MenuItem value={'450'}>7.5 hours</MenuItem>
                      <MenuItem value={'480'}>8 hours</MenuItem>
                      <MenuItem value={'510'}>8.5 hours</MenuItem>
                      <MenuItem value={'540'}>9 hours</MenuItem>
                      <MenuItem value={'570'}>9.5 hours </MenuItem>
                      <MenuItem value={'600'}>10 hours</MenuItem>
                      <MenuItem value={'630'}>10.5 hours</MenuItem>
                      <MenuItem value={'660'}>11 hours</MenuItem>
                      <MenuItem value={'690'}>11.5 hours</MenuItem>
                      <MenuItem value={'720'}>12 hours</MenuItem>
                      <MenuItem value={'750'}>12.5 hours</MenuItem>
                      <MenuItem value={'780'}>13 hours</MenuItem>
                      <MenuItem value={'810'}>13.5 hours</MenuItem>
                      <MenuItem value={'840'}>14 hours</MenuItem>
                      <MenuItem value={'870'}>14.5 hours</MenuItem>
                      <MenuItem value={'900'}>15 hours</MenuItem>
                      <MenuItem value={'930'}>15.5 hours</MenuItem>
                      <MenuItem value={'960'}>16 hours</MenuItem>
                      <MenuItem value={'990'}>16.5 hours</MenuItem>
                      <MenuItem value={'1020'}>17 hours</MenuItem>
                      <MenuItem value={'600'}>17.5 hours</MenuItem>
                      <MenuItem value={'600'}>18 hours</MenuItem>
                      <MenuItem value={'600'}>18.5 hours</MenuItem>
                      <MenuItem value={'600'}>19 hours</MenuItem>
                      <MenuItem value={'600'}>19.5 hours</MenuItem>
                      <MenuItem value={'600'}>20 hours</MenuItem>
                      <MenuItem value={'600'}>20.5 hours</MenuItem>
                      <MenuItem value={'600'}>21 hours</MenuItem>
                      <MenuItem value={'600'}>21.5 hours</MenuItem>
                      <MenuItem value={'600'}>22 hours</MenuItem>
                      <MenuItem value={'600'}>22.5 hours</MenuItem>
                      <MenuItem value={'600'}>23 hours</MenuItem>
                      <MenuItem value={'600'}>23.5 hours</MenuItem>
                      <MenuItem value={'600'}>24 hours</MenuItem>

                     
                      </Select>:   <Select
                       {...getFieldProps('estimatedDuration')}
                       error={Boolean(touched.estimatedDuration && errors.estimatedDuration)}
                       helperText={touched.estimatedDuration && errors.estimatedDuration}
                     >
                      <MenuItem value={'15'}>15 Minutes</MenuItem>
                      <MenuItem value={'30'}>30 Minutes</MenuItem>
                      <MenuItem value={'30'}>45 Minutes</MenuItem>
                      <MenuItem value={'55'}>55 Minutes</MenuItem>
                      </Select>}
                      
                    
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginRight: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {meetingType == 'recurring' ? 'Meeting Start date *' : 'Meeting Date *'}{' '}
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
                {meetingType == 'recurring' && (
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
                    sx={{ margin: { sm: meetingType == 'recurring' ? '0 20px 0 0' : '0 0 0 20px', xs: 0 } }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>Time Zone * </Typography>
                    <Select
                      autoComplete="username"
                      placeholder="Business Website"
                      {...getFieldProps('timeZone')}
                      error={Boolean(touched.timeZone && errors.timeZone)}
                      helperText={touched.timeZone && errors.timeZone}
                    >
                      {timeZones.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    spacing={1}
                    sx={{ margin: { sm: meetingType == 'recurring' ? '0  0 0 20px' : '0 20px 0 0', xs: 0 } }}
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
                      sx={{ margin: { sm: meetingType == 'recurring' ? '40px 20px 0 0' : '40px 0 0 20px', xs: 0 } }}
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
