import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../../components/Scrollbar';
import useTableData from '../../../../../../hooks/useTableData';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import TableLoading from '../../../../../../components/table/TableLoading';
import UserReceivedSmsToolbar from './UserReceivedSmsToolbar';
import UserReceivedSmsTableRow from './UserReceivedSmsTableRow';
// import UserReceivedSmsToolbar from './UserReceivedSmsToolbar';
// import UserReceivedSmsTableRow from './UserReceivedSmsTableRow';
// import useTableData from "../../../../../hooks/useTableData";
// import {TableHeadCustom, TableNoData} from "../../../../../components/table";
// import TableLoading from "../../../../../components/table/TableLoading";
// import Scrollbar from "../../../../../components/Scrollbar";

const TABLE_HEAD = [
    {id: 'message', label: 'پیام'},
    {id: 'lineNumber', label: 'شماره خط'},
    {id: 'mobile', label: 'موبایل'},
    {id: 'actualSendDate', label: 'تاریخ دریافت'},
    {id: 'isForwardedViaUrl', label: 'ارسال شده با url'},
    {id: 'isReadViaWebService', label: 'خوانده شده'},
    {id: '', label: ''},
];

const UserReceivedSmsTable = ({data, filters, isLoading}) => {
    const [tableData, setTableData] = useTableData(data)

    return (
        <Box>
            <Card>
                <UserReceivedSmsToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData?.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData?.map((row, index) => (
                                    <UserReceivedSmsTableRow key={index} row={row}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </Box>
    );
};

export default UserReceivedSmsTable;
