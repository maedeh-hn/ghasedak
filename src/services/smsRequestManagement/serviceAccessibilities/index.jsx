import axios from "../../../utils/axios";
import {servicesPath} from "../../servicesPath";
import {generateQueryString} from "../../../utils/functions";

const getAllServiceAccessibilitiesOfASubUser = async (values) => {
    try {
        const {data} = await axios.get(
            servicesPath.smsRequestManagement.serviceAccessibilities.getAllServiceAccessibilitiesOfASubUser + generateQueryString(values)
        );
        return data;
    } catch (e) {
        return e.response;
    }
};
const editServiceAccessibilityParent = async (values) => {
    try {
        const data = await axios.put(
            servicesPath.smsRequestManagement.serviceAccessibilities.editServiceAccessibilitiesParent, values
        );
        return data;
    } catch (e) {
        return e.response;
    }
};


export {
    getAllServiceAccessibilitiesOfASubUser,
    editServiceAccessibilityParent
}