import { AnimatePresence, m } from 'framer-motion';
import { useState, useEffect } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Backdrop, Paper, Divider, Typography, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { DRAWER_WIDTH, defaultSettings } from '../../config';
//
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import SettingMode from './SettingMode';
import ToggleButton from './ToggleButton';
import SettingStretch from './SettingStretch';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';
import { IconButtonAnimate, varFade } from '../animate';
import SettingColorPresets from './SettingColorPresets';

// ----------------------------------------------------------------------

export default function Settings() {
  const theme = useTheme();

  const { themeMode, themeDirection, themeColorPresets, themeStretch, onResetSetting } = useSettings();
  const [open, setOpen] = useState(false);

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets ||
    themeStretch !== defaultSettings.themeStretch;

  const varSidebar =
    themeDirection !== 'rtl'
      ? varFade({
          distance: DRAWER_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: DRAWER_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inLeft;

  useEffect(() => {
    // if (open) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflow = 'unset';
    // }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ background: 'transparent', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />

      {!open && <ToggleButton open={open} notDefault={notDefault} onToggle={handleToggle} />}

      <AnimatePresence>
        {open && (
          <>
            <Paper
              component={m.div}
              {...varSidebar}
              sx={{
                m: 2,
                top: 0,
                right: 0,
                bottom: 0,
                borderRadius: 1.5,
                width: DRAWER_WIDTH,
                position: 'fixed',
                ...cssStyles(theme).bgBlur({ opacity: 0.8 }),
                zIndex: (theme) => theme.zIndex.drawer + 3,
                boxShadow: (theme) =>
                  `-24px 12px 32px -4px ${alpha(
                    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
                    0.16
                  )}`,
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2, pr: 1, pl: 2.5 }}>
                <Typography variant="subtitle1">Settings</Typography>
                <div>
                  <IconButtonAnimate onClick={onResetSetting}>
                    <Iconify icon={'ic:round-refresh'} width={20} height={20} />
                  </IconButtonAnimate>
                  <IconButtonAnimate onClick={handleClose}>
                    <Iconify icon={'eva:close-fill'} width={20} height={20} />
                  </IconButtonAnimate>
                </div>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Scrollbar sx={{ height: 1 }}>
                <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Mode</Typography>
                    <SettingMode />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Direction</Typography>
                    <SettingDirection />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Presets</Typography>
                    <SettingColorPresets />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Stretch</Typography>
                    <SettingStretch />
                  </Stack>

                  <SettingFullscreen />
                </Stack>
              </Scrollbar>
            </Paper>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
