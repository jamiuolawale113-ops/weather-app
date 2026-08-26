import worldMap from "../assets/WorldMap.svg";
import { FiMap } from "react-icons/fi";

const coveragePoints = [
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Lagos", lat: 6.52, lon: 3.38 },
  { name: "Cairo", lat: 30.04, lon: 31.24 },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "São Paulo", lat: -23.55, lon: -46.63 },
];

function latLonToPercent(lat, lon) {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

function GlobalMap({ currentLocation, locationName }) {
  const bluePin = currentLocation
    ? latLonToPercent(currentLocation.latitude, currentLocation.longitude)
    : null;

  return (
    <section className="global-map-section">
      <div className="sect-title">
        <FiMap />
        <p>Global Data Coverage</p>
      </div>

      <div className="global-map">
        <img src={worldMap} alt="" />

        {coveragePoints.map((point, index) => {
          const { x, y } = latLonToPercent(point.lat, point.lon);
          return (
            <span
              key={index}
              className="coverage-dot"
              style={{ left: `${x}%`, top: `${y}%` }}
              title={point.name}
            />
          );
        })}

        {bluePin && (
          <span
            className="user-location-dot"
            style={{ left: `${bluePin.x}%`, top: `${bluePin.y}%` }}
            title={locationName || "Your Location"}
          />
        )}
      </div>
    </section>
  );
}

export default GlobalMap;
