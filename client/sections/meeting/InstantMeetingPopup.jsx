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
  Dialog,
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

import { IconButtonAnimate } from '../../components/animate';
import PhoneInput from 'react-phone-number-input/input';
import CustomPhone from '../../components/Phonenumber';
import InputLabel from '@mui/material/InputLabel';
import { FileUploader } from 'react-drag-drop-files';
import { acceptInvitation, getCountry } from '../../api/user';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';

export default function InstantMeetingPopup(props) {
  const { registerBusiness, user } = useAuth();
  const [open, setOpen] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const RegisterSchema = Yup.object().shape({
    meetingDescription: Yup.string().min(5, 'Too Short!').required('Meeting Discription required'),
  });

  const formik = useFormik({
    initialValues: {
      meetingDescription: '',
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
      <Dialog open={open} maxWidth={'xs'} fullWidth onClose={() => setOpen(false)}>
        <div style={{ padding: '40px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Instant Meeting
          </Typography>
          <br />
          <FormikProvider value={formik}>
            <FormikProvider autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={6}>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500, display: 'flex' }}>Meeting Description</Typography>
                  <TextField
                    fullWidth
                    // placeholder="Type meeting description"
                    {...getFieldProps('meetingDescription')}
                    error={Boolean(touched.meetingDescription && errors.meetingDescription)}
                    helperText={touched.meetingDescription && errors.meetingDescription}
                  />
                </Stack>

                <Stack
                  justifyContent={'center'}
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Start Meeting
                  </LoadingButton>
                </Stack>

                <br />
                <br />
              </Stack>
            </FormikProvider>
          </FormikProvider>
        </div>
      </Dialog>
      <div onClick={() => setOpen(true)}>{props.children}</div>
    </div>
  );
}
