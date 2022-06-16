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

const Content = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flex: 1,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingLeft: 0,
  },
}));

const Meeting = () => {
  const { themeStretch } = useSettings();
  const router = useRouter();

  const domain = 'meetaap.io';
  let api = {};
  const [meetingState, setMeetingState] = useState({});

  const handleClose = () => {
  };

  const handleParticipantLeft = async (participant) => {
    const data = await getParticipants();
  };

  const handleParticipantJoined = async (participant) => {
    const data = await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant) => {
    const data = await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
  };

  const handleMuteStatus = (audio) => {
  };

  const handleVideoStatus = (video) => {
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
    if (command === 'hangup') {
      return props.history.push('/thank-you');
    }

    if (command === 'toggleAudio') {
      setState({ isAudioMuted: !state.isAudioMuted });
    }

    if (command === 'toggleVideo') {
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
    executeCommand('hangup');
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
    <Content
      id="jitsi-iframe"
      style={{height: '100%'}}
    />
  );
}

// ----------------------------------------------------------------------
let MeetingPage = withMeetingAuth(Meeting);

// MeetingPage.getLayout = function getLayout(page) {
//   return <DashboardLayout>{page}</DashboardLayout>;
// };

export default MeetingPage;
