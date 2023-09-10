import {TableCell, TableRow, Tooltip, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useState} from 'react';
import TableActionButton from '../../../../../../components/TableActionButton';
import Label from '../../../../../../components/Label';
import { fDateJalali } from '../../../../../../utils/formatTime';
import { apiKeyStatusEnum } from '../../../../../../utils/enums';
// import TableActionButton from '../../../../../components/TableActionButton';
// import Label from '../../../../../components/Label';
// import {fDateJalali} from "../../../../../utils/formatTime";
// import {ApiKeyStatusEnum} from "../../../../../utils/enums";

// ----------------------------------------------------------------------

const UserApiKeyTableRow = ({row, onEditRow, onDeleteRow}) => {
    const theme = useTheme();
    const [copySuccess, setCopySuccess] = useState(false);

    return (
        <TableRow hover>
            <TableCell align="center">
                <Typography>
                    <Tooltip
                        title={!copySuccess ? 'برای کپی متن کلیک کنید' : ' کپی شد.'}
                        followCursor
                        placement="top"
                        arrow
                    >
                        <Typography
                            component="div"
                            maxWidth={150}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            sx={{mb: 1, color: theme.palette.info.main, '&:hover': {cursor: 'pointer'}}}
                            onClick={() => {
                                setCopySuccess(true);
                                navigator.clipboard.writeText(row.key);
                                setTimeout(() => {
                                    setCopySuccess(false);
                                }, 1000);
                            }}
                        >
                            {row.key}
                        </Typography>
                    </Tooltip>
                </Typography>
            </TableCell>
            <TableCell align="center">{row.title}</TableCell>
            <TableCell align="center">{row.priceLimit ? 'فعال' : 'غیرفعال'}</TableCell>
            <TableCell align="center">{row.restrictIp ? 'فعال' : 'غیرفعال'}</TableCell>
            <TableCell align="center">{fDateJalali(row.expireDate)}</TableCell>
            <TableCell align="center">
                <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(
                        (row.status == 0 && 'error') ||
                        (row.status == 1 && 'success') ||
                        (row.status == 2 && 'default') ||
                        'default'
                    )}
                    sx={{textTransform: 'capitalize'}}
                >
                    {apiKeyStatusEnum[row.status]}
                </Label>
            </TableCell>
            <TableCell align="center">
                <TableActionButton type={'edit'} title={'ویرایش'} onClick={() => onEditRow(row)}/>
                {
                    row.status != 2 && <TableActionButton type={'delete'} title={'حذف'} onClick={() => onDeleteRow(row)}/>
                }
            </TableCell>
        </TableRow>
    );
};

export default UserApiKeyTableRow;
