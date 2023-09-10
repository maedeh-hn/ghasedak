import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {useNavigate, useParams} from "react-router-dom";
import { fDateTimeJalali } from '../../../../../../utils/formatTime';
import CustomTooltip from '../../../../../../components/CustomTooltip';
import TableActionButton from '../../../../../../components/TableActionButton';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import IconMessageButtonModal from '../../../../../../components/IconMessageButtonModal';
// import {fDateTimeJalali} from "../../../../../utils/formatTime";
// import CustomTooltip from "../../../../../components/CustomTooltip";
// import TableActionButton from "../../../../../components/TableActionButton";
// import {PATH_DASHBOARD} from "../../../../../routes/paths";
// import MessageModal from "../../../../../components/modal/MessageModal";
// import IconMessageButtonModal from "../../../../../components/IconMessageButtonModal";

const UserReceivedSmsTableRow = ({row}) => {
    const navigate = useNavigate()
    const {username, userId, lineNumber} = useParams()
    return (
        <TableRow>
            <TableCell align="center">
                <IconMessageButtonModal message={row.message} title={'متن پیام'}  />
            </TableCell>
            <TableCell align="center">{row.lineNumber}</TableCell>
            <TableCell align="center">{row.mobile}</TableCell>
            <TableCell align="center">{fDateTimeJalali(row.sendDate)}</TableCell>
            <TableCell align="center">
                <CustomTooltip title={row.isForwardedViaUrl ? 'ارسال شده' : 'ارسال نشده'}>
                    {row.isForwardedViaUrl ?
                        <CheckCircleOutlinedIcon color={'success'}/>
                        :
                        <HighlightOffRoundedIcon color={'error'}/>
                    }
                </CustomTooltip>
            </TableCell>
            <TableCell align="center">
                <CustomTooltip title={row.isReadViaWebService ? 'ارسال شده' : 'ارسال نشده'}>
                    {row.isReadViaWebService ?
                        <CheckCircleOutlinedIcon color={'success'}/>
                        :
                        <HighlightOffRoundedIcon color={'error'}/>
                    }
                </CustomTooltip>
            </TableCell>
            <TableCell align="center">
                <TableActionButton
                    onClick={() => {
                        navigate(PATH_DASHBOARD.userManagement.receivedSmsForwardLogs(username, userId, row.id))
                    }}
                    type={'receiveLog'}
                    title={'گزارش ارسال به url'}
                />
            </TableCell>
        </TableRow>
    );
};

export default UserReceivedSmsTableRow;
