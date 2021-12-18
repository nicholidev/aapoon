/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRef, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
}
