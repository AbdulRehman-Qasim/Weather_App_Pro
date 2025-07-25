// utils/getLocalIcon.js
// export const getLocalWeatherIcon = (condition) => {
//   switch (condition.toLowerCase()) {
//     case 'clear':
//     case 'sunny':
//       return require('../assets/icons/sunny.png');
//     case 'partly cloudy':
//       return require('../assets/icons/partlycloudy.png');
//     case 'cloudy':
//     case 'overcast':
//       return require('../assets/icons/cloudy.png');
//     case 'rain':
//     case 'moderate rain':
//     case 'light rain':
//     case 'light rain shower':
//       return require('../assets/icons/rain.png');
//     case 'thunderstorm':
//       return require('../assets/icons/thunderstorm.png');
//     case 'snow':
//       return require('../assets/icons/snow.png');
//     default:
//       return require('../assets/icons/sunny.png'); // fallback
//   }
// };





export const getLocalWeatherAnimation = (condition) => {
  const normalized = condition.toLowerCase();

  if (normalized.includes('rain') || normalized.includes('light rain') || normalized.includes('moderate rain') || normalized.includes('light rain shower')) {
    return require('../assets/lottie/rain.json');
  }
  if (normalized.includes('clear') || normalized.includes('sunny') || normalized.includes('sunshine') || normalized.includes('sunny intervals')) {
    return require('../assets/lottie/sunny.json');
  }
  if (normalized.includes('cloud') || normalized.includes('partly cloudy') || normalized.includes('overcast') || normalized.includes('cloudy')) {
    return require('../assets/lottie/cloud.json');
  }
  if (normalized.includes('snow') || normalized.includes('snowy') || normalized.includes('sleet') || normalized.includes('snow shower')) {
    return require('../assets/lottie/snow.json');
  }
  if (normalized.includes('thunder') || normalized.includes('thunderstorm') || normalized.includes('lightning') || normalized.includes('storm')) {
    return require('../assets/lottie/thunder.json');
  }
  if (normalized.includes('fog') || normalized.includes('mist') || normalized.includes('haze')) {
    return require('../assets/lottie/fog.json');
  }

  // Default fallback
  return require('../assets/lottie/sunny.json');
};

