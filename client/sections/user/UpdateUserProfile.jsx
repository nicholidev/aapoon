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
  Alert,
  Typography,
  Avatar,
  Card,
  styled,
  Badge,
  DialogTitle,
  Dialog,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Iconify from '../../components/Iconify';
import { FileUploader } from 'react-drag-drop-files';
import { IconButtonAnimate } from '../../components/animate';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// ----------------------------------------------------------------------
import ErrorMessages from '../../utils/errorMessage';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CropImage from '../../components/upload/CropImage';
import useIsMountedRef from '../../hooks/useIsMountedRef';


function UpdateUserProfile(props) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [avatar, setAvatar] = useState(user.profilePic);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(user.businessDetails?.logo);

  const handleUpload = (f) => {
    setFile(f);
    setAvatar(URL.createObjectURL(f));
    setCropOpen(true);
  };

  const removeAvatarHandler = () => {
    setAvatar(null)
    setUrl(null);
    formik.setValues({
      ...formik.values,
      profilePic: "",
      update: 'true'
    })
  }

  useEffect(() => {
    if(!!user.profilePic) {
      setAvatar(user.profilePic)
    }
  }, [user.profilePic])


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
    update: Yup.string('false'),
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
      firstName: user?.firstName,
      lastName: user?.lastName,
      update: 'false',
      profilePic: '',
      picuri:user.profilePic
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await updateProfile(values);
        enqueueSnackbar('User details updated', {
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

        if (isMountedRef?.current) {
          setErrors({ afterSubmit: ErrorMessages[error.code] });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
  
  useEffect(() => {
    // setFieldValue('firstName', user?.displayName?.split(' ')[0]);
    // setFieldValue('lastName', user?.displayName?.split(' ')[1]);
    setFieldValue('firstName', user?.firstName ? user.firstName : user?.displayName)
    setFieldValue('lastName', user?.lastName ? user.lastName : user?.displayName)
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
                          // handleChange={(file) => {setFieldValue('profilePic', file);setFieldValue("picuri", URL.createObjectURL(file))}}
                          handleChange={handleUpload}
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
                          src={avatar}
                          alt="Rayan Moran"
                          sx={{ width: '100%', height: '100%' }}
                        />
                      </AvatarContainer>
                    </Badge>
                    {
                      errors.profilePic && (
                        <p style={{fontSize: 12, fontWeight: 500, color: 'red', marginTop: 12, marginBottom: 0}}>{errors.profilePic}</p>
                      )
                    }
                    <div style={{marginTop: 12}}>
                      <Button variant="text" onClick={removeAvatarHandler}>
                        Remove
                      </Button>
                    </div>
                    <CropImage
                      open={cropOpen}
                      setOpen={setCropOpen}
                      file={file}
                      avatar={avatar}
                      setUrl={setUrl}
                      setFieldValue={setFieldValue}
                      fieldKey="profilePic"
                    />
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
