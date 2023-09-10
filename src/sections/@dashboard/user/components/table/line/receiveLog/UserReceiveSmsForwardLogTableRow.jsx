import { TableCell, TableRow } from '@mui/material';
import { ActionTypeEnum } from '../../../../../../../utils/enums';
import { fDateTimeJalali } from '../../../../../../../utils/formatTime';
// import {ActionTypeEnum} from '../../../../../utils/enums';
// import {fDateTimeJalali} from "../../../../../utils/formatTime";

// ----------------------------------------------------------------------

const UserReceiveSmsForwardLogTableRow = ({ row }) => (
    <TableRow hover>
      <TableCell align="center">{row.message}</TableCell>
      <TableCell align="center">{row.lineNumber}</TableCell>
      <TableCell align="center">{row.mobile}</TableCell>
      <TableCell align="center">{fDateTimeJalali(row.forwardedDate)}</TableCell>
      <TableCell align="center">{row.urlForwardAddress}</TableCell>
      <TableCell align="center">{row.providerReferenceId}</TableCell>
      <TableCell align="center">{ActionTypeEnum[row.actionType]}</TableCell>
    </TableRow>
  );

export default UserReceiveSmsForwardLogTableRow;