import {
    Card,
    Table,
    TableBody,
    TableContainer
} from '@mui/material';
import NotificationTableToolbar from "./NotificationTableToolbar";
import NotificationTableRow from "./NotificationTableRow";
import TableLoading from "../../../components/table/TableLoading";
import {TableHeadCustom, TableNoData} from "../../../components/table";
import Scrollbar from "../../../components/Scrollbar";
import useTableData from "../../../hooks/useTableData";
import CustomCard from "../../../components/CustomCard";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'title', label: 'عنوان', align: 'left'},
    {id: 'description', label: 'توضیحات', align: 'left'},
    {id: 'sendDate', label: 'تاریخ ارسال', align: 'left'},
];

const NotificationTable = ({data, isLoading, filters = false}) => {

    const [tableData, setTableData] = useTableData(data);

    return (
        <CustomCard>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom headLabel={TABLE_HEAD}/>
                        <TableBody>
                            {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                            {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0}/>}
                            {tableData.map((row) => (
                                <NotificationTableRow
                                    key={row.id}
                                    row={row}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </CustomCard>
    );
}

export default NotificationTable
