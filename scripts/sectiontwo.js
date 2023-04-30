import dayjs from "dayjs";

const timeZoneOffset = (locationDateValue, timeZoneOffSetValue) => {
  const timestamp = locationDateValue;
  const timeZoneOffset = timeZoneOffSetValue;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("h:mm a");

  return formattedDate;
};

export const displaySectionTwoContent = (
  sunrise,
  timezone,
  sunset,
  humidity,
  pressure,
  wind,
  visibility,
  cloudiness
) => {
  const timeSunrise = document.querySelector("#sunrise");
  const timeSunset = document.querySelector("#sunset");
  const locationHumidity = document.querySelector("#humidity");
  const locationPressure = document.querySelector("#pressure");
  const locationWind = document.querySelector("#wind");
  const locationVisibility = document.querySelector("#visibility");
  const locationCloudiness = document.querySelector("#cloudiness");

  timeSunrise.textContent = timeZoneOffset(sunrise, timezone);
  timeSunset.textContent = timeZoneOffset(sunset, timezone);
  locationHumidity.textContent = `${humidity}%`;
  locationPressure.textContent = `${pressure} hPa`;
  locationWind.textContent = `${wind} m/s`;
  locationVisibility.textContent = `${Math.round(visibility / 1000)} km`;
  locationCloudiness.textContent = `${cloudiness}%`;
};
