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
import withAuth from './../HOC/withAuth';
import { useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { addSeconds } from 'date-fns';
import Iconify from './../components/Iconify';
// ----------------------------------------------------------------------
import useAuth from './../hooks/useAuth';
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

let Page404 = () => {
  const { query, push } = useRouter();
  const { user } = useAuth();
  const { data, update, error, loading } = useDocument(`licenses/${query.licenceId}`, {
    listen: false,
    parseDates: ['expiredAt', 'expiredAt'],
  });
  useEffect(() => {
    if (data?.expiredAt > new Date() && user.id) {
      update({ isAccepted: true, expiredAt: addSeconds(new Date(), 3) });
    }
  }, [data?.id]);

  useEffect(() => {
    if (!localStorage.getItem(`authToken`) && data?.id)
      push(
        `/auth/Register?email=${data.email}&lastName=${data.lastName}&firstName=${data.firstName}&return=${window.location.href}`
      );
  }, [user?.id, data?.id]);

  return (
    <MotionContainer sx={{ height: 1 }}>
      <Page title="Activating License" sx={{ height: 1 }}>
        <RootStyle>
          <Container>
            {!loading ? (
              <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                <m.div variants={varBounce().in}>
                  {data?.expiredAt < new Date() && (
                    <Iconify icon={'akar-icons:triangle-alert-fill'} style={{ fontSize: 180, color: '#FA3239' }} />
                  )}
                  {data?.isAccepted && data?.expiredAt > new Date() && (
                    <Iconify icon={'ep:success-filled'} style={{ fontSize: 240, color: '#16AD41' }} />
                  )}
                  {!data?.exists && <PageNotFoundIllustration sx={{ height: 260, my: { xs: 2, sm: 4 } }} />}
                </m.div>
                <m.div variants={varBounce().in}>
                  {!loading && (
                    <Typography variant="h3" paragraph>
                      {data?.exists && data?.expiredAt > new Date()
                        ? 'Activating License'
                        : data?.expiredAt < new Date()
                        ? 'Invitation Link Expired'
                        : 'Invalid Url'}
                    </Typography>
                  )}
                </m.div>
                <Typography sx={{ color: 'text.secondary', my: 4 }}>
                  {data?.isAccepted && data?.expiredAt > new Date()
                    ? 'Your license is activated'
                    : 'Sorry, we couldn’t activate this license since request has been expired.'}
                </Typography>
                <NextLink href="/">
                  <Button size="large" variant="contained">
                    Go To Home
                  </Button>
                </NextLink>
              </Box>
            ) : (
              <center></center>
            )}
          </Container>
        </RootStyle>
      </Page>
    </MotionContainer>
  );
};

// ----------------------------------------------------------------------
// Page404 = withAuth(Page404);

Page404.getLayout = function getLayout(page) {
  return <LogoOnlyLayout>{page}</LogoOnlyLayout>;
};
export default Page404;
