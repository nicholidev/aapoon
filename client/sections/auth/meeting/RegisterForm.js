/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';

//dialogues
import Autocomplete from '../register/Dialogue';
import {countryCodes} from "../register/counrtyCode"
// @mui
import { Stack, TextField, IconButton, InputAdornment, Alert, Button, Select, MenuItem ,Box,Divider} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import PhoneInput from 'react-phone-number-input';
import CustomPhone from '../../../components/Phonenumber';
import Flag from '../../../components/Flag';
import NumberFormatCustom from '../../../components/NumberInput';
// ----------------------------------------------------------------------
import ErrorMessages from '../../../utils/errorMessage';
import { acceptInvitation, getCountry } from '../../../api/user';
import {sendOtp} from "../../../api/meeting"
export default function RegisterForm(query) {
  const { register, user } = useAuth();
  const [open, setOpen] = useState(user.email && user.phoneNumber ? false : true);
  const [countryCode, setCountryCode] = useState('US');
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const reAlpha = /^[a-zA-Z ]+$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().matches(reAlpha, 'First name is not valid').required('First name required'),
    lastName: Yup.string().matches(reAlpha, 'Last name is not valid').required('Last name required'),
    password:Yup.string(),
 
    phone: Yup.string().matches(rePhoneNumber, 'Phone number is not valid').required('Phone number is required'),
  
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: query?.query?.email ? query?.query?.email : user.email,
      password: user.password,
      phone: user.phoneNumber,
      countryCode:user.countryCode||countryCodes.find(i=>i.code==countryCode)?.value,
      accountType: user.accountType || 'Business',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await sendOtp(values.countryCode+values.phone,query.id,values.password);
        enqueueSnackbar('Otp sent successfully', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
        query.setOtp(true)
        query.setMobile(values.countryCode+values.phone)
        query.setName(values.firstName+" "+values.lastName)
        if(user.accountType=="Business"){
          window?.location="/dashboard/one";
        }
      } catch (error) {
        console.log(error);
        if(error.response.status==403){
          enqueueSnackbar('Invalid password', {
            variant: 'error',
            action: (key) => (
              <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
                <Iconify icon={'eva:close-fill'} />
              </IconButtonAnimate>
            ),
          });
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
    getCountry().then((res) => {
      setCountryCode(res.data.country_code);
      setFieldValue("countryCode",countryCodes.find(i=>i.code==res.data.country_code)?.value)
    });
  }, [query?.query?.email]);
  const setccd =(e)=>{
    setCountryCode(e.target.value);
    setFieldValue("countryCode",countryCodes.find(i=>i.code==e.target.value)?.value)
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
            placeholder="Enter phone number"
            countryCallingCodeEditable={false}
            countrySelectComponent={(props=>{

            
            return( null)})}
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: <Autocomplete  value={countryCode} countryCodes={countryCodes} setccd={setccd}   renderInput={(params) => <TextField {...params} label="Movie" />} >
              <Box
                       position="start"
                       sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}
                     >
                      
                       {countryCodes.find(i=>i.code==countryCode)?<Flag code={countryCodes.find(i=>i.code==countryCode).code}/>:""}&nbsp;&nbsp;
                       <i style={{marginRight:4}}>{countryCodes.find(i=>i.code==countryCode)?.value}{' '}</i>
                       <Divider
                         orientation="vertical"
                         flexItem
                         sx={{ justifyContent: 'center', alignItems: 'center', mx: 1, borderWidth: '0.2px' }}
                       />
                     </Box>
                   
                       </Autocomplete>
            }}
          endorment={
          <Autocomplete  value={countryCode} countryCodes={countryCodes} setccd={setccd}   renderInput={(params) => <TextField {...params} label="Movie" />} >
   <Box
            position="start"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}
          >
           
            {countryCodes.find(i=>i.code==countryCode)?<Flag code={countryCodes.find(i=>i.code==countryCode).code}/>:""}&nbsp;&nbsp;
            <i style={{marginRight:4}}>{countryCodes.find(i=>i.code==countryCode)?.value}{' '}</i>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ justifyContent: 'center', alignItems: 'center', mx: 1, borderWidth: '0.2px' }}
            />
          </Box>
        
            </Autocomplete>
        
        
        
        }
            defaultCountry={countryCode}
            inputComponent={NumberFormatCustom}
            {...getFieldProps('phone')}
            onChange={(data) => setFieldValue('phone', data.target.value)}
            name={'phone'}
            onBlur={getFieldProps('phone').onBlur}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

     { query.hasPassword &&   <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="meeting Password"
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
}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Next
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
