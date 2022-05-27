import axios from "axios";

export const getWeather = async (lat, lon, setWeather) => {
  const API_KEY = "1fbe3deff5c93c870969ba364a336187";
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    setWeather(response.data);
  } catch (e) {
    console.log(e);
  }
};
