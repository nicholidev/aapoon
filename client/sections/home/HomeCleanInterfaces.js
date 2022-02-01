/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Container, Typography, useTheme, Grid } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const IMG = [...Array(10)].map(
  (_, index) => `https://minimal-assets-api.vercel.app/assets/images/home/clean-${index + 1}.png`
);

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  backgroundColor: '#FBFBFB',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    zIndex: 11,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h3" sx={{ mb: 0, color: 'GrayText' }}>
                  Trusted by
                </Typography>
              </MotionInView>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  Great Brands
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={8} dir="rtr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <Image src={'/images/home/brand.png'} sx={{ borderRadius: 4 }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
