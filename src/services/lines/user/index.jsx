import axios from "../../../utils/axios";
import {servicesPath} from "../../servicesPath";

const lineUserSearch = async (value) => {
    try {
        const {data} = await axios.get(servicesPath.users.user.lineUserSearch(value));
        return data;
    } catch (e) {
        return e.response;
    }
};

export {
    lineUserSearch,

};