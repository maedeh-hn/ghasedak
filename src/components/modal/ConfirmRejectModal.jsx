import React from 'react';
import {Alert, Stack} from "@mui/material";
import BaseStyleModal from "./BaseStyleModal";

const ConfirmRejectModal = ({state, setState}) => {
    const handleClose = () => {
        setState({
            open: false,
            data: null,
        });
    };

    return (
        <BaseStyleModal title={'لغو ارسال'} handleClose={handleClose} show={state.open} lgWidth={860}>
            <Stack spacing={1}>
                <Alert severity={'info'}>
                    در پرداخت بانکی 9 درصد مالیات بر ارزش افروده نیز به مبلغ پرداختی اضافه می گردد
                </Alert>
            </Stack>
        </BaseStyleModal>
    );
};

export default ConfirmRejectModal;
