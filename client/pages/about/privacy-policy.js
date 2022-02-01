/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import RouterLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip, Paper } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import DashboardHeader from '../../layouts/dashboard/header/index';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';
import DashboardLayout from '../../layouts/main';
import Divider from '@mui/material/Divider';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: '20px',
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 650,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
  justifyContent: 'center',
  margin: theme.spacing(0, 0, 0, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  marginTop: '80px',
  marginBottom: '40px',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  marginTop: '80px',
  marginBottom: '40px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
    marginBottom: '20px',
  },
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function PrivacyPolicy() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  return (
    <Page title="aapoon meet privacy policy">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />

      <RootStyle>
        {/* <DashboardHeader /> */}

        <Container sx={{ mt: { xs: 2 } }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5 }}>
                {/* <IconButtonAnimate onClick={() => router.back()}>
                   <Iconify icon={'eva:arrow-back-fill'} />
                 </IconButtonAnimate>
                 &nbsp;&nbsp;&nbsp;&nbsp; */}
                <Typography variant="h2" align="center" gutterBottom sx={{ fontSize: { xs: '18px', md: '24px' } }}>
                  aapoon meet privacy policy
                </Typography>
                <br />
                <br />
                <Typography variant="subtitle1" gutterBottom style={{ fontStyle: 'italic' }}>
                  EFFECTIVE: January 01, 2022
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography align="left" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                  This Privacy Policy describes what aapoon meet gathers from and about you as a User of its services
                  and platforms, how aapoon meet uses it, and the controls you have over the disclosure of your
                  information to other users. As a condition of becoming a User, or using aapoon meet’s services or
                  platforms in any way, you consent to the handling practices described in this Policy and to this
                  Policy. To a certain extent, the privacy of what you provide aapoon meet may be regulated by you
                  adjusting your profile.
                  <br />
                  <br />
                  When you use aapoon meet services, platform cookies – small text files containing a string of
                  alphanumeric characters – will be transmitted to your device, either session cookies, persistent
                  cookies, or both. Flash and other browser plug-in applications may also be transmitted.
                  <br />
                  <br />
                  aapoon meet collects the first and last name, Email, mobile phone number.
                  <br />
                  <br />
                  aapoon meet will use what you provide and what it collects, automatically or otherwise, to operate,
                  maintain, enhance, and provide its features, services, and platforms. aapoon meet uses all or some of
                  what you provide or that aapoon meet collects to understand and analyze the usage trends and
                  preferences of our Users, to improve the way the Services work and look, and to create new features
                  and functionality. While aapoon meet is not in the business of selling the personal information you
                  provide, the company will access your personally identifiable information in connection with
                  developing, maintaining, and operating its services and platforms. However, aapoon meet will not share
                  or sell any information that may identify you personally with any third parties, and your personal
                  information will never leave aapoon meet’s platforms as a result of any action taken by aapoon meet.
                  Besides, aapoon meet will not eavesdrop on your conversations, record them, or transcribe them to text
                  at any time.
                  <br />
                  <br />
                  aapoon meet may also disclose your information if required to do so by law or in the good-faith belief
                  that such action is necessary or useful to comply with applicable laws, to respond to a court order,
                  judicial or other government subpoena or warrant, or to otherwise assist or cooperate with law
                  enforcement activity or other similar activities in connection with internal or coordinated fraud
                  detection and prevention, and the protection or enforcement of third-party rights. aapoon meet will
                  also disclose what you provide it as it deems appropriate or necessary to avoid liability, to protect
                  itself or others from fraudulent, abusive, predatory, or unlawful uses or activity, to investigate and
                  defend itself against any claims or allegations; to protect the security or integrity of its services
                  or platforms, or to protect or vindicate the rights, property, or personal safety of aapoon meet, its
                  Users, or others.
                  <br />
                  <br />
                  aapoon meet may retain what you submit for various purposes, including backups and archiving,
                  prevention of fraud and abuse, and analytics. aapoon meet shall not be responsible for the content,
                  privacy, or security practices and policies of third-party sites or services despite third-party links
                  being displayed in its services or platforms.
                  <br />
                  <br />
                  aapoon meet does not ensure or warrant the security of anything you transmit to aapoon meet, nor does
                  aapoon meet guarantee that what you provide will not be accessed, disclosed, altered, or destroyed as
                  a result of any breach of any physical, technical, or managerial safeguards, or any absence or
                  malfunction thereof. What you transfer to aapoon meet is at your own risk. However, should aapoon meet
                  become aware of any such problem affecting or potentially affecting what you provide, aapoon meet will
                  attempt to notify you electronically so that you may take appropriate protective steps.
                  <br />
                  <br />
                  The services and platforms are intended for users located across the world. Your information may be
                  stored and processed in any country in which aapoon meet or its Users maintain facilities. For
                  purposes of sharing or disclosing data under this Privacy Policy, aapoon meet may transfer, store, and
                  process your information outside of your country.
                  <br />
                  <br />
                  Apart from the terms of user data access and usage indicated above, aapoon meet provides you the user
                  with the ability to control access or display of your personal information. You have the choice to
                  display to other users or make private certain types of personal data listed under your account or
                  profile. aapoon meet does not have access to the controls under your account, and the display of your
                  information is solely at your discretion. aapoon meet makes no guarantee that when you display your
                  personal information, the data may be read or accessed by other users and used to their benefit.
                  <br />
                  <br />
                  aapoon meet does not systemically track your location on an ongoing basis or store this information
                  for future use. However, when you use certain features of aapoon meet’s Services, certain information
                  about your precise or approximate location as determined through data such as your IP address or
                  mobile device’s GPS may be collected to offer you an improved user experience. In addition, parts of
                  our services may use maps services from 3rd parties such as Google Maps, Apple Maps, and Waze. The use
                  of each service is subject to the respective service’s terms of use (including Google Maps Additional
                  Terms of Use) and their respective privacy policies. We recommend you read the terms of the respective
                  service of use and privacy policies before using them.
                  <br />
                  <br />
                  aapoon meet may make changes to this Privacy Policy at its sole discretion. Each change will become
                  effective on a going-forward basis only and as noted as a part of the change itself. You will be bound
                  by each change unless you terminate your Usership and cease using all services and platforms before
                  the change becomes effective. Your continued use after the change becomes effective constitutes your
                  consent to it.
                  <br />
                  <br />
                  You may notify aapoon meet of any issues by sending an Email to &nbsp;
                  <a href="mailto:support@meetapp.in">support@meetapp.in</a>
                </Typography>
              </Box>
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

PrivacyPolicy.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default PrivacyPolicy;
