import { useState, useEffect } from "react";
import axios from "axios";

// OpenWeatherMap API key - Replace with your actual API key
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useFetchWeather = (city) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if city is empty
    if (!city) {
      setData(null);
      setError(null);
      return;
    }

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric", // For Celsius
          },
        });

        // Transform the data for easier consumption
        const transformedData = {
          city: response.data.name,
          country: response.data.sys.country,
          temp: response.data.main.temp,
          feels_like: response.data.main.feels_like,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          weather: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          wind: {
            speed: response.data.wind.speed,
            deg: response.data.wind.deg,
          },
          timestamp: new Date(response.data.dt * 1000),
        };

        setData(transformedData);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("City not found. Please check the spelling and try again.");
        } else {
          setError("Failed to fetch weather data. Please try again later.");
        }
        console.error("Weather fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, isLoading, error };
};

export default useFetchWeather;
