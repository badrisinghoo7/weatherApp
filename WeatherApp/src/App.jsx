import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import Loading from "./components/Loading";
import Error from "./components/Error";
import "./App.css";
import useFetchWeather from "./hooks/usefetchWeather";

function App() {
  const [searchCity, setSearchCity] = useState("");
  const { data, isLoading, error } = useFetchWeather(searchCity);

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  return (
    <div>
      <div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Weather App</h1>
        </div>

        <SearchBar onSearch={handleSearch} />

        {isLoading && <Loading />}

        {error && <Error message={error} />}

        {!isLoading && !error && data && <WeatherInfo data={data} />}

        {!isLoading && !error && !data && searchCity && (
          <div>
            <p>No data found. Please try a different city.</p>
          </div>
        )}

        {!searchCity && (
          <div>
            <p>Enter a city name to get the current weather information.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
