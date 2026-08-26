import { FiCloud, FiCloudLightning, FiCloudRain, FiCloudSnow, FiSun } from "react-icons/fi";
import ForecastCard from "./ForecastCard";
import { getWeatherDescription } from "../utils/weatherUtils";

const fallbackForecastDays = [
  { day: "Today", condition: "Rain", high: 26, low: 20, Icon: FiCloudRain },
  { day: "Tue", condition: "Cloudy", high: 25, low: 19, Icon: FiCloud },
  { day: "Wed", condition: "Sunny", high: 28, low: 21, Icon: FiSun },
  { day: "Thu", condition: "Rain", high: 24, low: 18, Icon: FiCloudRain },
  { day: "Fri", condition: "Cloudy", high: 23, low: 17, Icon: FiCloud },
];

function getForecastIcon(code) {
  if ([0, 1].includes(code)) return FiSun;
  if ([2, 3, 45, 48].includes(code)) return FiCloud;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return FiCloudSnow;
  if ([95, 96, 99].includes(code)) return FiCloudLightning;
  return FiCloudRain;
}

function formatForecastDay(date, index) {
  if (index === 0) return "Today";

  return new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    new Date(`${date}T12:00:00`),
  );
}

function Forecast({ forecast }) {
  const days = forecast && forecast.time
    ? forecast.time.slice(0, 5).map((date, index) => ({
        day: formatForecastDay(date, index),
        condition: getWeatherDescription(forecast.weather_code[index]),
        high: Math.round(forecast.temperature_2m_max[index]),
        low: Math.round(forecast.temperature_2m_min[index]),
        Icon: getForecastIcon(forecast.weather_code[index]),
      }))
    : fallbackForecastDays;

  return (
    <section className="forecast-section">
      <div className="sect-title">
        <FiCloud />
        <p>5-Day Forecast</p>
      </div>

      <div className="forecast-grid">
        {days.map((day) => (
          <ForecastCard key={day.day} {...day} />
        ))}
      </div>
    </section>
  );
}

export default Forecast;
