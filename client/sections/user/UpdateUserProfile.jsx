/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
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
  Avatar,
  Card,
  Select,
  styled,
  MenuItem,
  Badge,
  Box,
  DialogTitle,
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
import { FileUploader } from 'react-drag-drop-files';
import { IconButtonAnimate } from '../../components/animate';
import PhoneInput from 'react-phone-number-input/input';
import CustomPhone from '../../components/Phonenumber';
import InputLabel from '@mui/material/InputLabel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { instantMeeting } from '../../api/meeting';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';
import { useRouter } from 'next/router';
import withMeetingAuth from '../../HOC/withMeetingAuth';
import FileUploadIcon from '@mui/icons-material/FileUpload';
function UpdateUserProfile(props) {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const AvatarContainer = styled(Card)(({ theme }) => ({
    width: 130,
    height: 130,
    padding: '2px',
    borderRadius: '130px',
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
    },
  }));
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string('Enter a valid last name'),
    profilePic: Yup.mixed()

      .test('fileSize', 'The file is too large', (value) => {
        return (value && value.size <= 2000000) || !value;
      })
      .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
        return (
          (value &&
            (value.type === 'image/jpeg' ||
              value.type === 'image/bmp' ||
              value.type === 'image/png' ||
              value.type === 'application/pdf' ||
              value.type === 'application/msword')) ||
          !value
        );
      }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.displayName?.split(' ')[0],
      lastName: user?.displayName?.split(' ')?.[1],
      profilePic: '',
      picuri:user.profilePic
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await updateProfile(values);
        enqueueSnackbar('User details updates', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
        setOpen(false);
        setSubmitting(false);
      } catch (error) {
        console.log(error);
        enqueueSnackbar('error in updating profile', {
          variant: 'error',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        if (isMountedRef.current) {
          setErrors({ afterSubmit: ErrorMessages[error.code] });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
  useEffect(() => {
    setFieldValue('firstName', user?.displayName?.split(' ')[0]);
    setFieldValue('lastName', user?.displayName?.split(' ')[1]);
  }, [user]);
  return (
    <div>
      <Dialog open={open} maxWidth={'xs'} fullWidth onClose={() => setOpen(false)}>
      <DialogTitle id="alert-dialog-title" align="center" sx={{display: 'flex',justifyContent:"space-between",alignItems: 'center'}}>
           <span></span>   {`Update Profile`} <IconButtonAnimate onClick={()=>setOpen(false)}><CancelOutlinedIcon/></IconButtonAnimate>
            </DialogTitle>
        <div style={{ padding: '40px' }}>
        
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                  <center>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <FileUploader
                          handleChange={(file) => {setFieldValue('profilePic', file);setFieldValue("picuri", URL.createObjectURL(file))}}
                          name="file"
                          types={['JPG', 'PNG', 'JPEG']}
                        >
                          <IconButton sx={{ backgroundColor: '#fff' }}>
                            <FileUploadIcon />
                          </IconButton>
                        </FileUploader>
                      }
                    >
                      <AvatarContainer>
                        <Avatar
                          src={values.picuri }
                          alt="Rayan Moran"
                          sx={{ width: '100%', height: '100%' }}
                        />
                      </AvatarContainer>
                    </Badge>
                  </center>
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500, display: 'flex' }}>First Name</Typography>
                  <TextField
                    fullWidth
                    // placeholder="Type meeting description"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500, display: 'flex' }}>Last Name</Typography>
                  <TextField
                    fullWidth
                    // placeholder="Type meeting description"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <Stack
                  justifyContent={'center'}
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ mt: 2 }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    loading={isSubmitting}
                  >
                    Update
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

export default UpdateUserProfile;
