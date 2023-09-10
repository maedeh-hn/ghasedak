import React from 'react';
import { TableCell, TableRow } from '@mui/material';
const SmsModalTableRow = ({ row }) => {
  return (
    <>
      <TableRow>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.isResponse ? row.content.message : row.content}</TableCell>
      </TableRow>
    </>
  );
};

export default SmsModalTableRow;
