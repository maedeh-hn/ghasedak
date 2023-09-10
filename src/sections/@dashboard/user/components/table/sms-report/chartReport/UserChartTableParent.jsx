import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';

import { TableHeadCustom, TableNoData } from '../../../../../../../components/table';
import TableLoading from '../../../../../../../components/table/TableLoading';
import Scrollbar from '../../../../../../../components/Scrollbar';
import useTableData from '../../../../../../../hooks/useTableData';
import UserChartTableToolbarParent from './UserChartTableToolbarParent';
import UserChartTableRowParent from './UserChartTableRowParent';
// import {TableHeadCustom, TableNoData} from "../../../../../../components/table";
// import TableLoading from "../../../../../../components/table/TableLoading";
// import Scrollbar from "../../../../../../components/Scrollbar";
// import useTableData from "../../../../../../hooks/useTableData";


const TABLE_HEAD = [
    {id: 'number', label: 'شماره موبایل'},
    {id: 'statusReport', label: 'وضعیت گزارش'},
    {id: 'providerReferenceId', label: 'شماره سرویس دهنده'},
    {id: 'providerResponseCode', label: 'کد سرویس دهنده'},
    {id: 'actualSendDate', label: 'تاریخ ارسال سیستم'},
    {id: 'price', label: 'قیمت (ریال)'},

];

const UserChartTableParent = ({data, filters, isLoading}) => {
    const [tableData, setTableData] = useTableData(data)
console.log(tableData);
    return (
        <Box>
            <Card>
                <UserChartTableToolbarParent filterValues={filters.filterValues} setFilterValues={filters.setFilterValues}/>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom
                                headLabel={TABLE_HEAD}
                            />
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData count={TABLE_HEAD.length} isNotFound={tableData?.length === 0}/>}
                                {tableData?.map((row, index) => <UserChartTableRowParent key={index} row={row}/>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </Box>
    );
};
export default UserChartTableParent;
