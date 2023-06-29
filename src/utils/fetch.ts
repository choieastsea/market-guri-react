import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const AxiosGet = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_URL,
    method: 'GET',
    withCredentials: true,
  };
  return axios.create(axiosConfig);
};
export const AxiosPost = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_URL,
    method: 'POST',
    withCredentials: true,
  };
  const customAxios = axios.create(axiosConfig);
  // 요청을 보내기 전, cookie에 접근하여 X-CSRFToken header를 초기화
  customAxios.interceptors.request.use((config) => {
    config.headers['X-CSRFToken'] =
      document.cookie.indexOf('csrftoken=') !== -1 ? document.cookie.split('csrftoken=')[1] : '';
    return config;
  });
  return customAxios;
};

export const getCSRF = async () => {
  const { data } = await AxiosGet().get('/user/get_csrf/');
  console.log(data);
};
