import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Card, Container, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';
import Logo from '../../components/Logo';
import ForgotPasswordForm from '../../sections/auth/reset-password/ResetPasswordForm';
import CustomContainer from "../../components/CustomContainer";
import { ArrowBackIosNew, ArrowLeft } from '@mui/icons-material';
import CustomCard from "../../components/CustomCard";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#f5f8fe',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const [mobile, setMobile] = useState('');
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();

  return (
    <Page title="بازیابی رمزعبور" sx={{ height: 1 }}>
      <RootStyle>
        <CustomContainer maxWidth="sm">
          <CustomCard>
            <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: 3 }}>
              <Button
                onClick={() => (sent ? setSent(!sent) : navigate(PATH_AUTH.login))}
                sx={{ align: 'right', display: 'flex' }}
              >
                <Box> بازگشت</Box>
              </Button>
            </Box>
            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              {!sent ? (
                <>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h3" paragraph>
                      رمز عبور خودرا فراموش کرده‌اید؟
                    </Typography>
                    <Logo />
                  </Stack>

                  <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    برای بازیابی رمز عبور خود شماره همراه وارد شده در سامانه را وارد کنید.
                  </Typography>

                  <ResetPasswordForm onSent={() => setSent(true)} onGetMobile={(value) => setMobile(value)} />
                </>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <Stack spacing={2}>
                    <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                    <Typography variant="h3" gutterBottom>
                      کد احراز هویت را وارد کنید
                    </Typography>
                    <Typography>
                      ما یک کد به شماره
                      <strong> {mobile} </strong>
                      ارسال کرده ایم.
                    </Typography>

                    <ForgotPasswordForm mobile={mobile} />

                  </Stack>
                </Box>
              )}
            </Box>
          </CustomCard>
        </CustomContainer>
      </RootStyle>
    </Page>
  );
}
