import axiosObj from './axiosConfig';
import { API } from '../constants/apiConstant';
import { apiEncryptionData } from '../utils';
import ReduxStore from '../store';

const InsideAuthApi = () => {
    // const defaultHeaders = {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + authStore.access_token
    // };
    // const formDataHeaders = {
    //     "Content-Type": "multipart/form-data",
    //     "Authorization": "Bearer " + authStore.access_token
    // };
    return {
        async detailsApi() {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            return axiosObj({
                url: API.authUrls.details,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async updateDetailsApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updateDetails,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async createPost(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createPost,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async updatePost(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updatePost,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async createApplicationApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createApplication,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async updateApplicationApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updateApplication,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData,
            })
        },
        async getAllApplicationsApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getAllApplications + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getApplicationDetailsApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getApplicationDetails + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getMyPostApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getMyPost + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async getReviewApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.getReview + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async createReviewApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createReview,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async updateLocationApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.updateLocation,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async addTagApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.addTag,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editTagApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editTag,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async saveTagApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.saveTag + varData,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
        async getSaveTagApi() {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            return axiosObj({
                url: API.authUrls.getSaveTag,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async bookingListApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.bookingList + varData,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async addBookingApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.addBooking,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editBookinggApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editBooking,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editReviewApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editReview,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async myChatListApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(param, true);
            return axiosObj({
                url: API.authUrls.myChatList + varData,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async createCategoryApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.createCategory,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async editCategoryApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.editCategory,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async bannerAddApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.bannerAdd,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async bannerUpdateApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.bannerUpdate,
                method: 'PATCH',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async changeUseridApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            const varData = apiEncryptionData(data);
            return axiosObj({
                url: API.authUrls.changeUserid,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async bookingListForAllApi(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(param, true)
            return axiosObj({
                url: API.authUrls.bookingListForAll + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async requestedForUserVerification(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(data)
            return axiosObj({
                url: API.authUrls.requestedForUserVerification,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async verifyUserList(param) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(param, true)
            return axiosObj({
                url: API.authUrls.verifyUserList + varData,
                method: 'GET',
                headers: { ...defaultHeaders }
            })
        },
        async actionUserVerification(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(data)
            return axiosObj({
                url: API.authUrls.actionUserVerification,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async getPendingApproveApi() {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            return axiosObj({
                url: API.authUrls.getPendingApprove,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async approvePostApi(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(data)
            return axiosObj({
                url: API.authUrls.approvePost,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async viewReports(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(data, true)
            return axiosObj({
                url: API.authUrls.viewReports + varData,
                method: 'GET',
                headers: { ...defaultHeaders },
            })
        },
        async reportAction(data) {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            let varData = apiEncryptionData(data)
            return axiosObj({
                url: API.authUrls.reportAction,
                method: 'POST',
                headers: { ...defaultHeaders },
                data: varData
            })
        },
        async logout() {
            const token = ReduxStore.getState().auth.access_token;
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };
            return axiosObj({
                url: API.authUrls.logout,
                method: 'POST',
                headers: { ...defaultHeaders },
            })
        },
    }
}

export default InsideAuthApi;