module.exports = {
  register_user: {
    controller: "user_auth",
    function: "registerUser",
  },
  register_empl: {
    controller: "user_auth",
    function: "registerEmpl",
  },
  user_verification: {
    controller: "user_auth",
    function: "userVerification",
  },
  login_user: {
    controller: "user_auth",
    function: "loginUser",
  },
  logout_user: {
    controller: "user_auth",
    function: "logoutUser",
  },
  refresh_token: {
    controller: "token",
    function: "refreshToken",
  },
  verify_username: {
    controller: "user_auth",
    function: "userNameVerification",
  },
  user_id_check: {
    controller: "user_auth",
    function: "userIdCheck",
  },
  request_for_change_password: {
    controller: "user_auth",
    function: "requestForChangePassword",
  },
  social_login: {
    controller: "user_auth",
    function: "socialLogin",
  },
  change_userid: {
    controller: "user_auth",
    function: "changeUserid",
  },
  change_password: {
    controller: "user_auth",
    function: "changePassword",
  },
  verify_user_list: {
    controller: "user_auth",
    function: "verifyUserList",
  },
  requested_for_user_verification: {
    controller: "user_auth",
    function: "requestedForUserVerification",
  },
  action_user_verification: {
    controller: "user_auth",
    function: "actionUserVerification",
  },
  user_details: {
    controller: "dashboard_auth",
    function: "userDetails",
  },
  update_details: {
    controller: "dashboard_auth",
    function: "updateDetails",
  },
  update_project: {
    controller: "dashboard_auth",
    function: "updateProject",
  },
  update_task: {
    controller: "dashboard_auth",
    function: "updateTask",
  },
  update_clock: {
    controller: "dashboard_auth",
    function: "updateClock",
  },
  search_user: {
    controller: "dashboard_auth",
    function: "searchUser",
  },
  details_by_id: {
    controller: "dashboard_auth",
    function: "detailsById",
  },
  all_user: {
    controller: "dashboard_auth",
    function: "allUser",
  },
  delete_user: {
    controller: "dashboard_auth",
    function: "deleteUser",
  },
  app_config: {
    controller: "dashboard_auth",
    function: "appConfig",
  },
  firebase_token: {
    controller: "dashboard_auth",
    function: "firebaseToken",
  },
  my_notification: {
    controller: "dashboard_auth",
    function: "myNotification",
  },
  search_project: {
    controller: "dashboard_auth",
    function: "searchProject",
  },
  search_task: {
    controller: "dashboard_auth",
    function: "searchTask",
  },
  my_chat_list: {
    controller: "booking_auth",
    function: "myChatList",
  },
};
