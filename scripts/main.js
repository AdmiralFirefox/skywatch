import Axios from "axios";
import { displaySectionOneContent } from "./sectionone";

// Inputs
const placeInputForm = document.querySelector("#place-input-form");
const placeInput = document.querySelector("#place-input");

// Cards
const loadingCard = document.querySelector("#loading-card");
const errorCard = document.querySelector("#error-card");
const initialContentCard = document.querySelector("#initial-content-card");
const weatherCard = document.querySelector("#weather-card");

// Display Weather Data
const displayPlaceWeather = async (place) => {
  loadingCard.classList.remove("no-display");
  errorCard.classList.add("no-display");
  weatherCard.classList.add("no-display");
  initialContentCard.remove();

  try {
    const res = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const weather = res.data;

    // console.log(weather);
    placeInput.value = "";
    loadingCard.classList.add("no-display");
    errorCard.classList.add("no-display");
    weatherCard.classList.remove("no-display");

    // Section One
    displaySectionOneContent(
      weather.main.temp,
      weather.main.temp_min,
      weather.main.temp_max,
      weather.name,
      weather.sys.country,
      weather.dt,
      weather.timezone,
      weather.weather[0].icon,
      weather.weather[0].description,
      weatherCard,
      errorCard,
      loadingCard
    );
  } catch (err) {
    console.log(err);
    placeInput.value = "";
    loadingCard.classList.add("no-display");
    errorCard.classList.remove("no-display");
    weatherCard.classList.add("no-display");
  }
};

// Input Place
placeInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let placeValue = placeInput.value;

  displayPlaceWeather(placeValue);
});
