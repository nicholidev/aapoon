/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { m } from 'framer-motion';
import { Link as RouterLink } from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Stack, Divider, Grid } from '@mui/material';
// routes
import InstantMeetingPopup from '../../sections/meeting/InstantMeetingPopup';
// components
import Iconify from '../../components/Iconify';
import { varFade } from '../../components/animate';
import useAuth from '../../hooks/useAuth';
import {Fragment, useState} from "react";
// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [theme.breakpoints.up('lg')]: {
    marginTop: 120,
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  width: '100%',
  margin: 'auto',
  textAlign: 'left',
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

const Particular1 = styled('div')({
  width: '1344px',
  height: '1344px',
  position: 'absolute',
  backgroundColor: '#FF27D0',
  opacity: 0.03,
  left: -788,
  top: -753,
  borderRadius: 1344
})
const Particular2 = styled('div')({
  width: '1344px',
  height: '1344px',
  position: 'absolute',
  backgroundColor: '#FF6610',
  opacity: 0.03,
  left: 714,
  top: -97,
  borderRadius: 1344
})

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,

  height: '100%',

  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  objectFit: 'contain',
  height: 'auto',
  width: '100%'
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { user } = useAuth();
  const { push } = useRouter();
  const [popOpen, setPopOpen] = useState(false);
  return (
    <RootStyle>
      <Container sx={{ position: 'relative' }}>
        <Particular1/>
        <Particular2/>
        <Grid container>
          <Grid item md={6} lg={5} xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                    onClick={() => (user.id ? push('/dashboard/calendar') : push('/auth/Login'))}
                    startIcon={<Iconify icon={'feather:video'} width={20} height={20} />}
                  >
                    Start a meeting
                  </Button>

                  {!user?.id ? (
                    <Button
                      size="large"
                      variant="outlined"
                      onClick={() => push('/auth/Login')}
                      sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, width: 200 }}
                      startIcon={<Iconify icon={'ph:browser'} width={20} height={20} />}
                    >
                      Instant meeting
                    </Button>
                  ) : (
                    <Fragment>
                      <InstantMeetingPopup
                        open={popOpen}
                        setOpen={setPopOpen}
                      >
                        <Button
                          size="large"
                          variant="outlined"
                          startIcon={<Iconify icon={'ph:browser'} width={20} height={20} />}
                          onClick={()=>{setPopOpen(true)}}
                          sx={{
                            ml: { xs: 0, sm: 2 },
                            mt: { xs: 2, sm: 0 },
                            width: 200
                          }}
                        >
                          Instant meeting
                        </Button>
                      </InstantMeetingPopup>
                    </Fragment>
                  )}
                </m.div>

                <Stack >
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
      </Container>
      
    </RootStyle>
    // <Box sx={{ height: { md: '80vh', lg: '80vh', xl: '85vh' } }} />
  );
}
