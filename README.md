# React Native Template

This is a starter template for a React Native application with pre-configured libraries and dependencies to accelerate development. The project is structured to support modern practices, including internationalization, form validation, and state management.

---

## Features

- **React Native 0.76.3**
- Pre-configured **navigation** using `@react-navigation`.
- Form validation with **Formik** and **Yup**.
- Global state management for authentication.
- Multilingual support using **i18next**.
- Date and time handling with **dayjs**.
- Customizable theming with **react-native-paper**.
- Flash messages for notifications.

---

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [License](#license)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-native-template.git
   cd react-native-template
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install required pods (iOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. Start the development server:
   ```bash
   yarn start
   ```

---

## Scripts

- `yarn start`: Start the development server.
- `yarn android`: Build and run the app on an Android device/emulator.
- `yarn ios`: Build and run the app on an iOS simulator.
- `yarn lint`: Lint the codebase.

---

## Folder Structure

```
project-root/
├── src/
│   ├── components/         # Reusable components
│   ├── constants/          # Constant values (e.g., API URLs)
│   ├── locales/            # i18n configuration and translations
│   ├── navigation/         # React Navigation setup
│   ├── screens/            # Screen components
│   ├── services/           # API calls and utilities
│   ├── themes/             # Theme configuration (light/dark mode)
│   └── App.js              # Entry point
├── .babel.config.js        # Babel configuration
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── ...                     # Other configuration files
```

---

## Dependencies

Here is a list of major dependencies used in this project:

| Dependency                         | Version   | Description                          |
|------------------------------------|-----------|--------------------------------------|
| `@react-native-async-storage/async-storage` | `^2.1.0`   | Storage utility for React Native    |
| `@react-navigation/native`         | `^7.0.13` | Core library for navigation          |
| `@react-navigation/stack`          | `^7.0.18` | Stack navigator for screen management|
| `axios`                            | `^1.7.9`  | Promise-based HTTP client            |
| `dayjs`                            | `^1.11.13`| Lightweight date utility library     |
| `formik`                           | `^2.4.6`  | Form state management                |
| `i18next`                          | `^24.0.5` | Internationalization library         |
| `react-native-flash-message`       | `^0.4.2`  | Toast messages                       |
| `react-native-paper`               | `^5.12.5` | Material design components           |
| `react-native-vector-icons`        | `^10.2.0` | Icons library                        |
| `yup`                              | `^1.5.0`  | Schema-based form validation         |

For a full list of dependencies, see [package.json](package.json).

---

## Configuration

### Environment Variables

Create an `.env` file in the root directory and configure the following:

```env
BASE_URL=https://your-api-url.com
```

### Internationalization

To add new translations, update the files in the `src/locales` directory.

### Theming

Customize themes in the `src/themes` directory.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
