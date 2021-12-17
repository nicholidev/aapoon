import { m } from 'framer-motion';
import { Link as RouterLink } from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Divider } from '@mui/material';
// routes

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 380,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',

    textAlign: 'left',
  },
  [theme.breakpoints.up('lg')]: {
    margin: 'unset',
    maxWidth: 520,
    textAlign: 'left',
  },
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '150%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('xl')]: {
    right: 0,
    width: 'auto',
    height: '80vh',
    maxHeight: 680,
  },
  [theme.breakpoints.down('xl')]: {
    right: 0,
    width: 'auto',
    height: '55vh',
  },
  [theme.breakpoints.down('lg')]: {
    right: 0,
    width: 'auto',
    height: '45vh',
  },
  [theme.breakpoints.down('md')]: {
    right: 0,
    width: 'auto',
    display: 'none',
    height: '45vh',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <HeroImgStyle alt="hero" src="/images/home/hero1.png" variants={varFade().inUp} />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ fontWeight: '900' }}>
                aapoon meet for everything
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography variant="title">
                Want to connect with your team or a friend, why pay? When you can use free encrypted video calls and
                conferencing with aapoon meet.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Button
                size="large"
                variant="contained"
                startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
              >
                Start a meeting
              </Button>

              <Button
                size="large"
                variant="outlined"
                sx={{ ml: 2 }}
                startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
              >
                Join Meeting
              </Button>
            </m.div>

            <Stack spacing={2.5}>
              <m.div variants={varFade().inRight}>
                <Divider />
              </m.div>
              <m.div variants={varFade().inRight}>
                <Typography variant="title" color="textSecondary" sx={{ display: 'flex' }}>
                  Don’t have an account yet ?&nbsp;{' '}
                  <Typography color="primary" sx={{ fontWeight: '500' }}>
                    Sign up
                  </Typography>
                </Typography>
              </m.div>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '80vh', lg: '80vh', xl: '85vh' } }} />
    </MotionContainer>
  );
}
