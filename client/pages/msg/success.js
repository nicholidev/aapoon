/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
import { MotionContainer, varBounce } from '../../components/animate';
// assets
import { OrderCompleteIllustration } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <MotionContainer sx={{ height: 1 }}>
      <Page title="Payment success" sx={{ height: 1 }}>
        <RootStyle>
          <Container>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <m.div variants={varBounce().in}>
                <center>
                  <img src={'/images/payment/success.png'} sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
                </center>
              </m.div>

              <m.div variants={varBounce().in}>
                <Typography variant="h3" paragraph sx={{ mt: 4 }}>
                  Your Payment is successful!
                </Typography>
              </m.div>
              <Typography sx={{ color: 'text.secondary', my: 3 }}>
                Thank you for Purchasing aapoon meet subscription plan.
              </Typography>

              <NextLink href="/dashboard/one">
                <Button size="large" variant="contained" sx={{ mt: 4, textTransform: 'uppercase' }}>
                  Go to Dashboard
                </Button>
              </NextLink>
            </Box>
          </Container>
        </RootStyle>
      </Page>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

Page404.getLayout = function getLayout(page) {
  return <LogoOnlyLayout>{page}</LogoOnlyLayout>;
};
