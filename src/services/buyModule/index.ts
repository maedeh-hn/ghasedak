
import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";


const getAllModule = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.buyModule.getAllModule);
};

const buyModule = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.buyModule.buyModule, values);
};

export {getAllModule,buyModule};