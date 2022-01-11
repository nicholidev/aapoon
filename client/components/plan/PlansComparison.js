/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useEffect, useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';

import { Table, TableRow, TableBody, TableCell, TableHead, TableContainer, Typography, styled } from '@mui/material';
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

export default function PlansComparison(props) {
  const [planData, setplanData] = useState([
    { optionName: 'Unlimited Meetings', freeUsers: true, premiumUsers: true, platinumUser: true },
    { optionName: 'Host up to 100 participants', freeUsers: false, premiumUsers: true, platinumUser: true },
    { optionName: '2 GB Cloud recording', freeUsers: false, premiumUsers: true, platinumUser: true },
    { optionName: 'Organization branding', freeUsers: false, premiumUsers: false, platinumUser: true },
    { optionName: 'Background Dias', freeUsers: false, premiumUsers: false, platinumUser: true },
    { optionName: 'Tracking attendance', freeUsers: false, premiumUsers: true, platinumUser: true },
  ]);

  return (
    <Scrollbar sx={{ width: '100%' }}>
      <TableContainer>
        <Table
          sx={{
            '& .MuiTableCell-head': {
              bgcolor: 'secondary.darker',
              color: 'text.secondary',
            },
          }}
        >
          <TableHead>
            <TableRow key={'tableheader'}>
              <TableCell />
              <TableCell style={{ borderLeft: '1px solid #000' }}>
                <Typography variant="subtitle1" color="common.white">
                  Free users
                </Typography>
              </TableCell>
              <TableCell style={{ borderLeft: '1px solid #000' }}>
                {' '}
                <Typography variant="subtitle1" color="common.white">
                  Premium users
                </Typography>
              </TableCell>
              <TableCell style={{ borderLeft: '1px solid #000' }}>
                {' '}
                <Typography variant="subtitle1" color="common.white">
                  Platinum users
                </Typography>
              </TableCell>
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {planData.map((row) => (
              <TableRow key={row.optionName}>
                <TableCell style={{ border: '1px solid #000' }}>{`${row.optionName}`}</TableCell>
                <TableCell align="center" style={{ border: '1px solid #000' }}>
                  {row.freeUsers ? (
                    <Iconify icon={'emojione-v1:left-check-mark'} width="30px" height="30px" />
                  ) : (
                    <Iconify icon={'emojione-monotone:cross-mark'} width="25px" height="25px" />
                  )}
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #000' }}>
                  {row.premiumUsers ? (
                    <Iconify icon={'emojione-v1:left-check-mark'} width="30px" height="30px" />
                  ) : (
                    <Iconify icon={'emojione-monotone:cross-mark'} width="25px" height="25px" />
                  )}
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #000' }}>
                  {row.platinumUser ? (
                    <Iconify icon={'emojione-v1:left-check-mark'} width="30px" height="30px" />
                  ) : (
                    <Iconify icon={'emojione-monotone:cross-mark'} width="25px" height="25px" />
                  )}
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
