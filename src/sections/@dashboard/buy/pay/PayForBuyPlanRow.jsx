import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { numberWithCommas } from 'src/utils/functions';

const PayForBuyPlanTableRow = ({ row }) => {
  return (
    <TableRow>
      <TableCell align="center">خرید سرویس {row[0].name}</TableCell>
      <TableCell align="center">{numberWithCommas(row[0].price)} ریال</TableCell>
    </TableRow>
  );
};

export default PayForBuyPlanTableRow;
