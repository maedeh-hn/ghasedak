import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {numberWithCommas} from 'src/utils/functions';
import {fDateTimeJalali} from '../../../../../utils/formatTime';
import Label from "../../../../../components/Label";
import {TransactionTypeEnum} from "../../../../../utils/enums";

const TransactionReportTableRow = ({row}) => {

    return (
        <TableRow hover>
            <TableCell align="left">{TransactionTypeEnum[row.transactionType]}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="left">{numberWithCommas(row?.availableBalance)}</TableCell>
            <TableCell align="left">
                <Label
                    color={
                        (row.isIncremented ? 'success' : 'error') ||
                        'default'
                    }
                >
                    {numberWithCommas(row.price)}
                </Label>
            </TableCell>
            <TableCell align="left">{fDateTimeJalali(row.createdDate)}</TableCell>
            <TableCell align="left">
                <Label
                    color={
                        (row.isPaid ? 'success' : 'error') ||
                        'default'
                    }
                >
                    {row.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
                </Label>
            </TableCell>
        </TableRow>
    );
};

export default TransactionReportTableRow;
