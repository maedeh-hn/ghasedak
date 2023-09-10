import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import TableLoading from '../../../../../components/table/TableLoading';
import ReceivedSmsToolbar from './ReceivedSmsToolbar';
import ReceivedSmsTableRow from './ReceivedSmsTableRow';
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'message', label: 'پیام', align: 'left'},
    {id: 'line', label: 'شماره خط', align: 'left'},
    {id: 'mobile', label: 'موبایل', align: 'left'},
    {id: 'date', label: 'تاریخ ارسال', align: 'left'},
    {id: 'isForwardedViaUrl', label: 'ارسال شده با url', align: 'center'},
    {id: 'isReadViaWebService', label: 'خواندن با وب سرویس', align: 'center'},
    {id: 'action',label:'عملیات', align: 'center'},

];

const ReceivedSmsTable = ({data, filters, isLoading}) => {
    const [tableData, setTableData] = useTableData(data);

    return (
        <Box>
            <CustomCard>
                {filters &&
                    <ReceivedSmsToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>}
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData?.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData?.map((row, index) => (
                                    <ReceivedSmsTableRow key={index} row={row}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
        </Box>
    );
};

export default ReceivedSmsTable;
