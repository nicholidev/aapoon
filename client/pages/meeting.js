/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import React from 'react';
import {JitsiMeeting} from "@jitsi/react-sdk";
import withMeetingAuth from "../HOC/withMeetingAuth";
import {useRouter} from "next/router";

const Meeting = (props) => {
  console.log(props)
  const router = useRouter()
  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
      className='jitsi-wrap'
    >
      <JitsiMeeting
        roomName={router.query?.meetingid}
        jwt={props.token}
        getIFrameRef = { node => node.style.height = '100%' }
        domain={props.domain}
        appId={router.query?.meetingid}
      />
    </div>
  );
}

let MeetingPage = withMeetingAuth(Meeting);

export default MeetingPage;