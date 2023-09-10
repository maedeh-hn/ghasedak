import React from 'react';
import { Stack, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';
// import TableActionButton from 'src/components/TableActionButton';
import { useParams } from 'react-router-dom';
import TableActionButton from '../../../../../../../components/TableActionButton';
import Label from '../../../../../../../components/Label';
import IconMessageButtonModal from '../../../../../../../components/IconMessageButtonModal';
import { fDateTimeJalali } from '../../../../../../../utils/formatTime';
import { OriginEnum, SmsStatusEnum } from '../../../../../../../utils/enums';
import { PATH_DASHBOARD } from '../../../../../../../routes/paths';
import { numberWithCommasPersian } from '../../../../../../../utils/functions';
// import Label from "../../../../../../components/Label";
// import IconMessageButtonModal from "../../../../../../components/IconMessageButtonModal";
// import {fDateTimeJalali} from "../../../../../../utils/formatTime";
// import {OriginEnum, SmsStatusEnum} from "../../../../../../utils/enums";
// import {PATH_DASHBOARD} from "../../../../../../routes/paths";
// import CustomTooltip from "../../../../../../components/CustomTooltip";
// import {numberWithCommasPersian} from "../../../../../../utils/functions";

const UserGroupSmsReportTableRow = ({ row,IsPanel }) => {
  const navigate = useNavigate();
  const { username, userId } = useParams();
  console.log(row);
  return (
    <>
      <TableRow hover>
        <TableCell align="center">{row.lineNumber}</TableCell>
        <TableCell align="center" sx={{ display: 'flex' }}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
            <IconMessageButtonModal message={row.message} title={'متن پیام'} />
          </Stack>
        </TableCell>
        <TableCell align="center">{OriginEnum[row.origin]}</TableCell>
        <TableCell align="center">{numberWithCommasPersian(row.receptorCount)}</TableCell>
        <TableCell align="center">{numberWithCommasPersian(row.price)} </TableCell>
        <TableCell align="center">{fDateTimeJalali(row.sendDate)}</TableCell>
        <TableCell align="center">
          <Label
            color={
              ([0, 2].includes(row.bulkStatus) && 'warning') ||
              ([2, 3, 4].includes(row.bulkStatus) && 'primary') ||
              ([1, 6, 7, 8, 9].includes(row.bulkStatus) && 'error') ||
              'default'
            }
          >
            {SmsStatusEnum[row.bulkStatus]}
          </Label>
        </TableCell>
        <TableCell align="center">
          {[3, 4, 5, 9].includes(row.bulkStatus) && (
            <TableActionButton
              onClick={() => {
                navigate(PATH_DASHBOARD.userManagement.groupSendReportChart(username, userId, row.id,IsPanel));
              }}
              type={'chart'}
              title={'نمودار'}
            />
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserGroupSmsReportTableRow;
