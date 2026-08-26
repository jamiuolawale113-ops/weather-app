import { FiDroplet, FiEye, FiSun, FiWind } from "react-icons/fi";

function WeatherDetails({ weather, forecast }) {
  const windValue = weather?.wind_speed_10m !== undefined
    ? `${Math.round(weather.wind_speed_10m)} km/h`
    : "11 mph";

  const humidityValue = weather?.relative_humidity_2m !== undefined
    ? `${Math.round(weather.relative_humidity_2m)}%`
    : "72%";

  const uvValue = forecast?.uv_index_max?.[0] !== undefined
    ? `${Math.round(forecast.uv_index_max[0])} UV`
    : "4 UV";

  const visibilityValue = weather?.cloud_cover !== undefined
    ? `${Math.max(10, Math.round(100 - weather.cloud_cover * 0.5))}%`
    : "47%";

  const weatherDetails = [
    { label: "Wind", value: windValue, Icon: FiWind },
    { label: "Humidity", value: humidityValue, Icon: FiDroplet },
    { label: "UV Index", value: uvValue, Icon: FiSun },
    { label: "Visibility", value: visibilityValue, Icon: FiEye },
  ];

  return (
    <section className="weather-details">
      <div className="sect-title">
        <FiSun />
        <p>Weather Details</p>
      </div>

      <div className="weather-details-grid">
        {weatherDetails.map(({ label, value, Icon }) => (
          <article className="weather-detail" key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;
