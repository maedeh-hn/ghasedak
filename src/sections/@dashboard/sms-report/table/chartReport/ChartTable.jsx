import React from 'react';
import {Box, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import useTable from '../../../../../hooks/useTable';
import ChartTableRow from './ChartTableRow';
import ChartTableToolbar from "./ChartTableToolbar";
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'number', label: 'شماره خط'},
    {id: 'statusReport', label: 'وضعیت گزارش'},
    {id: 'providerReferenceId', label: 'شماره ارجاع گیرنده'},
    {id: 'price', label: 'قیمت (ریال)'},
];

const ChartTable = ({data, filters, isLoading}) => {
    const {dense, order, orderBy, selected, onSort} = useTable();

    const [tableData, setTableData] = useTableData(data);

    return (
        <Box>
            <CustomCard>
                <ChartTableToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table size={dense ? 'small' : 'medium'}>
                            <TableHeadCustom
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={tableData.length}
                                numSelected={selected.length}
                                onSort={onSort}
                            />
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => <ChartTableRow key={index} row={row}/>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
        </Box>
    );
};
export default ChartTable;
