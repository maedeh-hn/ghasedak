import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getAllFreeLine = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.lines.lines.getAllFreeLinesToBuy);
};

const buyLine = async (lineId: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.lines.lines.buyLine(lineId));
};

const getAllLines = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.lines.lines.getAll)
};

const getAllGroupSendLines = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.lines.lines.getAllGroupSendLines)
};
const getAllLinesByUserId = async (userId:any) => {
    try {
        const {data} = await axios.get(servicesPath.lines.lines.getAllLineByUserId(userId));
        return data;
    } catch ({data}:any) {
        return data;
    }
};
const getLineByLineId = async (lineId:any) => {
    try {
        const {data} = await axios.get(servicesPath.lines.line.getLineById(lineId));
        return data;
    } catch (data) {
        return data;
    }
};


export {getAllFreeLine, buyLine, getAllGroupSendLines, getAllLines,getAllLinesByUserId,getLineByLineId};
