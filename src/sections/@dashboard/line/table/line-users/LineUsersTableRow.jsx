import { TableCell, TableRow, Typography, useTheme } from '@mui/material';
import React from "react";
import { numberWithCommasPersian, tomanPrice } from '../../../../../utils/functions';
import TableActionButton from '../../../../../components/TableActionButton';
import UserMoreInfo from '../../../../../components/UserMoreInfo';
// import { numberWithCommasPersian, tomanPrice } from '../../../../../utils/functions';
// import TableActionButton from '../../../../../components/TableActionButton';
// import Label from "../../../../../components/Label";
// import UserMoreInfo from "../../../../../components/UserMoreInfo";

// ----------------------------------------------------------------------

const LineUsersTableRow = ({ row, handleEditRow, handleDeleteRow }) => {
  const theme = useTheme();
 console.log(row);
  return (
    <TableRow>
      {/* <TableCell align="center">
          <UserMoreInfo userId={row.userId} />
         </TableCell> */}
      <TableCell align="center">{row.lineNumber}</TableCell>
      <TableCell align="center">{row.canReceive ? 'فعال' : 'غیرفعال'}</TableCell>
      <TableCell align="center">{row.canSendToGroups ? 'فعال' : 'غیرفعال'}</TableCell>
      <TableCell align="center">{row.canUseWebservice ? 'فعال' : 'غیرفعال'}</TableCell>
      <TableCell align="center">{row.needsParentConfirmationToSend ? 'فعال' : 'غیرفعال'}</TableCell>
      {/* <TableCell align="center">{row.maxBulkReceptorsWithoutConfirm}</TableCell> */}
      {/* <TableCell align="center">{numberWithCommasPersian(tomanPrice(row.purchasePrice))} </TableCell> */}
      <TableCell align="center">
        <Typography>
          <TableActionButton type={'edit'} title={'ویرایش'} onClick={handleEditRow} />
          <TableActionButton type={'delete'} title={'حذف'} onClick={handleDeleteRow} />
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default LineUsersTableRow;