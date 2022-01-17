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
export default function InviteData(props) {
  const [inviteData, setInviteData] = useState([]);
  const { user } = useAuth();
  console.log('user', user);
  useEffect(() => {
    if (user.id)
      getInviteList(user.id)
        .then((res) => {
          console.log(res.data);
          setInviteData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user.id, props.fetch]);
  return (
    <Scrollbar>
      <TableContainer sx={{ maxWidth: '88vw' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invitee Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Invited Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {inviteData.map((row) => (
              <TableRow key={row.token}>
                <TableCell>
                  {' '}
                  <ListItem>
                    <ListItemIcon>
                      <AvtarContainer>
                        <Avatar src={row.profilePic} alt={row.displayName} sx={{ width: '100%', height: '100%' }} />
                      </AvtarContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle1" color="text.primary">
                        {`${row.firstName + row.lastName}`}
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
                    {moment(new Date(row.createdAt._seconds * 1000)).format('ll')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {row.status}
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
