/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { OutlinedInput, FormHelperText, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { useRouter } from 'next/router';
import OtpInput from 'react-otp-input';
import ErrorMessages from '../../../utils/errorMessage';
// eslint-disable-next-line consistent-return
function maxLength(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(0, object.target.maxLength));
  }
}

export default function VerifyCodeForm({ verifyMobileLinkCode, user,setCounter }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const VerifyCodeSchema = Yup.object().shape({
    code: Yup.string().required('Code is required , min 6 number').length(6),
  });

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm, }) => {
      try {
        await verifyMobileLinkCode(values.code);
        enqueueSnackbar('Verified Successfully', { variant: 'success' });
        setSubmitting(false);
        setCounter(false)
        if (user.accountType == 'Business') router.push('/auth/business-profile');
        else {
          localStorage.setItem('isAuthenticated', true);
          if (router.query.return) {
            window.location = router.query.return;
          } else {
            window.location = '/dashboard/one';
          }
        }
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        resetForm();
        setErrors({ code: ErrorMessages[err.code] });
      }

      //navigate(PATH_DASHBOARD.root);
    },
  });

  const { values, errors, isValid, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <OtpInput
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{ width: 48, height: 48, border: '2px solid #f0f0f0', borderRadius: 6, overflow: 'hidden' }}
          value={getFieldProps('code').value}
          placeholder={'------'}
          shouldAutoFocus={true}
          isInputNum={true}
          onChange={(otp) => setFieldValue('code', otp)}
          numInputs={6}
          separator={<span></span>}
        />
        <FormHelperText error={!isValid} style={{ textAlign: 'center' }} sx={{ mt: 2 }}>
          {!isValid && errors.code}
        </FormHelperText>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
          Verify Now
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
