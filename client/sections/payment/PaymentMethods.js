/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Radio,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
//
import PaymentNewCardForm from './PaymentNewCardForm';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    icons: [
      'https://minimal-assets-api.vercel.app/assets/icons/ic_mastercard.svg',
      'https://minimal-assets-api.vercel.app/assets/icons/ic_visa.svg',
    ],
  },
];

const CARD_OPTIONS = [
  {
    value: 'visa1',
    label: '**** **** **** 1212 - Jimmy Holland',
  },
  {
    value: 'visa2',
    label: '**** **** **** 2424 - Shawn Stokes',
  },
  {
    value: 'mastercard',
    label: '**** **** **** 4545 - Cole Armstrong',
  },
];

const OptionStyle = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
  formik: PropTypes.object,
};

export default function PaymentMethods({ formik }) {
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;

  const handleCollapseIn = () => {
    setShow(!show);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  return (
    <div>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Payment Method
      </Typography>

      <RadioGroup {...getFieldProps('method')}>
        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((method) => {
            const { value, title, icons } = method;
            const hasChildren = value === 'credit_card';

            return (
              <OptionStyle
                key={title}
                sx={{
                  ...(values.method === value && {
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                  ...(hasChildren && { flexWrap: 'wrap' }),
                }}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                  label={
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {title}
                    </Typography>
                  }
                  sx={{ py: 3, mx: 0 }}
                />

                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ position: 'absolute', right: 20, top: 32 }}
                >
                  {icons.map((icon) => (
                    <Image key={icon} alt="logo card" src={icon} />
                  ))}
                </Stack>

                {hasChildren && (
                  <Collapse in={values.method === 'credit_card'} sx={{ width: 1 }}>
                    <TextField select fullWidth label="Card" {...getFieldProps('card')} SelectProps={{ native: true }}>
                      {CARD_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <Button
                      id="addNewCard"
                      type="button"
                      size="small"
                      startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                      onClick={handleCollapseIn}
                      sx={{ my: 3 }}
                    >
                      Add new card
                    </Button>

                    <Collapse in={show}>
                      <PaymentNewCardForm formik={formik} onCancel={handleCollapseOut} />
                    </Collapse>
                  </Collapse>
                )}
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>
    </div>
  );
}
