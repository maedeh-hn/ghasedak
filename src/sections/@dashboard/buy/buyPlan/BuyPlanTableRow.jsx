import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {numberWithCommas} from "src/utils/functions";

const BuyPlanTableRow = ({row}) => {

    return (
        <TableRow hover>
            <TableCell align="left">{row.title}</TableCell>
            {row.prices.map((price, index) => (
                <TableCell sx={{fontSize: index === 1 ? 22 : 16}} key={index} align="left">
                    {numberWithCommas(price)} ریال
                </TableCell>
            ))}
        </TableRow>
    );
};

export default BuyPlanTableRow;
