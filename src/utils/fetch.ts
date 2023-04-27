import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const AxiosGet = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_URL,
    method: 'GET',
  };
  return axios.create(axiosConfig);
};
export const AxiosPost = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_URL,
    method: 'POST',
  };
  return axios.create(axiosConfig);
};
