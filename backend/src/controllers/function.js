module.exports = {
  register_user: {
    controller: "user_auth",
    function: "registerUser",
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
  update_location: {
    controller: "dashboard_auth",
    function: "updateLocation",
  },
  category_list: {
    controller: "dashboard_auth",
    function: "categoryList",
  },
  edit_category: {
    controller: "dashboard_auth",
    function: "editCategory",
  },
  create_category: {
    controller: "dashboard_auth",
    function: "createCategory",
  },
  search_user: {
    controller: "dashboard_auth",
    function: "searchUser",
  },
  referral: {
    controller: "dashboard_auth",
    function: "referral",
  },
  get_review: {
    controller: "dashboard_auth",
    function: "getReview",
  },
  get_review_for_other: {
    controller: "dashboard_auth",
    function: "getReviewForOther",
  },
  edit_review: {
    controller: "dashboard_auth",
    function: "editReview",
  },
  create_review: {
    controller: "dashboard_auth",
    function: "createReview",
  },
  find_review_by_id: {
    controller: "dashboard_auth",
    function: "findReviewById",
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
  create_post: {
    controller: "post_auth",
    function: "createPost",
  },
  update_post: {
    controller: "post_auth",
    function: "updatePost",
  },
  approve_post: {
    controller: "post_auth",
    function: "approvePost",
  },
  get_pending_approve: {
    controller: "post_auth",
    function: "getPendingApprove",
  },
  create_application: {
    controller: "post_auth",
    function: "createApplication",
  },
  update_application: {
    controller: "post_auth",
    function: "updateApplication",
  },
  get_posts: {
    controller: "post_auth",
    function: "getPosts",
  },
  get_my_post: {
    controller: "post_auth",
    function: "getMyPost",
  },
  get_all_applications: {
    controller: "post_auth",
    function: "getAllApplications",
  },
  get_application_details: {
    controller: "post_auth",
    function: "getApplicationDetails",
  },
  get_post_details: {
    controller: "post_auth",
    function: "getPostDetails",
  },
  search_post: {
    controller: "post_auth",
    function: "searchPost",
  },
  create_report: {
    controller: "post_auth",
    function: "createReport",
  },
  view_reports: {
    controller: "post_auth",
    function: "viewReports",
  },
  report_action: {
    controller: "post_auth",
    function: "reportAction",
  },
  add_tag: {
    controller: "tags_auth",
    function: "addTag",
  },
  tag_list: {
    controller: "tags_auth",
    function: "tagList",
  },
  edit_tag: {
    controller: "tags_auth",
    function: "editTag",
  },
  save_tag: {
    controller: "tags_auth",
    function: "saveTag",
  },
  get_save_tag: {
    controller: "tags_auth",
    function: "getSaveTag",
  },
  add_booking: {
    controller: "booking_auth",
    function: "addBooking",
  },
  edit_booking: {
    controller: "booking_auth",
    function: "editBooking",
  },
  booking_list: {
    controller: "booking_auth",
    function: "bookingList",
  },
  booking_list_for_all: {
    controller: "booking_auth",
    function: "bookingListForAll",
  },
  find_booking_by_id: {
    controller: "booking_auth",
    function: "findBookingById",
  },
  my_chat_list: {
    controller: "booking_auth",
    function: "myChatList",
  },
  banner_add: {
    controller: "booking_auth",
    function: "bannerAdd",
  },
  get_banner: {
    controller: "booking_auth",
    function: "getBanner",
  },
  banner_update: {
    controller: "booking_auth",
    function: "bannerUpdate",
  },
  find_booking_by_id: {
    controller: "booking_auth",
    function: "findBookingById",
  },
};
