const API_KEY = "";

const loading = document.querySelector(".loading");
const weatherWrap = document.querySelector(".weather");

const locationEl = document.querySelector(".location");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".desc");
const iconEl = document.querySelector(".icon img");

const feelEl = document.querySelector(".feel");
const humidityEl = document.querySelector(".humidity");
const maxEl = document.querySelector(".max");
const windEl = document.querySelector(".wind");
const clothingEl = document.querySelector(".clothing");
const timeEl = document.querySelector(".time");

function updateClock() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");

  timeEl.innerText = `${year}.${month}.${date} ${hour}:${min}:${sec}`;
}

setInterval(updateClock, 1000);
updateClock();

function getClothing(temp) {
  if (temp >= 28) {
    return "👕 반팔, 반바지 추천";
  }

  if (temp >= 23) {
    return "😎 얇은 셔츠 추천";
  }

  if (temp >= 17) {
    return "🧥 가디건 추천";
  }

  if (temp >= 10) {
    return "🧥 자켓 추천";
  }

  return "🥶 두꺼운 외투 추천";
}

function changeBackground(weather) {
  switch (weather) {
    case "Clear":
      document.body.style.background =
        "linear-gradient(to top,#4facfe,#00f2fe)";
      break;

    case "Clouds":
      document.body.style.background =
        "linear-gradient(to top,#757f9a,#d7dde8)";
      break;

    case "Rain":
      document.body.style.background =
        "linear-gradient(to top,#373b44,#4286f4)";
      break;

    case "Snow":
      document.body.style.background =
        "linear-gradient(to top,#e6dada,#274046)";
      break;

    default:
      document.body.style.background =
        "linear-gradient(to top,#667db6,#0082c8)";
  }
}

function weather(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const city = data.name;
      const temp = Math.round(data.main.temp);
      const feel = Math.round(data.main.feels_like);
      const humidity = data.main.humidity;
      const max = Math.round(data.main.temp_max);
      const wind = data.wind.speed;

      const desc = data.weather[0].description;
      const weatherMain = data.weather[0].main;
      const icon = data.weather[0].icon;

      locationEl.innerText = `📍 ${city}`;
      tempEl.innerText = `${temp}°`;
      descEl.innerText = desc;

      feelEl.innerText = `${feel}°`;
      humidityEl.innerText = `${humidity}%`;
      maxEl.innerText = `${max}°`;
      windEl.innerText = `${wind}m/s`;

      clothingEl.innerText = getClothing(temp);

      iconEl.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

      changeBackground(weatherMain);

      loading.style.display = "none";
      weatherWrap.style.display = "block";
    });
}

navigator.geolocation.getCurrentPosition(weather, () => {
  alert("위치 권한을 허용해주세요.");
});
