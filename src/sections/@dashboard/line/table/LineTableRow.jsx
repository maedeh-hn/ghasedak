import React, {useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TableCell, TableRow} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
import {PATH_DASHBOARD} from '../../../../routes/paths';
import Label from '../../../../components/Label';
import {numberWithCommas} from 'src/utils/functions';
import TableActionButton from '../../../../components/TableActionButton';
import {GhasedakConfirmationStatusEnum, ProviderNameEnum} from '../../../../utils/enums';
import {fDateTimeJalali} from "../../../../utils/formatTime";

const LineTableRow = ({row, onPriorityChange}) => {
    const theme = useTheme();
    console.log(row);
    return (
        <TableRow hover>
            <TableCell align="center">
                <Button
                    sx={{
                        backgroundColor: theme.palette.primary.lighter,
                        color: 'black',
                        textDecorationLine: 'underline'
                    }}
                    onClick={onPriorityChange}
                >
                    {row.priority}
                </Button>
            </TableCell>
            <TableCell align="center">{row.number}</TableCell>
            <TableCell align="center">{ProviderNameEnum[row.providerCode]}</TableCell>
            <TableCell align="center">
                {row.isPublic ? 'عمومی' : 'اختصاصی'}
                {row.isService && ' - خدماتی'}
            </TableCell>
            <TableCell align="center">
                {row.isPublic ? '-' : fDateTimeJalali(row.expireDate)}</TableCell>
            <TableCell align="center">
                {row.isPublic ? '-' : numberWithCommas(row.renewalPrice)}
            </TableCell>
            <TableCell align="center">
                <Label color={row.ghasedakConfirmationStatus == 1 ? 'success' : 'error'}>
                    {GhasedakConfirmationStatusEnum[row.ghasedakConfirmationStatus]}
                </Label>
            </TableCell>
            <TableCell align="center">
                {row.isPublic && 'خط عمومی است'}
                {!row.isPublic && (
                    <RouterLink
                        to={PATH_DASHBOARD.lines.setting(row.id.toString())}
                        style={{
                            textDecoration: 'none',
                            color: theme.palette.text.primary,
                        }}
                    >
                        <TableActionButton type={'edit'} title={'تنظیمات فراخوانی'}/>
                    </RouterLink>
                )}
                {!row.isPublic && (
                    <RouterLink
                        to={PATH_DASHBOARD.lines.owner(row.id)}
                        style={{
                            textDecoration: 'none',
                            color: theme.palette.text.primary,
                        }}
                    >
                        <TableActionButton type={'person_setting'} title={'مالکیت'}/>
                    </RouterLink>
                )}
            </TableCell>
        </TableRow>
    );
};

export default LineTableRow;
