import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const verifyRegisterCode = async (code: string, mobile: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.verifyRegisteration, {
        token: code,
        mobile: mobile,
    });
};

const forgotPassword = async (mobile: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.forgotPassword, {
        mobile: mobile,
    });
};

const resetPassword = async (phone_number: string, password: string, token: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.resetPassword, {
        mobile: phone_number,
        password: password,
        token: token,
    });
};

const changeMobile = async (newMobile: string, token: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.changeMobile, {
        newMobile: newMobile,
        token: token,
    });
};

const ActivateGoogleAuthenticator = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.tokenStore.activateGoogleAuthenticator);
};

const VerifyGoogleAuthenticator = async (username: string, password: string, token: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.authenticateUserTwoStepIsOn, {
        userName: username,
        password: password,
        token: token,
    });
};

const sendGoogleAuthenticatorSms = async (username: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.sendTwoStepCodeAsSMS, {
        userName: username,
    });
};

const sendOtpRequestActiveUser = async (username: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.sendConfirmationOTP, {
        userName: username,
    });
};

const ActiveUserByOtp = async (username: string, token: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.confirmNewUser, {
        userName: username,
        token: token,
    });
};
const SendAuthenticationConfirm = async (): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.tokenStore.SendAuthenticationConfirm);
};
export {
    verifyRegisterCode,
    forgotPassword,
    resetPassword,
    changeMobile,
    ActivateGoogleAuthenticator,
    VerifyGoogleAuthenticator,
    sendGoogleAuthenticatorSms,
    sendOtpRequestActiveUser,
    ActiveUserByOtp,
    SendAuthenticationConfirm
};
