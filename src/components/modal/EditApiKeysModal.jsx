import React, {useState} from 'react';
import BaseStyleModal from './BaseStyleModal';
import {FormProvider, RHFTextField, RHFDatePicker, RHFTextarea, RHFRadioGroup, RHFSwitch} from '../hook-form';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';
import {Box, Grid, Typography, Stack} from '@mui/material';

//services
import {editApiKeys} from 'src/services/contact/api-keys';
import RHFCurrencyField from '../hook-form/RHFCurrencyField';

const EditApiKeysModal = ({show, setShow, data, refetch}) => {
    //state
    const [priceLimitStatus, SetPriceLimitStatus] = useState(false);
    const [restrictIpStatus, SetRestrictIpStatus] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const AddApiKeySchema = Yup.object().shape({
        title: Yup.string().required('عنوان را کامل کنید.'),
        apiKeyStatus: Yup.number().required('گزینه ای را انتخاب کنید.'),
        priceLimitAmount: Yup.number().typeError('مبلغ وارد شده صحیح نمی باشد'),
    });
    const handleClose = () => {
        reset();
        setShow(!show);
    };
    const methods = useForm({
        resolver: yupResolver(AddApiKeySchema),
        defaultValues: data,
    });

    const {
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        for (let property in values) {
            if (values[property] == undefined) delete values[property];
        }
        const response = await editApiKeys(values);
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
            refetch();
            handleClose();
        }
    };

    return (
        <BaseStyleModal title={'ویرایش Api Keys'} handleClose={handleClose} show={show} lgWidth={600}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={{xs: 1, sm: 2}} justifyContent="center" mb={1} mt={2}>
                    {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                    <Grid container item xs={6} rowSpacing={2} alignItems="flex-start">
                        <Grid sx={{mt: 3}} item xs={12}>
                            <RHFTextField name="title" label="عنوان"/>
                        </Grid>
                        <Grid item xs={12} sx={{mb: 3}}>
                            <Typography variant="span" component="span" pr={2}>
                                <Typography variant="span" component="span" pr={2}>
                                    محدودیت هزینه
                                </Typography>
                                <RHFSwitch
                                    name="priceLimit"
                                    label=""
                                    onClick={() => {
                                        SetPriceLimitStatus(!priceLimitStatus);
                                    }}
                                />
                            </Typography>
                            <RHFCurrencyField
                                sx={{mt: 2}}
                                name="priceLimitAmount"
                                label="محدودیت هزینه(تومان)"
                                disabled={!priceLimitStatus}
                            />
                            <Box>
                                <RHFRadioGroup
                                    sx={{mt: 4, ml: 1}}
                                    name="apiKeyStatus"
                                    options={[1, 2]}
                                    getOptionLabel={['فعال', ' غیر فعال ']}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={6} rowSpacing={2} alignItems="flex-start" justifyContent="center">
                        <Grid sx={{mt: 3}} item xs={12}>
                            <RHFDatePicker name="expireDate" label="تاریخ انقضاء"/>
                        </Grid>
                        <Box sx={{mb: 5, mt: {xs: 5, md: 6}}}>
                            <Grid item xs={12}>
                                <Typography variant="span" component="span" pr={2}>
                                    <Typography variant="span" component="span" pr={2}>
                                        محدودیت کلید شناسه
                                    </Typography>
                                    <RHFSwitch
                                        name="restrictIp"
                                        label=""
                                        onClick={() => {
                                            SetRestrictIpStatus(!restrictIpStatus);
                                        }}
                                    />
                                </Typography>
                                <Typography>
                                    <RHFTextarea
                                        inputProps={{
                                            style: {
                                                fontFeatureSettings: 'initial',
                                                MozFontFeatureSettings: 'initial',
                                                WebkitFontFeatureSettings: 'initial',
                                            }
                                        }}
                                        name="whiteListIp"
                                        label="لیست سفید IP"
                                        placeholder="با Enter از هم جدا کنید"
                                        rows={5}
                                        disabled={!restrictIpStatus}
                                    />
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    {/* <Stack sx={{ mt: 6 }} flexDirection={'row'} justifyContent={'flex-start'}> */}
                    {/* <Button
            size="large"
            sx={{
              color: theme.palette.text.disabled,
              borderColor: theme.palette.text.disabled,
              marginRight: 1,
            }}
            color={'inherit'}
            variant="outlined"
            onClick={handleClose}
          >
            انصراف
          </Button> */}
                </Grid>
                <Stack flexDirection={'row'} justifyContent={'flex-end'}>
                    <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                        ذخیره
                    </LoadingButton>
                </Stack>
                {/* </Grid> */}
            </FormProvider>
        </BaseStyleModal>
    );
};
export default EditApiKeysModal;
