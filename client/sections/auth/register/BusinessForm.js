/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
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

import { IconButtonAnimate } from '../../../components/animate';
import PhoneInput from 'react-phone-number-input/input';
import CustomPhone from '../../../components/Phonenumber';
import InputLabel from '@mui/material/InputLabel';
import { FileUploader } from 'react-drag-drop-files';
import { acceptInvitation, getCountry } from '../../../api/user';
// ----------------------------------------------------------------------
import ErrorMessages from '../../../utils/errorMessage';
export default function RegisterForm(props) {
  const { registerBusiness,user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const RegisterSchema = Yup.object().shape({
    businessName: Yup.string().min(2, 'Too Short!').required('Business name required'),
    businessWeb: Yup.string()
      .min(2, 'Too Short!')
      .url('Please enter valid url with http or https')
    ,
    teamsize: Yup.string().required('Teamsize is required'),
    addrerss1: Yup.string().min(2, 'Too Short!').required('Adress is required'),
    addrerss2: Yup.string(),
    state: Yup.string().min(2, 'Too Short!').required('State is required'),
    pincode: Yup.number('Please enter valid code').required('pincode is required'),
    logo: Yup.mixed()
      
      .test('fileSize', 'The file is too large', (value) => {
        return value && value.size <= 2000000||!value;
      })
      .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
        return (
          value &&
          (value.type === 'image/jpeg' ||
            value.type === 'image/bmp' ||
            value.type === 'image/png' ||
            value.type === 'application/pdf' ||
            value.type === 'application/msword')||!value
        );
      }),
  });

  const formik = useFormik({
    initialValues: {
      businessName: '',
      businessWeb: '',
      addrerss1: '',
      addrerss2: '',
      state: '',
      pincode: '',
      teamsize: '10',
      logo: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log(values);

      try {
        await registerBusiness(values);
        enqueueSnackbar('Business details updates', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        if (localStorage.getItem('inviteToken'))
          acceptInvitation({ email: user.email, token: localStorage.getItem('inviteToken') });
        localStorage.setItem('isAuthenticated',true)
        
        window?.location="/dashboard/one";
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: ErrorMessages[error.code] });
          setSubmitting(false);
        }
      }
    },
  });

  useEffect(()=>{
    if(props.isUpdate){
      formik.setValues({
  
        businessName: user.businessDetails?.businessName,
        businessWeb: user.businessDetails?.businessWeb,
        addrerss1:user.businessDetails?.addrerss1,
        addrerss2: user.businessDetails?.addrerss2,
        state:user.businessDetails?.state,
        pincode: user.businessDetails?.pincode,
        teamsize: user.businessDetails?.teamsize,
        logo: user.businessDetails?.logo,
      });
    }

  },[props.isUpdate]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={6}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 500 }}>Business Name * </Typography>
            <TextField
              fullWidth
              placeholder="Business Name *"
              {...getFieldProps('businessName')}
              error={Boolean(touched.businessName && errors.businessName)}
              helperText={touched.businessName && errors.businessName}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 500,display: 'flex'}}>Business Website   <Typography style={{color: '#E25630'}} sx={{ fontWeight: 500,color:"primary" ,ml:1 }} color="primary"> (optional)</Typography></Typography>
            <TextField
              fullWidth
              placeholder="Business Website"
              {...getFieldProps('businessWeb')}
              error={Boolean(touched.businessWeb && errors.businessWeb)}
              helperText={touched.businessWeb && errors.businessWeb}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 500 }}> Business Address * </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="addrerss"
                placeholder="Address 1 *"
                {...getFieldProps('addrerss1')}
                error={Boolean(touched.addrerss1 && errors.addrerss1)}
                helperText={touched.addrerss1 && errors.addrerss1}
              />
              <TextField
                fullWidth
                placeholder="Address 2 *"
                {...getFieldProps('address2')}
                error={Boolean(touched.addrerss2 && errors.addrerss2)}
                helperText={touched.addrerss2 && errors.addrerss2}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="state"
                placeholder="State *"
                {...getFieldProps('state')}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
              />
              <TextField
                fullWidth
                type="number"
                autoComplete="pincode"
                placeholder="Pin code / Zip code *"
                {...getFieldProps('pincode')}
                error={Boolean(touched.pincode && errors.pincode)}
                helperText={touched.pincode && errors.pincode}
              />
            </Stack>
          </Stack>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 500 }}>Team Size * </Typography>
                <Select
                  autoComplete="username"
                  placeholder="Business Website"
                  {...getFieldProps('teamsize')}
                  error={Boolean(touched.teamsize && errors.teamsize)}
                  helperText={touched.teamsize && errors.teamsize}
                >
                  <MenuItem value={10}>0-10 Employees</MenuItem>
                  <MenuItem value={50}>10-50 Employees</MenuItem>
                  <MenuItem value={100}>50-100 Employees</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 500 ,display: 'flex'}}>Upload Company Logo <Typography style={{color: '#E25630'}} sx={{ fontWeight: 500,color:"primary" ,ml:1 }} color="primary"> (optional)</Typography></Typography>

                <FileUploader
                  handleChange={(file) => setFieldValue('logo', file)}
                  name="file"
                  types={['JPG', 'PNG', 'JPEG']}
                >
                  <Box
                    width="100%"
                    sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 3 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Iconify icon="clarity:upload-cloud-line" sx={{ fontSize: 60, color: '#225082' }} />
                    {values.logo ? (
                      <Typography align="center" sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                        {values.logo.name}
                      </Typography>
                    ) : (
                      <Typography align="center" sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                        Drag & Drop or &nbsp;
                        <Typography align="center" color="primary" sx={{ fontWeight: 500 }}>
                          Browse{' '}
                        </Typography>
                      </Typography>
                    )}
                  </Box>
                </FileUploader>
                <Typography variant="caption">Format accepted - PNG, JPEG</Typography>
                <Typography variant="caption">Logo Dimensions - 200*200 pixels</Typography>
                <FormHelperText error={Boolean(touched.logo && errors.logo)}>
                  {touched.logo && errors.logo}
                </FormHelperText>
              </Stack>
            </Grid>
          </Grid>
          <Stack justifyContent={'flex-end'} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 2 }}>
            <LoadingButton size="large" color="primary">
              Cancel
            </LoadingButton>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              {props.isUpdate? "Update":"Register"}
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
