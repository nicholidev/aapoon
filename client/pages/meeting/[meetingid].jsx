/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import Link from 'next/link';
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
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../../components/Iconify';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import AppNewInvoice from '../../sections/@dashboard/general/app/AppNewInvoice';
import InviteData from '../../components/invite/InviteData';
import InviteModal from '../../components/invite/InviteModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withMeetingAuth from '../../HOC/withMeetingAuth';
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
  width: '100%',
  height: '89vh',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingLeft: 0,
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

const InfoCard = styled(Card)(({ theme }) => ({
  height: 114,
  width: 259,
  maxWidth: '100%',
  paddingTop: 16,
  position: 'relative',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const InfoContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

const DataSection = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const DataHead = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}));

const InfoHeading = styled('span')(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(2),
}));

const InfoNumbers = styled('div')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60%',
}));

const infoIconStyle = {
  position: 'absolute',
  bottom: 12,
  right: 12,
};

function Meeting() {
  const { themeStretch } = useSettings();
  const router = useRouter();

  const domain = 'meet.jit.si';
  let api = {};
  const [meetingState, setMeetingState] = useState({});

  const handleClose = () => {
    console.log('handleClose');
  };

  const handleParticipantLeft = async (participant) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await getParticipants();
  };

  const handleParticipantJoined = async (participant) => {
    console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    // return props.history.push('/thank-you');
  };

  const handleMuteStatus = (audio) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  const handleVideoStatus = (video) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  const getParticipants = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  };

  // custom events
  const executeCommand = (command) => {
    api.executeCommand(command);
    if (command == 'hangup') {
      return props.history.push('/thank-you');
    }

    if (command == 'toggleAudio') {
      setState({ isAudioMuted: !state.isAudioMuted });
    }

    if (command == 'toggleVideo') {
      setState({ isVideoMuted: !state.isVideoMuted });
    }
  };

  const startMeet = () => {
    let options = {
      roomName: meetingState.room,
      width: '100%',
      height: '100%',
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: meetingState.user.name,
      },
    };

    api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListeners({
      readyToClose: handleClose,
      participantLeft: handleParticipantLeft,
      participantJoined: handleParticipantJoined,
      videoConferenceJoined: handleVideoConferenceJoined,
      videoConferenceLeft: handleVideoConferenceLeft,
      audioMuteStatusChanged: handleMuteStatus,
      videoMuteStatusChanged: handleVideoStatus,
    });
  };

  useEffect(() => {
    if (router.query.meetingid) {
      setMeetingState({
        room: router.query.meetingid,
        user: {
          name: 'Akash Verma',
        },
        isAudioMuted: false,
        isVideoMuted: false,
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      if (meetingState.room) {
        startMeet();
      }
    } else {
      alert('JitsiMeetExternalAPI not loaded');
    }
  }, [meetingState]);

  return (
    <Page title="Meeting">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <div sx={{ display: 'flex' }}>
        <Content>
          <DataSection>
            <div id="jitsi-iframe" style={{ height: '100%' }}></div>
            <div class="item-center">
              <span>Custom Controls</span>
            </div>
            <div class="item-center">
              <span>&nbsp;&nbsp;</span>
              <i
                onClick={() => executeCommand('toggleAudio')}
                className={`fas fa-2x grey-color ${
                  meetingState.isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'
                }`}
                aria-hidden="true"
                title="Mute / Unmute"
              ></i>
              <i
                onClick={() => executeCommand('hangup')}
                className="fas fa-phone-slash fa-2x red-color"
                aria-hidden="true"
                title="Leave"
              ></i>
              <i
                onClick={() => executeCommand('toggleVideo')}
                className={`fas fa-2x grey-color ${meetingState.isVideoMuted ? 'fa-video-slash' : 'fa-video'}`}
                aria-hidden="true"
                title="Start / Stop camera"
              ></i>
              <i
                onClick={() => executeCommand('toggleShareScreen')}
                className="fas fa-film fa-2x grey-color"
                aria-hidden="true"
                title="Share your screen"
              ></i>
            </div>
          </DataSection>
        </Content>
      </div>
    </Page>
  );
}

// ----------------------------------------------------------------------
let MeetingPage = withMeetingAuth(Meeting);

MeetingPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MeetingPage;
