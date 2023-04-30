import Axios from "axios";

export const displaySectionFourContent = async (latitude, longitude) => {
  const airQualityIndexWrapper = document.querySelector(
    "#air-quality-index-wrapper"
  );
  const airQualityIndex = document.querySelector("#air-quality-index");

  try {
    const res = await Axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );

    const airData = res.data;

    airQualityIndex.textContent = airData.list[0].main.aqi;

    // Check Air Quality Index
    if (airData.list[0].main.aqi === 1 || airData.list[0].main.aqi === 2) {
      airQualityIndexWrapper.style.background = "#58DAAB";
    } else if (airData.list[0].main.aqi === 3) {
      airQualityIndexWrapper.style.background = "#EEE657";
    } else if (airData.list[0].main.aqi === 4) {
      airQualityIndexWrapper.style.background = "#FCB941";
    } else {
      airQualityIndexWrapper.style.background = "#FC6042";
    }
  } catch (err) {
    console.log(err);
  }
};
