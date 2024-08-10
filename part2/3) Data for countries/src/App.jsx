import { useEffect, useState } from "react";
import countryService from "./services/countries";

const App = () => {
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        const data = countryService.getAllcountries();
        data.then(res => {
            setAllCountries(allCountries.concat(res));
        });

    }, []);

    const handleSearch = (event) => {
        const countryName = event.target.value;
        setFilteredCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(countryName)));
        console.log(filteredCountries);
    };

    return (
        <>
            find countries <input type="text" onChange={handleSearch} />
            {filteredCountries.length > 10
                ? <p>Too many matches, specify another filter</p>
                : filteredCountries.length === 1
                    ? <div>
                        <h1>{filteredCountries[0].name.common}</h1>
                        <p>{filteredCountries[0].capital}</p>
                        <p>{filteredCountries[0].area}</p>
                        <h3>Languages</h3>
                        <ul>
                            {Object.keys(filteredCountries[0].languages).map(key => {
                                <li key={key}>
                                    {key}: {filteredCountries[0].languages[key]}
                                </li>;
                            })}
                        </ul>
                        <img src={filteredCountries[0].flags.png} alt={`${filteredCountries[0].name.common} flag`} />
                    </div>
                    : filteredCountries.length > 1
                        ? <ul>
                            {filteredCountries.map(country => (
                                <li key={country.cca3}>{country.name.common}</li>
                            ))}
                        </ul>
                        : <p>No matches found</p>
            }

        </>
    );
};

export default App;