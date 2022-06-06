/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import React, {Component} from 'react';
import {JitsiMeeting} from "@jitsi/react-sdk";

class MeetingPage extends Component
{
  render()
  {
    return (
      <div>
        <JitsiMeeting
          roomName='Room Name'
         />
      </div>
    );
  }
}

export default MeetingPage;