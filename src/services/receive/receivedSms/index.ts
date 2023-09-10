import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const ReceivedSms = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.receive.receivedSms.searchReceivedSmses + generateQueryString(values));
};

const ReceivedLogs = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.receive.receivedSms.searchUrlForwardLogs + generateQueryString(values));
};
const ReceiveLogParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.receive.receivedSms.searchUrlForwardLogsParent + generateQueryString(values));
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const ReceivedSmsParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.receive.receivedSms.searchReceivedSmsesParent + generateQueryString(values));
        return data;
    } catch (e:any) {
        return e.response;
    }
};


export {ReceivedSms, ReceivedLogs,ReceiveLogParent,ReceivedSmsParent,};
