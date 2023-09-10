import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const getAllOtpTemplate = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.otpTemplate.getAllOtpTemplates , values);
};

const getOtpTemplateById = async (templateId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.smsRequestManagement.otpTemplate.getOtpTemplateById(templateId));
};

const createOtpTemplate = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.smsRequestManagement.otpTemplate.createOtpTemplate, values);
};
const createOtpTemplateparent = async (values:any) => {
    try {
        const {data} = await axios.post(servicesPath.smsRequestManagement.otpTemplate.createOtpTemplateParent, values);
        return data;
    } catch (e:any) {
        return e.response;
    }
};

const editOtpTemplate = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.smsRequestManagement.otpTemplate.editOtpTemplate, values);
};
// const editOtpTemplateParent = async (values:any) => {
//     try {
//         const {data} = await axios.put(servicesPath.smsRequestManagement.otpTemplate.editOtpTemplateParent, values);
//         return data;
//     } catch (e:any) {
//         return e.response;
//     }
// };

const deleteOtpTemplate = async (templateId: string): Promise<IAxiosResponse> => {
    return await axios.delete(servicesPath.smsRequestManagement.otpTemplate.deleteOtpTemplate(templateId));
};

export {getAllOtpTemplate, getOtpTemplateById, createOtpTemplate, editOtpTemplate, deleteOtpTemplate,createOtpTemplateparent};
