import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const sendFastSms = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.smsRequestManagement.singleSms.sendFastSms, values);
};

const cancelSingleSms = async (smsId: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.smsRequestManagement.singleSms.cancelSingleSms, {id: smsId});
};

const SearchSingleSms = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.singleSms.searchSingleSms + generateQueryString(values));
};
const getSingleSmsExecle = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.singleSms.getSingleSmsExecle + generateQueryString(values));
};
const getSmsById = async (smsId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.singleSms.getSmsById(smsId));
};

export {sendFastSms, cancelSingleSms, SearchSingleSms, getSmsById,getSingleSmsExecle}
