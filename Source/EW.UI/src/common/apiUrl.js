export const BASE_URL = "https://localhost:7096/api";

// auth controller
export const REFRESH_TOKEN_URL = "/auth/RefreshToken";
export const LOGIN_URL = "/auth/login";
export const LOGIN_GOOGLE_URL = "/auth/login-google";
export const RECOVER_ACCOUNT_URL = "/auth/recovery";
export const VALIDATE_CODE_RECOVER_URL = "/auth/is-valid-code-recover";
export const RESET_PASSWORD_URL = "/auth/reset-password";

// recruiters controller
export const RECRUITER_REGISTER_URL = "/recruiters/register";
export const GET_COMPANIES_URL = "/recruiters/get-companies";
export const GET_RECRUITERS_URL = "/recruiters/get-recruiters";
export const EDIT_COMPANY_INFORMATION_URL = "/recruiters/update-company-info";
export const ADD_COMPANY_URL = "/recruiters/add-new-company";
export const ASSIGN_RECRUITER_URL = "/recruiters/add-new-recruiter";
export const GET_MY_COMPANY_INFORMATION_URL =
    "/recruiters/get-my-company-information";

// users controller
export const GET_USERS_URL = "/users";
export const GET_ROLES_URL = "/users/roles";
export const EDIT_ACTIVE_URL = "/users/set-active";
export const ADD_ACCOUNT_FACULTY_URL = "/users/add-account-faculty";
export const EDIT_ACCOUNT_URL = "/users/update-account";
// profile controller
export const GET_PROFILE_URL = "/profile/get-profile";
export const EDIT_COVER_LETTER_URL = "/profile/update-cover-letter";
export const DELETE_REMOVE_CV_URL = "/profile/remove-cv";

//upload controller
export const UPLOAD_NEW_CV_URL = "/uploads/upload-new-cv";

// recruitment posts controller
export const RECRUITMENT_POST_URL = "/recruitmentposts";
