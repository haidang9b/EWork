export const BASE_URL = "https://localhost:7096/api";

// auth controller
export const REFRESH_TOKEN_URL = "/auth/RefreshToken";
export const LOGIN_URL = "/auth/login";
export const LOGIN_GOOGLE_URL = "/auth/login-google";
export const RECOVER_ACCOUNT_URL = "/auth/recovery";
export const VALIDATE_CODE_RECOVER_URL = "/auth/is-valid-code-recover";
export const RESET_PASSWORD_URL = "/auth/reset-password";
export const UPDATE_PASSWORD_URL = "/auth/update-password";

// recruiters controller
export const RECRUITER_REGISTER_URL = "/recruiters/register";
export const GET_RECRUITERS_URL = "/recruiters/get-recruiters";
export const ASSIGN_RECRUITER_URL = "/recruiters/add-new-recruiter";

// users controller
export const GET_USERS_URL = "/users";
export const GET_ROLES_URL = "/users/roles";
export const EDIT_ACTIVE_URL = "/users/set-active";
export const ADD_ACCOUNT_FACULTY_URL = "/users/add-account-faculty";
export const EDIT_ACCOUNT_URL = "/users/update-account";

// profile controller
export const GET_DOCUMENT_URL = "/profile/get-document";
export const EDIT_COVER_LETTER_URL = "/profile/update-cover-letter";
export const DELETE_REMOVE_CV_URL = "/profile/remove-cv";
export const GET_PROFILE_URL = "/profile/my-information";
export const PUT_CONTACT_PROFILE_URL = "/profile/contact";
export const PUT_STATUS_PROFILE_URL = "/profile/change-status-open-for-work";
// work histories controller
export const WORK_HISTORY_PROFILE_URL = "/workhistories";

// educations controller
export const EDUCATION_PROFILE_URL = "/educations";

// certificates controller
export const CERTIFICATE_PROFILE_URL = "/certificates";

// projects controller
export const PROJECT_PROFILE_URL = "/projects";

//upload controller
export const UPLOAD_NEW_CV_URL = "/uploads/upload-new-cv";
export const UPLOAD_AVATAR_COMPANY_URL = "/uploads/upload-avatar-company";

// recruitment posts controller
export const RECRUITMENT_POST_URL = "/recruitmentposts";
export const GET_JOBS_SHORT_URL = "/recruitmentposts/get-jobs";
export const GET_JOB_DETAIL_ID_URL = "/recruitmentposts/detail";

// companies controller
export const GET_COMPANIES_URL = "/companies";
export const EDIT_COMPANY_INFORMATION_URL = "/companies";
export const ADD_COMPANY_URL = "/companies";
export const GET_MY_COMPANY_INFORMATION_URL =
    "/companies/get-my-company-information";
export const GET_TOP_COMPANIES_URL = "/companies/top-companies";

// applications controller
export const APPLICATION_CONTROLLER_URL = "/applications";
export const GET_JOBS_APPLIED_URL = "/applications/jobs-applied";
export const GET_APPLIEDS_BY_BUSINESS_URL = "/applications/applieds";

// chart controller
export const NUMBER_APPLICATION_URL = "/charts/application";
export const NUMBER_RECRUITMENT_POST_URL = "/charts/post";
export const NUMBER_RANKING_TECH_STACK_URL = "/charts/ranking-tech";
