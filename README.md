
# 🌦️ Weather App Pro

A beautiful, responsive, and animated weather app built with **React Native** and **Expo**, featuring:
- Real-time weather data from **WeatherAPI**
- 🌞 Lottie-based animated weather icons
- 💡 Light/Dark Mode Toggle
- 🌍 Auto location detection
- 🧭 Hourly forecast, air quality index, and additional weather info
- 🖋️ Splash screen with typing animation

---

## 📸 Screenshots

![splash](./assets/screenshots/splash.png)
![home](./assets/screenshots/home.png)
![info](./assets/screenshots/info.png)

---

## 🚀 Features

- 🌐 Fetches weather using current location or searched city
- 📍 City, country, temperature, humidity, wind, pressure, UV index
- ⏰ Hourly forecast in horizontal scroll
- 🌫️ Air Quality chart (PM2.5, PM10, CO, SO2)
- 🎬 Lottie animations based on weather conditions
- 🌓 Light/Dark mode
- ⚡ Beautiful splash screen with "Get Started" and typing text effect

---

## 🔧 Tech Stack

- **React Native + Expo**
- **WeatherAPI.com** (for weather data)
- **Lottie-react-native** (animated weather icons)
- **React Native Reanimated** (for entrance animations)
- **Expo Location** (to detect current GPS location)
- **AsyncStorage** (to persist last searched city)
- **FlatList & ScrollView** for layout

---

## 📁 Folder Structure


.
├── assets
│   ├── lottie/
│   ├── icons/
│   └── images/
├── components/
│   └── TypingText.js
├── screens/
│   ├── SplashScreen.js
│   └── HomeScreen.js
├── utils/
│   ├── fetchWeather.js
│   └── getLocalWeatherAnimation.js
├── App.js
├── .env
└── README.md



## 📦 Installation

### 1. Clone the repository
bash
git clone https://github.com/your-username/weather-app-pro.git
cd weather-app-pro


### 2. Install dependencies

bash
npm install


### 3. Add your API key

Create a .env file in the root folder:

WEATHER_API_KEY=your_weatherapi_key


### 4. Start the app

bash
npx expo start



## 🔐 Environment Variables

Your .env file should contain:


WEATHER_API_KEY=your_api_key_here


Make sure you have the following line in `babel.config.js` to load `.env`:

js
plugins: [
  ['module:react-native-dotenv', {
    moduleName: '@env',
    path: '.env',
  }]
]




## 📚 Learnings & Concepts Used

* Expo CLI & navigation
* Fetching APIs in React Native
* Using LottieView for weather animations
* Creating custom animated text components
* Responsive layouts & platform compatibility
* AsyncStorage for data persistence
* Handling location permissions



## ✨ Credits

* [WeatherAPI.com](https://www.weatherapi.com/)
* [LottieFiles](https://lottiefiles.com/)
* [React Native](https://reactnative.dev/)
* Icons & images from various open-source platforms.


## 📝 License

This project is licensed under the MIT License.



## 🙌 Contribute

Feel free to fork this repo, suggest improvements, or submit pull requests.



## 📬 Contact

For queries, suggestions, or support:

**Developer**: \[Muhammad Abdul Rehman]
**Email**: [abdullrehmanmaan6@gmail.com](mailto:abdullrehmanmaan6@gmail.com)
**GitHub**: [github.com/AbdulRehman-Qasim](https://github.com/AbdulRehman-Qasim)

Happy Coding ☀️❄️🌧️!

