import React from 'react';
import {CircularProgress, IconButton, Stack, TableCell, TableRow, Tooltip} from '@mui/material';
import {numberWithCommas} from 'src/utils/functions';
import {fDateTimeJalali} from '../../../../../utils/formatTime';
import {SmsStatusEnum} from '../../../../../utils/enums';
import Iconify from "../../../../../components/Iconify";
import Label from "../../../../../components/Label";
import SmsDetailsWithModal from "../../SmsDetailsWithModal.jsx";
import {Box} from '@mui/material';


const SingleSmsReportTableRow = ({row, onCancelSms}) => {
    return (
        <TableRow hover>
            <TableCell align="left">{row.lineNumber}</TableCell>
            <TableCell align="left">{row.receptor}</TableCell>
            <TableCell align="left">
                <Stack spacing={1} direction={'row'} alignItems={'left'}>
                    {/*<CustomTooltip title="تعداد پیام">*/}
                    {/*    <Label color={'default'}>*/}
                    {/*        {numberWithCommas(row.count)}*/}
                    {/*    </Label>*/}
                    {/*</CustomTooltip>*/}
                    <SmsDetailsWithModal text={row.message} smsId={row.id}/>
                </Stack>
            </TableCell>
            <TableCell align="left">{numberWithCommas(row.price)}</TableCell>
            <TableCell align="left">{fDateTimeJalali(row.sendDate)}</TableCell>
            <TableCell align="left">{fDateTimeJalali(row.sendDate)}</TableCell>
            <TableCell align="left">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {[0, 2].includes(row.status) && (
                        onCancelSms.isLoading ?
                            <CircularProgress size={20}/> :
                            <Tooltip title="لغو ارسال">
                                <IconButton color={'error'} onClick={onCancelSms}>
                                    <Iconify icon={'material-symbols:cancel-schedule-send-outline'} width={24}
                                             height={24}/>
                                </IconButton>
                            </Tooltip>
                    )}
                    <Label

                        color={
                            (row.status === 4 && 'success') ||
                            (row.status === 0 && 'warning') ||
                            (row.status === 1 && 'error') ||
                            (row.status === 8 && 'primary') ||
                            (row.status === 2 && 'secondary') ||
                            (row.status === 3 && 'info') ||
                            'default'
                        }
                        sx={{textTransform: 'capitalize'}}
                    >
                        {SmsStatusEnum[row.status]}
                    </Label>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default SingleSmsReportTableRow;
