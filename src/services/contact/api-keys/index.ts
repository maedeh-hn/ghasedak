import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getApiKeys = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.apiKeys.getAllApiKeys);
};

const getApiKeysById = async (apiKeyId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.apiKeys.getApiKeyById(apiKeyId));
};

const createApiKeys = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.apiKeys.createApiKey, values);
};

const editApiKeys = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.users.apiKeys.editApiKey, values);
};

const deleteApiKey = async (apiKeyId: string): Promise<IAxiosResponse> => {
    return await axios.delete(servicesPath.users.apiKeys.deleteApiKey(apiKeyId));
};
const deleteApiKeyParent = async (id:any, userId:any) => {
    try {
        const data = await axios.delete(servicesPath.users.apiKeys.deleteApiKeyParent, {data: {id, userId}});
        return data;
    } catch (e:any) {
        return e.response;
    }
};

export {getApiKeys, getApiKeysById, createApiKeys, editApiKeys, deleteApiKey,deleteApiKeyParent};