/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import React from 'react';

import Flags from 'country-flag-icons/react/3x2';
import { hasFlag } from 'country-flag-icons';
const Flag = (props) => {
  let CFlag = hasFlag(props.code) ? Flags[props.code] : <i></i>;
  return <CFlag style={{ width: 20, height: 20 }} />;
};

export default Flag;
