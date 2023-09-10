import React, {useState} from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import useTableData from '../../../../../../../hooks/useTableData';
import { useParams } from 'react-router';
import CustomPagination from '../../../../../../../components/CustomPagination';
import Scrollbar from '../../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../../components/table';
import TableLoading from '../../../../../../../components/table/TableLoading';
import UserSingleSmsReportTableRow from './UserSingleSmsReportTableRow';
import UserSingleSmsReportToolbar from './UserSingleSmsReportToolbar';
import { SearchSingleSmsParent } from '../../../../../../../services/smsRequestManagement/sms';

// import {SearchSingleSms} from 'src/services/smsRequestManagement/sms';
// import {useParams} from 'react-router';
// import CustomPagination from 'src/components/CustomPagination';
// import UserSingleSmsReportTableRow from './UserSingleSmsReportTableRow';
// import Scrollbar from "../../../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../../../components/table";
// import TableLoading from "../../../../../../components/table/TableLoading";
// import useTableData from "../../../../../../hooks/useTableData";
// import UserSingleSmsReportToolbar from "./UserSingleSmsReportToolbar";

const TABLE_HEAD = [
    {id: 'title', label: 'شماره خط'},
    {id: 'priceLimit', label: 'موبایل'},
    {id: 'expireDate', label: 'متن پیام'},
    {id: 'expireDate', label: 'قیمت (ریال)'},
    {id: 'userId', label: 'شناسه ارسال'},
    {id: 'expireDate', label: 'تاریخ ارسال'},
    {id: 'expireDate', label: 'وضعیت'},
    {id: 'action', label: 'گزارش وضعیت ارسال'},
];

const UserSingleSmsReportTable = () => {
    const {userId} = useParams();
    const INITIAL_VALUES = {
        SmsId: '',
        UserId: userId,
        Content: '',
        LineNumber: '',
        Receptor: '',
        Origin: '-1',
        SmsStatus: '-1',
        SmsStatusReport: '-1',
        StartDate: '',
        EndDate: '',
        PageIndex: 1,
        PageSize: 5,
        ProviderName: '100'
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const {isLoading, data} = useQuery(['UserSingleSmsList', filterValue], () => SearchSingleSmsParent(filterValue));
    const [tableData, setTableData] = useTableData(
        data?.items
     
        );
        console.log(data);

    return (
        <>
                <UserSingleSmsReportToolbar filterValue={filterValue} setFilterValue={setFilterValue} />
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData?.length}/>
                            <TableBody>
                                {
                                isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {
                                    tableData?.map((row, index) => (
                                        <UserSingleSmsReportTableRow
                                            key={index}
                                            row={row}
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

            <CustomPagination
                totalPage={(data && data?.totalPages) || 0}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                totalCount={(data && data?.totalCount) || 0}
            />
        </>
    );
};

export default UserSingleSmsReportTable;
