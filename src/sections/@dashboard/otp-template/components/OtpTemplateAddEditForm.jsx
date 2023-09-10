import React from 'react';
import {useSnackbar} from 'notistack';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, RHFTextarea, RHFTextField} from '../../../../components/hook-form';
import {Alert, Box, Typography, useTheme} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {createOtpTemplate, editOtpTemplate} from 'src/services/smsRequestManagement/otpTemplate';
import {useNavigate} from 'react-router-dom';
import {PATH_DASHBOARD} from '../../../../routes/paths';


const OtpTemplateAddEditForm = ({data}) => {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const OtpTemplateSchema = Yup.object().shape({
        name: Yup.string()
            .required('نام قالب را وارد کنید.')
            .test({
                name: 'name',
                test(value, ctx) {
                    let p = /^[A-Za-z][A-Za-z0-9]*$/;
                    if (value.includes(' ')) {
                        return ctx.createError({message: 'متن قالب نباید شامل اسپیس باشد.'});
                    }
                    if (!p.test(value)) {
                        return ctx.createError({message: 'متن قالب نباید فارسی باشد.'});
                    }
                    return true;
                },
            }),
    message: Yup.string()
            .required('متن قالب را وارد کنید.')
            .test({
                name: 'message',
                test(value, ctx) {
                    if (!value.includes('%param1%')) {
                        return ctx.createError({message: 'متن قالب باید حداقل یک پارامتر داشته باشد.'});
                    }
                    return true;
                },
            }),
    });
    const theme = useTheme();

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(OtpTemplateSchema),
        defaultValues: {
            ...data,
            message: data?.message || data?.message || '',
            name: data?.name || ''
        },
    });

    const {
        handleSubmit,
        watch,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        let response;
        if (data) {
            response = await editOtpTemplate(values);
        } else {
            response = await createOtpTemplate(values);
        }
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقت انجام شد.');
            navigate(PATH_DASHBOARD.otpTemplate.root);
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    justifyContent: {xs: 'center', md: 'revert'},
                }}
            >
                <Box sx={{width: {xs: '100%', md: '60%'}}}>
                    <Box>
                        <Box sx={{my: {sx: 2, md: 4}}}>
                                <RHFTextField sx={{mb: 1, direction: 'rtl !important'}} name="name" label="نام قالب"
                                          fullWidth/>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    '& textarea': {
                                        unicodeBidi: 'plaintext',
                                        direction: 'rtl !important',
                                        textAlign: 'left',
                                    },
                                }}
                            >
                                <RHFTextarea inputProps={{
                                    style: {
                                        fontFeatureSettings: 'initial',
                                        MozFontFeatureSettings: 'initial',
                                        WebkitFontFeatureSettings: 'initial',
                                    }
                                }} name="message" label="متن قالب" fullWidth/>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ml: {xs: 1, md: 14}, width: {xs: '100%', md: '40%'}}}>
                    <Box sx={{position: 'relative', pb: 5}}>
                        <Box sx={{position: 'absolute', mb: {xs: 20, md: 0}, mt: 3, top: {xs: 0, md: '-30px'}}}>
                            <img src="/images/middlephone.png" width={'350px'} height={'400px'} alt={'image'}/>
                            <Box
                                sx={{
                                    '& pre': {width: '30%'},
                                    position: 'absolute',
                                    top: 110,
                                    width: '90%',
                                    display: 'block',
                                    textAlign: 'left',
                                    right: 11,
                                }}
                            >
                                <Box
                                    sx={{
                                        flexWrap: 'wrap',
                                        '& p': {width: '90%'},
                                        display: 'flex',
                                        overflowY: 'scroll',
                                        overscrollBehaviorX: 'contain',

                                        height: 290,
                                        scrollbarColor: 'red !important',
                                        '& ::-webkit-scrollbar-track': {
                                            backgroundColor: 'red',
                                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        },
                                        '& ::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(0,0,0,.1)',
                                            outline: '1px solid slategrey',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant={'enNum'}
                                        style={{
                                            scrollBehavior: 'smooth',
                                            display: 'inline-block',
                                            unicodeBidi: 'plaintext',
                                            whiteSpace: 'pre-wrap',
                                        }}
                                    >
                                        {(watch('message') ?? '')
                                            .split('%')
                                            .join('percent')
                                            .replace(/percent/g, ' % ')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    p: {xs: 1, md: 3, backgroundColor: theme.palette.background.customBgPrimary},
                    mt: {xs: 50, md: 10},
                    borderRadius: 2,
                }}
            >
                <Typography sx={{lineHeight: 2}} variant="ul" component="ul" pl={2} mb={3}>
                    <Typography variant="li" component="li">
                        <Typography component="span">در متن قالب نام برند ،شرکت و یا خدمات خود را حتما ذکر
                            نمائید.</Typography>
                    </Typography>
                    <Typography variant="li" component="li">
                        <Typography component="span">
                            {' '}
                            استفاده از کلمه تخفیف ، هدیه ، قرعه کشی ، برنده و سامانه در متن قالب مجاز نمی باشد .
                        </Typography>
                    </Typography>
                    <Typography variant="li" component="li">
                        <Typography component="span">
                            {' '}
                            هیچ کدام از پارامترها نباید حاوی خط جدید،فاصله، UnderLine یا جداکننده باشد. در صورتی که در
                            متن قالب از
                            لینک استفاده می کنید ، حتما لینک مورد نظر معتبر و قابل مشاهده باشد .
                        </Typography>
                    </Typography>
                    <Typography variant="li" component="li">
                        <Typography sx={{lineHeight: 2}}>
                            حداقل حاوی یک پارامتر{' '}
                            <Typography
                                component="code"
                                style={{
                                    scrollBehavior: 'smooth',
                                    display: 'inline-block',
                                    unicodeBidi: 'plaintext',
                                    whiteSpace: 'pre-wrap',
                                    direction: 'ltr !important',
                                }}
                                color={'error'}
                            >
                                %param1%
                            </Typography>{' '}
                            و حداکثر از 10 پارامتر ،
                            {Array.from(Array(9).keys()).map((item) => (
                                <>
                                    <Typography
                                        component="code"
                                        style={{
                                            scrollBehavior: 'smooth',
                                            display: 'inline-block',
                                            unicodeBidi: 'plaintext',
                                            whiteSpace: 'pre-wrap',
                                            direction: 'ltr !important',
                                        }}
                                        color={'error'}
                                    >
                                        %param{item + 2}%{' '}
                                    </Typography>
                                    {','}
                                </>
                            ))}
                            استفاده نمائید .
                        </Typography>
                    </Typography>
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 3}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    ذخیره
                </LoadingButton>
            </Box>
        </FormProvider>
    );
};

export default OtpTemplateAddEditForm;
