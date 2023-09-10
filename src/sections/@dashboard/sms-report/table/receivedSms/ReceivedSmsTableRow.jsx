import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import IconMessageButtonModal from "../../../../../components/IconMessageButtonModal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CustomTooltip from "../../../../../components/CustomTooltip";
import TableActionButton from "../../../../../components/TableActionButton";
import {useNavigate} from "react-router-dom";
import {PATH_DASHBOARD} from "../../../../../routes/paths";
import {fDateTimeJalali} from "../../../../../utils/formatTime";

const ReceivedSmsTableRow = ({row}) => {
    const navigate = useNavigate()
    return (
        <TableRow>
            <TableCell align="left">
                <IconMessageButtonModal message={row.message} title={'متن پیام'}/>
            </TableCell>
            <TableCell align="left">{row.lineNumber}</TableCell>
            <TableCell align="left">{row.mobile}</TableCell>
            <TableCell align="left">{fDateTimeJalali(row.sendDate)}</TableCell>
            <TableCell align="left">
                <CustomTooltip title={row.isForwardedViaUrl ? 'ارسال شده' : 'ارسال نشده'}>
                    {row.isForwardedViaUrl ?
                        <CheckCircleOutlinedIcon color={'success'}/>
                        :
                        <HighlightOffRoundedIcon color={'error'}/>
                    }
                </CustomTooltip>
            </TableCell>
            <TableCell align="left">
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
                        navigate(PATH_DASHBOARD.smsReport.receiveSmsForwardLogs(row.id))
                    }}
                    type={'receiveLog'}
                    title={'گزارش ارسال وضعیت'}
                />
            </TableCell>
        </TableRow>
    );
};

export default ReceivedSmsTableRow;
