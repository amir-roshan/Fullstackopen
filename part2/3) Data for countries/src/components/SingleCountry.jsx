const SingleCountry = ({ country }) => {
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
        </>
    );
};

export default SingleCountry;