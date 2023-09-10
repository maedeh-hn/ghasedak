import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import { generateQueryString } from "src/utils/functions";

const getGroupSetting = async (groupId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.contact.groupSetting.getGroupSettingsById(groupId));
};

const editGroupSetting = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.contact.groupSetting.editGroupSetting, values);
};
const addAutoSettingContacyGroupParent = async (values:any) => {
    try {
        const data = await axios.post(servicesPath.contact.groupSettingsParent.addAutoSetting, values);
        return data;
    } catch (response) {
        return response;
    }
};
const addCancelSettingContacyGroupParent = async (values:any) => {
    try {
        const data = await axios.post(servicesPath.contact.groupSettingsParent.addCancelSetting, values);
        return data;
    } catch (response) {
        return response;
    }
};
const getContactGroupSettingsParent = async (value:any) => {
    try {
        const {data} = await axios.get(servicesPath.contact.groupSettingsParent.getByIdParent+ generateQueryString(value));
        return data;
    } catch (e) {
        return e;
    }
};
export {getGroupSetting, editGroupSetting,addAutoSettingContacyGroupParent,getContactGroupSettingsParent,addCancelSettingContacyGroupParent};
