import PropTypes from 'prop-types';
// @mui
import { Typography, TextField, Stack } from '@mui/material';

// ----------------------------------------------------------------------

PaymentBillingAddress.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default function PaymentBillingAddress({ formik }) {
  const { touched, errors, getFieldProps } = formik;

  return (
    <div>
      <Typography variant="subtitle1">Billing Address</Typography>

      <Stack spacing={3} mt={5}>
        <TextField
          fullWidth
          label="Person name"
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />

        <TextField
          fullWidth
          label="Phone number"
          {...getFieldProps('phone')}
          error={Boolean(touched.phone && errors.phone)}
          helperText={touched.phone && errors.phone}
        />

        <TextField
          fullWidth
          label="Email"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />

        <TextField
          fullWidth
          label="Address"
          {...getFieldProps('address')}
          error={Boolean(touched.address && errors.address)}
          helperText={touched.address && errors.address}
        />
      </Stack>
    </div>
  );
}
