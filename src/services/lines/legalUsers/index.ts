import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getLineLegalUser = async (lineId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.lines.legalUsers.getLegalUsersByLineId(lineId));
};

const createLegalUser = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.lines.legalUsers.createLegalUsers, values);
};

const editLegalUser = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.lines.legalUsers.editLegalUsers, values);
};



export {getLineLegalUser, createLegalUser, editLegalUser}