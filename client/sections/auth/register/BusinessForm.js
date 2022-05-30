/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useEffect} from 'react';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';

import { IconButtonAnimate } from '../../../components/animate';
import Image from '../../../components/Image'
import { FileUploader } from 'react-drag-drop-files';
import { acceptInvitation} from '../../../api/user';
import { useRouter } from 'next/router'
// ----------------------------------------------------------------------
import ErrorMessages from '../../../utils/errorMessage';
export default function RegisterForm(props) {
  const { registerBusiness,user ,deleteAccount} = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [showPassword, setShowPassword] = useState(false);
  // const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const RegisterSchema = Yup.object().shape({
    businessName: Yup.string().min(2, 'Too Short!').required('Business name required'),
    businessWeb: Yup.string()
      .min(2, 'Too Short!')
      .url('Please enter valid url with http or https')
    ,
    teamsize: Yup.string().required('Teamsize is required'),
    address1: Yup.string().min(2, 'Too Short!').required('Address is required'),
    address2: Yup.string(),
    state: Yup.string().min(2, 'Too Short!').required('State is required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    pincode: Yup.number('Please enter valid code').required('pincode is required'),
    logo: Yup.mixed()

      .test('fileSize', 'Please upload JPEG or PNG format with maximum size of 240 KB', (value) => {
        return value && value.size <= 240000||!value;
      })
      .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
        return (
          value &&
          (value.type === 'image/jpeg' ||

            value.type === 'image/png'

           )||!value
        );
      }),
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

        if(props.updateMode){
          return router.replace("/organisation/profile")
        }

        if (localStorage.getItem('inviteToken'))
          acceptInvitation({ email: user.email, token: localStorage.getItem('inviteToken') });
        localStorage.setItem('isAuthenticated', 'true')

        router.push("/dashboard/one");
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
        address1:user.businessDetails?.address1,
        address2: user.businessDetails?.address2,
        state:user.businessDetails?.state,
        pincode: user.businessDetails?.pincode,
        teamsize: user.businessDetails?.teamsize,
        logo: ""
      });
    }

  },[props.isUpdate]);

  const router = useRouter()
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  console.log(values.logo, '<=====LOGO OF VALUES')

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
                  <MenuItem value={"0-50"}>0-50 Employees</MenuItem>
                  <MenuItem value={"50-100"}>50-100 Employees</MenuItem>
                  <MenuItem value={"100-500"}>100-500 Employees</MenuItem>
                  <MenuItem value={"500 & more"}>500 & more Employees</MenuItem>
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
                  types={['jpg', 'png', 'jpeg']}
                >
                  <Box
                    width="100%"
                    sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 3 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {(!user.businessDetails?.logo||values.logo)&&<Iconify icon="clarity:upload-cloud-line" sx={{ fontSize: 60, color: '#225082' }} />}
                    {values.logo ?
                      <Typography align="center" sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                        {
                          values.logo.name.length <= 25 ?
                            values.logo.name:
                            `${values.logo.name.split(".")[0].substring(0, 10)}
                             ...
                             ${values.logo.name.split(".")[0].substring(values.logo.name.split(".")[0].length - 5, values.logo.name.split(".")[0].length)}
                             .${values.logo.name.split(".")[1]}
                            `
                        }
                      </Typography> :
                      ( user.businessDetails?.logo && <Image style={{width:80}} src={user.businessDetails?.logo}/> )
                    }
                    <Typography align="center" sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                        Drag & Drop or &nbsp;
                        <Typography align="center" color="primary" sx={{ fontWeight: 500 }}>
                          Browse{' '}
                        </Typography>
                    </Typography>
                  </Box>
                </FileUploader>
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
              {props.isUpdate? "Save details":"Save details"}
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
