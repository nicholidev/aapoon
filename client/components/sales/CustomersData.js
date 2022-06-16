/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useEffect, useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Table,
  Card,
  ListItem,
  ListItemText,
  Typography,
  styled,
  ListItemIcon,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  IconButton,
  Popover,
  Stack,
  Button,
} from '@mui/material';
// utils
// _mock_
// import { _appInvoices } from '../../../../_mock';
// components
import Label from '../Label';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import { getInviteList } from '../../api/user';
const _appInvoices = [];

const AvtarContainer = styled(Card)(({ theme }) => ({
  width: 44,
  height: 44,
  padding: '2px',
  borderRadius: '44px',
  boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.25)',
}));

const CustomerPopover = ({ children, sx, ...other }) => {
  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          padding: 1.2,
          mt: 1,
          borderRadius: 0.5,
          overflow: 'inherit',
          boxShadow: (theme) => theme.customShadows.z20,
          border: (theme) => `solid 1px ${theme.palette.grey[500_48]}`,
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
};

export default function CustomersData(props) {
  const [customerData, setCustomerData] = useState([
    {
      name: 'Henry Cavil',
      organisationName: 'Qwerty Inc',
      email: 'henrqwerty@gmail.com',
      phone: '113-503-8942',
      subscriptionType: 'Premium',
      noOfLicense: '2',
      purchaseDate: 'May 26, 2019',
      tags: 'expired',
    },
    {
      name: 'Henry Cavil',
      organisationName: 'Qwerty Inc',
      email: 'Nikolas_Davis@yahoo.com',
      phone: '113-503-8942',
      subscriptionType: 'Premium',
      noOfLicense: '2',
      purchaseDate: 'May 26, 2019',
      tags: 'active',
    },
    {
      name: 'Henry Cavil',
      organisationName: 'Qwerty Inc',
      email: 'Nikolas_Davis@yahoo.com',
      phone: '113-503-8942',
      subscriptionType: 'Premium',
      noOfLicense: '2',
      purchaseDate: 'May 26, 2019',
      tags: 'expiring soon',
    },
  ]);
  const { user } = useAuth();

  const [customerPopoverOpen, setCustomerPopoverOpen] = useState({ open: false, anchorEl: null, popoverId: null });
  const anchorRef = useRef(null);
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 1280 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subscription Type</TableCell>
              <TableCell>No. Of Licenses</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>Tags</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.map((row, index) => (
              <TableRow key={row.token}>
                <TableCell>
                  <ListItem>
                    <ListItemIcon>
                      <AvtarContainer>
                        <Avatar
                          src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder-300x300.png"
                          alt="Rayan Moran"
                          sx={{ width: '100%', height: '100%' }}
                        />
                      </AvtarContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle1" color="text.primary">
                        {row.name}
                      </Typography>
                      <Typography variant="subtitle2" color="GrayText">
                        {row.organisationName}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {row.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {row.subscriptionType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {row.noOfLicense}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {moment(new Date(row.purchaseDate)).format('ll')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {row.tags == 'expired' && (
                    <Label variant="filled" color={'error'}>
                      {row.tags}
                    </Label>
                  )}
                  {row.tags == 'active' && (
                    <Label variant="filled" color={'success'}>
                      {row.tags}
                    </Label>
                  )}
                  {row.tags == 'expiring soon' && (
                    <Label variant="filled" color={'warning'}>
                      {row.tags}
                    </Label>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    ref={anchorRef}
                    onClick={(e) =>
                      setCustomerPopoverOpen({
                        open: true,
                        anchorEl: e.target,
                        popoverId: index,
                      })
                    }
                  >
                    <Iconify icon={'bi:three-dots-vertical'} />
                  </IconButton>
                  <CustomerPopover
                    open={customerPopoverOpen.open && customerPopoverOpen.popoverId == index}
                    anchorEl={customerPopoverOpen.anchorEl}
                    onClose={() => setCustomerPopoverOpen(false)}
                    id={'customerPopover' + index}
                    key={'customerPopover' + index}
                  >
                    <Stack>
                      <Button variant="text">
                        <Typography variant="subtitle2" color="text.primary">
                          Change Plan
                        </Typography>
                      </Button>
                      {/* <MenuItem> */}
                      <Button variant="text">
                        <Typography variant="subtitle2" color="text.primary">
                          Hide
                        </Typography>
                      </Button>
                      <Button variant="text">
                        <Iconify icon={'ri:delete-bin-line'} sx={{ color: 'error.main' }} width="16px" height="16px" />{' '}
                        &nbsp;&nbsp;
                        <Typography variant="subtitle2" color="text.primary" align="center">
                          Delete
                        </Typography>
                      </Button>
                    </Stack>
                  </CustomerPopover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
