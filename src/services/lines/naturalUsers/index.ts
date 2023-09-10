import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";



const editNaturalUser = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.lines.naturalUsers.editNaturalUsers, values);
};
const createNaturalUser = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.lines.naturalUsers.createNaturalUsers, values);
};
const getLineNaturalUser = async (lineId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.lines.naturalUsers.getNaturalUsersByLineId(lineId));
};
export {editNaturalUser,createNaturalUser,getLineNaturalUser}