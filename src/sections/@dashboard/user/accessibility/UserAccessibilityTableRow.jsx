import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import TableActionButton from '../../../../components/TableActionButton';
import { ServiceTypeEnum } from '../../../../utils/enums';
// import TableActionButton from "../../../../../components/TableActionButton";
// import {ServiceTypeEnum} from "../../../../../utils/enums";

const UserAccessibilityTableRow = ({row, onEditRow}) => (
        <TableRow>
            <TableCell align="center">{ServiceTypeEnum[row.service]}</TableCell>
            <TableCell align="center">{row.isAccessible ? 'فعال' : 'غیرفعال'}</TableCell>
         
            <TableCell align="center">
                <TableActionButton type={'edit'} title={'ویرایش'} onClick={onEditRow}/>
            </TableCell>
        </TableRow>
    );

export default UserAccessibilityTableRow;