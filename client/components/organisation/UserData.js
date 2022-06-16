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
  Card,
  styled,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
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
  borderRadius: '44px',
}));
export default function UserData(props) {
  const [userData, setUserData] = useState([]);
  const { user } = useAuth();

  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Assigned Date</TableCell>
              <TableCell>Removed Date</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.token}>
                <TableCell>
                  {' '}
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
                        Tom Cruise
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    Nikolas_Davis@yahoo.com
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {moment(new Date()).format('ll')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {moment(new Date()).format('ll')}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
