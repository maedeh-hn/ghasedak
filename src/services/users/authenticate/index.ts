import {ILoginResponse, IRegisterCaptchaResponse} from "src/types/services/user.types";
import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const login = async (values: object): Promise<ILoginResponse> => {
    const response: IAxiosResponse = await axios.post(servicesPath.users.authenticate.login, values)
    return {
        ...response,
        data: {
            userId: response.data.userId,
            panelType: response.data.panelType,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
        }
    };
};

const register = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.authenticate.register, values)
};
const RegisterCaptcha = async (values: object): Promise<IRegisterCaptchaResponse> => {
    const response: IAxiosResponse = await axios.get(servicesPath.users.authenticate.generateCaptcha + generateQueryString(values))
    return {
        ...response,
        data: {
            captchaText: response.data.captchaText,
            captchaToken: response.data.captchaToken,
            captchaImgUrl: response.data.captchaImgUrl,
            isActive: response.data.isActive
        }
    };
};


export {
    login,
    register,
    RegisterCaptcha
};
