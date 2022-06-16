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

// hooks
import useSettings from '../hooks/useSettings';
// components

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import withMeetingAuth from '../HOC/withMeetingAuth';

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


function Meeting(props) {
  const { themeStretch } = useSettings();
  const {user} = useAuth();
  const router = useRouter();
  const domain = props.domain
  let api = {};
  const [meetingState, setMeetingState] = useState({});

  const handleClose = () => {
    if(!!user.id) {
      router.push('/dashboard/one')
    } else {
      window.location = '/';
    }
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

  const participantKickedOut = (data) => {
    console.log(data);
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
      jwt: props.token,
      width: '100%',
      height: '100%',
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
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
      participantKickedOut: participantKickedOut,
    });
  };

  useEffect(() => {
    if (router.query.meetingid) {
      setMeetingState({
        room: router.query.meetingid,
        jwt: props.token,
        user: {
          name: 'Akash Verma',
        },
        isAudioMuted: false,
        isVideoMuted: false,
      });
    }
    () => {
      executeCommand('hangup');
    };
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
    <Content id="jitsi-iframe" style={{ height: '100%' }}></Content>
  );
}

// ----------------------------------------------------------------------
let MeetingPage = withMeetingAuth(Meeting);

export default MeetingPage;
