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
import useResponsive from '../hooks/useResponsive';
// routes
import DashboardHeader from '../layouts/dashboard/header/index';
import DashboardLayout from '../layouts/dashboard';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import Image from '../components/Image';
// sections
import AuthFirebaseSocials from '../sections/auth/AuthFirebaseSocial';
import FormUserMeeting from '../sections/meeting/FormUserMeeting';
import Divider from '@mui/material/Divider';
import withAuth from '../HOC/withAuth';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../components/animate';
import Iconify from '../components/Iconify';
import { useRouter } from 'next/router';
import FormHelpDesk from '../sections/helpDesk/FormHelpDesk';
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

    padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function HelpDesk() {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const router = useRouter();

    return (
        <Page title="Schedule Meeting">
            <GlobalStyles
                styles={{
                    body: { backgroundColor: '#F1F1F1' },
                }}
            />
            <RootStyle>
                <DashboardHeader />

                <Container sx={{ mt: { xs: 4, lg: 8, xl: 12 } }}>
                    <Paper>
                        <ContentStyle>
                            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                                <IconButtonAnimate onClick={() => router.back()}>
                                    <Iconify icon={'eva:arrow-back-fill'} />
                                </IconButtonAnimate>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h4" align="left" gutterBottom>
                                        Help Desk
                                    </Typography>
                                </Box>
                            </Box>

                            <FormHelpDesk />
                        </ContentStyle>
                    </Paper>
                </Container>
            </RootStyle>
        </Page>
    );
}


HelpDesk.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default HelpDesk;