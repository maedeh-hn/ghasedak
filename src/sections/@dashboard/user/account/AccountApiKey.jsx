import {useQuery} from "@tanstack/react-query";
import {getApiKeys} from "src/services/contact/api-keys";
import CustomContainer from "../../../../components/CustomContainer";
import ApiKeysTable from "../../api-keys/table/ApiKeysTable";
import React from "react";
import useSettings from "../../../../hooks/useSettings";

const AccountApiKey = () => {
    const { themeStretch } = useSettings();

    const {isLoading, data, refetch} = useQuery(['ApiKeysList'], () => getApiKeys());
console.log(data);

    return (
        <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
            <ApiKeysTable data={data?.data?.items} refetch={refetch} isLoading={isLoading}/>
        </CustomContainer>
    )
}

export default AccountApiKey