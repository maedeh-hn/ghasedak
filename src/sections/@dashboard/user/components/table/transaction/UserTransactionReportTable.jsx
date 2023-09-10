import React, {useState} from 'react';
import {Box, Table, TableBody, TableContainer} from '@mui/material';
// import {SearchTransaction} from 'src/services/users/transaction';
import {useParams} from 'react-router';
import {useQuery} from '@tanstack/react-query';
import useTableData from '../../../../../../hooks/useTableData';
import CustomPagination from '../../../../../../components/CustomPagination';
import Scrollbar from '../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import TableLoading from '../../../../../../components/table/TableLoading';
import UserTransactionReportToolbar from './UserTransactionReportToolbar';
import UserTransactionReportTableRow from './UserTransactionReportTableRow';
import { SearchTransactionParent } from '../../../../../../services/users/transaction';
// import CustomPagination from 'src/components/CustomPagination';
// import UserTransactionReportTableRow from './UserTransactionReportTableRow';
// import useTableData from "../../../../../hooks/useTableData";
// import Scrollbar from "../../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../../components/table";
// import TableLoading from "../../../../../components/table/TableLoading";
// import UserTransactionReportToolbar from "./UserTransactionReportToolbar";

const TABLE_HEAD = [
    // {id: 'transactionType', label: 'نوع تراکنش'},
    {id: 'description', label: 'توضیحات'},
    {id: 'price', label: 'مبلغ (ریال)'},
    {id: 'createdDate', label: 'تاریخ'},
    {id: 'couponId', label: 'موجودی قبلی (ریال)'},
    {id: 'isPaid', label: 'وضعیت'},

];

const UserTransactionReportTable = () => {
    const {userId} = useParams();
    const INITIAL_VALUES = {
        UserId: userId,
        StartDate: '',
        EndDate: '',
        PageIndex: 1,
        PageSize: 5,
        TransactionType: 0
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const {isLoading, data} = useQuery(['SearchTransaction', filterValue], () => SearchTransactionParent(filterValue));
    const [tableData, setTableData] = useTableData(data?.items);


    const handleUpdateList = async (data, newData) => {
        const newArr = [...tableData];
        newArr[tableData.indexOf(data)] = newData;
        setTableData(newArr);
    };

    return (
        <Box>
                <UserTransactionReportToolbar filterValue={filterValue} setFilterValue={setFilterValue} />
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={TABLE_HEAD.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData count={TABLE_HEAD.length} isNotFound={tableData?.length === 0}/>}
                                {
                                    tableData?.map((row, index) => (
                                        <UserTransactionReportTableRow key={index} row={row}
                                                                       handleUpdateList={handleUpdateList}/>
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
        </Box>
    );
};
export default UserTransactionReportTable;
