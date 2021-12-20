/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useEffect, useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';
// utils
// _mock_
// import { _appInvoices } from '../../../../_mock';
// components
import Label from '../Label';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import useAuth from '../../hooks/useAuth';
import { getInviteList } from '../../api/user';
const _appInvoices = [];

export default function InviteData(props) {
  const [inviteData, setInviteData] = useState([]);
  const { user } = useAuth();
  console.log("user", user)
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
      <TableContainer sx={{ minWidth: 720 }}>
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
                <TableCell>{`${row.firstName + row.lastName}`}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{new Date(row.createdAt._seconds * 1000).toDateString()}</TableCell>
                <TableCell>
                  <Label>{row.status}</Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
