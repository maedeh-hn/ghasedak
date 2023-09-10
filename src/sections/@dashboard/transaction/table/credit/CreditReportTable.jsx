import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import CreditReportToolbar from './CreditReportToolbar';
import CreditReportTableRow from './CreditReportTableRow';
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'title', label: 'نوع تراکنش'},
    {id: 'priceLimit', label: 'مبلغ(ریال)'},
    {id: 'restrictIp', label: 'تاریخ'},
];

const CreditReportTable = ({data, filters, isLoading}) => {
    const [tableData, setTableData] = useTableData(data);

    return (
        <Box>
            <CustomCard>
                {filters && (
                    <CreditReportToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>
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
                                    <CreditReportTableRow
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

export default CreditReportTable;
