import React from 'react';

// @mui
import {useTheme} from '@mui/material/styles';
import {Box, Grid, Typography, Card, Alert, Stack, Divider} from '@mui/material';

import {FormProvider, RHFTextField, RHFSwitch, RHFRadioGroup} from '../../../../components/hook-form';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';

//services
import {updateLineSettings} from 'src/services/lines/line-settings';

const ReceiveSettings = ({data}) => {
    const theme = useTheme();
    const {enqueueSnackbar} = useSnackbar();
    const ReceiveSettingsSchema = Yup.object().shape({
        urlForwardActionType: Yup.number(),
        isUrlForwardOn: Yup.boolean(),
        urlForwardAddress: Yup.string().test('valid', 'آدرس فراخوانی را وارد کنید', (value, ctx) =>
            ctx.parent.isUrlForwardOn ? value.length != 0 : true
        ),
    });

    const methods = useForm({
        resolver: yupResolver(ReceiveSettingsSchema),
        defaultValues: {
            ...data,
            urlForwardAddress: data.urlForwardAddress ?? '',
        },
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
                            دقت داشته باشید که ملاک دریافت وضعیت، دریافت (status code 200) از جانب شما میباشد و فقط
                            1 بار ارسال میگردد.</Typography>
                    </Alert>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            p: {xs: 1, md: 3, backgroundColor: theme.palette.background.customBgPrimary},
                            borderRadius: 2,
                        }}
                    >
                        <Typography>تنظیمات دریافت</Typography>
                        <Typography mt={2}>
                            پیام های دریافتی به خط مورد نظر بلافاصله با پارامترهای زیر به آدرسی که تنظیم کرده اید با متد
                            مورد نظر
                            ارسال خواهند شد .
                        </Typography>
                        <Typography mt={2} mb={1}>
                            پارامتر های ارسالی به url :
                        </Typography>
                        <Typography variant="ul" component="ul" pl={5}>
                            <Typography variant="li" component="li">
                                <Typography component="span"> شماره فرستنده پیام : </Typography>
                                <Typography component="span" color="error">
                                    from
                                </Typography>
                            </Typography>
                            <Typography variant="li" component="li">
                                <Typography component="span">شماره گیرنده پیام : </Typography>
                                <Typography component="span" color="error">
                                    to
                                </Typography>
                            </Typography>
                            <Typography variant="li" component="li">
                                <Typography component="span">متن پیام دریافت شده : </Typography>
                                <Typography component="span" color="error">
                                    message
                                </Typography>
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} mt={3}>
                    <Typography variant="span" component="span" p={1}>
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
                            <RHFSwitch name="isUrlForwardOn" label="فعال سازی تنظیمات دریافت"/>
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
                <Grid item xs={12} md={9}>
                    <RHFTextField sx={{mb: 1}} name="urlForwardAddress" label="آدرس فراخوانی" fullWidth/>
                    <Typography sx={{color: theme.palette.grey[500]}} variant="span" component="span">
                        مثال : http://site.com/receive
                    </Typography>
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

export default ReceiveSettings;
