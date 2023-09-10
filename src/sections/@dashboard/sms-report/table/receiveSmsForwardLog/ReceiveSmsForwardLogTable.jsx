import {Card, Table, TableBody, TableContainer} from '@mui/material';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import ReceiveSmsForwardLogTableRow from './ReceiveSmsForwardLogTableRow';
import ReceiveSmsForwardLogTableToolbar from './ReceiveSmsForwardLogTableToolbar';
import Scrollbar from '../../../../../components/Scrollbar';
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'message', label: 'پیام', align: 'center'},
    {id: 'message', label: 'خط', align: 'center'},
    {id: 'mobile', label: 'موبایل', align: 'center'},
    {id: 'forwardedDate', label: 'زمان ارسال', align: 'center'},
    {id: 'urlForwardAddress', label: 'آدرس ارسال', align: 'center'},
    {id: 'providerReferenceId', label: 'شناسه سرویس دهنده', align: 'center'},
    {id: 'actionType', label: 'متد فراخوانی', align: 'center'},
];

const ReceiveSmsForwardLogTable = ({data, isLoading, filters}) => {
    const [tableData, setTableData] = useTableData(data)
    return (
        <CustomCard>
            <ReceiveSmsForwardLogTableToolbar
                filterValue={filters.filterValue}
                setFilterValue={filters.setFilterValue}
            />
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom headLabel={TABLE_HEAD}/>
                        <TableBody>
                            {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters?.filterValue?.PageSize}/>}
                            {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0}/>}
                            {tableData.map((row) => (
                                <ReceiveSmsForwardLogTableRow key={row.id} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </CustomCard>
    );
};

export default ReceiveSmsForwardLogTable;
