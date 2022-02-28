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
import { useCollection } from '@nandorojo/swr-firestore';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import IconButton from '@mui/material/IconButton';
import MenuButton from './IconButton';
import 'firebase/compat/firestore';
import Menu from '../MenuPopover';
import { getInviteList } from '../../api/user';
const _appInvoices = [];
const AvtarContainer = styled(Card)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: '44px',
}));
export default function InviteData(props) {
  const { user } = useAuth();

  const { data, update, error } = useCollection(`licenses`, {
    where: [
      ['owner', '==', user.id],
      ['isActivated', '==', true],
    ],
    listen: true,
    parseDates: ['assignedAt', 'expiredAt'],
  });

  return (
    <Scrollbar>
      <TableContainer sx={{ maxWidth: '88vw' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email Id</TableCell>
              <TableCell>Assigned Date</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
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
                        {`${row.firstName + ' ' + row.lastName}`}
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
                    {moment(row.assignedAt).format('ll')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="text.primary">
                    {row.team}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Label color={row.isAccepted ? 'success' : 'warning'}>{row.isAccepted ? 'Active' : 'pending'}</Label>
                </TableCell>
                <TableCell align="right" style={{ position: 'relative' }}>
                  <MenuButton data={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
