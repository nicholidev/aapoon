import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, alpha, Container, Stack, OutlinedInput, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(https://minimal-assets-api.vercel.app/assets/images/faqs/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  color: theme.palette.common.white,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    backgroundColor: alpha(theme.palette.common.white, 0.04),
    [theme.breakpoints.up('md')]: {
      width: 480,
    },
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <Container sx={{ position: 'relative', height: '100%' }}>
          <ContentStyle spacing={5}>
            <div>
              <TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
              <br />
              <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
                <TextAnimate text="can" sx={{ mr: 2 }} />
                <TextAnimate text="we" sx={{ mr: 2 }} />
                <TextAnimate text="help" sx={{ mr: 2 }} />
                <TextAnimate text="you?" />
              </Box>
            </div>

            <m.div variants={varFade().inUp}>
              <SearchStyle
                placeholder="Search support"
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                }
              />
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
