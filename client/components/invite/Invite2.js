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
  Checkbox,
  styled,
  Box,
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

import Scrollbar from '../Scrollbar';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import { useCollection } from '@nandorojo/swr-firestore';

const AvtarContainer = styled(Card)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: '44px',
}));
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function InviteData(props) {
  const theme = useTheme();
  const [inviteData, setInviteData] = useState([]);
  const { user } = useAuth();
  //const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    data: userList,
    update,
    error,
  } = useCollection(`invites`, {
    where: ['invitedBy', '==', user.id],

    listen: true,
    parseDates: ['createdAt'],
  });
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = userList.filter((user) => user.id !== userId);
    setSelected([]);
    // setUserList(deleteUser);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - userList?.length);

  const filteredUsers = userList;

  const isNotFound = !userList?.length && Boolean(filterName);

  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, borderRadius: '8px', border: '1px solid #DBDBDB' }}>
          <Table
            sx={{ border: '1px solid #DBDBDB', borderRadius: '8px' }}
            style={{ borderRadius: '8px', overflow: 'hidden' }}
          >
            <TableHead style={{ width: '100%', backgroundColor: '#F5f5f5' }}>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Invitee Name</TableCell>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Email Id</TableCell>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Invited Date</TableCell>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px' }}>Status</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, displayName, email, profilePic, status, avatarUrl, isVerified } = row;
                const isItemSelected = selected.indexOf(name) !== -1;

                return (
                  <TableRow key={row.token} sx={{ borderBottom: '1px solid #DBDBDB' }}>
                    <TableCell sx={{ p: '8px' }}>
                      {' '}
                      <Box display="flex" alignItems="center">
                        <AvtarContainer>
                          <Avatar src={row.profilePic} alt={row.displayName} sx={{ width: '40px', height: '40px' }} />
                        </AvtarContainer>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ textTransform: 'capitalize', ml: 2, fontWeight: 600 }}
                        >
                          {`${row.firstName + ' ' + row.lastName}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: '8px' }}>
                      <Typography variant="subtitle2" color="text.primary">
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '8px' }}>
                      <Typography variant="subtitle2" color="text.primary">
                        {moment(new Date(row.createdAt)).format('ll')}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '8px' }}>
                      <Typography variant="subtitle2" color="text.primary">
                        {row.status}
                      </Typography>
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
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
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
    </>
  );
}
