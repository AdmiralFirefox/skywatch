import dayjs from "dayjs";

export const displaySectionOneContent = (
  main,
  min,
  max,
  place,
  country,
  timeZoneOffSetValue,
  icon,
  condition,
  weatherCard,
  errorCard,
  loadingCard
) => {
  const mainBody = document.body;
  const backToHome = document.querySelector("#back-to-home");

  const mainTemp = document.querySelector("#main-temp");
  const minTemp = document.querySelector("#min-temp");
  const maxTemp = document.querySelector("#max-temp");
  const weatherLocation = document.querySelector("#weather-location");
  const locationDate = document.querySelector("#location-date");
  const weatherIcon = document.querySelector("#weather-icon");
  const weatherCondition = document.querySelector("#weather-condition");

  let currentTime = new Date().getTime();
  currentTime = (currentTime - (currentTime % 1000)) / 1000;

  const timestamp = currentTime;
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

  // Check if it's Morning or Evening
  const localHour = localDate.getHours();
  if (localHour >= 6 && localHour < 18) {
    mainBody.style.background =
      "url('/images/day-background.jpg') no-repeat top center fixed";
    mainBody.style.backgroundSize = "cover";
    backToHome.style.background = "#18425A";
    weatherCard.style.background = "hsla(202, 58%, 35%, 0.75)";
    errorCard.style.background = "hsla(202, 58%, 35%, 0.75)";
    loadingCard.style.background = "hsla(202, 58%, 35%, 0.75)";

    backToHome.addEventListener(
      "mouseenter",
      (e) => {
        e.target.style.background = "hsl(202, 58%, 32%)";
      },
      false
    );

    backToHome.addEventListener(
      "mouseleave",
      (e) => {
        e.target.style.background = "#18425A";
      },
      false
    );
  } else {
    mainBody.style.background =
      "url('/images/night-background.jpg') no-repeat top center fixed";
    mainBody.style.backgroundSize = "cover";
    backToHome.style.background = "hsl(254, 14%, 40%)";
    weatherCard.style.background = "hsla(254, 14%, 45%, 0.75)";
    errorCard.style.background = "hsla(254, 14%, 45%, 0.75)";
    loadingCard.style.background = "hsla(254, 14%, 45%, 0.75)";

    backToHome.addEventListener(
      "mouseenter",
      (e) => {
        e.target.style.background = "hsl(254, 14%, 50%)";
      },
      false
    );

    backToHome.addEventListener(
      "mouseleave",
      (e) => {
        e.target.style.background = "hsl(254, 14%, 40%)";
      },
      false
    );
  }
};
