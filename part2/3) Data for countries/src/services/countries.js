import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";


const getAllcountries = () => {
    const res = axios.get(baseUrl);
    return res.then(respond => respond.data);
};

export default { getAllcountries };
