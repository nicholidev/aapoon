/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  TextField,
  IconButton,
  Typography,
  FormHelperText,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import ColorSinglePicker from '../../../../components/ColorSinglePicker';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.shape({
    available: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    id: PropTypes.string,
    inventoryType: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    totalRating: PropTypes.number,
    totalReview: PropTypes.number,
  }),
};

export default function ProductDetailsSummary({ product, cart, onAddCart, onGotoStep, ...other }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType,
  } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);
  const isMaxQuantity = cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      color: colors[0],
      size: sizes[4],
      quantity: available < 1 ? 0 : 1,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: values.price * values.quantity,
          });
        }
        setSubmitting(false);
        onGotoStep(0);
        navigate(PATH_DASHBOARD.eCommerce.checkout);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={inventoryType === 'in_stock' ? 'success' : 'error'}
            sx={{ textTransform: 'uppercase' }}
          >
            {sentenceCase(inventoryType || '')}
          </Label>

          <Typography
            variant="overline"
            sx={{
              mt: 2,
              mb: 1,
              display: 'block',
              color: status === 'sale' ? 'error.main' : 'info.main',
            }}
          >
            {status}
          </Typography>

          <Typography variant="h5" paragraph>
            {name}
          </Typography>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Rating value={totalRating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(totalReview)}
              reviews)
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {priceSale && fCurrency(priceSale)}
            </Box>
            &nbsp;{fCurrency(price)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Color
            </Typography>
            <ColorSinglePicker
              {...getFieldProps('color')}
              colors={colors}
              sx={{
                ...(colors.length > 4 && {
                  maxWidth: 144,
                  justifyContent: 'flex-end',
                }),
              }}
            />
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Size
            </Typography>
            <TextField
              select
              size="small"
              {...getFieldProps('size')}
              SelectProps={{ native: true }}
              FormHelperTextProps={{
                sx: {
                  textAlign: 'right',
                  margin: 0,
                  mt: 1,
                },
              }}
              helperText={
                <Link href="#" underline="always" color="text.primary">
                  Size Chart
                </Link>
              }
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Quantity
            </Typography>

            <div>
              <Incrementer name="quantity" available={available} />
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: 'block',
                  textAlign: 'right',
                  color: 'text.secondary',
                }}
              >
                Available: {available}
              </Typography>

              <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
            </div>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  disabled={isMaxQuantity}
                  size="large"
                  type="button"
                  color="warning"
                  variant="contained"
                  startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
                  onClick={handleAddCart}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Add to Cart
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button fullWidth size="large" type="submit" variant="contained">
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Stack alignItems="center" sx={{ mt: 3 }}>
            <SocialsButton initialColor />
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  name: PropTypes.string,
};

function Incrementer({ name, available }) {
  const [field, , helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={16} height={16} />
      </IconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {value}
      </Typography>
      <IconButton size="small" color="inherit" disabled={value >= available} onClick={incrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={16} height={16} />
      </IconButton>
    </Box>
  );
}
