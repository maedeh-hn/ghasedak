import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const SearchBulkSms = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.bulkSms.searchBulkSms + generateQueryString(values));
};

const BulkSmsById = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.bulkSms.getBulkSmsReportById + generateQueryString(values));
};

const cancelBulkSms = async (smsId: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.smsRequestManagement.bulkSms.cancelBulkSms, {id: smsId});
};

const sendBulkSms = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.smsRequestManagement.bulkSms.sendBulkSms, values);
};
const getBulkSmsExecle = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.bulkSms.getBulkSmsExecle + generateQueryString(values));
};

export {SearchBulkSms, BulkSmsById, cancelBulkSms, sendBulkSms,getBulkSmsExecle};
