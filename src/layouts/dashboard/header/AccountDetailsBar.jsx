// @mui
import {Box, Button, Stack, Typography, useTheme} from '@mui/material';
// utils
import React, {useState} from 'react';
import useAuth from '../../../hooks/useAuth';
import {PlanEnum} from "../../../utils/enums";
import {fDateJalali} from "../../../utils/formatTime";
import ChargeAccountModal from "../../../sections/@dashboard/charge-account/components/modal/ChargeAccountModal";
import {numberWithCommas} from "src/utils/functions";


// ----------------------------------------------------------------------

export default function AccountDetailsBar() {
    const theme = useTheme();

    const [chargeModal, setChargeModal] = useState({
        open: false,
        data: null
    })

    const {user} = useAuth()

    return (
        <>
            <Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack spacing={1} display={'flex'} direction={'row'} justifyContent={'center'}
                           alignItems={'center'}>
                        <Typography fontSize={14} color={theme.palette.grey[900]} fontWeight={'medium'}>نوع سرویس :</Typography>
                        {/*<Typography color={theme.palette.text.primary} fontWeight={'bold'}>*/}
                        <Typography fontSize={14} color={theme.palette.text.secondary}>
                            {PlanEnum[user.planId]}
                        </Typography>
                        {/*</Typography>*/}
                    </Stack>
                    <Stack spacing={1} display={'flex'} direction={'row'} justifyContent={'center'}
                           alignItems={'center'}>
                        <Typography fontSize={14} color={theme.palette.grey[900]} fontWeight={'medium'}>تاریخ انقضا :</Typography>
                        {/*<Typography color={theme.palette.text.primary} fontWeight={'bold'}>*/}
                        <Typography fontSize={14} color={theme.palette.text.secondary}>
                            {fDateJalali(user.planExpireDate)}
                        </Typography>
                        {/*</Typography>*/}
                    </Stack>
                    <Stack spacing={1} display={'flex'} direction={'row'} justifyContent={'center'}
                           alignItems={'center'}>
                        <Typography fontSize={14} color={theme.palette.grey[900]} fontWeight={'medium'}>اعتبار :</Typography>
                        <Typography fontSize={14} color={theme.palette.text.secondary}>
                            {numberWithCommas(user.credit)} ریال
                        </Typography>
                        {/*<Typography color={theme.palette.text.primary} fontWeight={'bold'}>*/}
                        {/*  */}
                        {/*</Typography>*/}
                    </Stack>
                    {/*<TableToolbarActionButton onClick={() => {*/}
                    {/*    setChargeModal({*/}
                    {/*        open: true,*/}
                    {/*        data: null*/}
                    {/*    })*/}
                    {/*}} title={'افزایش اعتبار'} tooltip={'افزایش اعتبار'}/>*/}
                </Stack>
            </Stack>
            {
                chargeModal.open && <ChargeAccountModal state={chargeModal} setState={setChargeModal}/>
            }
        </>

    );
}
