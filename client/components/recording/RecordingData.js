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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user/list';
const _appInvoices = [];
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
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    setUserList(deleteUser);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = userList;

  const isNotFound = !userList.length && Boolean(filterName);
  useEffect(() => {
    if (user.id)
      getInviteList(user.id)
        .then((res) => {
          console.log(res.data);
          setUserList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user.id, props.fetch]);
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
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px', px: '16px' }}>Meeting Name</TableCell>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px', px: '16px' }}>Date</TableCell>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px', px: '16px' }} align="center">
                  Duration
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F5F5F5', p: '12px', px: '16px' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, displayName, email, profilePic, status, avatarUrl, isVerified } = row;
                const isItemSelected = selected.indexOf(name) !== -1;

                return (
                  <TableRow key={row.token} sx={{ borderBottom: '1px solid #DBDBDB' }}>
                    <TableCell sx={{ p: '16px' }}>
                      {' '}
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                          {`Scrum call`}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ p: '16px' }}>
                      <Typography variant="subtitle2" color="text.primary">
                        {moment(new Date(row.createdAt._seconds * 1000)).format('ll')}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '16px' }} align="center">
                      <Typography variant="subtitle2" color="text.primary">
                        {'30:00 sec'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '16px' }} align="center">
                      <Typography variant="subtitle2" color="text.primary">
                        <Iconify icon={'carbon:play-filled-alt'} color="#E25630" sx={{ mx: 1 }} />
                        <Iconify icon={'bi:download'} color="#16BA08" sx={{ mx: 1 }} />
                        <Iconify icon={'bi:upload'} color="#3F97FF" sx={{ mx: 1 }} />
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
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Scrollbar>
    </>
  );
}
