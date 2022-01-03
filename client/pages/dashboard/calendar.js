/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';

import interactionPlugin from '@fullcalendar/interaction';

import { useSnackbar } from 'notistack';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
// @mui
import {
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  DialogTitle,
} from '@mui/material';
// redux
// routes
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { DialogAnimate } from '../../components/animate';
// sections

import GlobalStyles from '@mui/material/GlobalStyles';
import { CalendarStyle, CalendarToolbar } from '../../sections/@dashboard/calendar';
// ----------------------------------------------------------------------
const Sidebar = styled('header')(({ theme }) => ({
  width: '240px',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Content = styled('div')(({ theme }) => ({
  width: 'calc(100% - 240px)',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(6),
  paddingLeft: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    width: '100vw',
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const SideSection = styled(Card)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  width: '100%',
  marginTop: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
}));
export default function Calendar() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
  };

  return (
    <Page title="Calendar">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex' }}>
        <Sidebar>
          <SideSection>
            <List sx={{ width: '100%' }}>
              <ListItem disablePadding onClick={() => setCurrent('dashboard')}>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon={'lucide:layout-dashboard'} width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary={<h4>Dashboard</h4>} />
                </ListItemButton>
              </ListItem>
              <Link href="/dashboard/calendar" passHref={true}>
                <ListItem disablePadding selected={true}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon={'uil:calender'} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={<h4>Calendar</h4>} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ pl: '3px' }}>
                    <Iconify icon={'ant-design:video-camera-add-outlined'} width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary={<h4>Recordings</h4>} />
                </ListItemButton>
              </ListItem>
            </List>
          </SideSection>
          {/* <SideSection /> */}
        </Sidebar>
        <Content>
          <Card>
            <CalendarStyle>
              <CalendarToolbar
                date={date}
                view={view}
                onNextDate={handleClickDateNext}
                onPrevDate={handleClickDatePrev}
                onToday={handleClickToday}
                onChangeView={handleChangeView}
              />
              <FullCalendar
                weekends
                editable
                droppable
                selectable
                events={[]}
                ref={calendarRef}
                rerenderDelay={10}
                initialDate={date}
                initialView={view}
                dayMaxEventRows={3}
                eventDisplay="block"
                headerToolbar={false}
                allDayMaintainDuration
                eventResizableFromStart
                select={handleSelectRange}
                // eventDrop={handleDropEvent}
                // eventClick={handleSelectEvent}
                // eventResize={handleResizeEvent}
                height={isDesktop ? 720 : 'auto'}
                plugins={[listPlugin, dayGridPlugin, interactionPlugin]}
              />
            </CalendarStyle>
          </Card>
        </Content>
      </Container>
    </Page>
  );
}
