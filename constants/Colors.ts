/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const accentBlue = '#3b82f6';
const pastelGray = '#e5e7eb';
const softBg = '#f8fafc';
const darkText = '#374151';
const headingText = '#1e293b';
const mutedText = '#64748b';

export const Colors = {
  light: {
    text: darkText,
    background: softBg,
    tint: accentBlue,
    icon: mutedText,
    tabIconDefault: mutedText,
    tabIconSelected: accentBlue,
    cardBg: pastelGray,
    heading: headingText,
    muted: mutedText,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    cardBg: '#23272f',
    heading: '#fff',
    muted: '#9BA1A6',
  },
};
