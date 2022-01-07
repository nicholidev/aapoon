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
import { instantMeeting } from '../../api/meeting';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';
import { useRouter } from 'next/router';
import withMeetingAuth from '../../HOC/withMeetingAuth';

function InstantMeetingPopup(props) {
  const router = useRouter();
  const { registerBusiness, user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        let meetingData = await instantMeeting({ description: values.meetingDescription });

        enqueueSnackbar('New meeting created', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        setSubmitting(false);
        setOpen(false);
        resetForm();
        // window.open('https://meet.aapoon.com/' + meetingData.data.id);
        router.push(`/meeting/${meetingData.data.id}`);
      } catch (error) {
        enqueueSnackbar('Error in creating meeting', {
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
    <div>
      <Dialog open={open} maxWidth={'xs'} fullWidth onClose={() => setOpen(false)}>
        <div style={{ padding: '40px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Instant Meeting
          </Typography>
          <br />
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
            </Form>
          </FormikProvider>
        </div>
      </Dialog>
      <div onClick={() => setOpen(true)}>{props.children}</div>
    </div>
  );
}

export default InstantMeetingPopup;
