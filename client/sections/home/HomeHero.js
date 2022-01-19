/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { m } from 'framer-motion';
import { Link as RouterLink } from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Divider, Grid } from '@mui/material';
// routes

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer, varFade } from '../../components/animate';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [theme.breakpoints.up('lg')]: {
    marginTop: 120,
    paddingLeft: 80,
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  width: '100%',
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.up('down')]: {
    maxWidth: 480,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 620,
  },
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,

  height: '100%',

  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  width: '120%',
  objectFit: 'contain',
  height: 'auto',

  [theme.breakpoints.up('xl')]: {
    maxWidth: 880,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 880,
  },
  [theme.breakpoints.down('xl')]: {
    maxWidth: 680,
  },
  [theme.breakpoints.down('lg')]: {
    right: 0,
    maxWidth: 580,
  },
  [theme.breakpoints.down('md')]: {
    right: 0,
    maxWidth: 580,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { user } = useAuth();
  return (
    <RootStyle>
      <Grid container>
        <Grid item md={6} lg={5} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                  sx={{ width: 200 }}
                  startIcon={<Iconify icon={'feather:video'} width={20} height={20} />}
                >
                  Start a meeting
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, width: 200 }}
                  startIcon={<Iconify icon={'ph:browser'} width={20} height={20} />}
                >
                  Join Meeting
                </Button>
              </m.div>

              <Stack spacing={2.5}>
                <m.div variants={varFade().inRight}>
                  <Divider />
                </m.div>
                <m.div variants={varFade().inRight}>
                  {!user.id && (
                    <Typography
                      variant="title"
                      color="textSecondary"
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      Don’t have an account yet ?&nbsp;{' '}
                      <Button component={RouterLink} href="auth/Register">
                        Sign up
                      </Button>
                    </Typography>
                  )}
                </m.div>
              </Stack>
            </ContentStyle>
          </Container>
        </Grid>
        <Grid item md={6} lg={7} xs={12} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'flex-end' }}>
          <HeroImgStyle alt="hero" src="/images/home/hero1.png" variants={varFade().inUp} />
        </Grid>
      </Grid>
    </RootStyle>
    // <Box sx={{ height: { md: '80vh', lg: '80vh', xl: '85vh' } }} />
  );
}
