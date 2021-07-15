//const ACCESS_TOKEN_MAP_BOX = `af950129f2c641f2a411ee20a2fb518c`;

export type TWeather = {
  date: number;
  weather: string;
  temp2m: {
    max: number;
    min: number;
  };
  wind10m_max: number;
};
export const fetchCurrentWeatherByLocation = (
  latitude: number,
  longitude: number,
): Promise<TWeather[]> =>
  fetch(
    `https://www.7timer.info/bin/civillight.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json&tzshift=0`,
    //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ACCESS_TOKEN_MAP_BOX}`,
  )
    .then(response => response.json())
    .then(data => data.dataseries);
