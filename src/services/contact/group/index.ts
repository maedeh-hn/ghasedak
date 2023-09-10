import axios, { IAxiosResponse } from 'src/utils/axios';
import { servicesPath } from 'src/services/servicesPath';
import { generateQueryString } from 'src/utils/functions';

const getAllGroup = async (): Promise<IAxiosResponse> => {
  return await axios.get(servicesPath.contact.group.getAllGroup);
};
const serachGroupParent = async (value:string): Promise<IAxiosResponse> => {
  return await axios.get(servicesPath.contact.group.serachGroupParent(value));
};
const deleteGroupById = async (groupId: string): Promise<IAxiosResponse> => {
  return await axios.delete(servicesPath.contact.group.deleteGroup(groupId));
};

const createGroup = async (values: object): Promise<IAxiosResponse> => {
  return await axios.post(servicesPath.contact.group.createGroup, values);
};

const editGroup = async (values: object): Promise<IAxiosResponse> => {
  return await axios.put(servicesPath.contact.group.editGroup, values);
};
const getContactGroupsById = async (values: any) => {
  try {
    const { data } = await axios.get(servicesPath.contact.group.getAllGroups + generateQueryString(values));
    return data;
  } catch (response) {
    return response;
  }
};
const deleteGroupByIdParent = async (userId: any, groupId: any) => {
  try {
    const data = await axios.delete(servicesPath.contact.group.deleteGroupParent, {
      data: {
        userId,
        id: groupId,
      },
    });
    return data;
  } catch (e) {
    return e;
  }
};
const deleteAccessGroupByIdParent = async ( values:any) => {
  try {
    const data = await axios.delete(servicesPath.contact.group.assignGroupParenttoUser+generateQueryString(values));
    return data;
  } catch (e) {
    return e;
  }
};
const editGroupParent = async (values: any) => {
  try {
    const data = await axios.put(servicesPath.contact.group.editGroupsParent, {
      userId: values.userId,
      id: values.id,
      name: values.name,
      parentId: values.parentId,
    });
    return data;
  } catch (e) {
    return e;
  }
};
const addGroupParent = async (values: any) => {
  try {
    const data = await axios.post(servicesPath.contact.group.addGroupsParent, {
      userId: values.userId,
      name: values.name,
      parentId: values.parentId,
    });
    return data;
  } catch (data) {
    return data;
  }
};
const assignGroupParenttoUser = async (values: any) => {
  try {
    const data = await axios.post(servicesPath.contact.group.assignGroupParenttoUser, {
      userId: values.userId,
      groupId: values.groupId,
      accessType: values.accessType,
    });
    return data;
  } catch (data) {
    return data;
  }
};
export {
  getAllGroup,
  deleteGroupById,
  createGroup,
  editGroup,
  getContactGroupsById,
  deleteGroupByIdParent,
  editGroupParent,
  addGroupParent,
  assignGroupParenttoUser,
  deleteAccessGroupByIdParent,
  serachGroupParent
};
