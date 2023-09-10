import React from 'react';
import {Stack, TableCell, TableRow} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import TableHeaderActionButton from '../../../../../../components/TableHeaderActionButton';
import { useSnackbar } from 'notistack';
import { numberWithCommasPersian } from '../../../../../../utils/functions';
import { fDateTimeJalali } from '../../../../../../utils/formatTime';
import Label from '../../../../../../components/Label';
import { TransactionTypeEnum } from '../../../../../../utils/enums';
// import {Check, CheckBank} from 'src/services/users/transaction';
// import TableHeaderActionButton from 'src/components/TableHeaderActionButton';
// import {useSnackbar} from 'notistack';
// import {numberWithCommasPersian} from "../../../../../utils/functions";
// import {fDateTimeJalali} from "../../../../../utils/formatTime";
// import Label from "../../../../../components/Label";
// import {TransactionTypeEnum} from "../../../../../utils/enums";

const UserTransactionReportTableRow = ({row, handleUpdateList}) => {
    const {enqueueSnackbar} = useSnackbar();



    return (
        <TableRow hover>
            {/* <TableCell align="center">{TransactionTypeEnum[row.transactionType]}</TableCell> */}
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">
                <Label
                    color={
                        (row.isIncremented ? 'success' : 'error') ||
                        'default'
                    }
                >
                    {numberWithCommasPersian(row.price)}
                </Label>
            </TableCell>
            <TableCell align="center">{fDateTimeJalali(row.createdDate)}</TableCell>
            <TableCell align="center">{numberWithCommasPersian(row.availableBalance)}</TableCell>
            <TableCell align="center">
                <Label color={(row.isPaid ? 'success' : 'error') || 'default'}>
                    {row.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
                </Label>
            </TableCell>

        </TableRow>
    );
};

export default UserTransactionReportTableRow;
