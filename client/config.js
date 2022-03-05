/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// LAYOUT
// ----------------------------------------------------------------------

export const DRAWER_WIDTH = 260;

export const DASHBOARD_HEADER_MOBILE = 64;
export const DASHBOARD_HEADER_DESKTOP = 72;
export const DASHBOARD_NAVBAR_WIDTH = 280;
export const DASHBOARD_NAVBAR_COLLAPSE_WIDTH = 88;

export const DASHBOARD_NAVBAR_ROOT_ITEM_HEIGHT = 48;
export const DASHBOARD_NAVBAR_SUB_ITEM_HEIGHT = 40;
export const DASHBOARD_NAVBAR_ICON_ITEM_SIZE = 22;

export const MAIN_HEADER_DESKTOP = 68;
export const MAIN_HEADER_MOBILE = 64;

// SETTINGS
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'orange',
  themeStretch: false,
};
export const FIREBASE_API = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
