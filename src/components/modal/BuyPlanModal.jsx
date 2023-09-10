import React from 'react';
import {Alert, Button, Stack, useTheme} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useMutation} from "@tanstack/react-query";
import {buyPlan} from "src/services/baseInfo/plan";
import {useSnackbar} from "notistack";
import OrderDetailTable from "../../sections/@dashboard/buy/components/OrderDetailTable";
import BaseStyleModal from "./BaseStyleModal";

const TABLE_HEAD = [
    {id: '', label: 'خدمات'},
    {id: '', label: 'قیمت (ریال)'},
];

const BuyPlanModal = ({state, handleClose, data}) => {
    const {enqueueSnackbar} = useSnackbar();

    const theme = useTheme();

    const sendRequestHandler = useMutation({
        mutationFn: planId => buyPlan(planId),
        onSuccess: response => {
            if(response.isSuccess){
                enqueueSnackbar('درحال انتقال به درگاه ...')
                window.location.replace(response.data.bankUrl+response.data.bankCode);
            }
        }
    })


    return (
        <BaseStyleModal title={'خرید سرویس'} handleClose={handleClose} show={state} lgWidth={860}>
            <Stack spacing={1}>
                <Alert severity={'info'}>
                    در پرداخت بانکی 9 درصد مالیات بر ارزش افروده نیز به مبلغ پرداختی اضافه می گردد
                </Alert>
                <OrderDetailTable data={data} tableHead={TABLE_HEAD}/>
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
                        sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                        type="submit"
                        variant="contained"
                        loading={sendRequestHandler.isLoading}
                        onClick={() => sendRequestHandler.mutate(data[0].id)}
                    >
                        پرداخت
                    </LoadingButton>
                </Stack>
            </Stack>
        </BaseStyleModal>
    );
};

export default BuyPlanModal;
