import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import TransactionReportToolbar from './TransactionReportToolbar';
import TransactionReportTableRow from './TransactionReportTableRow';
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'transactionType', label: 'نوع تراکنش'},
    {id: 'title', label: 'توضیحات'},
    {id: 'expireDate', label: 'موجودی قبلی (ریال)'},
    {id: 'priceLimit', label: 'مبلغ (ریال)'},
    {id: 'restrictIp', label: 'تاریخ'},
    {id: 'expireDate', label: 'وضعیت'},
];

const TransactionReportTable = ({data, filters, isLoading}) => {
    const [tableData, setTableData] = useTableData(data);

    return (
        <Box>
            <CustomCard>
                {filters && (
                    <TransactionReportToolbar filterValue={filters.filterValue}
                                              setFilterValue={filters.setFilterValue}/>
                )}
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => (
                                    <TransactionReportTableRow
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

export default TransactionReportTable;
