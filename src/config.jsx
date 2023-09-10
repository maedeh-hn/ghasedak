// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const USER_BASE_URL = import.meta.env.REACT_APP_USER_BASE_URL || '';
export const CONTACT_BASE_URL = import.meta.env.REACT_APP_CONTACT_BASE_URL || '';
export const BASE_INFO_BASE_URL = import.meta.env.REACT_APP_BASE_INFO_BASE_URL || '';
export const SMS_BASE_URL = import.meta.env.REACT_APP_SMS_BASE_URL || '';
export const LINES_BASE_URL = import.meta.env.REACT_APP_LINES_BASE_URL || '';
export const RECEIVE_BASE_URL = import.meta.env.REACT_APP_RECEIVE_BASE_URL || '';

export const FIREBASE_API = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_FIREBASE_APPID,
  measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: import.meta.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: import.meta.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: import.meta.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: import.meta.env.REACT_APP_AUTH0_DOMAIN,
};

export const MAPBOX_API = import.meta.env.REACT_APP_MAPBOX;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.home.root; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 60,
  DASHBOARD_DESKTOP_HEIGHT: 72,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 72 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
  DASHBOARD_ITEM_SUB_TEXT_PADDING_LEFT: 35
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you set settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'rtl',
  themeColorPresets: 'default',
  themeLayout: 'horizontal',
  themeStretch: true,
  themeFontSize: 17,
  themeBorderRadius: 3,
};
