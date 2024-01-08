import axios from "axios";

//development
// export const backendBaseURL = "http://127.0.0.1:5001";

//production
export const backendBaseURL = "https://anakedape.onrender.com";

const customFetch = axios.create({
  //development
  // baseURL: `${backendBaseURL}/api/`,

  //production
  baseURL: "/api/",

  withCredentials: true,
});

export default customFetch;
