import axios from "axios";

const getRequest = async (apiURL: string) => {
  const { data } = await axios.get(apiURL);
  return data;
};

export { getRequest };
