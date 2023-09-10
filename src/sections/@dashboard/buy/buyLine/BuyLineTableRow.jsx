import React from 'react';
import {
    TableCell,
    TableRow,
} from '@mui/material';
import {useMutation} from "@tanstack/react-query";
import {buyLine} from "src/services/lines/lines";
import {useSnackbar} from "notistack";
import {LoadingButton} from "@mui/lab";
import {numberWithCommas} from "src/utils/functions";

const BuyLineTableRow = ({row}) => {
    const {enqueueSnackbar} = useSnackbar();
    const sendRequestHandler = useMutation({
        mutationFn: lineId => buyLine(lineId),
        onSuccess: response => {
            if (response.isSuccess) {
                enqueueSnackbar('درحال انتقال به درگاه ...')
                window.location.replace(response.data.bankUrl + response.data.bankCode);
            }
        }
    })
    return (
        <TableRow>
            <TableCell align="center">{row.number}</TableCell>
            <TableCell align="center">{numberWithCommas(row.userPrice)} ریال</TableCell>
            <TableCell align="center">
                <LoadingButton sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                               tooltip={'خرید'} title={'خرید'}
                               onClick={() => sendRequestHandler.mutate(row.id)}
                               loading={sendRequestHandler.isLoading}>خرید</LoadingButton>
            </TableCell>
        </TableRow>
    );
};

export default BuyLineTableRow;
