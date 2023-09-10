import React from 'react';

// @mui
import {useTheme} from '@mui/material/styles';
import {Box, Grid, Typography, Card, Alert, Stack, Divider} from '@mui/material';

import {FormProvider, RHFTextField, RHFRadioGroup, RHFSwitch} from '../../../../components/hook-form';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';

//services
import {updateLineSettings} from 'src/services/lines/line-settings';

const StatusSettings = ({data}) => {
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const StatusSettingsSchema = Yup.object().shape({
        urlGetStatusActionType: Yup.number(),
        isUrlGetStatusOn: Yup.boolean(),
        urlGetStatusAddress: Yup.string().test('valid', 'آدرس فراخوانی را وارد کنید', (value, ctx) =>
            ctx.parent.isUrlForwardOn ? value.length > 0 : true
        ),
    });

    const methods = useForm({
        resolver: yupResolver(StatusSettingsSchema),
        defaultValues: {...data, urlGetStatusAddress: data.urlGetStatusAddress ?? ''},
    });

    const {
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        const response = await updateLineSettings(values);
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} mt={1} rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={12} md={12}>
                    <Alert severity={'info'}>
                        <Typography>توجه : مسئولیت درست بودن URL برعهده شما می باشد.</Typography>
                        <Typography>
                            دقت داشته باشید که ملاک دریافت پیام، دریافت (status code 200 ) از جانب شما میباشد و درصورت
                            بروز مشکل دوباره ارسال خواهد شد(10 بار).
                        </Typography>
                    </Alert>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            p: {xs: 1, md: 3, backgroundColor: theme.palette.background.customBgPrimary},
                            borderRadius: 2,
                        }}
                    >
                        <Typography>تنظیمات دریافت وضعیت</Typography>
                        <Typography mt={2}>
                            وضعیت پیام های ارسالی شما با هر تغییری به آدرسی که تنظیم کرده اید با متد مورد نظر ارسال
                            خواهد شد.با تنظیم
                            کردن این قسمت دیگر نیاز به فراخوانی وب سرویس برای دریافت وضعیت پیام ها نیست .
                        </Typography>
                        <Typography mt={2} mb={1}>
                            پارامتر های ارسالی به url :
                        </Typography>
                        <Typography variant="ul" component="ul" pl={5}>
                            <Typography variant="li" component="li">
                                <Typography component="span">شناسه پیامک مورد نظر که وضعیت آن تغییر کرده است
                                    : </Typography>
                                <Typography component="span" color="error">
                                    messageid
                                </Typography>
                            </Typography>
                            <Typography variant="li" component="li">
                                <Typography component="span">وضعیت جدید پیام : </Typography>
                                <Typography component="span" color="error">
                                    status
                                </Typography>
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} mt={3}>
                    <Typography variant="span" component="span">
                        نوع متد فراخوانی :
                    </Typography>
                </Grid>
                <Grid item xs={12} md={9} mt={3} display={'flex'}>
                    <Grid item xs={12} md={6}>
                        <RHFRadioGroup
                            sx={{
                                flexGrow: 1,
                                height: '56px',
                            }}
                            name="urlForwardActionType"
                            options={[0, 1]}
                            getOptionLabel={['Get', 'Post']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            border: `1px solid ${theme.palette.grey[300]}`,
                            borderRadius: '12px',
                            display: 'flex',
                            padding: '0 20px',
                            width: '100%',
                            height: '56px'
                        }}>
                            <RHFSwitch name="isUrlGetStatusOn" label="فعال سازی تنظیمات وضعیت"/>
                        </Box>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    my={2}
                >
                    <Divider/>

                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="span" component="span" p={1}>
                        آدرس فراخوانی :
                    </Typography>
                </Grid>
                <Grid item xs={12} md={9} paddingLeft={0}>
                    <Grid item xs={12}>
                        <RHFTextField sx={{mb: 1}} name="urlGetStatusAddress" label="آدرس فراخوانی" fullWidth/>
                        <Typography sx={{color: theme.palette.grey[500]}} variant="span" component="span">
                            مثال: http://site.com/status
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 5}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    ذخیره تنظیمات
                </LoadingButton>
            </Grid>
        </FormProvider>
    );
};

export default StatusSettings;
