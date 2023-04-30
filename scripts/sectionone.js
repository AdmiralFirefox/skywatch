import dayjs from "dayjs";

export const displaySectionOneContent = (
  main,
  min,
  max,
  place,
  country,
  locationDateValue,
  timeZoneOffSetValue,
  icon,
  condition
) => {
  const mainTemp = document.querySelector("#main-temp");
  const minTemp = document.querySelector("#min-temp");
  const maxTemp = document.querySelector("#max-temp");
  const weatherLocation = document.querySelector("#weather-location");
  const locationDate = document.querySelector("#location-date");
  const weatherIcon = document.querySelector("#weather-icon");
  const weatherCondition = document.querySelector("#weather-condition");

  const timestamp = locationDateValue;
  const timeZoneOffset = timeZoneOffSetValue;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("h:mm a, MMM D, YYYY");

  mainTemp.textContent = `${Math.round(main)}°`;
  minTemp.textContent = `${Math.round(min)}°`;
  maxTemp.textContent = `${Math.round(max)}°`;
  weatherLocation.textContent = `${place}, ${country}`;
  locationDate.textContent = formattedDate;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
  weatherCondition.textContent = condition;
};
