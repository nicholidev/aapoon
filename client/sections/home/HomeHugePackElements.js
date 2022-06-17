/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
// routes

import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(16, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 16 },
          }}
        >
          <MotionInView variants={varFade().inDown}>
            <Typography variant="h3">What aapoon meet has for you ?</Typography>
          </MotionInView>
        </Box>
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Meet Safely
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  aapoon meet provides authenticated and encrypted data privacy to the users. aapoon meet video
                  conferences are encrypted in transit and safety measures are continuously updated for data security
                  and privacy.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} dir="ltr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <MotionInView variants={varFade().inRight}>
                <Image src={`/images/home/feature1.png`} sx={{ width: '100%' }} />
              </MotionInView>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={5} flexDirection={'row-reverse'} justifyContent="space-between" sx={{ mt: 8 }}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Meet from any device
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  Invited guests on aapoon meet can join an online conference from any computer or any mobile device,
                  using any web browser-no software required to install and with an option to download meet app. aapoon
                  meet is a user-friendly application.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} dir="rtr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <MotionInView variants={varFade().inRight}>
                <Image alt="" src={`/images/home/feature2.png`} sx={{ width: '100%' }} />
              </MotionInView>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={6} justifyContent="space-between" sx={{ mt: 8 }}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Stay connected
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  Easy scheduling, video recording & saving, and an option to choose background, helps to stay connected
                  with aapoon meet. Connections are made easy by aapoon meet for the benefit of the users. aapoon meet
                  is a user-friendly application. Stay connected and stay safe!
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} dir="ltr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <MotionInView variants={varFade().inRight}>
                <Image src={`/images/home/feature3.png`} sx={{ width: '100%' }} />
              </MotionInView>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={5} flexDirection={'row-reverse'} justifyContent="space-between" sx={{ mt: 8 }}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  Host meetings of your choice
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? 'text.secondary' : 'common.white',
                  }}
                >
                  aapoon meet is a unique product, specially designed to meet the users need of meeting experience. Host
                  can choose any number of license. As an admin, he can give access to anyone of his choice and use its
                  privileges. aapoon meet has free, premium and platinum options for the users to choose their choice of
                  group meetings.
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} dir="rtr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <MotionInView variants={varFade().inRight}>
                <Image src={`/images/home/feature4.png`} sx={{ width: '100%' }} />
              </MotionInView>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
