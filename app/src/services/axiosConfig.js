import axios from 'axios';
import { API } from '../constants/apiConstant';
import validation from '../constants/validationMsg';
import ReduxStore from '../store';
import { tokenUpdate } from '../store/actions';
import { apiDecryptionData, saveFncToStore } from '../utils'
const { dispatch } = ReduxStore;

const axiosObj = (info) => {
  const { url, method, headers, data } = info;
  const AxiosInstance = axios.create({
    baseURL: API.baseUrls[API.currentEnv],
    headers,
  });
  // AxiosInstance.defaults.timeout = 20000;


  AxiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (e) => {
      return Promise.reject(e);
    },
  );

  const errorMsg = async (error, Promise) => {
    if (error.response && error.response.data && error.response.data.data && error.response.data.data?.encritption) {
      const decryptedData = apiDecryptionData(error.response.data.data);
      if (decryptedData.error_code === 'E-534') {
        dispatch(tokenUpdate({
          access_token: '',
          refresh_token: ''
        }))
        return Promise.reject({ message: validation.generaleError });
      } else {
        return Promise.reject({ data: decryptedData });
      }
    } else if (error?.response?.data?.error_code === 'E-534') {
      dispatch(tokenUpdate({
        access_token: '',
        refresh_token: ''
      }))
      return Promise.reject({ message: validation.generaleError });
    } else if (error?.response?.data) {
      return Promise.reject({ data: error.response.data });
    } else {
      return Promise.reject({ message: error?.toString() });
    }
  }

  AxiosInstance.interceptors.response.use(
    (response) => {
      if (response.data && response.data.data && response.data.data?.encritption) {
        const decryptedData = apiDecryptionData(response.data.data);
        return { data: decryptedData };
      }
      return response.data;
    },
    async (error) => {
      const originalRequest = error.config;
      if ((error.config && error.response && error.response.status === 401 && !originalRequest._retry)) {
        originalRequest._retry = true;
        const tokenData = {
          access_token: ReduxStore.getState().auth.access_token,
          refresh_token: ReduxStore.getState().auth.refresh_token,
        };
        if (tokenData && tokenData.refresh_token) {
          try {
            const data = { refresh_token: tokenData?.refresh_token ? tokenData.refresh_token : '' };
            return await axios.post(API.baseUrls[API.currentEnv] + API.noAuthUrls.refreshToken, data)
              .then(async response => {
                let resData = response;
                if (response.data && response.data.data && response.data.data?.encritption) {
                  const decryptedData = apiDecryptionData(response.data.data);
                  resData.data = { data: decryptedData };
                }
                tokenData.access_token = resData.data.data.access_token;
                await saveFncToStore('token', tokenData);
                dispatch(tokenUpdate({
                  access_token: resData.data.data.access_token,
                  refresh_token: tokenData.refresh_token
                }))
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;
                return await AxiosInstance(originalRequest);
              })
          } catch (error) {
            return await errorMsg(error, Promise)
          }
        } else {
          return await errorMsg(error, Promise)
        }
      } else {
        return await errorMsg(error, Promise)
      }
    }
  );

  return AxiosInstance({ url, method, headers, data });
};

export default axiosObj;