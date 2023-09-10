import axios, {AxiosInstance, HeadersDefaults} from 'axios';
// @ts-ignore
import {showMessage} from '../redux/slices/message';
// @ts-ignore
import {store} from '../redux/store';
import {setSession} from "./jwt";

// ----------------------------------------------------------------------
interface CommonHeaderProperties extends HeadersDefaults {
    accept: string;
}

interface keyable {
    [key: string]: any
}

export interface IAxiosResponse {
    data: keyable,
    status: number,
    message: string
    isSuccess: boolean
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

axiosInstance.defaults.headers.common.accept = 'text/plain'

axiosInstance.interceptors.response.use(
    (response): IAxiosResponse => (() => {
        return {
            data: response?.data?.data || [],
            status: response.status,
            message: response?.data?.message,
            isSuccess: response?.data?.isSuccess || false
        }
    })(),
    (error): IAxiosResponse => {
        switch (error?.response?.status) {
            case 401:
                setSession(null, null)
                location.reload()
                break;
            // case 204:
            //   store.dispatch(showMessage({ message: status_code_text(204), variant: 'warning' }));
            //   break;
            // case 404:
            //   store.dispatch(showMessage({ message: 'یافت نشد!', variant: 'error' }));
            //   break;
        }

        store.dispatch(showMessage({message: error?.response?.data?.message || 'خطا در اتصال', variant: 'error'}));
        return {
            data: error?.response?.data?.data || [],
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || 'خطا دراتصال',
            isSuccess: error?.response?.data?.isSuccess || false
        };
    }
);

export default axiosInstance;
