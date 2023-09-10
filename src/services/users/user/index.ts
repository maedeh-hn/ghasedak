import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import { generateQueryString } from "src/utils/functions";

const getUser = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.user.getUserProfile)
};
const searchSubUser = async (values: object): Promise<any> => {
    try {
        const {data} = await axios.get(servicesPath.users.user.searchSubUsers + generateQueryString(values));
        return data;
    } catch (response) {
        return response;
    }
}
const getUserById = async (userId:any) => {
    try {
        const {data} = await axios.get(servicesPath.users.user.getUserById(userId));
        return data;
    } catch (response) {
        return response;
    }
}
const createUser = async (values:any) => {
    try {
        const data = await axios.post(servicesPath.users.user.addUser, values);
        return data;
    } catch (e:any) {
        return e.response;
    }
};

const updateUser = async (values:any) => {
    try {
        const data = await axios.put(servicesPath.users.user.editUser, values);
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const UpdateUserProfile = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.users.user.updateProfile, values);
};

const UserChangeMobile = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.users.user.changeMobile, values);
};

const UserChangePassword = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.users.user.changeUserPassword, values);
};

const chargeAccount = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.users.user.chargeAccount, values);
};

const searchUserById = async (userId:any) => {
    try {
        const {data} = await axios.get(servicesPath.users.user.advanceLineUserSearchByUserId(userId));
        return data;
    } catch (data) {
        return data;
    }
};
const advanceLineUserSearch = async (values:any) => {
    try {
        const data = await axios.get(servicesPath.users.user.advanceLineUserSearch + generateQueryString(values));
        return data;
    } catch (data) {
        return data;
    }
};
export {
    getUser,
    UpdateUserProfile,
    UserChangeMobile,
    UserChangePassword,
    chargeAccount,
    searchSubUser,
    createUser,
    getUserById,
    updateUser,
    searchUserById,
    advanceLineUserSearch,
    
};
