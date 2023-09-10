import axios from "../../../utils/axios";
import {generateQueryString} from "../../../utils/functions";
import {servicesPath} from "../../servicesPath";
const SearchSingleSmsParent = async (values) => {
    try {
        const {data} = await axios.get(servicesPath.smsRequestManagement.sms.searchSingleSmsParent + generateQueryString(values));
        return data;
    } catch (e) {
        return e.response;
    }
};

const SearchBulkSmsParent = async (values) => {
    try {
        const {data} = await axios.get(
            servicesPath.smsRequestManagement.sms.searchBulkSmsParent + generateQueryString(values)
        );
        return data;
    } catch (e) {
        return e.response;
    }
};
const BulkSmsByIdParent = async (reportId, type) => {
    try {
        const data = await axios.get(servicesPath.smsRequestManagement.sms.getBulkSmsReportByIdParent(reportId, type));
        return data;
    } catch (e) {
        return e.response;
    }
};
const getSmsByIdParent = async (value) => {
    try {
        const {data} = await axios.get(servicesPath.smsRequestManagement.sms.getSmsByIdParent + generateQueryString(value));
        return data;
    } catch (response) {
        return response;
    }
};
export {
    SearchBulkSmsParent,SearchSingleSmsParent,BulkSmsByIdParent,getSmsByIdParent
};