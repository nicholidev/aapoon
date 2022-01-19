/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { createContext } from 'react';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// utils
import getColorPresets, { colorPresets, defaultPreset } from '../utils/getColorPresets';
// config
import { defaultSettings } from '../config';

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onChangeMode: () => {},
  onToggleMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  onToggleStretch: () => {},
  onResetSetting: () => {},
  setColor: defaultPreset,
  colorOption: [],
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    themeDirection: initialState.themeDirection,
    themeColorPresets: initialState.themeColorPresets,
    themeStretch: initialState.themeStretch,
  });

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onChangeDirection = (event) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value,
    });
  };

  const onChangeColor = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
      themeStretch: initialState.themeStretch,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        onToggleMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        // Stretch
        onToggleStretch,
        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
