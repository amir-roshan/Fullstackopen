import CountryItem from "./CountryItem";

const CountriesList = ({ filteredCountries }) => {
    return (
        <ul>
            {filteredCountries.map(country => (
                <CountryItem key={country.cca3} country={country} />
            ))}
        </ul>
    );
};

export default CountriesList;