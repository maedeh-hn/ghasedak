import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../../../components/CustomPagination';
import UserReceivedSmsTable from '../table/recived-sms/UserReceivedSmsTable';
import {ReceivedSmsParent} from "../../../../../services/receive/receivedSms";
// import UserReceivedSmsTable from "../table/received-sms/UserReceivedSmsTable";
// import CustomPagination from "../../../../components/CustomPagination";

const UserGeneralReceivedSms = () => {
    const {userId} = useParams();
    const INITIAL_VALUES = {
        LineNumber: '',
        Mobile: '',
        FromDate: '',
        ToDate: '',
        Origin: '',
        PageIndex: 1,
        PageSize: 5,
        UserId: userId,
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {isLoading, data} = useQuery(['parentReceivedSms', filterValue], () => ReceivedSmsParent(filterValue));
console.log(data);
    return (
        <>
            <UserReceivedSmsTable data={data?.items} isLoading={isLoading} filters={{
                filterValue,
                setFilterValue
            }}/>
            <CustomPagination
                totalPage={(data && data?.totalPages) || 0}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                totalCount={(data && data?.totalCount) || 0}
            />
        </>
    )
};

export default UserGeneralReceivedSms;
