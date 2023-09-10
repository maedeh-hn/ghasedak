import React from 'react';
import {Alert, Stack} from "@mui/material";
import PayForBuyLineTable from "../../sections/@dashboard/buy/pay/PayForBuyLineTable";
import BaseStyleModal from "./BaseStyleModal";

const BuyLineModal = ({state, handleClose, data}) => {
    return (
        <BaseStyleModal title={'خرید خط'} handleClose={handleClose} show={state} lgWidth={860}>
            <Stack spacing={1}>
                <Alert severity={'info'}>
                    در پرداخت بانکی 9 درصد مالیات بر ارزش افروده نیز به مبلغ پرداختی اضافه می گردد
                </Alert>
                <Alert severity={'success'}>
                    پرداخت توسط کلیه کارت های عضو شبکه شتاب قابل انجام است
                </Alert>
                <PayForBuyLineTable data={data} handleClose={handleClose}/>
            </Stack>
        </BaseStyleModal>
    );
};

export default BuyLineModal;

