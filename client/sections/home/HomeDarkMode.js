// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(16, 0),
  backgroundColor: theme.palette.grey[900],
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  return (
    <RootStyle>
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography variant="h3" align="center" sx={{ mb: 3, color: 'common.white' }}>
                  One meet account at a click away for all your professional & personal
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Image alt="light mode" src="/images/home/option11.png" />
              </MotionInView>
              <MotionInView variants={varFade().inUp} sx={{ mt: 1, mb: '4px', marginLeft: '-5px' }}>
                <Image alt="light mode" src="/images/home/option2.png" />
              </MotionInView>
              <MotionInView variants={varFade().inUp}>
                <Image alt="light mode" src="/images/home/option3.png" />
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
            <MotionInView threshold={0.5} variants={varFade().inUp}>
              <Image alt="light mode" src="/images/home/hero2.png" />
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
