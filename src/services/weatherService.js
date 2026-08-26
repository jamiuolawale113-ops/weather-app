const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude, longitude) {
  const parameters = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day,surface_pressure,cloud_cover",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max",
    forecast_days: "5",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_API_URL}?${parameters}`);

  if (!response.ok) {
    throw new Error("We could not load the weather data. Please try again.");
  }

  const data = await response.json();
  return {
    current: data.current,
    daily: data.daily,
  };
}
