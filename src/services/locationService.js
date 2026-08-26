const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        const messages = {
          1: "Location permission was denied. You can still search for a city.",
          2: "Your location is unavailable. You can still search for a city.",
          3: "Finding your location took too long. You can still search for a city.",
        };

        reject(new Error(messages[error.code] ?? "We could not get your location."));
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 400000,
      },
    );
  });
};



export async function reverseGeocodeLocation(latitude, longitude) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    const city = data.city || data.locality || data.principalSubdivision || "";
    const country = data.countryName || "";
    if (!city && !country) return null;
    return [city, country].filter(Boolean).join(", ");
  } catch {
    return null;
  }
}

export async function searchLocations(query) {
  const locationName = query.trim();

  if (locationName.length < 2) {
    return [];
  }

  const parameters = new URLSearchParams({
    name: locationName,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_API_URL}?${parameters}`);

  if (!response.ok) {
    throw new Error("We could not search for that location. Please try again.");
  }

  const data = await response.json();
  return data.results ?? [];
}
