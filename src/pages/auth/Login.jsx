import {Link as RouterLink} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Card, Stack, Link, Alert, Tooltip, Container, Typography} from '@mui/material';
// routes
import {PATH_AUTH} from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import {LoginForm} from '../../sections/auth/login';
import CustomContainer from '../../components/CustomContainer';
import CustomCard from "../../components/CustomCard";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    background: theme.palette.background.customBgPrimary,
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 580,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
    return (
        <Page title="ورود">
            <RootStyle>

                <CustomContainer maxWidth="sm">
                    <ContentStyle>
                        <CustomCard>
                            {/*
              <Typography variant="h4" gutterBottom>
                قاصدک
              </Typography> */}
                            <Stack paddingX={{xs: 0, md: 8}} paddingTop={{xs: 2, md: 3}} paddingBottom={{xs: 0.1, md: 1}}>
                                <Stack direction="row" alignItems="center" justifyContent={'center'}
                                       marginBottom={{xs: 5, md: 5}}>
                                    <Typography fontSize={22} fontWeight={'bold'}
                                                sx={{color: theme => theme.palette.grey[900]}}>ورود به حساب
                                        کاربری</Typography>

                                </Stack>
                                <LoginForm/>
                                <Stack direction={{xs: 'column', lg: 'row'}} alignItems="center" justifyContent="space-between" padding>
                                    <Typography>
                                        حساب کاربری ندارید؟{' '}
                                        <Link variant="subtitle" component={RouterLink} to={PATH_AUTH.register}>
                                            ثبت نام
                                        </Link>
                                    </Typography>
                                    <Link component={RouterLink} variant="subtitle" to={PATH_AUTH.forgotPassword}>
                                        فراموشی رمز عبور
                                    </Link>
                                </Stack>
                            </Stack>

                        </CustomCard>
                    </ContentStyle>
                </CustomContainer>
                <Box sx={{
                    position: 'absolute',
                    right: '24px',
                    top: '24px'
                }}>
                    <Logo sx={{
                        width: 56, height: 56
                    }}/>
                </Box>
            </RootStyle>
        </Page>
    );
}
