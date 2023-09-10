import React, {useState} from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {SearchCreditLogsParent} from '../../../../../../services/users/transaction';
import {useParams} from 'react-router';
import CustomPagination from '../../../../../../components/CustomPagination';
import Scrollbar from '../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import TableLoading from '../../../../../../components/table/TableLoading';
import TransactionReportToolbar from './TransactionReportToolbar';
import UserCreditReportTableRow from './UserCreditReportTableRow';
import useTableData from '../../../../../../hooks/useTableData';
// import CustomPagination from 'src/components/CustomPagination';
// import UserCreditReportTableRow from './UserCreditReportTableRow';
// import useTableData from "../../../../../hooks/useTableData";
// import Scrollbar from "../../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../../components/table";
// import TableLoading from "../../../../../components/table/TableLoading";
// import UserCreditReportToolbar from "./UserCreditReportToolbar";
// import useModal from "../../../../../hooks/useModal";
// import RecordTransactionModal from "../../components/modal/RecordTransactionModal";
// import TransactionsReportToolbar from "../transaction/UserTransactionReportHeader";
// import CreditReportHeader from "./UserCreditReportHeader";
// import FinancialReport from "../financialReport/FinancialReport";

const TABLE_HEAD = [
    {id: 'title', label: 'توضیحات'},
    {id: 'title', label: 'نوع تراکنش'},
    {id: 'priceLimit', label: 'مبلغ (ریال)'},
    {id: 'restrictIp', label: 'تاریخ'},
];

const UserCreditReportTable = ({refetch}) => {
    const {userId} = useParams();
    const INITIAL_VALUES = {
        UserId: userId,
        StartDate: '',
        EndDate: '',
        PageIndex: 1,
        PageSize: 5,
        CreditType: '0',
    };

    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const {isLoading, data} = useQuery(['SearchCreditLog', filterValue], () => SearchCreditLogsParent(filterValue));

    const [tableData, setTableData] = useTableData(data?.items);

    return (
        <Box>
                <TransactionReportToolbar filterValue={filterValue} setFilterValue={setFilterValue} />
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={TABLE_HEAD.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData?.map((row, index) => (
                                    <UserCreditReportTableRow
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
        </Box>
    );
};

export default UserCreditReportTable;
