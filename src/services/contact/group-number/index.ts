import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "../../servicesPath";
import {generateQueryString} from "src/utils/functions";

const addContactExcel = async (groupId: string, values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.addContactsFromExcel(groupId), values, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};

const getGroupNumberById = async (groupId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.contact.groupNumber.groupNumber(groupId));
};

const getGroupNumbersByGroupId = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.contact.groupNumber.getGroupNumbersByGroupId + generateQueryString(values));
};
const getGroupNumbersByGroupIdParent = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.contact.groupNumber.getGroupNumbersByGroupIdParent + generateQueryString(values));
};
const SearchGroupNumber = async (groupId: string, input: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.contact.groupNumber.searchGroupNumberByNumberAndFirstNameAndLastName(groupId, input));
};

const deleteGroupNumber = async (groupNumberId: string): Promise<IAxiosResponse> => {
    return await axios.delete(servicesPath.contact.groupNumber.deleteGroupNumber(groupNumberId));
};
// const deleteGroupNumberParent = async (groupNumberId: string): Promise<IAxiosResponse> => {
//     return await axios.delete(servicesPath.contact.groupNumber.deleteGroupNumberParent(groupNumberId));
// };
const deleteMultipleGroupNumbers = async (ids: object, groupId: string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.deleteMultipleGroupNumbers, {
        ids: ids,
        groupId: groupId,
    });
};
const deleteMultipleGroupNumbersParent = async (ids: object, groupId: string,userId:string): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.deleteMultipleGroupNumbersParent, {
        ids: ids,
        groupId: groupId,
        userId:userId
    });
};
const createGroupNumber = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.createGroupNumber, values);
};

const createMultipleGroupNumbers = async (groupId: string, numbers: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.createMultipleGroupNumbers, {
        groupId: groupId,
        numbers: numbers
    });

};
const createMultipleGroupNumbersParent = async (groupId: string,userId:string, numbers: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.createMultipleGroupNumbersParent, {
        userId:userId,
        groupId: groupId,
        numbers: numbers
    });

};

const removeDuplicatedGroupNumbersInAGroup = async (groupId: string) => {
    return await axios.get(servicesPath.contact.groupNumber.removeDuplicatedGroupNumbersInAGroup(groupId));
};
const removeDuplicatedGroupNumbersParent = async (groupId: string,userId:string) => {
    return await axios.get(servicesPath.contact.groupNumber.removeDuplicatedGroupNumbersParent(groupId,userId));
};
const searchNumberInAllGroup = async (search: string) => {
    return await axios.get(servicesPath.contact.groupNumber.searchGroupNumbersInAllUserGroups(search));
};

const editGroupNumber = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.contact.groupNumber.editGroupNumber, values);
};
const createGroupNumberParent = async (values: object): Promise<IAxiosResponse> => {
    return await axios.post(servicesPath.contact.groupNumber.editGroupNumberParent, values);
};

const editGroupNumberParent = async (values: object): Promise<IAxiosResponse> => {
    return await axios.put(servicesPath.contact.groupNumber.editGroupNumberParent, values);
};
const deleteGroupNumberParent = async (values:any): Promise<IAxiosResponse> => {
    return await axios.delete(servicesPath.contact.groupNumber.editGroupNumberParent + generateQueryString(values));
};

export {
    addContactExcel,
    createGroupNumber,
    createMultipleGroupNumbers,
    deleteGroupNumber,
    deleteMultipleGroupNumbers,
    editGroupNumber,
    getGroupNumbersByGroupId,
    removeDuplicatedGroupNumbersInAGroup,
    SearchGroupNumber,
    searchNumberInAllGroup,
    getGroupNumberById,
    getGroupNumbersByGroupIdParent,
    createMultipleGroupNumbersParent,
    removeDuplicatedGroupNumbersParent,
    deleteMultipleGroupNumbersParent,
    createGroupNumberParent,
    editGroupNumberParent,
    deleteGroupNumberParent
};
