import axios from "axios";

const getRequest = async (apiURL: string) => {
  const { data } = await axios.get(apiURL, {
    withCredentials: true,
  });
  return data;
};

export { getRequest };
