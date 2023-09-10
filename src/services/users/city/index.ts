import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getProvinces = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.city.getProvinces);
};

const getCitiesByProvince = async (provinceId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.city.getCitiesByProvince(provinceId));
};

export {
    getProvinces,
    getCitiesByProvince
}