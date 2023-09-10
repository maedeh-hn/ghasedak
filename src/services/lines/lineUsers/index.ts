import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import { generateQueryString } from "src/utils/functions";

const editPriority = async (lineId: string, priority: string): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.lines.lineUsers.editPriority(lineId, priority));
};
const getAllUsersLineParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.lines.lineUsers.allUsersLineParent+generateQueryString(values))
        return data;
    } catch (data) {
        return data;
    }
};
const getLineUserParentSetting = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.lines.lineUsers.LineUserParentSetting(values))
        return data;
    } catch (data) {
        return data;
    }
};
const deleteLineUser = async (lineId:any, userId:any) => {
    try {
        const data = await axios.delete(servicesPath.lines.lineUsers.deleteLineUserByUserId, {
            data: {
                lineId,
                userId
            }
        });
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const addLineUser = async (values:any) => {
    try {
        const data = await axios.post(servicesPath.lines.lineUsers.addLineUserSettings, values);
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const AllUnallocatedLinestoAUserParent = async (value:any) => {
    try {
        const {data} = await axios.get(servicesPath.lines.lineUsers.AllUnallocatedLinestoAUserParent(value));
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const editLineUserSettingParent = async (values:any) => {
    try {
        const data = await axios.put(servicesPath.lines.lineUsers.editLineUserSettingParent, values);
        return data;
    } catch (e:any) {
        return e.response;
    }
};
export {editPriority,editLineUserSettingParent,deleteLineUser,getAllUsersLineParent,addLineUser,AllUnallocatedLinestoAUserParent,getLineUserParentSetting}
