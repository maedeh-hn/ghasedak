import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import TableLoading from '../../../../../components/table/TableLoading';
import LogSmsReportTableRow from './LogSmsReportTableRow';
import LogSmsReportToolbar from './LogSmsReportToolbar';
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'date', label: 'تاریخ'},
    {id: 'method', label: 'نوع فراخوانی'},
    {id: 'response', label: 'کدخروجی'},
    {id: 'ip', label: 'ip'},
    {id: 'detaile', label: 'جزییات'},
];

const LogSmsReportTable = ({data, filters, isLoading}) => {
    const [tableData, setTableData] = useTableData(data);

    return (
        <Box>
            <CustomCard>
                {filters &&
                    <LogSmsReportToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>}
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => (
                                    <LogSmsReportTableRow
                                        key={index}
                                        row={row}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
        </Box>
    );
};

export default LogSmsReportTable;
