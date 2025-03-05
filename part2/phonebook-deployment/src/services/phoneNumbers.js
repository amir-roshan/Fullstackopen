import axios from "axios";

const baseUrl = "https://part3-little-lake-2511.fly.dev/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error Data:", error.response.data);
    console.log("Error", error);
    return error.response.data;
  }
};

const add = async (newPerson) => {
  try {
    const request = axios.post(baseUrl, newPerson);
    const response = await request;
    return response.data;
  } catch (error) {
    console.log("Error Message:", error.response.data.error);
    console.error("Error Data:", error.response.data);
    console.log("Error", error);
    throw error.response.data.error;
  }
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
