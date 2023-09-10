import {Link as RouterLink} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Button, Link, Container, Typography, Card} from '@mui/material';
// routes
import {PATH_AUTH} from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {VerifyCodeForm} from '../../sections/auth/verify-code';
import useAuth from '../../hooks/useAuth';
import {Navigate} from 'react-router';
import {sendGoogleAuthenticatorSms, sendOtpRequestActiveUser} from 'src/services/users/tokenStore';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';
import CustomContainer from '../../components/CustomContainer';
import {useMutation} from "@tanstack/react-query";
import {useEffect} from "react";
import CustomCard from "../../components/CustomCard";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    backgroundColor: '#f5f8fe',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
    const {user} = useAuth();

    const sendTwoFactorSmsCode = useMutation({
        mutationFn: (username) => {
            return sendGoogleAuthenticatorSms(username)
        }
    })

    const sendConfirmOtpCode = useMutation({
        mutationFn: (username) => {
            return sendOtpRequestActiveUser(username)
        }
    })
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (sendConfirmOtpCode.isSuccess || sendTwoFactorSmsCode.isSuccess) {
            enqueueSnackbar('کد احراز هویت ارسال شد.')
        }
    }, [sendTwoFactorSmsCode.isSuccess, sendConfirmOtpCode.isSuccess])


    if (user === null) {
        return <Navigate to={PATH_AUTH.register}/>;
    }

    return (
        <Page title="کد تایید" sx={{height: 1}}>
            <RootStyle>
                <CustomContainer maxWidth="sm">
                    <Box>
                        <CustomCard>
                            <Box sx={{maxWidth: 480, mx: 'auto'}}>
                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                    <Button
                                        size="small"
                                        component={RouterLink}
                                        to={PATH_AUTH.login}
                                        endIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20}/>}
                                        sx={{mb: 3}}
                                    >
                                        بازگشت
                                    </Button>
                                </Box>
                                <Typography variant="h5" paragraph>
                                    {user.mode === 'twoFactor' && 'کد تایید دومرحله ای خود را وارد کنید.'}
                                    {user.mode === 'activate' && 'کد احراز هویت ارسال شده را وارد کنید.'}
                                    {user.mode === 'register' && 'کد احراز هویت ارسال شده را وارد کنید.'}
                                </Typography>
                                <Box sx={{mt: 5, mb: 3}}>
                                    <VerifyCodeForm/>
                                </Box>
                                {user.mode === 'twoFactor' && (
                                    <Typography variant="body2" align="center">
                                        ارسال کد پیامکی؟{' '}
                                        {
                                            sendTwoFactorSmsCode.isLoading ? 'درحال ارسال ...' : <Link
                                                sx={{ml: 2}}
                                                variant="subtitle2"
                                                underline="none"
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    sendTwoFactorSmsCode.mutate(user.username)
                                                }}
                                            >
                                                ارسال
                                            </Link>
                                        }
                                    </Typography>
                                )}
                                {user.mode === 'activate' && (
                                    <Typography variant="body2" align="center">
                                        کدی دریافت نکردید؟{' '}
                                        {
                                            sendTwoFactorSmsCode.isLoading ? 'درحال ارسال ...' :
                                                <Link variant="subtitle2" underline="none" style={{cursor: 'pointer'}}
                                                      onClick={() => {
                                                          sendConfirmOtpCode.mutate(user.username)
                                                      }}>
                                                    ارسال مجدد
                                                </Link>
                                        }
                                    </Typography>
                                )}
                            </Box>
                        </CustomCard>
                    </Box>
                </CustomContainer>
            </RootStyle>
        </Page>
    );
}
