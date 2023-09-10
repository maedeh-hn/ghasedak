import {
    Card,
    Table,
    TableBody,
    TableContainer
} from '@mui/material';
import useTableData from '../../../../../../hooks/useTableData';
import Scrollbar from '../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import TableLoading from '../../../../../../components/table/TableLoading';
import UsersTableRow from './UsersTableRow';
import UserLinksTableToolbar from '../UserLinksTableToolbar';
import UsersTableToolbar from './UsersTableToolbar';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'fullname', label: 'نام مشتری', align: 'center'},
    {id: 'username', label: 'نام کاربری', align: 'center'},
    {id: 'mobile', label: 'موبایل', align: 'center'},
    // {id: 'role', label: 'نقش', align: 'center'},
    {id: 'credit', label: 'موجودی (ریال)', align: 'center'},
    // {id: 'plan', label: 'پلن', align: 'center'},
    {id: 'createDate', label: 'تاریخ ثبت نام', align: 'center'},
    {id: 'operation', label: '', align: 'center'},
]


const UsersTable = ({data, isLoading, filters = false}) => {
    const [tableData, setTableData] = useTableData(data)

    return (
        <Card>
            {
                filters && <UsersTableToolbar
                filterValue={filters.filterValue}
                setFilterValue={filters.setFilterValue}
            />
            }

            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                            {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0}/>}
                            {tableData.map((row) => (
                                <UsersTableRow
                                    key={row.id}
                                    row={row}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </Card>
    );
}

export default UsersTable