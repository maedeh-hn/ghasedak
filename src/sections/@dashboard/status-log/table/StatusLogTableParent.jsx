import React from 'react';
import {Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../components/table';
import TableLoading from '../../../../components/table/TableLoading';
import useTableData from '../../../../hooks/useTableData';
import StatusLogTableRowParent from './StatusLogTableRowParent';
// import StatusLogTableRow from "./statusLogTableRow";
// import Scrollbar from "../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../components/table";
// import TableLoading from "../../../../components/table/TableLoading";
// import useTableData from "../../../../hooks/useTableData";

const TABLE_HEAD = [
    {id: 'title', label: 'شماره خط'},
    {id: 'priceLimit', label: 'موبایل'},
    {id: 'restrictIp', label: 'تعداد پیام'},
    {id: 'expireDate', label: 'متن پیام'},
    {id: 'expireDate', label: 'قیمت (ریال)'},
    {id: 'expireDate', label: 'تاریخ ارسال'},
    {id: 'expireDate', label: 'وضعیت'},
];

const StatusLogTableParent = ({data, isLoading, filters}) => {
    const [tableData, setTableData] = useTableData(data)
    return (
        <Scrollbar>
            <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                <Table>
                    <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData?.length}/>
                    <TableBody>
                        {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                        {!isLoading &&
                            <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0}/>}
                        {tableData?.map((row, index) => (
                            <StatusLogTableRowParent
                                key={index}
                                row={row}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Scrollbar>
    );
};

export default StatusLogTableParent;
