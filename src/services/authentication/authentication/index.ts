import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";

const checkMobileWithNationalCode = async (values:any): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.authentication.authentication.checkMobileWithNationalCode, values);
};
const getAuthenticationInfo = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.authentication.authentication.getAuthenticationInfo);
};
const getAuthenticatinStage = async ()=> {
    try{
        const data=await axios.get(servicesPath.authentication.authentication.getAuthenticatinStage);
        return data;
    } catch (e:any) {
        return e.response;
    }
   
};

const getAuthenticationStage = async (): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.authentication.authentication.getAuthenticationStage);
};
const downloadAuthFile = async (fileType:string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.authentication.authentication.downloadAuthFile(fileType));
};
const uploadNationalCardPicture = async (values: any): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.authentication.authentication.uploadNationalCardPicture, values, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};
const createUpdateAuthenticationInfo = async (values: any): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.authentication.authentication.createUpdateAuthenticationInfo, values);
};

const uploadStatementVideo = async (values: any): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.authentication.authentication.uploadStatementVideo, values, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};
const updateAuthenticationInfo = async (): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.authentication.authentication.updateAuthenticationInfo);
};
const authenticationInfoWithSms = async (values:any): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.authentication.authentication.authenticationInfoWithSms,values);
};

export {
    checkMobileWithNationalCode,
    getAuthenticationInfo,
    getAuthenticationStage,
    downloadAuthFile,
    uploadNationalCardPicture,
    createUpdateAuthenticationInfo,
    uploadStatementVideo,
    updateAuthenticationInfo,
    authenticationInfoWithSms,
    getAuthenticatinStage
};
