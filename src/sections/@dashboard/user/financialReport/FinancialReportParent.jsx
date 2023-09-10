import React from 'react';
import {Box, Card, Stack, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
// import {useSnackbar} from 'notistack';
// import {useNavigate, useParams} from 'react-router-dom';
// import {CheckCrmOrderCodeServices, CreateTransaction} from 'src/services/users/transaction';
// import {useMutation} from "@tanstack/react-query";
// import RHFCurrencyField from '../../../../../components/hook-form/RHFCurrencyField';
// import {ManualTransactionTypeEnum} from '../../../../../utils/enums';
// import CustomMenuItem from '../../../../../components/CustomMenuItem';
// import useResponsive from '../../../../../hooks/useResponsive';

// import {
//     FormProvider,
//     RHFRadioGroup,
//     RHFSelect,
//     RHFSwitch,
//     RHFTextField,
// } from '../../../../../components/hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import RHFCurrencyField from '../../../../components/hook-form/RHFCurrencyField';
import { ManualTransactionTypeEnum } from '../../../../utils/enums';
import CustomMenuItem from '../../../../components/CustomMenuItem';
import useResponsive from '../../../../hooks/useResponsive';
import { FormProvider, RHFRadioGroup, RHFSelect, RHFSwitch, RHFTextField } from '../../../../components/hook-form';
import TableHeaderActionButton from '../../../../components/TableHeaderActionButton';
import { CreateTransactionParent } from '../../../../services/users/transaction';

const FinancialReportParent = () => {
    const lgDown = useResponsive('down', 'lg');
    const {enqueueSnackbar} = useSnackbar();
    const {userId} = useParams()
    const navigate = useNavigate();
    // const requestHandler = useMutation({
    //     mutationFn: (values) => CheckCrmOrderCodeServices(values),
    //     onSuccess: response => {
    //         if (response.isSuccess) {
    //             enqueueSnackbar('شماره فرم موجود است.');
    //         }
    //     }
    // });

    const validationSchema = Yup.object().shape({
   
        amount: Yup.string().required('مبلغ را وارد کنید.'),
        description: Yup.string().required('شرح تراکنش را وارد کنید.'),
        isIncremented: Yup.string().required('عملیات اعتباری را وارد کنید.'),
     
    });

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
        getValues
    } = methods;

    const onSubmit = async (values) => {
        const response = await CreateTransactionParent({
            ...values,
            userId,
            isIncremented: !!parseInt(values?.isIncremented),
           
        });
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
        }
    };
    return (
        <Card>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Box
                        width={`${lgDown ? '100%' : '70%'}`}
                        sx={{
                            paddingY: 2,
                            display: 'grid',
                            rowGap: 3,
                            columnGap: 1,
                        }}
                        marginBottom={1}
                    >
                        {
                            <>
                                <RHFCurrencyField name="amount" type="mobile" label="مبلغ"/>
                                <RHFTextField name="description" label="شرح تراکنش"/>
                               
                                <Box sx={{display: 'flex', gap: 4, alignItems: 'center'}}>
                                    <Typography>عملیات اعتباری :</Typography>
                                    <RHFRadioGroup name="isIncremented" options={[1, 0]}
                                                   getOptionLabel={['شارژ اعتبار', 'کسر اعتبار']}/>
                                </Box>
                               
                               
                            </>
                        }
                    </Box>
                    <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>
                        <LoadingButton sx={{color: 'white'}} type="submit" variant="contained" loading={isSubmitting}>
                            ذخیره تغییرات
                        </LoadingButton>
                    </Stack>
                </Stack>
            </FormProvider>
        </Card>
    );
};

export default FinancialReportParent;
