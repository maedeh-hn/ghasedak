import { TableCell, TableRow } from '@mui/material';
import {ActionTypeEnum} from '../../../../../utils/enums';
import {fDateTimeJalali} from "../../../../../utils/formatTime";
import IconMessageButtonModal from "../../../../../components/IconMessageButtonModal";

// ----------------------------------------------------------------------

const ReceiveSmsForwardLogTableRow = ({ row }) => {
  return (
    <TableRow hover>
      <TableCell align="left">
          <IconMessageButtonModal title={'متن پیام'} message={row.message} />
      </TableCell>
      <TableCell align="left">{row.lineNumber}</TableCell>
      <TableCell align="left">{row.mobile}</TableCell>
      <TableCell align="left">{fDateTimeJalali(row.forwardedDate)}</TableCell>
      <TableCell align="left">{row.urlForwardAddress}</TableCell>
      <TableCell align="left">{row.providerReferenceId}</TableCell>
      <TableCell align="left">{ActionTypeEnum[row.actionType]}</TableCell>
    </TableRow>
  );
};

export default ReceiveSmsForwardLogTableRow;
