/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState } from 'react';
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
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';

export default function FormAssignLicense() {
  const { registerBusiness, user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitted, setSubmitted] = useState(false);
  const [showteam, setShowteam] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const reAlpha = /^[a-zA-Z]+$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().matches(reAlpha, 'Firstname is not valid').required('First name required'),
    lastName: Yup.string().matches(reAlpha, 'Lastname is not valid').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    employeeId: Yup.string().required('Duration is required'),
    team: Yup.string().required(),
    department: Yup.string().min(2, 'Too Short!').required('Department is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      employeeId: '15',
      team: '',
      department: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log(values);

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

  return (
    <div>
      {isSubmitted ? (
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 500, display: 'flex' }}>
            Add To Calander
            <Typography style={{ color: '#E25630' }} sx={{ fontWeight: 500, color: 'primary', ml: 1 }} color="primary">
              {' '}
              (optional)
            </Typography>
          </Typography>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Box
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
              width="160px"
              sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
              display="flex"
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
              width="160px"
              sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
              display="flex"
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

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500, display: 'flex' }}> First name * </Typography>
                  <TextField
                    fullWidth
                    placeholder="Type first name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Stack>

                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500, display: 'flex' }}> Last name * </Typography>
                  <TextField
                    fullWidth
                    placeholder="Type last name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>
              </Stack>

              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 500, display: 'flex' }}> Email Address * </Typography>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  placeholder="Type email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 500, display: 'flex' }}>
                  Department
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
                  placeholder="Type department"
                  {...getFieldProps('department')}
                  error={Boolean(touched.department && errors.department)}
                  helperText={touched.department && errors.department}
                />
              </Stack>

              <Grid container direction={{ xs: 'column', sm: 'row' }}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginRight: { sm: '20px', xs: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}> Employee Id * </Typography>
                    <TextField
                      fullWidth
                      placeholder="Type Employee id"
                      {...getFieldProps('employeeId')}
                      error={Boolean(touched.employeeId && errors.employeeId)}
                      helperText={touched.employeeId && errors.employeeId}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1} sx={{ marginLeft: { sm: '20px', xs: 0 }, marginTop: { xs: '20px', sm: 0 } }}>
                    <Typography sx={{ fontWeight: 500 }}> Team </Typography>
                    <Stack spacing={1} direction="row">
                      <TextField
                        fullWidth
                        {...getFieldProps('team')}
                        error={Boolean(touched.team && errors.team)}
                        helperText={touched.team && errors.team}
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
                  Assign
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      )}
    </div>
  );
}
