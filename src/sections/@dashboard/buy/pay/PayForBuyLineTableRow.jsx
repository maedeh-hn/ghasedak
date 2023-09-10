import React from 'react';
import {
    TableCell,
    TableRow,
} from '@mui/material';
import {numberWithCommas} from 'src/utils/functions';

const PayForBuyLineTableRow = ({row}) => {
    return (
        <TableRow>
            <TableCell align="left">خرید خط {row?.number}</TableCell>
            <TableCell align="left">{numberWithCommas(row?.userPrice)}</TableCell>
        </TableRow>
    );
};

export default PayForBuyLineTableRow;
