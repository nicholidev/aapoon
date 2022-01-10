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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
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
import { addTocalender } from '../../utils/addToCalender/AddToCalander';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';

export default function FormUserMeeting() {
  const { registerBusiness, user } = useAuth();
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
  });

  const formik = useFormik({
    initialValues: {
      meetingTopic: '',
      meetingDescription: '',

      estimatedDuration: '15',
      password: '',
      meetingDateTime: new Date(),

      timeZone: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      console.log('submitting');
      const tz = findTimeZone(values.timeZone);

      const nativeDate = values.meetingDateTime;
      const DateTime = {
        year: nativeDate.getFullYear(),
        month: nativeDate.getMonth() + 1,
        day: nativeDate.getDate(),
        hours: nativeDate.getHours(),
        minutes: nativeDate.getMinutes(),
      };

      let myDate = getUnixTime(DateTime, tz);
      setSubmitting(true);

      try {
        let meetingData = await scheduleMeeting({ scheduleAt: myDate, ...values });

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

  const addCalender = (type) => {
    let event = {
      title: data.title,
      description: data.description,
      location: '',
      startTime: new Date(data.scheduledAt._seconds * 1000),
      endTime: new Date(data.endAt._seconds * 1000),
    };
    addTocalender(event, type, false);
  };

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
            {moment(new Date(data.scheduledAt?._seconds * 1000)).format('LLL') +
              ' to ' +
              moment(new Date(data.endAt?._seconds * 1000)).format('LLL')}
          </Typography>
          <Box
            component={ButtonBase}
            onClick={() => copyTocb('https://github.com/sskjdskd/sdshdj')}
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
              {window.origin + '/meeting/' + data.id}
            </Typography>
            <Iconify icon="fluent:copy-20-filled" sx={{ fontSize: 24, ml: 2, color: 'text.secondary' }} />
          </Box>
          <br />
          <Typography sx={{ fontWeight: 500, display: 'flex' }} variant="body" gutterBottom>
            Add To Calander
          </Typography>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row', mt: 1 }} justifyContent="center" alignItems="center">
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
                Outlook calendar
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
            <Stack spacing={6}>
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
              <Grid container direction={{ xs: 'column', sm: 'row' }}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginRight: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}> Meeting Time * </Typography>
                    <Stack spacing={1} direction="row">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
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
                  <Stack spacing={1} sx={{ marginLeft: { sm: '20px', xs: 0 }, marginTop: { xs: '20px', sm: 0 } }}>
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
              </Grid>

              <Grid container direction={{ xs: 'column', sm: 'row' }}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginRight: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}> Estimated Duration * </Typography>
                    <Select
                      {...getFieldProps('estimatedDuration')}
                      error={Boolean(touched.estimatedDuration && errors.estimatedDuration)}
                      helperText={touched.estimatedDuration && errors.estimatedDuration}
                    >
                      <MenuItem value={'15'}>15 Minutes</MenuItem>
                      <MenuItem value={'30'}>30 Minutes</MenuItem>
                      <MenuItem value={'60'}>60 Minutes</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginLeft: { sm: '20px', xs: 0 }, marginTop: { xs: '20px', sm: 0 } }}>
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
              </Grid>

              <Stack
                justifyContent={'flex-end'}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <LoadingButton size="large" color="primary">
                  Cancel
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
