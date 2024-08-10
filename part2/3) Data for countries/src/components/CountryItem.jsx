import { useState } from "react";
import SingleCountry from "./SingleCountry";

const CountryItem = ({ country }) => {
    const [isShown, setIsShown] = useState(false);

    const handleDisplay = () => {
        setIsShown(!isShown);
    };

    return <>
        {!isShown && <li>{country.name.common} <button onClick={handleDisplay}>Show</button></li>}
        {isShown && <li><SingleCountry country={country} /> <button onClick={handleDisplay}>Hide</button></li>}
    </>;
};

export default CountryItem;