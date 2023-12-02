import axiosObj from './axiosConfig';
import {API} from '../constants/apiConstant';
import {apiEncryptionData} from '../utils';

const OutsideAuthApi = () => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const formDataHeaders = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    userDetailsApi(param) {
      return axiosObj({
        url: API.noAuthUrls.userDetails + param,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    loginApi(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.login,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    verifyOtp(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.otpVerify,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    requestForChangePassword(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.requestForChangePassword,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    registerUserApi(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.registerUser,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    changePasswordApi(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.changePassword,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    userIdCheckApi(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.userIdCheck,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    categoryListApi() {
      return axiosObj({
        url: API.noAuthUrls.categoryList,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    searchPostApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.searchPost + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    getPostsApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.getPosts + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    tagListApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.tagList + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    getPostDetailsApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.getPostDetails + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    allUserApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.allUser + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    searchUserApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.searchUser + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    socialLoginApi(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.socialLogin,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    appConfigApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.appConfig + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    myNotificationApi(param) {
      const varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.myNotification + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    getReviewForOtherApi(param) {
      let varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.getReviewForOther + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    getBannerApi(param) {
      let varData = apiEncryptionData(param, true);
      return axiosObj({
        url: API.noAuthUrls.getBanner + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    refreshTokenCall(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.refreshToken,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    firebaseTokenCall(data) {
      const varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.firebaseToken,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    findBookingById(data) {
      const varData = apiEncryptionData(data, true);
      return axiosObj({
        url: API.noAuthUrls.findBookingById + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
    createReport(data) {
      let varData = apiEncryptionData(data);
      return axiosObj({
        url: API.noAuthUrls.createReport,
        method: 'POST',
        headers: {...defaultHeaders},
        data: varData,
      });
    },
    findreviewById(data) {
      const varData = apiEncryptionData(data, true);
      return axiosObj({
        url: API.noAuthUrls.findreviewById + varData,
        method: 'GET',
        headers: {...defaultHeaders},
      });
    },
  };
};

export default OutsideAuthApi;
