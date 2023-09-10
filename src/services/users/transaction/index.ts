import axios, {IAxiosResponse} from "src/utils/axios";
import {servicesPath} from "src/services/servicesPath";
import {generateQueryString} from "src/utils/functions";

const CheckInternalTransaction = async (transactionId: string): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.transaction.check(transactionId));
};

const SearchTransaction = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.transaction.searchTransaction + generateQueryString(values));
};

const SearchCreditLogs = async (values: object): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.transaction.searchCreditLogs + generateQueryString(values));
};
const SearchCreditLogsParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.users.transaction.searchCreditLogsParent + generateQueryString(values));
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const SearchTransactionParent = async (values:any) => {
    try {
        const {data} = await axios.get(servicesPath.users.transaction.searchTransactionParent + generateQueryString(values));
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const CreateTransactionParent = async (values:any) => {
    try {
        const data = await axios.post(servicesPath.users.transaction.createTransactionParent, values);
        return data;
    } catch (e:any) {
        return e.response;
    }
};
const RefreshTokenBuyModule = async(): Promise<IAxiosResponse> => {
    return await axios.get(servicesPath.users.transaction.refreshTokenBuyModule );
};
// const CheckCrmOrderCodeServices = async (values:any) => {
//     try {
//         const {data} = await axios.get(
//             servicesPath.users.transaction.checkCrmOrderCode(values.Amount, values.CrmCode)
//         );
//         return data;
//     } catch (e:any) {
//         return e.response;
//     }
// };

export {CheckInternalTransaction, SearchTransaction, SearchCreditLogs,SearchCreditLogsParent,SearchTransactionParent,CreateTransactionParent,RefreshTokenBuyModule};
