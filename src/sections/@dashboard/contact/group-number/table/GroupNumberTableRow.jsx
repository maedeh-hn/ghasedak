import React from 'react';
import {Checkbox, TableCell, TableRow} from '@mui/material';
import TableActionButton from "../../../../../components/TableActionButton";
import {fDateTimeJalali} from "../../../../../utils/formatTime";

const GroupNumberTableRow = ({row, selected, onSelectRow, onDeleteRow, onEditRow}) => {
    return (
        <TableRow selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow}/>
            </TableCell>
            <TableCell align="center">{row.firstName}</TableCell>
            <TableCell align="center">{row.lastName}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center" sx={{direction:"rtl"}}>{row.number}</TableCell>
            <TableCell align="center">{fDateTimeJalali(row.birthDate)}</TableCell>
            <TableCell align="center">
                <TableActionButton type={'edit'} title={'ویرایش'} onClick={onEditRow}/>
                <TableActionButton type={'delete'} title={'حذف'} onClick={onDeleteRow}/>
            </TableCell>
        </TableRow>
    );
};

export default GroupNumberTableRow;
