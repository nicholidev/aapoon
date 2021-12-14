import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Stack,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import Image from '../../../../components/Image';
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

CheckoutPaymentMethods.propTypes = {
  formik: PropTypes.object,
  paymentOptions: PropTypes.array,
  cardOptions: PropTypes.array,
};

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, formik }) {
  const isDesktop = useResponsive('up', 'sm');

  const { errors, touched, values, getFieldProps } = formik;

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Payment options" />
      <CardContent>
        <RadioGroup row {...getFieldProps('payment')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { value, title, icons, description } = method;
              const hasChildren = value === 'credit_card';

              return (
                <Grid key={title} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.payment === value && {
                        boxShadow: (theme) => theme.customShadows.z20,
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' }),
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
                      sx={{ flexGrow: 1, py: 3 }}
                    />

                    {isDesktop && (
                      <Stack direction="row" spacing={1} flexShrink={0}>
                        {icons.map((icon) => (
                          <Image key={icon} alt="logo card" src={icon} />
                        ))}
                      </Stack>
                    )}

                    {hasChildren && (
                      <Collapse in={values.payment === 'credit_card'} sx={{ width: '100%' }}>
                        <TextField
                          select
                          fullWidth
                          label="Card"
                          {...getFieldProps('card')}
                          SelectProps={{ native: true }}
                        >
                          {cardOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>

                        <Button
                          id="add-card"
                          type="button"
                          size="small"
                          startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                          sx={{ my: 3 }}
                        >
                          Add new card
                        </Button>
                      </Collapse>
                    )}
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {errors.payment && (
          <FormHelperText error>
            <Box component="span" sx={{ px: 2 }}>
              {touched.payment && errors.payment}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
