import { Status } from "./constants";

/**
 * Check if error is an ApiError
 *
 * @param {object} error
 * @returns {boolean} error is ApiError
 */
export function isApiError(error) {
    return typeof error === "object" && error !== null && "errors" in error;
}

/**
 * Set state as loading
 *
 * @param {import('@reduxjs/toolkit').Draft<AuthState>} state
 */
export function loadingReducer(state) {
    state.status = Status.loading;
}

/**
 * @param {import('@reduxjs/toolkit').Draft<AuthState>} state
 * @param {import('@reduxjs/toolkit').PayloadAction<{errors: Record<string, string[]}>} action
 */
export function failureReducer(state, action) {
    state.status = Status.failed;
}

/**
 * covert html to plain text
 * @param {*} html
 * @returns
 * plain text from html
 */
export function convertHTMLToText(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}
