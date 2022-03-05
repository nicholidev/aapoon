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
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Box,
  Typography,
  styled,
  Button,
} from '@mui/material';

// components
import Label from '../Label';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import { getInviteList } from '../../api/user';
const _appInvoices = [];

export default function RenewPlanPrompt(props) {
  const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2),
    background:
      'conic-gradient(from 180deg at 50% 50%, #F8FFF3 0deg, #FFF6F3 91.88deg, #F3F9FF 180deg, #FFE8FB 266.25deg, rgba(255, 233, 201, 0.23) 360deg)',
    borderRadius: '8px',
  }));

  return (
    <RootStyle>
      <Typography variant="h6" color="initial" gutterBottom>
        Renew your plan!
      </Typography>

      <Typography variant="body2" color="initial" fontSize={12}>
        Hello, your basic plan will be expiring soon. Renew your plan to continue from uninterrupted services. Thank
        you!
      </Typography>
      <br />
      <Box display="flex">
        <Button fullWidth>Ignore</Button>
        &nbsp;&nbsp;&nbsp;
        <Button fullWidth variant="contained">
          Renewal
        </Button>
      </Box>
    </RootStyle>
  );
}
