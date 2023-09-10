import * as Yup from 'yup';
// @ts-ignore
import { FC, ReactElement, useContext, useState } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';
// form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Box, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
// @ts-ignore
import useAuth from '../../../hooks/useAuth';
// components
// @ts-ignore
import Iconify from '../../../components/Iconify';
// @ts-ignore
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// @ts-ignore
import { PATH_AUTH } from '../../../routes/paths';
// @ts-ignore
import { useSnackbar } from 'notistack';
// @ts-ignore
import * as user_api from 'src/services/users/authenticate';
// @ts-ignore
import { sendOtpRequestActiveUser } from 'src/services/users/tokenStore';
import { useQuery } from '@tanstack/react-query';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
// @ts-ignore
import { showMessage } from '../../../redux/slices/message';
// @ts-ignore
import { store } from '../../../redux/store';
import { ILoginResponse, IRegisterCaptchaResponse } from "../../../types/services/user.types";


// ----------------------------------------------------------------------


type FormValues = {
    email: string;
    password: string;
    captcha: string;
};

const LoginForm: FC<ReactElement> = () => {
    const { login, saveUser ,setPanelType} = useAuth();


   
    
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const theme = useTheme()

    const [showPassword, setShowPassword] = useState(false);
    const {
        data: captchaData,
        refetch
    } = useQuery(['captcha'], (): Promise<IRegisterCaptchaResponse> => user_api.RegisterCaptcha({
        FontSize: 50,
        ForeColor: theme.palette.primary.dark.replace('#', '%23'),
        BackColor: theme.palette.primary.main.replace('#', '%23')
    }));

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('ایمیل را وارد کنید.'),
        password: Yup.string().required('رمز عبور خود را وارد کنید.'),
        captcha: Yup.string().test({
            name: 'captcha',
            test: (value, ctx) => {
                // @ts-ignore
                if (captchaData?.data?.isActive && value.length <= 0) {
                    return ctx.createError({ message: 'کپچا را وارد کنید' })
                }
                return true
            }
        }),
    });

    const methods = useForm<FormValues>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            captcha: '',
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
        //    // @ts-ignore
        //     event.preventDefault()
        const values = new FormData();
        values.append('UserName', data.email);
        values.append('Password', data.password);
        values.append('CaptchaText', captchaData?.data?.captchaText!);
        values.append('CaptchaToken', captchaData?.data?.captchaToken!);
        values.append('CaptchaInput', data.captcha);
        const response: ILoginResponse = await user_api.login(values);
        console.log(response);

        if (response.status === 200) {
            if (response?.isSuccess) {
                const { access_token, refresh_token, panelType } = response.data;
                localStorage.setItem("panelType",panelType)
                if (panelType === 1) {
                    window.location.replace(`${import.meta.env.VITE_ADMIN_SIDE_URL}/dashboard/users?access=${access_token}&refresh=${refresh_token}`);
                    // window.location.replace(`http://localhost:3030/dashboard/users?access=${access_token}&refresh=${refresh_token}`);
                }
                else if (panelType === 2) {

                    await login(access_token, refresh_token);
                }
                else if (panelType === 3) {

                    await login(access_token, refresh_token);
                }
                else {
                    await login(access_token, refresh_token);
                }
            } else {
                enqueueSnackbar(response.message, { variant: 'error' });
                await refetch()
            }
            await refetch()
        } else if (response.status === 306) {
            await saveUser({
                mode: 'activate',
                username: data.email,
            });
            sendOtpRequestActiveUser(data.email);
            navigate(PATH_AUTH.verify, { replace: true });
        } else if (response.status === 203) {
            enqueueSnackbar('کد تایید دو مرحله خود را وارد کنید.');
            await saveUser({
                mode: 'twoFactor',
                username: data.email,
                password: data.password,
            });
            navigate(PATH_AUTH.verify, { replace: true });
        }
        await refetch()
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="email" label="آدرس ایمیل" />

                <RHFTextField
                    name="password"
                    label="رمز عبور"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {captchaData?.data.isActive && (
                    <>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    justifyItems: 'center',
                                    '& img': { width: 350, height: 50 },
                                }}
                            >

                                <RHFTextField
                                    sx={{ direction: 'rtl', }}
                                    fullWidth
                                    name={'captcha'}
                                    label={'کپچا را وارد کنید'}
                                />

                                <img src={captchaData?.data.captchaImgUrl} alt={'captcha'} />
                                <LoopRoundedIcon
                                    onClick={async () => {
                                        await refetch();
                                    }}
                                    sx={{ color: (theme) => theme.palette.primary.main, cursor: 'pointer' }}
                                />
                            </Box>
                        </Box>
                    </>
                )}
                <Stack paddingBottom={{ xs: 2, md: 1.5 }} paddingTop={{ xs: 0.5, md: 3 }}>
                    <LoadingButton sx={{
                        fontSize: '18px',
                        fontWeight: '500',
                        padding: '28px 22px',
                    }} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        ورود
                    </LoadingButton>
                </Stack>


            </Stack>
        </FormProvider>
    );
}

export default LoginForm
