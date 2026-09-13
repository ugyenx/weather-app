export function getWeatherInfo(code) {
  if (code === 0) {
    return {
      description: "Clear Sky",
      icon: "./assets/sun.png",
    };
  }

  if (code >= 1 && code <= 3) {
    return {
      description: "Cloudy",
      icon: "./assets/sun-cloud.png",
    };
  }

  if (code === 45 || code === 48) {
    return {
      description: "Foggy",
      icon: "./assets/sun-cloud.png",
    };
  }

  if (code >= 51 && code <= 57) {
    return {
      description: "Drizzle",
      icon: "./assets/rain.png",
    };
  }

  if (code >= 61 && code <= 67) {
    return {
      description: "Rain",
      icon: "./assets/rain.png",
    };
  }

  if (code >= 71 && code <= 77) {
    return {
      description: "Snow",
      icon: "./assets/snow-cloud.png",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      description: "Rain Showers",
      icon: "./assets/rain.png",
    };
  }

  if (code === 85 || code === 86) {
    return {
      description: "Snow Showers",
      icon: "./assets/snow-cloud.png",
    };
  }

  if (code >= 95 && code <= 99) {
    return {
      description: "Thunderstorm",
      icon: "./assets/thunderstorm.png",
    };
  }

  return {
    description: "Unknown",
    icon: "./assets/sun.png",
  };
}
