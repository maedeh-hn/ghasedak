import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import IconMessageButtonModal from '../../../components/IconMessageButtonModal';
import { ActionTypeEnum } from '../../../utils/enums';
import { fDateTimeJalali } from '../../../utils/formatTime';
// import IconMessageButtonModal from "../../../../components/IconMessageButtonModal";
// import {ActionTypeEnum, OriginEnum} from "../../../../utils/enums";
// import {fDateTimeJalali} from "../../../../utils/formatTime";


const UserForwardLogTableRowParent = ({row}) => (
        <TableRow hover>
            <TableCell align="center">{row.lineNumber}</TableCell>
            <TableCell align="center">
                <IconMessageButtonModal message={row.message} title={'متن پیام'}/>
            </TableCell>
            <TableCell align="center">{row.mobile}</TableCell>
            <TableCell align="center">{fDateTimeJalali(row.forwardedDate)}</TableCell>
            <TableCell align="center">{row.providerReferenceId}</TableCell>
            <TableCell align="center">{row.urlForwardAddress}</TableCell>
            <TableCell align="center">{ActionTypeEnum[row.actionType]}</TableCell>
        </TableRow>
    );

export default UserForwardLogTableRowParent;
