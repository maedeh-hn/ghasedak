import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getAllLinks = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.link.getAllLinks);
};

const addUserLink = async (url: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.link.create(url));
};

const editUserLink = async (url: string, userLinkId: string): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.users.link.edit(url, userLinkId));
};

const deleteUserLink = async (userLinkId: string): Promise<IAxiosResponse> => {
    return await axios.delete(servicesPath.users.link.delete(userLinkId));
};

export {
    getAllLinks,
    addUserLink,
    editUserLink,
    deleteUserLink
}
