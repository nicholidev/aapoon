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
} from '@mui/material';
// utils
// _mock_
// import { _appInvoices } from '../../../../_mock';
// components
import Label from '../Label';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { getInviteList } from '../../api/user';
const _appInvoices = []

export default function InviteData() {
    const [inviteData, setInviteData] = useState([])
    
    useEffect(()=>{
        getInviteList()
        .then(res=>{
            setInviteData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <Scrollbar>
            <TableContainer sx={{ minWidth: 720 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invitee Name</TableCell>
                            <TableCell>Email Id</TableCell>
                            <TableCell>Invited  Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_appInvoices.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{`INV-${row.id}`}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>
                                    <Label
                                        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                        color={
                                            (row.status === 'in_progress' && 'warning') ||
                                            (row.status === 'out_of_date' && 'error') ||
                                            'success'
                                        }
                                    >
                                        {sentenceCase(row.status)}
                                    </Label>
                                </TableCell>
                                <TableCell align="right">
                                    <MoreMenuButton />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Scrollbar>
    )
}