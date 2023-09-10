import React from 'react';
import {Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../components/table';
import TableLoading from '../../../components/table/TableLoading';
import useTableData from '../../../hooks/useTableData';
import UserForwardLogTableRowParent from './UserForwardLogTableRowParent';
// import UserForwardLogTableRow from "./UserForwardLogTableRow";
// import Scrollbar from "../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../components/table";
// import TableLoading from "../../../../components/table/TableLoading";
// import useTableData from "../../../../hooks/useTableData";

const TABLE_HEAD = [
    {id: 'lineNumber', label: 'شماره خط'},
    {id: 'message', label: 'پیام'},
    {id: 'mobile', label: 'موبایل'},
    {id: 'forwardedDate', label: 'تاریخ ارسال'},
    {id: 'providerReferenceId', label: 'شناسه پیام سرویس دهنده'},
    {id: 'urlForwardAddress', label: 'آدرس ارسال'},
    {id: 'actionType', label: 'متد فراخوانی'},
];

const UserForwardLogTableParent = ({data, isLoading, filters}) => {
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
                            <UserForwardLogTableRowParent
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

export default UserForwardLogTableParent;
