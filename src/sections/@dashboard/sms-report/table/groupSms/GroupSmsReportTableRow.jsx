import React from 'react';
import {CircularProgress, IconButton, TableCell, TableRow, Tooltip} from '@mui/material';
import {fDateTimeJalali} from '../../../../../utils/formatTime';
import {OriginEnum, SmsStatusEnum} from '../../../../../utils/enums';
import {useNavigate} from 'react-router';
import TableActionButton from '../../../../../components/TableActionButton';
import {PATH_DASHBOARD} from "../../../../../routes/paths";
import Iconify from "../../../../../components/Iconify";
import Label from "../../../../../components/Label";
import IconMessageButtonModal from "../../../../../components/IconMessageButtonModal.jsx";
import {numberWithCommas} from "src/utils/functions";

const GroupSmsReportTableRow = ({row, onCancelSms}) => {
    const navigate = useNavigate();

    return (
        <>
            <TableRow hover>
                <TableCell align="left">{row.lineNumber}</TableCell>
                <TableCell align="left">
                    {/*<Stack spacing={1} direction={'row'} alignItems={'left'}>*/}
                    {/*    <CustomTooltip title="تعداد پیام">*/}
                    {/*        <Label color={'default'}>*/}
                    {/*            {numberWithCommas(row.count)}*/}
                    {/*        </Label>*/}
                    {/*    </CustomTooltip>*/}
                    {/*    <IconMessageButtonModal message={row.message} title={'متن پیام'}/>*/}
                    {/*</Stack>*/}
                    <IconMessageButtonModal message={row?.message} title={'متن پیام'}/>
                </TableCell>
                <TableCell align="left">{OriginEnum[row.origin]}</TableCell>
                <TableCell align="left">{numberWithCommas(row.receptorCount)}</TableCell>
                <TableCell align="left">{numberWithCommas(row.price)}</TableCell>
                <TableCell align="left">{fDateTimeJalali(row.sendDate)}</TableCell>
                <TableCell align="center">{[0, 2].includes(row.status) && (
                    onCancelSms.isLoading ? <CircularProgress/> :
                        <Tooltip title="لغو ارسال">
                            <IconButton color={'error'} onClick={onCancelSms}>
                                <Iconify icon={'material-symbols:cancel-schedule-send-outline'} width={24} height={24}/>
                            </IconButton>
                        </Tooltip>
                )}
                    <Label color={(
                        ([0, 2].includes(row.status) && 'warning') ||
                        ([2, 3, 4].includes(row.status) && 'primary') ||
                        ([1, 6, 7, 8, 9].includes(row.status) && 'error') ||
                        'default'
                    )}>
                        {SmsStatusEnum[row.status]}
                    </Label>
                </TableCell>
                <TableCell align="center" sx={{width: '23px', height: '23px'}}>
                    {
                        [3, 4, 5, 9].includes(row.status) && <TableActionButton
                            onClick={() => {
                                navigate(PATH_DASHBOARD.smsReport.groupSendReportChart(row.id, 'panel'));
                            }}
                            type={'chart'}
                            title={'نمودار'}
                        />
                    }
                </TableCell>
            </TableRow>
        </>
    );
};

export default GroupSmsReportTableRow;
