import backgroundImage from "../assets/vertical-shot-pathway-middle-grassy-field-with-trees-cloudy-sky.svg";

const WeatherInfo = ({ data }) => {
  if (!data) return null;

  // Format date to a readable string
  const formattedDate = new Date(data.timestamp).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundImage: `linear-gradient(to bottom, #f0f0f0, #e0e0e0), url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h2>
          {data.city}, {data.country}
        </h2>
        <p>{formattedDate}</p>
      </div>

      <div>
        <div>
          <img src={iconUrl} alt={data.description} />
        </div>
        <div>
          <h1>{Math.round(data.temp)}°C</h1>
          <p>{data.description}</p>
          <p>Feels like: {Math.round(data.feels_like)}°C</p>
        </div>
      </div>

      <div>
        <div>
          <span>Humidity</span>
          <span>{data.humidity}%</span>
        </div>
        <div>
          <span>Wind</span>
          <span>{data.wind.speed} m/s</span>
        </div>
        <div>
          <span>Pressure</span>
          <span>{data.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
