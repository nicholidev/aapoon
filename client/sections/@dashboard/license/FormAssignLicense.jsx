/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, Alert, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/router';
import { IconButtonAnimate } from '../../../components/animate';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { assignLicense } from '../../../api/license';
export default function FormAssignLicense({ setEmail, setLinkSentModal }) {
  const { registerBusiness, user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitted, setSubmitted] = useState(false);
  const [showteam, setShowteam] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const reAlpha = /^[a-zA-Z ]*$/;
  const { back } = useRouter();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().matches(reAlpha, 'First name is not valid').required('First name required'),
    lastName: Yup.string().matches(reAlpha, 'Last name is not valid').required('Last name required'),
    email: Yup.string()
      .lowercase()
      .email('Email must be a valid email address')
      .required('Email is required')
      .notOneOf([user.email], 'You cannot assign license to yourself'),
    employeeId: Yup.string(),
    team: Yup.string().matches(reAlpha, 'Team name is not valid').required('This field is required'),
    department: Yup.string().min(2, 'Too Short!'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      employeeId: '',
      team: '',
      department: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await assignLicense(user.id, { ...values, ownerName: user.displayName });
        enqueueSnackbar('License assigned', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        setSubmitting(false);
        setLinkSentModal(true);
        setEmail(values.email);
      } catch (error) {
        setErrors({ email: 'User already have a license' });
        enqueueSnackbar(error, {
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
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
                <Typography sx={{ fontWeight: 500, display: 'flex' }}>
                  {' '}
                  Employee Id{' '}
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

          <Stack justifyContent={'flex-end'} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 2 }}>
            <LoadingButton size="large" color="primary" onClick={() => back()}>
              Cancel
            </LoadingButton>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Assign
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
