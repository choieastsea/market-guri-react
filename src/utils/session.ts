import { AxiosGet } from './fetch';

const getSession = async () => {
  try {
    const response = await AxiosGet().get('user/session/');
    return response.data?.detail;
  } catch (e) {
    throw Error('세션 정보 받기 실패');
  }
};
const logout = async () => {
  try {
    const response = await AxiosGet().get('user/logout/');
    return response.data?.detail;
  } catch (e) {
    throw Error('로그아웃 실패');
  }
};

export { getSession, logout };
