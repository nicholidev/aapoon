/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
