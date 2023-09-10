import React, { useState} from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import {useParams} from 'react-router';
import {useQuery} from '@tanstack/react-query';

// import CustomPagination from 'src/components/CustomPagination';
import UserGroupSmsReportTableRow from './UserGroupSmsReportTableRow';
// import Scrollbar from "../../../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../../../components/table";
// import TableLoading from "../../../../../../components/table/TableLoading";
// import useTableData from "../../../../../../hooks/useTableData";
// import UserGroupSmsReportToolbar from "./UserGroupSmsReportToolbar";
import { SearchBulkSmsParent } from '../../../../../../../services/smsRequestManagement/sms';
import CustomPagination from '../../../../../../../components/CustomPagination';
import Scrollbar from '../../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../../components/table';
import useTableData from '../../../../../../../hooks/useTableData';
import UserGroupSmsReportToolbar from './UserGroupSmsReportToolbar';
import TableLoading from '../../../../../../../components/table/TableLoading';





const TABLE_HEAD = [
    {id: 'title', label: 'شماره خط'},
    {id: 'expireDate', label: 'متن پیام'},
    {id: 'origin', label: 'مبدا ارسال'},
    {id: 'origin', label: 'تعداد گیرندگان'},
    {id: 'expireDate', label: 'قیمت (ریال)'},
    {id: 'expireDate', label: 'تاریخ ارسال'},
    {id: 'expireDate', label: 'وضعیت'},
    {id: 'expireDate', label: 'نمودار'},
];

const UserGroupSmsReportTable = () => {
    const {userId} = useParams();
    const INITIAL_VALUES = {
        UserId: userId,
        Content: '',
        LineNumber: '',
        Status: '-1',
        Origin: '-1',
        IsPanel: true,
        StartDate: '',
        EndDate: '',
        PageIndex: 1,
        PageSize: 5,
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const {isLoading, data} = useQuery(['UserBulkSmsListParent', filterValue], () => SearchBulkSmsParent(filterValue));
    const [tableData, setTableData] = useTableData(data?.items);
  

    return (
        <Box>
                <UserGroupSmsReportToolbar filterValue={filterValue} setFilterValue={setFilterValue} />
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData?.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {
                                    tableData?.map((row, index) => (
                                        <UserGroupSmsReportTableRow
                                            key={index}
                                            row={row}
                                            IsPanel={filterValue.IsPanel}
                                        />
                                    ))}
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
        </Box>
    );
};

export default UserGroupSmsReportTable;
