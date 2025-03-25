## Technical Requirements

To set up and run this React Native application, ensure that your system meets the following requirements:

### 1. Prerequisites

- **Operating System:** Windows, macOS, or Linux
- **Node.js:** v16.x or later
- **npm:** v8.x or later (or **Yarn** v1.x as an alternative)
- **React Native CLI:** Latest version
- **Watchman (for macOS users):** Installed via Homebrew (`brew install watchman`)
- **Java Development Kit (JDK):** JDK 11 or later (recommended: OpenJDK 11)
- **Android Studio (for Android development):** Latest version with Android SDK, AVD Manager, and necessary build tools installed
- **Xcode (for iOS development on macOS):** Latest version with Xcode command-line tools
- **CocoaPods (for iOS dependencies):** Installed via Homebrew (`brew install cocoapods`)

### 2. Dependencies

Ensure you have the required dependencies installed:

```sh
npm install
```

Or, if using Yarn:

```sh
yarn install
```

### 3. Running the Application

#### Android

Start an Android emulator or connect a physical device, then run:

```sh
npx react-native run-android
```

#### iOS (Mac only)

Start an iOS simulator or connect a physical device, then run:

```sh
npx react-native run-ios
```

### 4. Environment Variables

Create a `.env` file in the root directory and define necessary variables:

```
API_URL=https://your-api.com
GOOGLE_MAPS_API_KEY=your_api_key
```

Load environment variables using:

```sh
npx react-native-dotenv
```

### 5. Code Quality and Formatting

- **ESLint:** Run `npx eslint .`
- **Prettier:** Run `npx prettier --write .`
- **TypeScript (if used):** Ensure type safety with `npx tsc`

### 6. Debugging

Use **React Developer Tools** and enable remote debugging via **Flipper**. For logs, use:

```sh
npx react-native log-android  # For Android
npx react-native log-ios      # For iOS
```

### 7. Testing

- **Unit Tests:** Run `npm test` (or `yarn test`)
- **End-to-End (E2E) Tests:** Use Detox (for iOS/Android) or Appium

### 8. Deployment

#### Android

Generate a release APK:

```sh
cd android && ./gradlew assembleRelease
```

#### iOS

Build the app for production:

```sh
npx react-native run-ios --configuration Release
```

For App Store deployment, use **Fastlane** or Xcode.
