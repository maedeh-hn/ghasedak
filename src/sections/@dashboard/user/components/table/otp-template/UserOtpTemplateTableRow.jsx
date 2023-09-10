import React from 'react';
import {Stack, TableCell, TableRow, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import IconMessageButtonModal from '../../../../../../components/IconMessageButtonModal';
import { OtpTemplateStatusEnum } from '../../../../../../utils/enums';
import TableActionButton from '../../../../../../components/TableActionButton';
import Label from '../../../../../../components/Label';
// import IconMessageButtonModal from "../../../../../components/IconMessageButtonModal";
// import {otpTemplateStatusEnum} from "../../../../../utils/enums";
// import TableActionButton from "../../../../../components/TableActionButton";
// import {PATH_DASHBOARD} from "../../../../../routes/paths";
// import Label from "../../../../../components/Label";


const UserOtpTemplateTableRow = ({row, onDeleteRow}) => {
    const navigate = useNavigate()
    return (
        <TableRow hover>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">
                <IconMessageButtonModal message={row.editedMessage} title={'آخرین متن'}/>
            </TableCell>
            <TableCell align="center">
                <IconMessageButtonModal message={row.message} title={'متن تایید شده'}/>
            </TableCell>
            <TableCell align="center">{row.isVoice ? 'صوتی' : 'پیامک'}</TableCell>
            <TableCell align="center">
                <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'unset'}>
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
                    {row.status === 2 && <IconMessageButtonModal message={row.ghasedaksComments} title={'دلیل رد قالب'}
                                                                 showDescription={false}/>}
                </Stack>
            </TableCell>
            <TableCell align="center">
                <Typography>
                    {/* <TableActionButton */}
                    {/*    type={'edit'} */}
                    {/*    title={'ویرایش'} */}
                    {/*    onClick={() => navigate(PATH_DASHBOARD.otpTemplate.edit(row.id))} */}
                    {/* /> */}
                    <TableActionButton type={'delete'} title={'حذف'} onClick={() => onDeleteRow(row.id)}/>
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export default UserOtpTemplateTableRow;