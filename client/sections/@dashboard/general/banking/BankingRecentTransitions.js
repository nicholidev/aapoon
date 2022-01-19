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
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// _mock
import { _bankingRecentTransitions } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function BankingRecentTransitions() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  return (
    <>
      <Card>
        <CardHeader title="Recent Transitions" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {_bankingRecentTransitions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative' }}>
                          {renderAvatar(row.category, row.avatar)}
                          <Box
                            sx={{
                              right: 0,
                              bottom: 0,
                              width: 18,
                              height: 18,
                              display: 'flex',
                              borderRadius: '50%',
                              position: 'absolute',
                              alignItems: 'center',
                              color: 'common.white',
                              bgcolor: 'error.main',
                              justifyContent: 'center',
                              ...(row.type === 'Income' && {
                                bgcolor: 'success.main',
                              }),
                            }}
                          >
                            <Iconify
                              icon={
                                row.type === 'Income'
                                  ? 'eva:diagonal-arrow-left-down-fill'
                                  : 'eva:diagonal-arrow-right-up-fill'
                              }
                              width={16}
                              height={16}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.message}
                          </Typography>
                          <Typography variant="subtitle2"> {row.category}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {format(new Date(row.date), 'p')}
                      </Typography>
                    </TableCell>

                    <TableCell>{fCurrency(row.amount)}</TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'completed' && 'success') ||
                          (row.status === 'in_progress' && 'warning') ||
                          'error'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>

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

AvatarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

function AvatarIcon({ icon }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category, avatar) {
  if (category === 'Books') {
    return <AvatarIcon icon={'eva:book-fill'} />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon={'eva:heart-fill'} />;
  }
  return avatar ? (
    <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  ) : null;
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
