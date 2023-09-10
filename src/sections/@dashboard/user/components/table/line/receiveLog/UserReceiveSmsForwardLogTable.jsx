import {Card, Table, TableBody, TableContainer} from '@mui/material';
import UserReceiveSmsForwardLogTableToolbar from './UserReceiveSmsForwardLogTableToolbar';
import UserReceiveSmsForwardLogTableRow from './UserReceiveSmsForwardLogTableRow';
import Scrollbar from '../../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../../components/table';
import TableLoading from '../../../../../../../components/table/TableLoading';
// import {TableHeadCustom, TableNoData} from '../../../../../components/table';
// import UserReceiveSmsForwardLogTableRow from './UserReceiveSmsForwardLogTableRow';
// import UserReceiveSmsForwardLogTableToolbar from './UserReceiveSmsForwardLogTableToolbar';
// import Scrollbar from '../../../../../components/Scrollbar';
// import TableLoading from "../../../../../components/table/TableLoading";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'message', label: 'پیام', align: 'center'},
    {id: 'mobile', label: 'خط', align: 'center'},
    {id: 'mobile', label: 'موبایل', align: 'center'},
    {id: 'forwardedDate', label: 'زمان ارسال', align: 'center'},
    {id: 'urlForwardAddress', label: 'آدرس ارسال', align: 'center'},
    {id: 'providerReferenceId', label: 'شناسه سرویس دهنده', align: 'center'},
    {id: 'actionType', label: 'متد فراخوانی', align: 'center'},
];

const UserReceiveSmsForwardLogTable = ({data, isLoading, filters}) => (
        <Card>
            <UserReceiveSmsForwardLogTableToolbar
                filterValue={filters.filterValues}
                setFilterValue={filters.setFilterValues}
            />
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                            {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={data.length === 0}/>}
                            {data.map((row) => (
                                <UserReceiveSmsForwardLogTableRow key={row.id} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );

export default UserReceiveSmsForwardLogTable;
