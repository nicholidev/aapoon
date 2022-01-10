/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import Link from 'next/link';
import {
    Box,
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------
import withAuth from '../../../HOC/withAuth';
import Iconify from '../../../components/Iconify';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import AppNewInvoice from '../../../sections/@dashboard/general/app/AppNewInvoice';
import InviteData from '../../../components/invite/InviteData';
import InviteModal from '../../../components/invite/InviteModal';
import { useState } from 'react';
import StopCircle from '@mui/icons-material/StopCircle';
import CustomersData from '../../../components/sales/CustomersData';

const Sidebar = styled('header')(({ theme }) => ({
  width: '240px',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Content = styled('div')(({ theme }) => ({
  width: 'calc(100% - 240px)',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  marginTop: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const SideSection = styled(Card)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  width: '100%',
  marginTop: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: 114,
  width: 259,
  maxWidth: '100%',
  paddingTop: 16,
  position: 'relative',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const InfoContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const DataSection = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  margin: theme.spacing(6),
  height: 600,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginRight: theme.spacing(4),
  },
}));

const DataHead = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}));

const InfoHeading = styled('span')(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(2),
}));

const InfoNumbers = styled('div')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60%',
}));

const infoIconStyle = {
  position: 'absolute',
  bottom: 12,
  right: 12,
};

function PageCustomers() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [current, setCurrent] = useState('dashboard');
  return (
    <Page title="Dashboard">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ display: 'flex' }}>
          <Sidebar>
            <SideSection>
              <List sx={{ width: '100%' }}>
                <ListItem disablePadding selected={true}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon={'ci:group'} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={<h4>Customers</h4>} />
                  </ListItemButton>
                </ListItem>
                <Link href="/dashboard/calendar" passHref={true}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Iconify icon={'uil:calender'} width={24} height={24} />
                      </ListItemIcon>
                      <ListItemText primary={<h4>Calendar</h4>} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </SideSection>
            {/* <SideSection /> */}
          </Sidebar>
          <Content>
            <InfoContainer container spacing={4}>
              <Grid xs={12} sm={6} md={3}>
                <InfoCard>
                  <InfoHeading>Total number of customers</InfoHeading>
                  <InfoNumbers>
                    <h3>2229</h3>
                  </InfoNumbers>
                  <PersonIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <InfoCard>
                  <InfoHeading>Active Subscriptions</InfoHeading>
                  <InfoNumbers>
                    <h3>2000</h3>
                  </InfoNumbers>
                  <Iconify icon={'bi:patch-check-fill'} width={22} height={22} style={infoIconStyle} />
                  {/* <CheckCircleIcon style={infoIconStyle} /> */}
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <InfoCard>
                  <InfoHeading>Recently Renewed</InfoHeading>
                  <InfoNumbers>
                    <h3>880</h3>
                  </InfoNumbers>
                  <Iconify
                    icon={'fluent:star-arrow-right-start-24-filled'}
                    width={24}
                    height={24}
                    style={infoIconStyle}
                  />
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} md={3}>
                <InfoCard>
                  <InfoHeading>Expired Subscriptions</InfoHeading>
                  <InfoNumbers>
                    <h3>220</h3>
                  </InfoNumbers>
                  <StopCircle style={infoIconStyle} />
                </InfoCard>
              </Grid>
            </InfoContainer>
          </Content>
        </Box>
        <DataSection>
          <DataHead>
            <h4 style={{ display: 'inline' }}>Customers List</h4>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setInviteOpen(true)}
              startIcon={<Iconify icon={'eva:person-add-outline'} width={20} height={20} />}
            >
              Add Customer
            </Button>
          </DataHead>

          <CustomersData />
        </DataSection>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let Customers = withAuth(PageCustomers);

Customers.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Customers;
