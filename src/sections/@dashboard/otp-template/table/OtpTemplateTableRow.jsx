import React from 'react';
import {Stack, TableCell, TableRow, Typography} from '@mui/material';
import Label from '../../../../components/Label';
import TableActionButton from '../../../../components/TableActionButton';
import {OtpTemplateStatusEnum} from '../../../../utils/enums';
import {useNavigate} from 'react-router-dom';
import {PATH_DASHBOARD} from '../../../../routes/paths';
import IconMessageButtonModal from '../../../../components/IconMessageButtonModal';
import IconRejectButtonModal from "../../../../components/IconRejectButtonModal";

const OtpTemplateTableRow = ({row, onDeleteRow}) => {
    const navigate = useNavigate();

    return (
        <TableRow hover>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">
                <IconMessageButtonModal  message={row.editedMessage || row.message} title={'متن پیام'}/>
            </TableCell>
            <TableCell align="center">{row.isVoice ? 'صوتی' : 'پیامک'}</TableCell>
            <TableCell align="center">
                <Stack display={'flex'} flexDirection={'unset'} alignItems={'center'} align="center" justifyContent={"center"}>
                    <Label
                        color={
                            (row.status === 1 && 'success') ||
                            (row.status === 0 && 'warning') ||
                            (row.status === 2 && 'error') ||
                            'default'
                        }
                        sx={{textTransform: 'capitalize'}}
                    >
                        {OtpTemplateStatusEnum[row.status]}
                    </Label>
                    {row.status === 2 && (
                        <IconRejectButtonModal message={row?.ghasedaksComments} title={'دلیل رد قالب'}
                                               showDescription={false}/>
                    )}
                </Stack>
            </TableCell>
            <TableCell align="center">
                <Typography>
                    <TableActionButton
                        type={'edit'}
                        title={'ویرایش'}
                        onClick={() => navigate(PATH_DASHBOARD.otpTemplate.edit(row.id))}
                    />
                    <TableActionButton type={'delete'} title={'حذف'} onClick={() => onDeleteRow(row.id)}/>
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export default OtpTemplateTableRow;
