/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { Box, TextField, Alert, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import { IconButtonAnimate } from '../../../components/animate';
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const { resetPassword } = useAuth();
  const { replace, query } = useRouter();
  const [err, setError] = useState(false);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')

      .matches(
        rePass,
        'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Password is required')

      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      firebase
        .auth()
        .confirmPasswordReset(query.oobCode, values.password)
        .then(function () {
          setSubmitting(false);
          enqueueSnackbar('Password reset success', {
            variant: 'success',
            action: (key) => (
              <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
                <Iconify icon={'eva:close-fill'} />
              </IconButtonAnimate>
            ),
          });
          replace('/');
        })
        .catch(function () {
          enqueueSnackbar('Unable to reset password , please try again!', {
            variant: 'error',
            action: (key) => (
              <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
                <Iconify icon={'eva:close-fill'} />
              </IconButtonAnimate>
            ),
          });
          setSubmitting(false);
        });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    firebase
      .auth()
      .verifyPasswordResetCode(query.oobCode)
      .then(function (email) {
        setError(false);
        // Display a "new password" form with the user's email address
      })
      .catch(function () {
        // Invalid code
        setError(true);
      });
  }, [query.oobCode]);

  return (
    <Box sx={{ width: '100%' }}>
      {!err ? (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              <Stack>
                <Typography variant="subtitle2" color="initial">
                  New Password
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('password')}
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack>
                <Typography variant="subtitle2" color="initial">
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Change Password
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      ) : (
        <Typography textAlign="center">Invalid or expired link</Typography>
      )}
    </Box>
  );
}
