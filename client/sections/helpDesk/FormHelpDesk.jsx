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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import Iconify from '../../components/Iconify';

import { FileUploader } from 'react-drag-drop-files';
import { IconButtonAnimate } from '../../components/animate';
import PhoneInput from 'react-phone-number-input/input';
import CustomPhone from '../../components/Phonenumber';
import InputLabel from '@mui/material/InputLabel';
import { acceptInvitation, getCountry } from '../../api/user';
import { addHelp } from '../../api/help';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';
export default function FormHelpDesk(props) {
  const { user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const { replace } = useRouter();
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().min(2, 'Too Short!').required('Email is required').email('Please enter a valid email'),
    topic: Yup.string().required('Topic is required'),
    description: Yup.string().required('Description is required').min(5, 'Too Short!'),
    uploadFile: Yup.mixed()
      // .test('fileSize', 'The file is too large', (value) => {
      //   return (value && value.size <= 2000000) || !value;
      // })
      // .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
      //   return (
      //     (value &&
      //       (value.type === 'image/jpeg' ||
      //         value.type === 'image/bmp' ||
      //         value.type === 'image/png' ||
      //         value.type === 'application/pdf' ||
      //         value.type === 'application/msword')) ||
      //     !value
      //   );
      // }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      topic: '',
      description: '',
      uploadFile: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log(values);

      try {
        await addHelp({ ...values, id: user?.id || '', name: user?.displayName || '' });
        enqueueSnackbar('Message sent to support center', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        props.setLinkSentModal(true);
        props;
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Unable to send message to support center', {
          variant: 'error',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={6}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 500 }}>Email Address * </Typography>
              <TextField
                fullWidth
                placeholder="Enter email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 500 }}> Topic * </Typography>
              <Select
                {...getFieldProps('topic')}
                placeholder=""
                error={Boolean(touched.topic && errors.topic)}
                helperText={touched.topic && errors.topic}
                displayEmpty
                renderValue={formik.getFieldProps('topic').value !== '' ? undefined : () => 'Select Topic'}
              >
                <MenuItem selected value={''} disabled>
                  Select Topic
                </MenuItem>
                <MenuItem value={'1'}>Support issue</MenuItem>
                <MenuItem value={'2'}>Bug Report</MenuItem>

                <MenuItem value={'4'}>delete account</MenuItem>
                <MenuItem value={'5'}>plans and pricing</MenuItem>
                <MenuItem value={'6'}>how to degrade account</MenuItem>
                <MenuItem value={'7'}> how to upgrade account</MenuItem>

                <MenuItem value={'8'}>Other</MenuItem>
              </Select>
              {Boolean(touched.topic && errors.topic) && (
                <Typography variant="caption" color="error.main" style={{ marginLeft: '10px' }}>
                  {touched.topic && errors.topic}
                </Typography>
              )}
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 500, display: 'flex' }}>Description * </Typography>
              <TextField
                fullWidth
                placeholder="Tell about your concern"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Stack>
            <Stack spacing={1} direction="row">
              <FileUploader
                handleChange={(file) => setFieldValue('uploadFile', file)}
                name="file"
                //types={['JPG', 'PNG', 'JPEG']}
              >
                {values.uploadFile ? (
                  <Box
                    width="100%"
                    sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 3 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Iconify icon="clarity:upload-cloud-line" sx={{ fontSize: 60, color: '#225082' }} />
                    <Typography align="center" sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                      {values.uploadFile.name}
                    </Typography>
                  </Box>
                ) : (
                  <Typography align="center" color="primary" sx={{ fontWeight: 500 }}>
                    + Upload file
                  </Typography>
                )}
              </FileUploader>
            </Stack>

            <Stack
              justifyContent={'flex-end'}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <LoadingButton size="large" color="primary" onClick={() => replace('/')}>
                Cancel
              </LoadingButton>
              <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </div>
  );
}
