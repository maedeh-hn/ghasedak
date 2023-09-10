import React from 'react';
import {Stack, TableCell, TableRow} from '@mui/material';
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import { fDateTimeJalali } from '../../../../../../../utils/formatTime';
import { singleSmsStatusEnum } from '../../../../../../../utils/enums';

import { PATH_DASHBOARD } from '../../../../../../../routes/paths';

import TableActionButton from '../../../../../../../components/TableActionButton';
import SmsDetailsWithModalParent from '../../../../../sms-report/table/SingleSms/SmsDetilesWithModalParent';
// import Label from "../../../../../../components/Label";
// import IconMessageButtonModal from "../../../../../../components/IconMessageButtonModal";
// import {fDateTimeJalali} from "../../../../../../utils/formatTime";
// import {singleSmsStatusEnum} from "../../../../../../utils/enums";
// import TableActionButton from "../../../../../../components/TableActionButton";
// import {PATH_DASHBOARD} from "../../../../../../routes/paths";
// import CustomTooltip from "../../../../../../components/CustomTooltip";
// import SmsDetailsWithModal from "../../../../sms-report/SmsDetailsWithModal";

const UserSingleSmsReportTableRow = ({row}) => {
    const navigate = useNavigate();
    const {username, userId} = useParams()
    return (
        <TableRow hover>
            <TableCell align="center">{row.lineNumber}</TableCell>
            <TableCell align="center">{row.receptor}</TableCell>
            <TableCell align="center">
                <Stack direction={'row'} alignItems={'center'} justifyContent={"center"} spacing={1}>
                    <SmsDetailsWithModalParent smsId={row?.id} text={row?.message} userId={userId}/>
                </Stack>
            </TableCell>
            <TableCell align="center">{row.price}</TableCell>
            <TableCell align="center">{row.userId}</TableCell>
            <TableCell align="center">{fDateTimeJalali(row.sendDate)}</TableCell>
            <TableCell align="center">{singleSmsStatusEnum[row.status]}</TableCell>
            <TableCell align="center">
                <TableActionButton
                    onClick={() => {
                        navigate(PATH_DASHBOARD.userManagement.singleSmsStatusLog(username, userId, row.id));
                    }}
                    type={'receiveLog'}
                    title={'گزارش وضعیت ارسال'}
                />
            </TableCell>
        </TableRow>
    );
};

export default UserSingleSmsReportTableRow;
