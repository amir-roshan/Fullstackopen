import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const add = newPerson => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);
};

const remove = (id) => {
    console.log(`Deleted the person with ID ${id}`);
    return axios.delete(`${baseUrl}/${id}`);
};

const update = (personObj) => {
    console.log("Update", personObj);
    return axios.put(`${baseUrl}/${personObj.id}`, personObj);
};

export default { getAll, add, remove, update };