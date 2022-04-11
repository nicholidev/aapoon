/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Tooltip, Typography, IconButton, ToggleButton } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Week', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Day', icon: 'ic:round-view-day' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
];

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    padding: theme.spacing(1.75, 3),
    // justifyContent: 'space-between',
  },
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: -40,
  width:"100%",
  justifyContent:"space-between",
  [theme.breakpoints.down('lg')]: {
    marginTop: 0,
  },
}));

// ----------------------------------------------------------------------

CalendarToolbar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onToday: PropTypes.func,
  onNextDate: PropTypes.func,
  onPrevDate: PropTypes.func,
  onChangeView: PropTypes.func,
  view: PropTypes.oneOf(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek']),
};

export default function CalendarToolbar({ date, view, onNextDate, onPrevDate, onToday, onChangeView }) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <RootStyle>
     

      <Container>
        <Box display={"flex"}>
        <Typography variant="h5" sx={{ my: { xs: 1, sm: 0 } }}>
          {fDate(date)}
        </Typography>
        &nbsp; &nbsp;
        <IconButton onClick={onPrevDate}>
          <Iconify icon="eva:arrow-ios-back-fill" width={18} height={18} />
        </IconButton>
        {/* 
        <Button size="small" color="error" variant="contained" onClick={onToday} sx={{ mx: 0.5 }}>
          Today
        </Button> */}
        <IconButton onClick={onNextDate}>
          <Iconify icon="eva:arrow-ios-forward-fill" width={18} height={18} />
        </IconButton>
        </Box>
        {isDesktop && (
        <Stack direction="row" spacing={1}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0 }}
              >
                <Iconify icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Stack>
      )}
      </Container>
    </RootStyle>
  );
}
