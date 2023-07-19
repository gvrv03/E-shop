import baseUrl from "./baseUrl";

// Auth
export const Fast2SMSURL = "https://www.fast2sms.com/dev/bulkV2";
export const SendSMSToUserURL = baseUrl + "api/Auth/SendOTP";
export const signInUserURL = baseUrl + "api/Auth/SignInUser";
export const checkUserExistURL = baseUrl + "api/Auth/checkUserExists";
export const createUserURL = baseUrl + "api/Auth/Register";
export const checkUserURL = baseUrl + "api/Auth/checkLogin";
