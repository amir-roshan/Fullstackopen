import { useEffect, useState } from "react";

import countryService from "./services/countries";
import SingleCountry from "./components/SingleCountry";
import CountriesList from "./components/CountriesList";

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
    };

    return (
        <>
            find countries <input type="text" onChange={handleSearch} />
            {filteredCountries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {filteredCountries.length === 1 &&
                <SingleCountry country={filteredCountries[0]} />
            }

            {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
                <CountriesList filteredCountries={filteredCountries} />

            )
            }

            {filteredCountries.length === 0 &&
                <p>No matches found</p>
            }

        </>
    );
};

export default App;