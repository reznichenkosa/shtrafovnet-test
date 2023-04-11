import axios from "axios";

const API_URL = process.env.API_URL || "/api/";

export const apiInstance = axios.create({
  baseURL: API_URL,
});
