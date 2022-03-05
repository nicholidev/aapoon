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
    { optionName: 'Tracking attendance', freeUsers: false, premiumUsers: false, platinumUser: true },
  ]);

  return (
    <Scrollbar sx={{ width: '100%' }}>
      <TableContainer>
        <Table
          sx={{
            '& .MuiTableCell-head': {
              bgcolor: '#E9EEF3',
              color: 'secondary.darker',
            },
          }}
        >
          <TableHead>
            <TableRow key={'tableheader'}>
              <TableCell align="center">
                <Typography variant="subtitle1" color="inherit" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  Benefits
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ borderLeft: '1px solid #D3DCE6' }}>
                <Typography variant="subtitle1" color="inherit" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  Free users
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ borderLeft: '1px solid #D3DCE6' }}>
                {' '}
                <Typography variant="subtitle1" color="inherit" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  Premium users
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ borderLeft: '1px solid #D3DCE6' }}>
                {' '}
                <Typography variant="subtitle1" color="inherit" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  Platinum users
                </Typography>
              </TableCell>
              {/* <TableCell /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {planData.map((row) => (
              <TableRow key={row.optionName}>
                <TableCell
                  style={{ border: '1px solid #D3DCE6' }}
                  sx={{ fontSize: { xs: '12px', md: '16px' } }}
                >{`${row.optionName}`}</TableCell>
                <TableCell align="center" style={{ border: '1px solid #D3DCE6' }}>
                  {row.freeUsers ? (
                    <Iconify
                      icon={'emojione-v1:left-check-mark'}
                      sx={{ width: { xs: '15px', md: '30px' }, height: { xs: '15px', md: '30px' } }}
                    />
                  ) : (
                    <Iconify
                      icon={'emojione-monotone:cross-mark'}
                      sx={{ width: { xs: '12px', md: '25px' }, height: { xs: '12px', md: '25px' } }}
                    />
                  )}
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #D3DCE6' }}>
                  {row.premiumUsers ? (
                    <Iconify
                      icon={'emojione-v1:left-check-mark'}
                      sx={{ width: { xs: '15px', md: '30px' }, height: { xs: '15px', md: '30px' } }}
                    />
                  ) : (
                    <Iconify
                      icon={'emojione-monotone:cross-mark'}
                      sx={{ width: { xs: '12px', md: '25px' }, height: { xs: '12px', md: '25px' } }}
                    />
                  )}
                </TableCell>
                <TableCell align="center" style={{ border: '1px solid #D3DCE6' }}>
                  {row.platinumUser ? (
                    <Iconify
                      icon={'emojione-v1:left-check-mark'}
                      sx={{ width: { xs: '15px', md: '30px' }, height: { xs: '15px', md: '30px' } }}
                    />
                  ) : (
                    <Iconify
                      icon={'emojione-monotone:cross-mark'}
                      sx={{ width: { xs: '12px', md: '25px' }, height: { xs: '12px', md: '25px' } }}
                    />
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
