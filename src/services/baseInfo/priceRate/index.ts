import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const panelRate = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.baseInfo.priceRate.getPriceRate);
};

export {panelRate};
