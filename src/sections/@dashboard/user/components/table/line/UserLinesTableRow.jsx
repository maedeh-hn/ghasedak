import { TableCell, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { useState } from "react";
// import {numberWithCommasPersian, tomanPrice} from '../../../../../utils/functions';
// import {PATH_DASHBOARD} from '../../../../../routes/paths';
// import {ProviderEnum} from '../../../../../utils/enums';
// import TableActionButton from '../../../../../components/TableActionButton';
// import Label from '../../../../../components/Label';
import { numberWithCommasPersian, tomanPrice } from '../../../../../../utils/functions';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import TableActionButton from '../../../../../../components/TableActionButton';
import Label from '../../../../../../components/Label';
import { ProviderEnum } from '../../../../../../utils/enums';

// ----------------------------------------------------------------------

const UserLinesTableRow = ({ row, onEditRow, onDeleteRow }) => {
    const { userId, username } = useParams();
   
    return (
        <TableRow hover>
            <TableCell align="center">{row.number}</TableCell>
            <TableCell align="center">{ProviderEnum[row.providerCode]}</TableCell>
            <TableCell align="center">{numberWithCommasPersian(tomanPrice(row.resellerPrice))} </TableCell>
            <TableCell align="center">{numberWithCommasPersian(tomanPrice(row.userPrice))} </TableCell>
            <TableCell align="center">
                <Label
                    color={row.status ? 'success' : 'error'}
                >
                    {row.status ? 'فعال' : 'غیر فعال'}
                </Label>
            </TableCell>

            <TableCell align="center">
                {/* <RouterLink to={PATH_DASHBOARD.userManagement.lineOwner(username, userId, row.id, row.number)} state={{
                    legalType: row.legalType
                }}>
                    <TableActionButton type={'person_setting'} title={'مالکیت'}/>
                </RouterLink> */}
                {!row.isPublic ? <><TableActionButton type={'setting'} title={'تنظیمات فراخوانی'} onClick={onEditRow} />
                    <RouterLink to={PATH_DASHBOARD.userManagement.lineNumberReceiveLog(username, userId, row.number)}>
                        <TableActionButton type={'receiveLog'} title={'گزارش ارسال به url'} />
                    </RouterLink>
                    <RouterLink to={PATH_DASHBOARD.userManagement.lineDetail(username, userId, row.id, row.number)}>
                        <TableActionButton type={'edit'} title={'ویرایش'} />
                    </RouterLink>
                    <TableActionButton type={'delete'} title={'حذف'} onClick={onDeleteRow} /></> : "این خط عمومی است"}

            </TableCell>
        </TableRow>
    );
};

export default UserLinesTableRow;
