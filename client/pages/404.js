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
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets';

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
      <Page title="404 Page Not Found" sx={{ height: 1 }}>
        <RootStyle>
          <Container>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <m.div variants={varBounce().in}>
                <Typography variant="h3" paragraph>
                  Sorry, page not found!
                </Typography>
              </m.div>
              <Typography sx={{ color: 'text.secondary' }}>
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
                your spelling.
              </Typography>

              <m.div variants={varBounce().in}>
                <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
              </m.div>

              <NextLink href="/">
                <Button size="large" variant="contained">
                  Go to Home
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
