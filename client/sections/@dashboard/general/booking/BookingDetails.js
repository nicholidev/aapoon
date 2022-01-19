/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Menu,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// _mock_
import { _bookings } from '../../../../_mock';
//
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function BookingDetails() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  return (
    <>
      <Card>
        <CardHeader title="Booking Details" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>Booker</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Check In</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Check Out</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Phone</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Room Type</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {_bookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={row.name} src={row.avatar} />
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>{format(new Date(row.checkIn), 'dd MMM yyyy')}</TableCell>
                    <TableCell>{format(new Date(row.checkOut), 'dd MMM yyyy')}</TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>

                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{row.roomType}</TableCell>

                    <TableCell align="right">
                      <MoreMenuButton
                        onDownload={handleClickDownload}
                        onPrint={handleClickPrint}
                        onShare={handleClickShare}
                        onDelete={handleClickDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
  onPrint: PropTypes.func,
  onShare: PropTypes.func,
};

function MoreMenuButton({ onDownload, onPrint, onShare, onDelete }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={menuRef} size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { px: 1, width: 200, maxWidth: 1 },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onDownload} sx={{ borderRadius: 1 }}>
          <Iconify icon={'eva:download-fill'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem onClick={onPrint} sx={{ borderRadius: 1 }}>
          <Iconify icon={'eva:printer-fill'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem onClick={onShare} sx={{ borderRadius: 1 }}>
          <Iconify icon={'eva:share-fill'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onDelete} sx={{ color: 'error.main', borderRadius: 1 }}>
          <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
