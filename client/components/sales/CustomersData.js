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
  ListItemButton,
  Typography,
  styled,
  ListItemIcon,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
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

export default function CustomersData(props) {
  const [customerData, setCustomerData] = useState([{}]);
  const { user } = useAuth();
  console.log('user', user);
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subscription Type</TableCell>
              <TableCell>No. Of Licenses</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.map((row) => (
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
                      <Typography variant="subtitle1" color="initial">
                        Henry Cavil
                      </Typography>
                      <Typography variant="subtitle2" color="GrayText">
                        Qwerty Inc
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </TableCell>
                <TableCell>{'henrqwerty@gmail.com'}</TableCell>
                <TableCell>{'113-503-8942'}</TableCell>
                <TableCell>{'Premium'}</TableCell>
                <TableCell>{'2'}</TableCell>
                <TableCell>{'May 26, 2019'}</TableCell>
                <TableCell>
                  <Label color="error">{'Expired'}</Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
