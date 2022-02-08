/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';

//dialogues

//Radio buttons

// @mui
import { Stack, TextField, IconButton, InputAdornment, Alert, Button, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks

import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';

import { joinMeeting } from '../../../api/meeting';
export default function RegisterForm(query) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        let result = await joinMeeting({ id: query.id, password: values.password });
        enqueueSnackbar('Password validated successfully', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        localStorage.setItem('mid', query.id);
        localStorage.setItem('mjwt', result.data.jwt);
        if (isMountedRef.current) {
          setSubmitting(false);
        }

        query.setAuthMeeting({ isAuth: true, id: query.id, jwt: result.data.token });
      } catch (error) {
        console.log(error);
        if (error.response.status == 403) {
          enqueueSnackbar('Invalid password', {
            variant: 'error',
            action: (key) => (
              <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
                <Iconify icon={'eva:close-fill'} />
              </IconButtonAnimate>
            ),
          });
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="meeting Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Join
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
