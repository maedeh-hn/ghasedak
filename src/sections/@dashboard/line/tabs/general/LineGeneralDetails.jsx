
import React, {useEffect} from 'react';
import { useParams } from 'react-router';
// import {useParams} from 'react-router-dom';
// import {useQuery} from '@tanstack/react-query';
// import {editLine, getLineByLineId} from 'src/services/lines/line';
import {Box, Card, Select, Stack} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import {LoadingButton} from '@mui/lab';
// import {useForm} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import { LineStatusEnum, ProviderEnum } from '../../../../../utils/enums';
import { FormProvider, RHFDatePicker, RHFSelect, RHFSwitch} from '../../../../../components/hook-form';
import LoadingWidget from '../../../../../components/LoadingWidget';
import RHFCurrencyField from '../../../../../components/hook-form/RHFCurrencyField';
import RHFNumberField from '../../../../../components/hook-form/RHFNumberField';
import CustomMenuItem from '../../../../../components/CustomMenuItem';
import { getLineByLineId } from '../../../../../services/lines/lines';
import { useQuery } from '@tanstack/react-query';
// import {lineStatusEnum, ProviderEnum} from '../../../../../utils/enums';
// import RHFDatePicker from '../../../../../components/hook-form/RHFDatePicker';
// import {FormProvider, RHFSelect, RHFSwitch, RHFTextField} from '../../../../../components/hook-form';
// import LoadingWidget from '../../../../../components/LoadingWidget';
// import Error from '../../../../../components/Error';
// import RHFCurrencyField from "../../../../../components/hook-form/RHFCurrencyField";
// import RHFNumberField from "../../../../../components/hook-form/RHFNumberField";
// import CustomMenuItem from "../../../../../components/CustomMenuItem";

const LineGeneralDetails = () => {
  const {lineId, userId} = useParams();
  const {isLoading, data, isError} = useQuery(['lineDetails', lineId], () => getLineByLineId(lineId));
  const {enqueueSnackbar} = useSnackbar();

//   const validationSchema = Yup.object().shape({
//     number: Yup.string().required('شماره را وارد کنید.'),
//     userPrice: Yup.string().required('قمیت مشتری را وارد کنید.'),
//     resellerPrice: Yup.string().required('قیمت نماینده را وارد کنید.'),
//     purchasePrice: Yup.string().required('قیمت خرید را وارد کنید.'),
//     renewalPrice: Yup.string().required('قیمت تمدید  را وارد کنید.'),
//     status: Yup.string().required('وضعیت را وارد کنید.'),
//     expireDate: Yup.string().required('تاریخ انقضا را وارد کنید.'),
//     providerCode: Yup.string().required('سرویس دهنده را وارد کنید.'),
//     resellerId: Yup.string().required('شماره را وارد کنید.'),
//     accountProvider: Yup.string().required('شماره را وارد کنید.'),
//     isPublic: Yup.boolean().required('عمومی باید مشخص شود.'),
//     isService: Yup.boolean().required('سرویس باید مشخص شود.'),
//     isReserved: Yup.boolean().required('رزرو باید مشخص شود.'),
//   });

  const methods = useForm({
    mode: 'onChange',
    // resolver: yupResolver(validationSchema),
    defaultValues: {
        ...data,
      providerCode: '',
      status: ''
    }
  });

  const {
    reset,
   
    formState: {isSubmitting},
  } = methods;

  useEffect(() => {
    if (data?.isSuccess) {
      reset(data?.data)
    }
  }, [data]);

//   const onSubmit = async (values) => {
//     const response = await editLine({
//       ...values,
//       legalType: parseInt(values.legalType),
//       accountProvider: parseInt(values.accountProvider),
//       providerCode: parseInt(values.providerCode),
//       status: parseInt(values.status),
//       userId: parseInt(userId),
//     });
//     if (response.isSuccess) {
//       enqueueSnackbar('اطلاعات با موفقیت ذخیره شد.');
//     }
//   };

  return (
      <Card>
        {
        isError
       
         ? (
            <Error/>
        ) :
         isLoading 
       
         ? (
            <LoadingWidget/>
        ) : (
            <FormProvider methods={methods} >
              <Stack spacing={3}>
                <Box
                    sx={{
                      display: 'grid',
                      rowGap: 3,
                      columnGap: 2,
                      gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                        xl: 'repeat(4, 1fr)',
                      },
                    }}
                >
                  <RHFNumberField name="number" type="username" label="شماره"/>
                  <RHFCurrencyField name="userPrice" type="mobile" label="قیمت مشتری"/>
                  <RHFCurrencyField name="resellerPrice" type="fullName" label="قیمت نماینده"/>
                  <RHFCurrencyField name="purchasePrice" label={'قیمت خرید'}/>
                  <RHFCurrencyField name="renewalPrice" label={'قیمت تمدید'}/>
                  <RHFSelect name="status" label="وضعیت">
                    {Object.keys(LineStatusEnum).map((option) => (
                        <CustomMenuItem key={option}
                                        value={option}>{LineStatusEnum[option]}</CustomMenuItem>
                    ))}
                  </RHFSelect>
                  <RHFDatePicker name="expireDate" label={'تاریخ انقضا'}/>
                  <RHFSelect name="providerCode" label="سرویس دهنده">
                    {Object.keys(ProviderEnum).map((option) => (
                        <CustomMenuItem key={option} value={option}>{ProviderEnum[option]}</CustomMenuItem>
                    ))}
                  </RHFSelect>
                  <RHFNumberField name="resellerId" label={'شماره اکانت'}/>
                  <RHFSwitch name="isPublic" label="عمومی"/>
                  <RHFSwitch name="isService" label="خدماتی"/>
                  <RHFSwitch name="isReserved" label="رزور"/>
                </Box>
                {/* <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>
                  <LoadingButton sx={{color: 'white'}} type="submit" variant="contained"
                                 loading={isSubmitting}>
                    ذخیره تغییرات
                  </LoadingButton>
                </Stack> */}
              </Stack>
            </FormProvider>
        )}
      </Card>
  );
};

export default LineGeneralDetails;
