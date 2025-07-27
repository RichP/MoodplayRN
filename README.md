

# MoodplayRN

MoodplayRN is a mobile app that lets users create a personalized mixtape of games based on their current mood. Users can browse games by mood, build a custom mixtape, and easily share their mixtape with friends using a simple link or native sharing options.

This is an [Expo](https://expo.dev) React Native project for Moodplay.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

You can open the app in a development build, Android emulator, iOS simulator, or Expo Go.

## Environment Variables

Create a `.env` file in the project root for secrets and configuration:

```
MOBILE_APP_SECRET=your_secret_here
API_BASE_URL=https://your-api-url.com
```

These are loaded via `process.env` in the app and config files.

## Custom URL Scheme

This app uses a custom URL scheme for deep linking:

- Scheme: `moodplay://`

Set in `app.config.js`:

```js
scheme: "moodplay"
```

Expo automatically adds this to the native manifests when building.

## API Usage

API requests use the base URL from `.env`:

```js
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
```

Update your backend's `ALLOWED_ORIGINS` to include `moodplay://` for mobile deep linking.

## File-based Routing

Edit files in the **app** directory. This project uses [Expo Router](https://docs.expo.dev/router/introduction/).

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)

## Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
