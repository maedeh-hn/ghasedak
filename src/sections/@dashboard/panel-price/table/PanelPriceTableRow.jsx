import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {numberWithCommas} from 'src/utils/functions';
import {OperatorTypeEnum, ProviderNameEnum} from '../../../../utils/enums';
import useAuth from "../../../../hooks/useAuth";

const PanelPriceTableRow = ({row}) => {
    const {user} = useAuth()

    return (
        <TableRow hover>
            <TableCell align="left">{ProviderNameEnum[row.providerCode]}</TableCell>
            <TableCell align="left">{OperatorTypeEnum[row.operatorCode]}</TableCell>
            <TableCell align="left">{numberWithCommas(row.faPrice)} ریال</TableCell>
            <TableCell align="left">{numberWithCommas(Math.trunc(user.credit / parseInt(row.faPrice)))}</TableCell>
            <TableCell align="left">{numberWithCommas(row.enPrice)} ریال</TableCell>
            <TableCell align="left">{numberWithCommas(Math.trunc(user.credit / parseInt(row.enPrice)))}</TableCell>
        </TableRow>
    );
};

export default PanelPriceTableRow;
