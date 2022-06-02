/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import {useRouter} from "next/router"
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
import Autocomplete from './Dialogue';
import {countryCodes} from "./counrtyCode"
// @mui
import {
  TextField,
  Alert,
  Stack,
  IconButton,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  Box,
  Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Flag from '../../../components/Flag';
// ----------------------------------------------------------------------
import ErrorMessages from '../../../utils/errorMessage';
import NumberFormatCustom from '../../../components/NumberInput';
import { acceptInvitation, getCountry } from '../../../api/user';

export default function RegisterForm(query) {
  const router = useRouter();
  const { register, user } = useAuth();
  const [open, setOpen] = useState(user.email && user.phoneNumber ? false : true);
  const [countryCode, setCountryCode] = useState('US');
  const isMountedRef = useIsMountedRef();
 
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  const reAlpha = /^[a-zA-Z ]+$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().matches(reAlpha, 'First name is not valid').required('First name required'),
    lastName: Yup.string().matches(reAlpha, 'Last name is not valid').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')

      .matches(
        rePass,
        'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    phone: Yup.string().matches(rePhoneNumber, 'Phone number is not valid').required('Phone number is required'),
    accountType: Yup.string().required('Account type is required'),
    businessType: Yup.string(),
    numberOfEmployees: Yup.number(),
    professionType: Yup.string(),
  });
  const {push}=useRouter();
  const formik = useFormik({
    initialValues: {
      firstName:query?.query?.firstName ? query?.query?.firstName: user.firstName,
      lastName: query?.query?.lastName ? query?.query?.lastName:user.lastName,
      email: query?.query?.email ? query?.query?.email : user.email,
      password: user.password,
      phone: user.phoneNumber,
      countryCode:user.countryCode||countryCodes.find(i=>i.code===countryCode)?.value,
      accountType: user.accountType || 'Business',
    },

    validationSchema: RegisterSchema,

    onSubmit: async (values, { setErrors, setSubmitting }) => {

      setSubmitting(true);

      try {
        await register(
          values.email,
          values.password,
          values.firstName,
          values.lastName,
          values.phone,
          values
        );

        enqueueSnackbar('Registered Successfully', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        if (localStorage.getItem('inviteToken')) {
          acceptInvitation({ email: values.email, token: localStorage.getItem('inviteToken') });
        }

        if (isMountedRef.current) {
          setSubmitting(false);
        }

        if(user.accountType==="Business"){
          router.push("/dashboard/one");
        }

      } catch (error) {
        console.log(error);
        setErrors({ afterSubmit: ErrorMessages[error.code] });
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

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    values
  } = formik;

  useEffect(() => {
    if (query?.query?.email) {
      setFieldValue('email', query?.query?.email);
      localStorage.setItem('inviteToken', query?.query?.token);
    }
    getCountry()
      .then((res) => {
        setCountryCode(res.data.country_code);
        setFieldValue("countryCode",countryCodes.find(i=>i.code===res.data.country_code)?.value)
      });
  }, [query?.query?.email]);

  const setccd =(e)=>{
   setCountryCode(e.target.value);
   setFieldValue("countryCode", countryCodes.find(i=>i.code===e.target.value)?.value)
  }
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
          <TextField
            placeholder="Enter phone number"
            countryCallingCodeEditable={false}
            countrySelectComponent={(()=>{return null})}
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: (
                <Autocomplete  value={countryCode} countryCodes={countryCodes} setccd={setccd}   renderInput={(params) => <TextField {...params} label="Movie" />} >
                  <Box
                    position="start"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}
                  >
                    {countryCodes.find(i=>i.code===countryCode)?<Flag code={countryCodes.find(i=>i.code===countryCode).code}/>:""}&nbsp;&nbsp;
                    <i style={{marginRight:4}}>{countryCodes.find(i=>i.code===countryCode)?.value}{' '}</i>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ justifyContent: 'center', alignItems: 'center', mx: 1, borderWidth: '0.2px' }}
                    />
                  </Box>
                </Autocomplete>
              )
            }}
          endorment={(
            <Autocomplete  value={countryCode} countryCodes={countryCodes} setccd={setccd}   renderInput={(params) => <TextField {...params} label="Movie" />} >
              <Box
                position="start"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}
              >
                {countryCodes.find(i=>i.code===countryCode)?<Flag code={countryCodes.find(i=>i.code===countryCode).code}/>:""}&nbsp;&nbsp;
                <i style={{marginRight:4}}>{countryCodes.find(i=>i.code===countryCode)?.value}{' '}</i>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ justifyContent: 'center', alignItems: 'center', mx: 1, borderWidth: '0.2px' }}
                />
              </Box>
            </Autocomplete>
          )}
            defaultCountry={countryCode}
            inputComponent={NumberFormatCustom}
            {...getFieldProps('phone')}
            onChange={(data) => setFieldValue('phone', data.target.value)}
            name={'phone'}
            onBlur={getFieldProps('phone').onBlur}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Set Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Iconify
                      icon={
                        showPassword ?
                          'eva:eye-fill' :
                          'eva:eye-off-fill'
                      }
                    />
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
            <DialogTitle
              id="alert-dialog-title"
              align="center"
              sx={{
                display: 'flex',
                justifyContent:"space-between",
                alignItems: 'center'
              }}
            >
              {"  "}
              {`Select your ${values.accountType === 'Business' ? 'business' : 'profession'}`}
              {" "}
              <IconButtonAnimate onClick={()=>push("/")}>
                <CancelOutlinedIcon/>
              </IconButtonAnimate>
            </DialogTitle>
            <DialogContent
              sx={{
                mt: 4,
                padding: 5,
                pb: 1
              }}
            >
              <DialogContentText id="alert-dialog-description">
                <Stack
                  direction="column"
                  spacing={3}
                >
                  <FormControl
                    component="fieldset"
                  >
                    <RadioGroup
                      row
                      aria-label="type"
                      name="row-radio-buttons-group"
                      {...getFieldProps('accountType')}
                    >
                      <FormControlLabel
                        value="Business"
                        control={<Radio />}
                        label="Business"
                        sx={{ mr: 4 }}
                      />
                      <FormControlLabel
                        value="Professional"
                        control={<Radio />}
                        label="Professional"
                      />
                    </RadioGroup>
                  </FormControl>

                  {values.accountType === 'Business' && (
                    <>
                      {' '}
                      <FormControl
                        sx={{
                          m: 1,
                          minWidth: 80
                        }}
                      >
                        <Select
                          placeholder="Enter"
                          fullWidth
                          defaultValue={10}
                          {...getFieldProps('businessType')}
                        >
                          <MenuItem value={10} disabled>Select Business</MenuItem>
                          <MenuItem value={'Automotive '}>Automotive</MenuItem>
                          <MenuItem value={'Business Support & Supplies '}>Business Support & Supplies </MenuItem>
                          <MenuItem value={'Education'}>Education </MenuItem>
                          <MenuItem value={'Computers & Electronics'}>Computers & Electronics </MenuItem>
                          <MenuItem value={'Construction & Contractors '}>Construction & Contractors </MenuItem>
                          <MenuItem value={'Entertainment'}>Entertainment </MenuItem>
                          <MenuItem value={'Other'}>Other </MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}

                  {values.accountType === 'Professional' && (
                    <>
                      {' '}
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <Select
                          placeholder="Enter"
                          fullWidth
                          defaultValue={10}
                          {...getFieldProps('professionType')}
                        >
                          <MenuItem value={10} disabled>Select Profession</MenuItem>
                          <MenuItem value={'Lawyer'}>Lawyer</MenuItem>
                          <MenuItem value={'Accountant'}>Accountant</MenuItem>
                          <MenuItem value={'Technician'}>Technician</MenuItem>
                          <MenuItem value={'Doctor'}>Doctor</MenuItem>
                          <MenuItem value={'Teacher'}>Teacher</MenuItem>
                          <MenuItem value={'Journalist'}>Journalist</MenuItem>
                          <MenuItem value={'Student'}>Student</MenuItem>
                          <MenuItem value={'Other'}>Other </MenuItem>
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
                  (values.accountType === 'Business' && (!values.businessType )) ||
                  (values.accountType === 'Professional' && !values.professionType)
                }
              >
                Next
              </Button>
            </DialogActions>
          </Dialog>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
