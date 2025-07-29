import 'dotenv/config';

export default {
  expo: {
    name: "Moodplay",
    slug: "moodplay",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "moodplay",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      buildNumber: "1",
      bundleIdentifier: "com.yourcompany.moodplay",
      supportsTablet: true
    },
    android: {
      versionCode: 1,
      package: "com.yourcompany.moodplay",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [],
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-secure-store",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      MOBILE_APP_SECRET: process.env.MOBILE_APP_SECRET,
      EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    },
  },
};
