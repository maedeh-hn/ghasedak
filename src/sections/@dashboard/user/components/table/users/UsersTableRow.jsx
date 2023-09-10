import { Stack, TableCell, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import { numberWithCommasPersian, tomanPrice } from '../../../../../../utils/functions';
import { fDateTimeJalali } from '../../../../../../utils/formatTime';
import Label from '../../../../../../components/Label';
import { RoleNameEnum } from '../../../../../../utils/enums';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import TableActionButton from '../../../../../../components/TableActionButton';

// ----------------------------------------------------------------------

const UsersTableRow = ({ row }) => (
    <TableRow hover>
        <TableCell align="center">{row.fullName}</TableCell>
        <TableCell align="center">{row.userName}</TableCell>
        <TableCell align="center">{row.mobile}</TableCell>
        {/* <TableCell align="left">
            <Stack>
                <ul>{row.roles?.map(item => <li>{RoleNameEnum[item.roleNames]}</li>)}</ul>
            </Stack>
        </TableCell> */}
        <TableCell align="center">{numberWithCommasPersian(tomanPrice(row.credit))} </TableCell>
        {/* <TableCell align="center">
            <Label color={(
                (row.plan === 'طلایی' && 'warning') ||
                'default'
            )}>
                {row.plan}
            </Label>
        </TableCell> */}
        <TableCell align="center">{fDateTimeJalali(row.registerDate)}</TableCell>
        <TableCell align="center">
            <RouterLink to={PATH_DASHBOARD.userManagement.view(row.userName, row.id)}>
                <TableActionButton type={'edit'} title={'ویرایش'} />
            </RouterLink>
        </TableCell>
    </TableRow>
);

export default UsersTableRow;