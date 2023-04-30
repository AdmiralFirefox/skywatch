import Axios from "axios";
import dayjs from "dayjs";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    330: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    650: {
      slidesPerView: 4,
      spaceBetween: 15,
    },

    760: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  },
});

const dateFormat = (locationDateValue, timeZoneOffSetValue) => {
  const timestamp = locationDateValue;
  const timeZoneOffset = timeZoneOffSetValue;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("MMM D");

  return formattedDate;
};

const timeFormat = (locationDateValue, timeZoneOffSetValue) => {
  const timestamp = locationDateValue;
  const timeZoneOffset = timeZoneOffSetValue;
  const date = new Date(timestamp * 1000);
  const localTimestamp =
    timestamp + date.getTimezoneOffset() * 60 + timeZoneOffset;
  const localDate = new Date(localTimestamp * 1000);
  const formattedDate = dayjs(localDate).format("h:mm a");

  return formattedDate;
};

export const displayPlaceWeatherForecast = async (place) => {
  const swiperWrapper = document.querySelector("#swiper-wrapper");

  while (swiperWrapper.hasChildNodes()) {
    swiperWrapper.removeChild(swiperWrapper.lastChild);
  }

  try {
    const res = await Axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const weatherData = res.data;

    weatherData.list.map((weather) => {
      const weatherWrapper = document.createElement("div");
      weatherWrapper.classList.add("swiper-slide");

      const weatherDay = document.createElement("p");
      const weatherTime = document.createElement("p");
      const weatherIcon = document.createElement("img");
      const weatherTemp = document.createElement("p");
      const weatherDescription = document.createElement("p");

      weatherDay.textContent = dateFormat(
        weather.dt,
        weatherData.city.timezone
      );
      weatherTime.textContent = timeFormat(
        weather.dt,
        weatherData.city.timezone
      );
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
      weatherIcon.alt = "Weather Icon";
      weatherTemp.textContent = `${Math.round(weather.main.temp)}°`;
      weatherDescription.textContent = weather.weather[0].main;

      swiperWrapper.appendChild(weatherWrapper);
      weatherWrapper.appendChild(weatherDay);
      weatherWrapper.appendChild(weatherTime);
      weatherWrapper.appendChild(weatherIcon);
      weatherWrapper.appendChild(weatherTemp);
      weatherWrapper.appendChild(weatherDescription);
    });
  } catch (err) {
    console.log(err);
  }
};
