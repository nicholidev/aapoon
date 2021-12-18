/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { Button, Card, Container, styled, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../../components/Iconify';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Sidebar = styled('header')(({ theme }) => ({
  width: "240px",
  height: "100%",
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingLeft: theme.spacing(4)
}))

const Content = styled('div')(({ theme }) => ({
  width: "calc(100vw - 240px)",
  height: "100%",
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingLeft: theme.spacing(4)
}))

const SideSection = styled(Card)(({ theme }) => ({
  height: 204,
  width: 210,
  width: "100%",
  marginTop: theme.spacing(4)
}))

const InfoCard = styled(Card)(({ theme }) => ({
  height: 114,
  width: 259
}))

const InfoContainer = styled('div')(({ theme }) => ({
  display: "flex",
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  justifyContent: "space-between"
}))

const DataSection = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  margin: theme.spacing(6),
  height: 600
}))

const DataHead = styled('div')(({ theme }) => ({
  display:"flex",
  width:"100%",
  padding: theme.spacing(3),
  justifyContent: "space-between"
}))

function PageOne() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dashboard">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: "flex" }}>
        <Sidebar>
          <SideSection />
          <SideSection />
        </Sidebar>
        <Content>
          <InfoContainer>
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </InfoContainer>
          <DataSection>
            <DataHead>
              <h4 style={{ display: "inline" }}>Recent Invites</h4>
              <Button 
              variant="contained"
               color="primary"
               startIcon={<Iconify icon={'eva:person-add-outline'} width={20} height={20} />}
               > Invite User</Button>
            </DataHead>
          </DataSection>
        </Content>
      </Container>
    </Page >
  );
}

// ----------------------------------------------------------------------
let NewAuth = withAuth(PageOne);

NewAuth.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewAuth;
