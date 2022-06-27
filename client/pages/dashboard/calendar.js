/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

import interactionPlugin from '@fullcalendar/interaction';
import { getMeetingEvents } from '../../api/meeting';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  Container,
  styled,
} from '@mui/material';

import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import Page from '../../components/Page';
import { useRouter } from 'next/router';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CalendarStyle, CalendarToolbar } from '../../sections/@dashboard/calendar';
import DashboardLayout from '../../layouts/dashboard';
import { startOfMonth, endOfMonth } from 'date-fns';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import useAuth from '../../hooks/useAuth';
import MeetingDetailsPopup from '../../sections/meeting/MeetingDetailsPopup';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const Sidebar = styled('header')(({ theme }) => ({
  width: '320px',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Content = styled('div')(({ theme }) => ({
  width: 'calc(100% - 320px)',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(6),
  paddingLeft: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const DataSection = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DataHead = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: theme.spacing(3),
  justifyContent: 'flex-end',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

function CalendarPage() {
  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(new Date());
  const { user } = useAuth();
  const { push } = useRouter();
  
  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop, user]);
  
  useEffect(() => {
    if (user.id) {
      getMeetingEvents(startOfMonth(date), endOfMonth(date), user.id).then((data) => {
        setEvents(data);
      });
    }
  }, [user, date]);

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
      setCurrent(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
      setCurrent(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
  };

  const [meetingOpen, setMeetingOpen] = useState({ isOpen: false });
  const handleSelectEvent = (arg) => {
    setMeetingOpen({
      isOpen: true,
      data: arg.event,
    });
  };

  useEffect(() => {
    const calendarEl = calendarRef.current;
    const calendarApi = calendarEl.getApi();
    // calendarApi.next();
    // setDate(calendarApi.getDate());
    console.log(calendarApi.getDate());
    calendarApi.gotoDate(current);
    setDate(current);
    console.log(current, 'CURRENT');
  }, [current])

  return (
    <Page title="Calendar">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <MeetingDetailsPopup
        isOpen={meetingOpen.isOpen}
        data={meetingOpen.data}
        onClose={() => setMeetingOpen({ isOpen: false })}
      />
      <Container maxWidth={'xl'} sx={{ display: 'flex' }}>
        <DashboardSidebar currentPage="calendar" setCurrent={setCurrent} current={current}/>
        <Content>
          <DataSection>
            <DataHead />
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
                events={events}
                ref={calendarRef}
                rerenderDelay={10}
                initialDate={date}
                initialView={view}
                dayMaxEventRows={3}
                slotDuration={"00:15:00"}
                displayEventEnd={true}
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short',
                }}
                eventDisplay="block"
                eventMinHeight={55}
                headerToolbar={false}
                allDayMaintainDuration
                eventResizableFromStart
                select={handleSelectRange}
                eventClick={handleSelectEvent}
                height={isDesktop ? 720 : 'auto'}
                plugins={[listPlugin, dayGridPlugin, interactionPlugin, timeGridPlugin, timelinePlugin]}
              />
            </CalendarStyle>
          </DataSection>
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let Calendar = withAuth(CalendarPage);

Calendar.getLayout = function getLayout(page) {
  return <DashboardLayout withBottomNav>{page}</DashboardLayout>;
};

export default Calendar;
