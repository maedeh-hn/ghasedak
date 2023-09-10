import React from 'react';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { numberWithCommasPersian } from '../../../../utils/functions';
import IconMessageButtonModal from '../../../../components/IconMessageButtonModal';
import { singleSmsStatusEnum } from '../../../../utils/enums';
import { fDateTimeJalali } from '../../../../utils/formatTime';
// import {numberWithCommasPersian} from "../../../../utils/functions";
// import IconMessageButtonModal from "../../../../components/IconMessageButtonModal";
// import {singleSmsStatusEnum} from "../../../../utils/enums";
// import {fDateTimeJalali} from "../../../../utils/formatTime";


const StatusLogTableRowParent = ({ row, handleShowModal }) => {
  const theme = useTheme();
  return (
    <TableRow hover>
      <TableCell align="center">{row.lineNumber}</TableCell>
      <TableCell align="center">{row.receptor}</TableCell>
      <TableCell align="center">{numberWithCommasPersian(row.count)}</TableCell>
      <TableCell align="center">
        <IconMessageButtonModal message={row.message} title={'متن پیام'} />
      </TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{fDateTimeJalali(row.sendDate)}</TableCell>
      <TableCell align="center">{singleSmsStatusEnum[row.status]}</TableCell>
    </TableRow>
  );
};

export default StatusLogTableRowParent;