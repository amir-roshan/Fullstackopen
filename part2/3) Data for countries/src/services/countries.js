import axios from "axios";

const contriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";


const getAllcountries = () => {
    const res = axios.get(contriesUrl);
    return res.then(respond => respond.data);
};

const getWeather = (lat, lon) => {
    const res = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
    return res.then(respond => respond.data);
};

export default { getAllcountries, getWeather };
