import { getWeatherInfo } from "./weather.js";

const geo_endpoint = "https://geocoding-api.open-meteo.com/v1/search";
const weather_endpoint = "https://api.open-meteo.com/v1/forecast";
const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const leftContainer = document.querySelector("#left-container");
const weatherDescription = document.querySelector("#weather-description");
const weatherIcon = document.querySelector("#weather-icon");
const otherInfo = document.querySelector("#other-info");
const futureForecast = document.querySelector("#future");
const mainContainer = document.querySelector("#main-container");

//Defining States

let currentInfo = null;
let dailyInfo = null;
let cityName = "";
let country = "";
let currentWeatherInfo;

mainContainer.classList.add("hidden");

searchForm.addEventListener("submit", handleSearch);

// Get Coordinates of a place
async function getCoordinates() {
  const response = await fetch(geo_endpoint + "?name=" + cityInput.value);
  const data = await response.json();
  cityName = data.results[0].name;
  country = data.results[0].country;

  return data.results[0];
}

//Get Weahter Information
async function handleSearch(event) {
  event.preventDefault();
  const coordinate = await getCoordinates();
  const response = await fetch(
    weather_endpoint +
      "?latitude=" +
      coordinate.latitude +
      "&longitude=" +
      coordinate.longitude +
      "&timezone=auto" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean&forecast_days=5&current=temperature_2m,rain,wind_speed_10m,pressure_msl,weather_code,relative_humidity_2m,apparent_temperature",
  );
  const data = await response.json();
  currentInfo = [data.current, data.current_units];
  dailyInfo = [data.daily, data.daily_units];
  currentWeatherInfo = getWeatherInfo(data.current.weather_code);
  console.log(currentWeatherInfo);
  renderUi();
}

// Render Ui

function renderUi() {
  mainContainer.classList.remove("hidden");
  //  Header Component Left Section -- City, Country And Time
  futureForecast.innerHTML = "";
  leftContainer.innerHTML = "";
  otherInfo.innerHTML = "";
  weatherIcon.innerHTML = "";
  weatherDescription.innerHTML = "";
  const date = new Date(currentInfo[0].time);
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  const cityDiv = document.createElement("p");
  cityDiv.className = "text-2xl font-semibold";
  cityDiv.textContent = cityName;

  const countryDiv = document.createElement("p");
  countryDiv.textContent = country;

  const dateTime = document.createElement("p");
  const daySpan = document.createElement("span");
  daySpan.textContent = day;

  const timeSpan = document.createElement("span");

  timeSpan.textContent = time;
  dateTime.append(daySpan, timeSpan);

  leftContainer.append(cityDiv, countryDiv, dateTime);

  // Header Component Weahter Info -  Icon and description
  const icon = document.createElement("img");
  icon.src = currentWeatherInfo.icon;
  weatherIcon.append(icon);

  const temperature = document.createElement("p");
  temperature.className = "text-4xl font-bold";
  temperature.textContent = `${currentInfo[0].temperature_2m} ${currentInfo[1].temperature_2m}`;

  const description = document.createElement("p");
  description.textContent = currentWeatherInfo.description;
  weatherDescription.append(temperature, description);

  //Header Component Right Section
  const humidity = document.createElement("p");
  humidity.textContent = `${currentInfo?.[0].relative_humidity_2m}%`;
  const wind = document.createElement("p");
  wind.textContent = `${currentInfo?.[0].wind_speed_10m} km/h`;
  const apparentTemperature = document.createElement("p");
  apparentTemperature.textContent = `${currentInfo?.[0].apparent_temperature} °C`;
  const presssure = document.createElement("p");
  presssure.textContent = `${currentInfo?.[0].pressure_msl} hPa`;

  otherInfo.append(humidity, wind, apparentTemperature, presssure);

  // 5 day weather informations
  dailyInfo?.[0]?.time?.map((daily, index) => {
    // futureForecast.innerHTML = "";
    // Each Grid Element
    const container = document.createElement("div");
    container.className =
      "bg-[#FFFFFF] rounded-lg flex flex-col justify-center gap-1 items-center";

    // Formating day , date, and month from time
    const date = new Date(daily);
    const formatedDate = Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(date);
    const formatedDay = Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
    // Day
    const day = document.createElement("p");
    day.className = "font-bold tracking-light";
    day.textContent = formatedDay;

    // Date and Month
    const dateMonth = document.createElement("p");
    dateMonth.textContent = formatedDate;

    //Weather Determined
    const dailyWeatherInfo = getWeatherInfo(
      dailyInfo?.[0]?.weather_code?.[index],
    );

    //Weather Icon
    const imgContainer = document.createElement("div");
    imgContainer.className = "w-20";
    const icon = document.createElement("img");
    icon.src = dailyWeatherInfo?.icon;
    imgContainer.append(icon);

    //Temperature
    const temperature = document.createElement("p");
    temperature.textContent = `${dailyInfo?.[0]?.temperature_2m_mean?.[index]} °C`;
    //Weather
    const weather = document.createElement("p");
    weather.textContent = dailyWeatherInfo?.description;
    container.append(day, dateMonth, imgContainer, temperature, weather);
    futureForecast.append(container);
  });
}
