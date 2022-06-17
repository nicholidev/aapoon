/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
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
  TablePagination,
} from '@mui/material';
// utils
// _mock_
// import { _appInvoices } from '../../../../_mock';
// components
import Label from '../Label';
import { useEffect, useRef, useState } from 'react';
import Scrollbar from '../Scrollbar';
import useAuth from '../../hooks/useAuth';
import { useCollection } from '@nandorojo/swr-firestore';
import moment from 'moment';

import MenuButton from './IconButton';

const AvtarContainer = styled(Card)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: '44px',
}));
export default function InviteData(props) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useAuth();
  const {
    data: userList,
    update,
    error,
  } = useCollection(`licenses`, {
    where: [
      ['owner', '==', user.id],
      ['isActivated', '==', true],
    ],
    listen: true,
    parseDates: ['assignedAt', 'expiredAt'],
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - userList?.length);

  const filteredUsers = userList;

  const isNotFound = !userList?.length && Boolean(filterName);

  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800, borderRadius: '8px', border: '1px solid #DBDBDB' }}>
        <Table
          sx={{ border: '1px solid #DBDBDB', borderRadius: '8px' }}
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>User Name</TableCell>
              <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Email Id</TableCell>
              <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Assigned Date</TableCell>
              <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Team</TableCell>
              <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }} align="center">
                Status
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
              const { id, displayName, email, profilePic, status, avatarUrl, isVerified } = row;
              const isItemSelected = selected.indexOf(name) !== -1;
              return (
                <TableRow key={`license_${key}`}>
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
                    <Label variant="status" color={row.isAccepted ? 'success' : 'warning'}>
                      {row.isAccepted ? 'Active' : 'pending'}
                    </Label>
                  </TableCell>
                  <TableCell align="right" style={{ position: 'relative' }}>
                    <MenuButton data={row} />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ borderTop: 'none' }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userList?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, page) => setPage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Scrollbar>
  );
}
