import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
// import {searchAllOtpList} from "src/services/smsRequestManagement/otpTemplate";
import {useParams} from "react-router-dom";
import {Box, Card} from "@mui/material";
import CustomPagination from '../../../../../components/CustomPagination';
import UserOtpTemplateTable from '../table/otp-template/UserOtpTemplateTable';
import UserOtpTemplateTableHeader from '../table/otp-template/UserOtpTemplateTableHeader';
// import UserOtpTemplateTableHeader from "../table/otp-template/UserOtpTemplateTableHeader";
// import UserOtpTemplateTable from "../table/otp-template/UserOtpTemplateTable";
// import CustomPagination from "../../../../components/CustomPagination";

const UserGeneralOtpTemplate = () => {
    const {userId} = useParams()
    const INITIAL_VALUES = {
        UserId: userId,
        TemplateName: '',
        Status: '-1',
        PageIndex: 1,
        PageSize: 5,
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const {isLoading, data, refetch} = useQuery(['searchAllOtpList', filterValue], () => searchAllOtpList(filterValue));

    return (
        <Box>
            <UserOtpTemplateTableHeader/>
            <Card>
                <UserOtpTemplateTable data={data?.data?.items} refetch={refetch}
                                      filters={{
                                          filterValue,
                                          setFilterValue
                                      }}
                                      isLoading={isLoading}/>
            </Card>
            <CustomPagination
                totalPage={(data && data?.data?.totalPages) || 0}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                totalCount={(data && data?.data?.totalCount) || 0}
            />
        </Box>
    )
}

export default UserGeneralOtpTemplate;