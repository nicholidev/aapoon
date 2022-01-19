/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Stack, MenuItem, IconButton } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// _mock_
import { _bankingCreditCard } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import { CarouselDots } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const HEIGHT = 276;

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const CardItemStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT - 16,
  backgroundSize: 'cover',
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  backgroundImage: 'url("https://minimal-assets-api.vercel.app/assets/bg_card.png")',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const shadowStyle = {
  mx: 'auto',
  width: 'calc(100% - 16px)',
  borderRadius: 2,
  position: 'absolute',
  height: 200,
  zIndex: 8,
  bottom: 8,
  left: 0,
  right: 0,
  bgcolor: 'grey.500',
  opacity: 0.32,
};

// ----------------------------------------------------------------------

export default function BankingCurrentBalance() {
  const theme = useTheme();

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 16, bottom: 16 }),
  };

  return (
    <RootStyle>
      <Box sx={{ position: 'relative', zIndex: 9 }}>
        <Slider {...settings}>
          {_bankingCreditCard.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Slider>
      </Box>

      <Box sx={{ ...shadowStyle }} />
      <Box
        sx={{
          ...shadowStyle,
          opacity: 0.16,
          bottom: 0,
          zIndex: 7,
          width: 'calc(100% - 40px)',
        }}
      />
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

CardItem.propTypes = {
  card: PropTypes.shape({
    balance: PropTypes.number,
    cardHolder: PropTypes.string,
    cardNumber: PropTypes.string,
    cardType: PropTypes.string,
    cardValid: PropTypes.string,
  }),
};

function CardItem({ card }) {
  const { cardType, balance, cardHolder, cardNumber, cardValid } = card;

  const [showCurrency, setShowCurrency] = useState(true);

  const onToggleShowCurrency = () => {
    setShowCurrency((prev) => !prev);
  };

  return (
    <>
      <CardItemStyle>
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}>
          <MoreMenuButton />
        </Box>

        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2', opacity: 0.72 }}>Current Balance</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ typography: 'h3' }}>{showCurrency ? '********' : fCurrency(balance)}</Typography>
            <IconButton color="inherit" onClick={onToggleShowCurrency} sx={{ opacity: 0.48 }}>
              <Iconify icon={showCurrency ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </Stack>
        </div>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          <Image
            disabledEffect
            visibleByDefault
            src={`https://minimal-assets-api.vercel.app/assets/icons/ic_${
              cardType === 'mastercard' ? 'mastercard' : 'visa'
            }.svg`}
            sx={{ height: 24 }}
          />
          <Typography sx={{ typography: 'subtitle1', textAlign: 'right' }}>{cardNumber}</Typography>
        </Stack>

        <Stack direction="row" spacing={5}>
          <div>
            <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.48 }}>Card Holder</Typography>
            <Typography sx={{ typography: 'subtitle1' }}>{cardHolder}</Typography>
          </div>
          <div>
            <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.48 }}>Valid Dates</Typography>
            <Typography sx={{ typography: 'subtitle1' }}>{cardValid}</Typography>
          </div>
        </Stack>
      </CardItemStyle>
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ p: 1, mt: -1, width: 'auto' }}>
        <MenuItem onClick={handleClose} sx={{ py: 0.75, px: 1.5, borderRadius: 1 }}>
          <Iconify icon={'eva:edit-fill'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          <Typography variant="body2">Edit card</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 0.75, px: 1.5, borderRadius: 1, color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          <Typography variant="body2">Delete card</Typography>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
