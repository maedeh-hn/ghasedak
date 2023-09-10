import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const searchReceptorBulk = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.receptor.searchReceptorByStatus + generateQueryString(values));
};

const searchReceptorBulkParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.smsRequestManagement.receptor.searchReceptorByStatusParent + generateQueryString(values));
        return data;
    } catch (e:any) {
        return e.response;
    }
};
export {searchReceptorBulk,searchReceptorBulkParent};
