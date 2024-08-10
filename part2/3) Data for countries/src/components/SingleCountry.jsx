import { useEffect, useState } from "react";
import countryService from "../services/countries";

const SingleCountry = ({ country }) => {
    const [weather, setWeather] = useState({
        temp: 0,
        icon: '',
        windSpeed: 0
    });

    const [loading, setLoading] = useState(true);

    const celsiusConvertor = kelvin => (kelvin - 273.15).toFixed(2);

    useEffect(() => {
        const response = countryService.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]);
        response.then(res => {
            const temp = celsiusConvertor(res.main.temp);

            const weatherIcon = res.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            const windSpeed = res.wind.speed;

            setWeather({
                temp: temp,
                icon: iconUrl,
                windSpeed: windSpeed
            });

            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    console.log(weather);
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <h2>Weather in {country.capital}</h2>
            <p>tempreture {weather.temp}°C</p>
            <img src={weather.icon} alt="weather image" />
            <p>wind {weather.windSpeed} m/s</p>
        </>
    );
};

export default SingleCountry;