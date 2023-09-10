import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import { numberWithCommasPersian } from '../../../../../../../utils/functions';
import TableActionButton from '../../../../../../../components/TableActionButton';
import { PATH_DASHBOARD } from '../../../../../../../routes/paths';
import { fDateTimeJalali } from '../../../../../../../utils/formatTime';
import { ProviderResponseCodeEnum, SmsStatusReportEnum } from '../../../../../../../utils/enums';
// import {numberWithCommasPersian} from "../../../../../../utils/functions";
// import TableActionButton from "../../../../../../components/TableActionButton";
// import {PATH_DASHBOARD} from "../../../../../../routes/paths";
// import {fDateTimeJalali} from "../../../../../../utils/formatTime";
// import {ProviderResponseCodeEnum, SmsStatusReportEnum} from "../../../../../../utils/enums";

const UserChartTableRowParent = ({row}) => {
    const navigate = useNavigate()
    const {username, userId, reportId, statusId, type} = useParams()
    return (
        <TableRow hover>
            <TableCell align="center">{row.number}</TableCell>
            <TableCell align="center">{SmsStatusReportEnum[row.statusReport]}</TableCell>
            <TableCell align="center">{row.providerReferenceId}</TableCell>
            <TableCell align="center">{ProviderResponseCodeEnum[row.providerResponseCode]}</TableCell>
            <TableCell align="center">{fDateTimeJalali(row.actualSendDate)}</TableCell>
            <TableCell align="center">{numberWithCommasPersian(row.price)} </TableCell>
          
        </TableRow>
    );
};

export default UserChartTableRowParent;
