import { useCallback, useEffect, useRef, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import GlobalMap from "./components/GlobalMap";
import Loading from "./components/Loading";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import { getCurrentLocation, reverseGeocodeLocation, searchLocations } from "./services/locationService";
import { getWeather } from "./services/weatherService";
import "./App.css";

const DEFAULT_LOCATION = {
  latitude: 6.5244,
  longitude: 3.3792,
  name: "Lagos, Nigeria",
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const hasRequestedInitialLocation = useRef(false);

  const requestCurrentLocation = useCallback(async () => {
    setIsLocationLoading(true);
    setLocationError("");

    try {
      const coordinates = await getCurrentLocation();
      setCurrentLocation(coordinates);
      
      const realCity = await reverseGeocodeLocation(coordinates.latitude, coordinates.longitude);
      setLocationName(realCity || "Your Location");
    } catch (error) {
      setLocationError(error.message);
      
      if (!currentLocation) {
        setCurrentLocation({ latitude: DEFAULT_LOCATION.latitude, longitude: DEFAULT_LOCATION.longitude });
        setLocationName(DEFAULT_LOCATION.name);
      }
    } finally {
      setIsLocationLoading(false);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (hasRequestedInitialLocation.current) {
      return;
    }

    hasRequestedInitialLocation.current = true;
    requestCurrentLocation();
  }, [requestCurrentLocation]);

  useEffect(() => {
    if (!currentLocation) {
      return;
    }

    async function loadCurrentWeather() {
      setIsWeatherLoading(true);
      setWeatherError("");

      try {
        const weatherData = await getWeather(
          currentLocation.latitude,
          currentLocation.longitude,
        );
        setWeather(weatherData.current);
        setForecast(weatherData.daily);
      } catch (error) {
        setWeatherError(error.message);
      } finally {
        setIsWeatherLoading(false);
      }
    }

    loadCurrentWeather();
  }, [currentLocation]);

  async function handleLocationSearch(query) {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setSearchError("Enter at least two characters to search for a city.");
      return;
    }

    setIsSearching(true);
    setSearchError("");

    try {
      const results = await searchLocations(query);
      setSearchResults(results);

      if (results.length === 0) {
        setSearchError(`No locations found matching "${query}". Try a different search.`);
      }
    } catch (error) {
      setSearchResults([]);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  }

  function handleSelectLocation(result) {
    setCurrentLocation({
      latitude: result.latitude,
      longitude: result.longitude,
    });
    const fullName = [result.name, result.admin1, result.country].filter(Boolean).join(", ");
    setLocationName(fullName);
    setSearchResults([]);
    setSearchError("");
  }

  return (
    <main className="app">
      <div className="weather-card">
        <SearchBar isSearching={isSearching} onSearch={handleLocationSearch} />

        {isLocationLoading && <Loading message="Finding your location..." />}

        {locationError && (
          <div className="location-recovery">
            <p className="location-message">{locationError}</p>
            <button type="button" onClick={requestCurrentLocation}>
              Use my location
            </button>
          </div>
        )}

        {isWeatherLoading && <Loading message="Loading weather data..." />}
        {weatherError && <p className="search-message">{weatherError}</p>}
        {searchError && <p className="search-message">{searchError}</p>}

        {searchResults.length > 0 && (
          <ul className="search-results" aria-label="Location search results">
            {searchResults.map((result) => (
              <li
                key={`${result.id || result.name}-${result.latitude}-${result.longitude}`}
                onClick={() => handleSelectLocation(result)}
                title={`Click to view weather for ${result.name}`}
              >
                <strong>{result.name}</strong>
                <span>{[result.admin1, result.country].filter(Boolean).join(", ")}</span>
              </li>
            ))}
          </ul>
        )}

        <CurrentWeather weather={weather} locationName={locationName} />

        <GlobalMap currentLocation={currentLocation} locationName={locationName} />

        <WeatherDetails weather={weather} forecast={forecast} />

        <Forecast forecast={forecast} />
      </div>
    </main>
  );
}

export default App;
