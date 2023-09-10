import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getLineSettingsByLineId = async ( lineId:any) => {
    try {
        const data = await axios.get(servicesPath.lines.lineSettings.getLineSettingByLineId(lineId));
        return data;
    } catch (data) {
        return data;
    }
};
const getLineSettings = async (lineId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.lines.lineSettings.getLineSettingsByLineId(lineId));
};

const updateLineSettings = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.lines.lineSettings.updateLineSetting, values);
};
const editLineSettings = async (values:any) => {
    try {
        const data = await axios.put(servicesPath.lines.lineSettings.editLineSettings, values);
        return data;
    } catch (data) {
        return data;
    }
};
export {getLineSettings, updateLineSettings,getLineSettingsByLineId,editLineSettings}