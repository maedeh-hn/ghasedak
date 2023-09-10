import React from 'react';
import {TableCell, TableRow, Tooltip, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import TableActionButton from '../../../../components/TableActionButton';
import {useState} from 'react';
import Label from '../../../../components/Label';
import {apiKeyStatusEnum} from '../../../../utils/enums';
import {fDateTimeJalali} from "../../../../utils/formatTime";

const ApiKeysTableRow = ({row, onDeleteRow, onEditRow}) => {
    const theme = useTheme();
    const [copySuccess, setCopySuccess] = useState(false);

    return (
        <TableRow hover>
            <TableCell align="center">
                <Tooltip title={!copySuccess ? 'برای کپی متن کلیک کنید' : ' کپی شد.'} followCursor placement="top"
                         arrow={true}>
                    <Typography
                        component="div"
                        maxWidth={150}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        sx={{mb: 1, color: theme.palette.info.main, '&:hover': {cursor: 'pointer'}}}
                        onClick={() => {
                            navigator.clipboard.writeText(row.key);
                            setCopySuccess(true);
                            setTimeout(() => {
                                setCopySuccess(false);
                            }, 2000);
                        }}
                    >
                        {row.key}
                    </Typography>
                </Tooltip>
            </TableCell>
            <TableCell align="center">{row.title.substring(0, 40)}</TableCell>
            <TableCell align="center">{row.priceLimit ? 'فعال' : 'غیرفعال'}</TableCell>
            <TableCell align="center">{row.restrictIp ? 'فعال' : 'غیرفعال'}</TableCell>
            <TableCell align="center">{fDateTimeJalali(row.expireDate)}</TableCell>
            <TableCell align="center">
                <Label color={row.status === 1 ? 'success' : 'error'}>{apiKeyStatusEnum[row.status]}</Label>
            </TableCell>
            <TableCell align="center">
                <TableActionButton type={'edit'} title={'ویرایش'} onClick={onEditRow}/>
                <TableActionButton type={'delete'} title={'حذف'} onClick={onDeleteRow}/>
            </TableCell>
        </TableRow>
    );
};

export default ApiKeysTableRow;
