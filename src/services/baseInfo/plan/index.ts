import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getPlan = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.baseInfo.plan.getPlan);
};

const buyPlan = async (planId: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.baseInfo.plan.buyPlan(planId));
};

export {getPlan, buyPlan};
