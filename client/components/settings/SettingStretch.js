// @mui
import { Paper, CardActionArea, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function SettingStretch() {
  const { themeStretch, onToggleStretch } = useSettings();

  return (
    <CardActionArea sx={{ color: 'primary.main', borderRadius: 1 }}>
      <Paper
        onClick={onToggleStretch}
        sx={{
          p: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1,
            mx: 'auto',
            width: 0.5,
            height: 40,
            borderRadius: 1,
            color: 'action.active',
            bgcolor: 'background.default',
            transition: (theme) => theme.transitions.create('width'),
            boxShadow: (theme) => theme.customShadows.z12,
            ...(themeStretch && {
              width: 1,
              color: 'primary.main',
            }),
          }}
        >
          <Iconify
            icon={themeStretch ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
            width={20}
            height={20}
          />
          <Iconify
            icon={themeStretch ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
            width={20}
            height={20}
          />
        </Stack>
      </Paper>
    </CardActionArea>
  );
}
