import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const SearchWebServiceLogs = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.webServiceLog.searchWebServiceLogs + generateQueryString(values));
};
const StatusLogParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.smsRequestManagement.webServiceLog.searchStatusUpdatesLogsParent + generateQueryString(values));
        return data;
    } catch
        (e:any) {
        return e.response;
    }
};
export {
    SearchWebServiceLogs,StatusLogParent
}