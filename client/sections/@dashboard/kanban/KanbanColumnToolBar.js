/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
// @mui
import { Stack, OutlinedInput, MenuItem, Typography, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

KanbanColumnToolBar.propTypes = {
  columnName: PropTypes.string,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default function KanbanColumnToolBar({ columnName, onDelete, onUpdate }) {
  const anchorRef = useRef(null);
  const renameRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(columnName);

  useEffect(() => {
    if (open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRename = () => {
    handleClose();
  };

  const handleChangeColumnName = (event) => {
    setValue(event.target.value);
  };

  const handleUpdateColumn = (event) => {
    if (event.key === 'Enter' && renameRef.current) {
      renameRef.current.blur();
      onUpdate(value);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ pt: 3 }}>
        <OutlinedInput
          size="small"
          placeholder="Section name"
          value={value}
          onChange={handleChangeColumnName}
          onKeyUp={handleUpdateColumn}
          inputRef={renameRef}
          sx={{
            typography: 'h6',
            fontWeight: 'fontWeightBold',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
        />

        <IconButton ref={anchorRef} size="small" onClick={handleOpen} color={open ? 'inherit' : 'default'}>
          <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
        </IconButton>
      </Stack>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ p: 1, width: 'auto' }}>
        <MenuItem onClick={handleClickRename} sx={{ py: 0.75, px: 1.5, borderRadius: 1 }}>
          <Iconify icon={'eva:edit-fill'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          <Typography variant="body2">Rename section</Typography>
        </MenuItem>
        <MenuItem onClick={onDelete} sx={{ py: 0.75, px: 1.5, borderRadius: 1 }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          <Typography variant="body2">Delete section</Typography>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
