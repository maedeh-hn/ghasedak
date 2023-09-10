import {IAxiosResponse} from "../../utils/axios";

export interface ILoginResponse extends Omit<IAxiosResponse, 'data'> {
    data: {
        access_token: string,
        // isAdmin: boolean
        panelType:any
        refresh_token: string
        userId: string
    }
}

export interface IRegisterCaptchaResponse extends Omit<IAxiosResponse, 'data'> {
    data: {
        captchaText: string,
        captchaImgUrl: string,
        captchaToken: string
        isActive: boolean
    }
}
