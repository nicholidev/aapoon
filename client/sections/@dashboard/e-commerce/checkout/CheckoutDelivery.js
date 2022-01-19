/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

CheckoutDelivery.propTypes = {
  formik: PropTypes.object,
  deliveryOptions: PropTypes.array,
  onApplyShipping: PropTypes.func,
};

export default function CheckoutDelivery({ formik, deliveryOptions, onApplyShipping, ...other }) {
  const { values, setFieldValue } = formik;

  return (
    <Card {...other}>
      <CardHeader title="Delivery options" />
      <CardContent>
        <RadioGroup
          name="delivery"
          value={Number(values.delivery)}
          onChange={(event) => {
            const { value } = event.target;
            setFieldValue('delivery', Number(value));
            onApplyShipping(Number(value));
          }}
        >
          <Grid container spacing={2}>
            {deliveryOptions.map((delivery) => {
              const { value, title, description } = delivery;
              return (
                <Grid key={value} item xs={12} md={6}>
                  <OptionStyle
                    sx={{
                      ...(values.delivery === value && {
                        boxShadow: (theme) => theme.customShadows.z20,
                      }),
                    }}
                  >
                    <FormControlLabel
                      value={value}
                      control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ py: 3, flexGrow: 1, mr: 0 }}
                    />
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
