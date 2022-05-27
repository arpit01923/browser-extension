import { useEffect, useState } from "react";
import { getWeather } from "../../services";
import "./weather.css";

export const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loc, setLoc] = useState({ lat: "", lon: "" });

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const crd = pos.coords;
      setLoc((loc) => ({
        ...loc,
        lat: crd.latitude,
        lon: crd.longitude,
      }));
    };

    const error = () => {
      console.log("Sorry there is an error");
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    getWeather(loc?.lat, loc?.lon, setWeather);
  }, [loc?.lat, loc?.lon, setWeather]);

  console.log(weather);

  return (
    <div className="weather-container">
      <img
        src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
        alt={weather?.weather[0]?.description}
      />
      <div className="weather-data">
        <h1>{weather?.main?.temp.toFixed(0)}°C</h1>
        <p>{weather?.name}</p>
      </div>
    </div>
  );
};
