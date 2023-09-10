import React from 'react';
import {Button, Stack, Table, TableBody, TableContainer, useTheme} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import {TableHeadCustom} from '../../../../components/table';
import {useSnackbar} from 'notistack';
import PayForBuyLineTableRow from './PayForBuyLineTableRow';
import {LoadingButton} from '@mui/lab';
import {useMutation} from "@tanstack/react-query";
import {buyLine} from "src/services/lines/lines";

const TABLE_HEAD = [
    {id: 'ServiceDescription', label: 'شرح خدمات'},
    {id: 'price', label: 'قیمت (ریال)'},
];

const PayForBuyLineTable = ({data, handleClose}) => {
    const theme = useTheme();
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
        <Stack spacing={1}>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom headLabel={TABLE_HEAD}/>
                        <TableBody>
                            <PayForBuyLineTableRow
                                row={data}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <Stack sx={{mt: 3}} flexDirection={'row'} justifyContent={'flex-end'} gap={1}>
                <Button
                    size="large"
                    sx={{
                        minHeight: 36,
                        maxHeight: 36,
                        minWidth: 84,
                        color: theme.palette.text.disabled,
                        borderColor: theme.palette.text.disabled,
                        marginRight: 1,
                        border: 'none',
                        ':hover': {
                            color: theme.palette.grey[100],
                            backgroundColor: theme.palette.grey[700],
                        },
                    }}
                    color={'inherit'}
                    variant="outlined"
                    onClick={handleClose}
                >
                    انصراف
                </Button>
                <LoadingButton
                    onClick={() => sendRequestHandler.mutate(data.id)}
                    sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                    type="submit"
                    variant="contained"
                    loading={sendRequestHandler.isLoading}
                >
                    پرداخت
                </LoadingButton>
            </Stack>
        </Stack>
    );
};

export default PayForBuyLineTable;
