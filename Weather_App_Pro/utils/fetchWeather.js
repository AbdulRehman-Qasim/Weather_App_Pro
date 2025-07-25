// utils/fetchWeather.js
import axios from 'axios';

const API_KEY = 'ec57e8a084bf4408967133528252007';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (query) => {
  try {
    // ✅ ENABLE AIR QUALITY DATA BY SETTING aqi=yes
const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=yes&alerts=no`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};
