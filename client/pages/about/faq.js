/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as React from 'react';

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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
const RootStyle = styled('div')(({ theme }) => ({}));

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
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Page title="aapoon meet faq">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />

      <RootStyle>
        <Container>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 4 }}>
                {/* <IconButtonAnimate onClick={() => router.back()}>
                    <Iconify icon={'eva:arrow-back-fill'} />
                  </IconButtonAnimate>
                  &nbsp;&nbsp;&nbsp;&nbsp; */}
                <Typography variant="h2" align="center" gutterBottom sx={{ fontSize: { xs: '18px', md: '24px' } }}>
                  FAQ
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Accordion elevation={2} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography variant="subtitle1">How meeting invitation link is sent?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>One can send a meeting invitation link as a scheduled or instant meeting.</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography variant="subtitle1">Can I purchase one Subscription?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>You can purchase a single subscription also.</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">How many subscriptions maximum I can purchase?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>A host can purchase up to 999 subscriptions.</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">How many minutes a free user can use?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      A free user can use 55 minutes of free conference or video calling and host up to 50
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">What is a corporate plan?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>A corporate plan is the saver package for large organizations.</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">What is a subscription?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      A subscription is a privilege level that determines access to platform features.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">Can I make unlimited calls as free user?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Any free user can make unlimited calls.</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">
                      Can I assign a subscription to another user by removing primary user authority?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      aapoon meet subscriptions aren’t named users, and hence admin can delete and assign new users
                      during the subscription period.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography variant="subtitle1">How to schedule a meeting and add to calendar?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      A user enters the meeting details such as date and time, meeting title, and description by
                      clicking the schedule meeting button in the calendar App, and an appointment is scheduled. A host
                      and invitees have a separate meeting URL to join.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
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
