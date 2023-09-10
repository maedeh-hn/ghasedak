import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getUserProSettings = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.userSettings.getUserSetting);
};

const updateUserProSettings = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.users.userSettings.editUserSetting, values);
};

export {
    getUserProSettings,
    updateUserProSettings
};
