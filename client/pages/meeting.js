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
import useSettings from './../hooks/useSettings';
// components

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withMeetingAuth from './../HOC/withMeetingAuth';
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
  height: '100%',
  display: 'flex',
  flex: 1,
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
    padding: theme.spacing(2),
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

function Meeting(props) {
  const { themeStretch } = useSettings();
  const router = useRouter();

  const domain = 'p.meetaap.in';
  let api = {};
  const [meetingState, setMeetingState] = useState({});

  const handleClose = () => {
    window.location = '/';
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
    <Content id="jitsi-iframe" style={{ height: '100%' }}>
      {/* <div class="item-center">
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
             </div> */}
    </Content>
  );
}

// ----------------------------------------------------------------------
let MeetingPage = withMeetingAuth(Meeting);

// MeetingPage.getLayout = function getLayout(page) {
//   return <DashboardLayout>{page}</DashboardLayout>;
// };

export default MeetingPage;
