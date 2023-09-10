import React from 'react';
import {  TableCell, TableRow } from '@mui/material';
import { CreditTypeEnum } from '../../../../../../utils/enums';
import { numberWithCommasPersian } from '../../../../../../utils/functions';
import Label from '../../../../../../components/Label';
import { fDateTimeJalali } from '../../../../../../utils/formatTime';
// import {CreditTypeEnum} from "../../../../../utils/enums";
// import {numberWithCommasPersian} from "../../../../../utils/functions";
// import Label from "../../../../../components/Label";
// import {fDateTimeJalali} from "../../../../../utils/formatTime";

const UserCreditReportTableRow = ({ row }) => (
    <TableRow hover>
      <TableCell align="center">{row.description}</TableCell>
      <TableCell align="center">{CreditTypeEnum[row.creditType]}</TableCell>
      <TableCell align="center">
        <Label
          color={(row.amount > 0 && 'success') || (row.amount < 0 && 'error') || 'default'}
          sx={{ textTransform: 'capitalize', direction: 'rtl' }}
        >
          {numberWithCommasPersian(row.amount)}
        </Label>
      </TableCell>
      <TableCell align="center">{fDateTimeJalali(row.createdDate)}</TableCell>
    </TableRow>
  );

export default UserCreditReportTableRow;