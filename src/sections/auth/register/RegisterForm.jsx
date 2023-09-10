import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Box, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFRadioGroup, RHFTextarea, RHFTextField } from '../../../components/hook-form';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../../routes/paths';
import * as user_api from 'src/services/users/authenticate';
import RHFMobileField from '../../../components/hook-form/RHFMobileField';
import RHFEmailField from '../../../components/hook-form/RHFEmailField';
import { useQuery } from '@tanstack/react-query';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
const CUSTOMER_OPTION = ['0', '1'];
const CUSTOMER_LABEL = ['حقیقی', 'حقوقی'];

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const defaultValues = {
    email: '',
    password: '',
    mobile: '',
    customerType: '0',
    captcha: '',
  };
  const navigate = useNavigate();
  const { saveUser } = useAuth();
  const theme = useTheme();
  const { data: captchaData, refetch } = useQuery(
    ['captch'],() =>
    user_api.RegisterCaptcha({ FontSize: 16, BackColor: "%2312161a", ForeColor: "%23e8ebef" })
  );
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('ایمیل وارد شده صحیح نیست.').required('ایمیل را وارد کنید.'),
    captcha: Yup.string().required('کپچا را وارد کنید'),
    password: Yup.string()
      .required('رمز عبور را وارد کنبد.')
      .test({
        name: 'password',
        test: (value, ctx) => {
          const pattern = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%#?^&<>:+])[A-Za-z\\d@$!%*#?^&<>:+]{8,70}$');
          if (!pattern.test(value)) {
            return ctx.createError({ message: 'رمزعبور باید شامل حروف بزرگ و کوچک و کاراکتر خاص باشد.' });
          }
          return true;
        },
      }),
    mobile: Yup.string().required('موبایل را وارد کنید.'),
    customerType: Yup.string().required('نوع کاربری را انتخاب کنید'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const values = new FormData();
    values.append('UserName', data.email);
    values.append('Password', data.password);
    values.append('Mobile', data.mobile);
    values.append('UserType', parseInt(data.customerType));
    values.append('CaptchaText', captchaData?.data?.captchaText);
    values.append('CaptchaToken', captchaData?.data?.captchaToken);
    values.append('CaptchaInput', data.captcha);

    const response = await user_api.register(values);
    if (response?.isSuccess) {
      await saveUser({
        mode: 'register',
        username: data.email,
        password: data.password,
        mobile: data.mobile,
      });
      navigate(PATH_AUTH.verify, { replace: true });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFEmailField name="email" label="نام کاربری (ایمیل)" />
        <RHFTextField
          name="password"
          label="رمز عبور"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFMobileField name="mobile" label="موبایل" />

        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={4}>
          <Typography alignSelf={'center'}>نوع عضویت</Typography>
          <RHFRadioGroup
            name="customerType"
            options={CUSTOMER_OPTION}
            getOptionLabel={CUSTOMER_LABEL}
            sx={{
              '& .MuiFormControlLabel-root': { mr: { xs: 2, md: 4 } },
            }}
          />
        </Stack>
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
                  sx={{ direction: 'rtl' }}
                  fullWidth
                  name={'captcha'}
                  label={'کپچا را وارد کنید'}
                  // inputProps={{ maxLength: 4 }}
                />
                <img src={captchaData?.data.captchaImgUrl} />
                <LoopRoundedIcon
                    onClick={() => {
                      refetch();
                    }}
                    sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </>
        )}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          ثبت نام
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
