import {capitalCase} from 'change-case';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Card, Link, Container, Typography, Tooltip} from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import {PATH_AUTH} from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import {RegisterForm} from '../../sections/auth/register';
import CustomContainer from '../../components/CustomContainer';
import CustomCard from "../../components/CustomCard";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    background: '#f5f8fe',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({theme}) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({theme}) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
    const {method} = useAuth();

    const smUp = useResponsive('up', 'sm');

    return (
        <Page title="ثبت نام">
            <RootStyle>
                <CustomContainer>
                    <ContentStyle>
                        <CustomCard>
                            <Box sx={{mb: 5, display: 'flex', justifyContent: 'center'}}>
                                <Typography variant="h4" gutterBottom>
                                    ایجاد حساب کاربری
                                </Typography>
                            </Box>

                            <RegisterForm/>
                            <Typography variant="body2" sx={{mt: 3, textAlign: 'center'}}>
                                حساب کاربری دارید؟{' '}
                                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                                    وارد شوید
                                </Link>
                            </Typography>
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
