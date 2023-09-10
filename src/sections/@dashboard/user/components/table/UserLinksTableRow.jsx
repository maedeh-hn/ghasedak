import React from 'react';
import {TableCell, TableRow, Typography} from '@mui/material';
import TableActionButton from "../../../../../components/TableActionButton";
import {LinkStatusEnum} from "../../../../../utils/enums";
import Label from "../../../../../components/Label";

const UserLinksTableRow = ({row, onDeleteRow, onEditRow}) => {

    return (
        <TableRow hover>
            <TableCell align="center">{row.url}</TableCell>
            <TableCell align="center">
                <Label
                    color={
                        (row.status === 0 && 'warning') ||
                        (row.status === 1 && 'success') ||
                        (row.status === 2 && 'error') ||
                        'default'
                    }
                    sx={{textTransform: 'capitalize', direction: 'rtl'}}
                >
                    {LinkStatusEnum[row.status]}
                </Label>
            </TableCell>
            <TableCell align="center">
                <Typography>
                    <TableActionButton type={'edit'} title={'ویرایش'} onClick={onEditRow}/>
                    <TableActionButton type={'delete'} title={'حذف'} onClick={onDeleteRow}/>
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export default UserLinksTableRow;
