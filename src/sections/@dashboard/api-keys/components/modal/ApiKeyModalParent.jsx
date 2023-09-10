import React from 'react';
import BaseStyleModal from '../../../../../components/modal/BaseStyleModal';
import {
    FormProvider,
    RHFTextField,
    RHFDatePicker,
    RHFTextarea,
    RHFRadioGroup,
    RHFSwitch,
} from '../../../../../components/hook-form';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';
import {Alert, Box, Button, Stack, Typography} from '@mui/material';

//services
import {createApiKeys, editApiKeys} from 'src/services/contact/api-keys';
import {useTheme} from '@mui/material/styles';
import RHFCurrencyField from '../../../../../components/hook-form/RHFCurrencyField';
import {fDateJalali} from '../../../../../utils/formatTime';
import useAuth from '../../../../../hooks/useAuth';
import { addApiKeysParent, editApiKeysParent } from '../../../../../services/users/apiKey';
import { useParams } from 'react-router';

const ApiKeysModalParent = ({state, handleClose, data, refetch}) => {
    const {user} = useAuth();
    const {userId} = useParams();
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const AddApiKeySchema = Yup.object().shape({
        title: Yup.string().required('عنوان را کامل کنید.'),
        status: Yup.number().required('گزینه ای را انتخاب کنید.'),
        priceLimitAmount: Yup.string().test({
            name: 'priceLimitAmount',
            test: (value, ctx) => {
                if (ctx.parent?.priceLimit) {
                    if (value.length <= 0) {
                        return ctx.createError({message: 'قیمت وارد شده صحیح نیست.'});
                    }
                    return true;
                }
                return true;
            },
        }),
        whiteListIp: Yup.string()
            .nullable()
            .test({
                name: 'whiteListIp',
                test: (value, ctx) => {
                    if (ctx?.parent?.restrictIp) {
                        if ((value || '').length <= 0) {
                            return ctx.createError({message: 'آی پی های مورد نظر را وارد کنید.'});
                        }
                        return true;
                    }
                    return true;
                },
            }),
    });

    const methods = useForm({
        resolver: yupResolver(AddApiKeySchema),
        defaultValues: {
            ...data,
            priceLimit: data?.priceLimit ?? false,
            restrictIp: data?.restrictIp ?? false,
            status: data?.status ?? 1,
            expireDate: data?.expireDate ?? user.planExpireDate,
        },
    });

    const {
        handleSubmit,
        reset,
        formState: {isSubmitting},
        watch,
        setValue,
    } = methods;

    const onSubmit = async (values) => {
        let response;
        if (data) {
            response = await editApiKeysParent({...values, userId});
        } else {
            response = await addApiKeysParent({...values, userId});
        }
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
            refetch();
            handleClose();
            reset();
        }
    };
    return (
        <BaseStyleModal
            title={data ? 'ویرایش کلید شناسه' : 'ایجاد کلید شناسه'}
            handleClose={handleClose}
            show={state}
            lgWidth={600}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 2,
                    }}
                    marginBottom={1}
                >
                    <RHFTextField name="title" label="عنوان"/>

                    <RHFDatePicker
                        helperText={`پیش فرض پایان سرویس جاری ${fDateJalali(user.planExpireDate)}`}
                        name="expireDate"
                        label="تاریخ انقضاء"
                    />

                    <Stack>
                        <Typography variant="span" component="span" pr={2}>
                            <Typography variant="span" component="span" pr={2}>
                                محدودیت هزینه
                            </Typography>
                            <RHFSwitch name="priceLimit" label=""/>
                        </Typography>

                        {watch('priceLimit') && (
                            <RHFCurrencyField sx={{mt: 2}} name="priceLimitAmount" label="محدودیت هزینه(ریال)"/>
                        )}
                        <Box sx={{mt: 6}}>
                            <Stack flexDirection={'row'}>
                                <RHFRadioGroup name="status" options={[1, 0]} getOptionLabel={['فعال', 'غیر فعال']}/>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack>
                        <Typography variant="span" component="span" pr={2}>
                            <Typography variant="span" component="span" pr={2}>
                                محدودیت IP
                            </Typography>
                            <RHFSwitch value={true} name="restrictIp" label=""/>
                        </Typography>
                        {watch('restrictIp') && (
                            <>
                                <RHFTextarea
                                    inputProps={{
                                        style: {
                                            fontFeatureSettings: 'initial',
                                            MozFontFeatureSettings: 'initial',
                                            WebkitFontFeatureSettings: 'initial',
                                        }
                                    }}
                                    sx={{mt: 2}}
                                    name="whiteListIp"
                                    label="لیست سفید IP"
                                    placeholder="با Enter از هم جدا کنید"
                                    rows={5}
                                    onChange={(e) => {
                                        const onlyNums = e.target.value.replace(/(?!\.)(?!\/)(?!\n)[^0-9]/g, '');
                                        setValue(e.target.name, onlyNums);
                                    }}
                                />
                                <Alert
                                    severity="info"
                                    style={{
                                        marginTop: 1,
                                    }}
                                >
                                    لیست آیپی ها را با Enter از هم جدا کنید. درصورت نیاز به وارد کردن رنج آیپی به شکل
                                    زیر عمل کنید.
                                    0.0.0.0/0.0.0.0
                                </Alert>
                            </>
                        )}
                    </Stack>
                    <Stack
                        flexDirection={'row'}
                        gridColumn={'-1/-3'}
                        spacing={4}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    ></Stack>
                </Box>
                <Stack sx={{mt: 6}} flexDirection={'row'} justifyContent={'flex-end'}>
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
                        loading={isSubmitting}
                    >
                        ذخیره
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </BaseStyleModal>
    );
};
export default ApiKeysModalParent;
