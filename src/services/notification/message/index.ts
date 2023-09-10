import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const getAllMessages = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.notification.message.getMessage + generateQueryString(values));
};

const getAllGroups = async () => {
    try {
        const {data} = await axios.get(servicesPath.notification.group.getAllGroups);
        return data;
    } catch (e:any) {
        return e.response;
    }
};
export {
    getAllMessages,
    getAllGroups
}