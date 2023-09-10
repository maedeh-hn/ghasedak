import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {numberWithCommas} from 'src/utils/functions';
import {fDateTimeJalali} from '../../../../../utils/formatTime';
import {CreditTypeEnum} from '../../../../../utils/enums';
import Label from "../../../../../components/Label";

const CreditReportTableRow = ({row}) => {
    return (
        <TableRow hover>
            <TableCell align="center">{CreditTypeEnum[row.creditType]}</TableCell>
            <TableCell align="center">
                <Label
                    color={
                        (row.amount > 0 && 'success') ||
                        (row.amount < 0 && 'error') ||
                        'default'
                    }
                    sx={{textTransform: 'capitalize', direction: 'rtl'}}
                >
                    {numberWithCommas(row.amount)}
                </Label>
            </TableCell>
            <TableCell align="center">{fDateTimeJalali(row.createdDate)}</TableCell>
        </TableRow>
    );
};

export default CreditReportTableRow;
