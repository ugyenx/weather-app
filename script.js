const geo_endpoint = "https://geocoding-api.open-meteo.com/v1/search";
const weather_endpoint = "https://api.open-meteo.com/v1/forecast";
const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");

searchForm.addEventListener("submit", handleSearch);

async function getCoordinates() {
  const response = await fetch(geo_endpoint + "?name=" + cityInput.value);
  const data = await response.json();
  return data.results[0];
}

async function handleSearch(event) {
  event.preventDefault();
  const coordinate = await getCoordinates();
  console.log(coordinate);
  const response = await fetch(
    weather_endpoint +
      "?latitude=" +
      coordinate.latitude +
      "&longitude=" +
      coordinate.longitude +
      "&timezone=auto" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean&current=temperature_2m,rain,wind_speed_10m,pressure_msl,weather_code,relative_humidity_2m,apparent_temperature",
  );
  const data = await response.json();
  console.log(data);
}
