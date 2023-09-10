import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { numberWithCommas } from 'src/utils/functions';
import { ProviderNameEnum, SmsStatusReportEnum } from '../../../../../utils/enums';

const ChartTableRow = ({ row }) => {
  const theme = useTheme();
  return (
    <TableRow hover>
      <TableCell align="center">{row.number}</TableCell>
      <TableCell align="center">{SmsStatusReportEnum[row.status]}</TableCell>
      <TableCell align="center">{ProviderNameEnum[row.providerReferenceId]}</TableCell>
      <TableCell align="center">{numberWithCommas(row.price)}</TableCell>
    </TableRow>
  );
};

export default ChartTableRow;
