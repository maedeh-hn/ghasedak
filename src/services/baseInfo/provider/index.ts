import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getPartSize = async (code: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.baseInfo.provider.getPartSize(code))
};

export {getPartSize}