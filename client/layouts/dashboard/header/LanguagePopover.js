/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRef, useState } from 'react';
// @mui
import { MenuItem, ListItemText, Stack } from '@mui/material';
// components
import Image from '../../../components/Image';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: 'German',
    value: 'de',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg',
  },
  {
    label: 'French',
    value: 'fr',
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <Image disabledEffect src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={() => setOpen(false)}
              sx={{ height: 40, borderRadius: 1, px: 1 }}
            >
              <Image disabledEffect alt={option.label} src={option.icon} sx={{ mr: 2 }} />

              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
