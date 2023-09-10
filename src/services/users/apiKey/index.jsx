import axios from "../../../utils/axios";
import {servicesPath} from "../../servicesPath";
const getApiKeysByUserId = async (userId) => {
    try {
        const {data} = await axios.get(servicesPath.users.apiKeys.getAllApiKeysParent(userId));
        return data;
    } catch (e) {
        return e.response;
    }
};
const addApiKeysParent = async (values) => {
    try {
        const data = await axios.post(servicesPath.users.apiKeys.addApiKeyParent, values);
        return data;
    } catch (e) {
        return e.response;
    }
};

const editApiKeysParent = async (values) => {
    try {
        const data = await axios.put(servicesPath.users.apiKeys.editApiKeyParent, values);
        return data;
    } catch (e) {
        return e.response;
    }
};

const deleteApiKeyParent = async (id, userId) => {
    try {
        const data= await axios.delete(servicesPath.users.apiKeys.editApiKeyParent, {data: {id, userId}});
        return data;
    } catch (e) {
        return e.response;
    }
};
export {getApiKeysByUserId,addApiKeysParent,editApiKeysParent,deleteApiKeyParent};