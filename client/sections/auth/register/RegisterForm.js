/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';

//dialogues
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//Radio buttons
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// @mui
import { Stack, TextField, IconButton, InputAdornment, Alert, Button, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import PhoneInput from 'react-phone-number-input/input';
import CustomPhone from '../../../components/Phonenumber';
// ----------------------------------------------------------------------
import ErrorMessages from '../../../utils/errorMessage';
import { acceptInvitation } from '../../../api/user';
export default function RegisterForm(query) {
  const [open, setOpen] = useState(true);

  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().matches(rePhoneNumber, 'Phone number is not valid').required('Phone is required'),
    accountType: Yup.string().required('Account type is required'),
    businessType: Yup.string(),
    numberOfEmployees: Yup.number(),
    professionType: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: query?.query?.email,
      password: '',
      phone: '',
      accountType: 'Business',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(values.email, values.password, values.firstName, values.lastName, values.phone, values);
        enqueueSnackbar('Register success', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
        if (localStorage.getItem('inviteToken'))
          acceptInvitation({ email: values.email, token: localStorage.getItem('inviteToken') });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: ErrorMessages[error.code] });
          setSubmitting(false);
        }
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;
  useEffect(() => {
    if (query?.query?.email) {
      setFieldValue('email', query?.query?.email);
      localStorage.setItem('inviteToken', query?.query?.token);
    }
  }, [query?.query?.email]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <PhoneInput
            placeholder="Enter phone number"
            inputComponent={CustomPhone}
            {...getFieldProps('phone')}
            onChange={(data) => setFieldValue('phone', data)}
            name={'phone'}
            onBlur={getFieldProps('phone').onBlur}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
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

          <Dialog
            sx={{ borderRadius: 1 }}
            maxWidth={'xs'}
            fullWidth={true}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" align="center">
              {'Select your business'}
            </DialogTitle>
            <DialogContent sx={{ mt: 4, padding: 5, pb: 1 }}>
              <DialogContentText id="alert-dialog-description">
                <Stack direction="column" spacing={3}>
                  <FormControl component="fieldset">
                    <RadioGroup row aria-label="type" name="row-radio-buttons-group" {...getFieldProps('accountType')}>
                      <FormControlLabel value="Business" control={<Radio />} label="Business" />
                      <FormControlLabel sx={{ ml: 2 }} value="Professional" control={<Radio />} label="Professional" />
                    </RadioGroup>
                  </FormControl>

                  {values.accountType == 'Business' && (
                    <>
                      {' '}
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <Select placeholder="Enter" fullWidth defaultValue={10} {...getFieldProps('businessType')}>
                          <MenuItem value={10} disabled>
                            Select Business
                          </MenuItem>
                          <MenuItem value={'Business one'}>Business one</MenuItem>
                          <MenuItem value={'Business two'}>Business two</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        type="number"
                        placeholder="Enter number of employees"
                        {...getFieldProps('numberOfEmployees')}
                      />
                    </>
                  )}

                  {values.accountType == 'Professional' && (
                    <>
                      {' '}
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <Select placeholder="Enter" fullWidth defaultValue={10} {...getFieldProps('professionType')}>
                          <MenuItem value={10} disabled>
                            Select Profession
                          </MenuItem>
                          <MenuItem value={'Business one'}>Profession one</MenuItem>
                          <MenuItem value={'Business two'}>Profession two</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                fullWidth
                size="large"
                onClick={handleClose}
                variant="contained"
                disabled={
                  (values.accountType == 'Business' && (!values.businessType || !values.numberOfEmployees)) ||
                  (values.accountType == 'Professional' && !values.professionType)
                }
              >
                Next
              </Button>
            </DialogActions>
          </Dialog>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
