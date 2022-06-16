/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import {
  Stack,
  TextField,
  Alert,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  FormHelperText,
  Button,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import Image from '../../../components/Image';
import { FileUploader } from 'react-drag-drop-files';
import { acceptInvitation } from '../../../api/user';
import 'react-image-crop/dist/ReactCrop.css';
// ----------------------------------------------------------------------
import ErrorMessages from '../../../utils/errorMessage';
import CropImage from '../../../components/upload/CropImage';

export default function RegisterForm(props) {
  const { registerBusiness, user, deleteAccount } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const RegisterSchema = Yup.object().shape({
    businessName: Yup.string().min(2, 'Too Short!').required('Business name required'),
    businessWeb: Yup.string().min(2, 'Too Short!').url('Please enter valid url with http or https'),
    teamsize: Yup.string().required('Teamsize is required'),
    address1: Yup.string().min(2, 'Too Short!').required('Address is required'),
    address2: Yup.string(),
    state: Yup.string()
      .min(2, 'Too Short!')
      .required('State is required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    pincode: Yup.number('Please enter valid code').required('pincode is required'),
    logo: Yup.mixed()

      .test('fileSize', 'Please upload JPEG or PNG format with maximum size of 480 KB', (value) => {
        return (value && value.size <= 480000) || !value;
      })
      .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
        return (
          (value && (value.type === 'image/jpeg' || value.type === 'image/png' || value.type === 'image/jpg')) || !value
        );
      }),
    update: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      businessName: '',
      businessWeb: '',
      address1: '',
      address2: '',
      state: '',
      pincode: '',
      teamsize: '0-50',
      logo: '',
      update: 'false',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await registerBusiness(values);
        enqueueSnackbar('Business details updated', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        if (props.updateMode) {
          return router.replace('/organisation/profile');
        }

        if (localStorage.getItem('inviteToken'))
          acceptInvitation({ email: user.email, token: localStorage.getItem('inviteToken') });
        localStorage.setItem('isAuthenticated', 'true');

        router.push('/dashboard/one');
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

  useEffect(() => {
    if (props.isUpdate) {
      setUrl(user.businessDetails?.logo);
      formik.setValues({
        businessName: user.businessDetails?.businessName,
        businessWeb: user.businessDetails?.businessWeb,
        address1: user.businessDetails?.address1,
        address2: user.businessDetails?.address2,
        state: user.businessDetails?.state,
        pincode: user.businessDetails?.pincode,
        teamsize: user.businessDetails?.teamsize,
        logo: '',
      });
    }
  }, [props.isUpdate]);

  const router = useRouter();
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
  const [cropOpen, setCropOpen] = useState(false);
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(user.businessDetails?.logo);

  const handleUpload = (f) => {
    setFile(f);
    setAvatar(URL.createObjectURL(f));
    setCropOpen(true);
  };

  const removeAvatarHandler = () => {
    console.log('REMOVE AVATAR')
    setAvatar(null)
    setUrl(null);
    formik.setValues({
      ...formik.values,
      logo: "",
      update: 'true'
    })
  }

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
            <Typography sx={{ fontWeight: 500, display: 'flex' }}>
              Business Website{' '}
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
                {...getFieldProps('address1')}
                error={Boolean(touched.address1 && errors.address1)}
                helperText={touched.address1 && errors.address1}
              />
              <TextField
                fullWidth
                placeholder="Address 2 "
                {...getFieldProps('address2')}
                error={Boolean(touched.address2 && errors.address2)}
                helperText={touched.address2 && errors.address2}
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
                  <MenuItem value={'0-50'}>0-50 Employees</MenuItem>
                  <MenuItem value={'50-100'}>50-100 Employees</MenuItem>
                  <MenuItem value={'100-500'}>100-500 Employees</MenuItem>
                  <MenuItem value={'500 & more'}>500 & more Employees</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1}>
                <div style={{ 
                  fontWeight: 500, 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                  }}>
                  <Typography
                    sx={{ fontWeight: 500 }}
                  >
                    Upload Company Logo
                    <span style={{ color: '#E25630', marginLeft: 12 }}>
                    (optional)
                    </span>
                  </Typography>
                  <Button
                    onClick={removeAvatarHandler}
                  >
                    Remove
                  </Button>
                </div>

                <FileUploader handleChange={handleUpload} name="file" types={['jpg', 'png', 'jpeg']} src="">
                  <Box
                    width="100%"
                    sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 3 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {!(url) && (
                      <Iconify icon="clarity:upload-cloud-line" sx={{ fontSize: 60, color: '#225082' }} />
                    )}
                    {(url) && <Image alt="" style={{ width: 120 }} src={url} />}
                    <Typography
                      align="center"
                      sx={{ fontWeight: 500, marginTop: '10px', display: 'flex', justifyContent: 'center' }}
                    >
                      Drag & Drop or &nbsp;
                      <Typography align="center" color="primary" sx={{ fontWeight: 500 }}>
                        Browse{' '}
                      </Typography>
                    </Typography>
                  </Box>
                </FileUploader>
                <CropImage
                  open={cropOpen}
                  setOpen={setCropOpen}
                  file={file}
                  avatar={avatar}
                  setUrl={setUrl}
                  setFieldValue={setFieldValue}
                />
                <Typography variant="caption">Format accepted - PNG, JPEG</Typography>
                <Typography variant="caption">Maximum size of 240KB</Typography>
                <FormHelperText error={Boolean(touched.logo && errors.logo)}>
                  {touched.logo && errors.logo}
                </FormHelperText>
              </Stack>
            </Grid>
          </Grid>
          <Stack justifyContent={'flex-end'} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 2 }}>
            <Button size="large" color="primary" onClick={() => deleteAccount()}>
              Cancel
            </Button>

            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              {props.isUpdate ? 'Save details' : 'Save details'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
