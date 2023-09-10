import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, OutlinedInput, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import useAuth from '../../../hooks/useAuth';
// api
import { ActiveUserByOtp, VerifyGoogleAuthenticator, verifyRegisterCode } from 'src/services/users/tokenStore';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
import * as user_api from 'src/services/users/authenticate';

// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('کد را وارد کنید!'),
    code2: Yup.string().required('کد را وارد کنید!'),
    code3: Yup.string().required('کد را وارد کنید!'),
    code4: Yup.string().required('کد را وارد کنید!'),
    code5: Yup.string().required('کد را وارد کنید!'),
    code6: Yup.string().required('کد را وارد کنید!'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    if (user.mode === 'register') {
      const response = await verifyRegisterCode(Object.values(data).join(''), user.mobile);
      if (response.isSuccess) {
        enqueueSnackbar('حساب شما با موفقیت تایید شد.');
        const response = await user_api.login(user.username, user.password);
        if (response?.data?.isSuccess && response.status === 200) {
          const {
            data: { access_token, refresh_token },
          } = response?.data;
          await login(access_token, refresh_token);
          enqueueSnackbar('ورود موفق.');
          navigate(PATH_DASHBOARD.contacts.root);
        } else {
          navigate(PATH_AUTH.login, { replace: true });
        }
      }
    } else if (user.mode === 'twoFactor') {
      const response = await VerifyGoogleAuthenticator(user.username, user.password, Object.values(data).join(''));
      if (response.isSuccess) {
        const { access_token, refresh_token } = response?.data;
        await login(access_token, refresh_token);
        navigate(PATH_DASHBOARD.contacts.root, { replace: true });
        enqueueSnackbar('ورود موفقیت آمیز.');
      }
    } else if (user.mode === 'activate') {
      const response = await ActiveUserByOtp(user.username, Object.values(data).join(''));
      if (response.isSuccess) {
        navigate(PATH_AUTH.login, { replace: true });
        enqueueSnackbar('حساب شما با موفقیت فعال شد.');
      }
    }
  };

  useEffect(() => {
    if (Object.values(getValues()).join('').length === 6) {
      onSubmit(Object.values(getValues()).join(''));
    }
  }, [watch()]);

  const handlePasteClipboard = (event) => {
    let data = event?.clipboardData?.getData('Text') || '';

    data = data.split('');

    [].forEach.call(document.querySelectorAll('#field-code'), (node, index) => {
      node.value = data[index];
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex, data[index]);
    });
  };

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
    handleChange(event);
  };

  const handleRemoveByKey = (event) => {
    const { name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);
    if (event.keyCode === 8 || event.keyCode === 46) {
      if (fieldIntIndex > 0) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex - 1}]`);

        if (nextfield !== null) {
          nextfield.focus();
          setValue(`code${fieldIntIndex}`, '');
          setValue(`code${fieldIntIndex - 1}`, '');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row-reverse" spacing={2} justifyContent="center">
        {Object.keys(values).map((name, index) => (
          <Controller
            key={name}
            name={`code${index + 1}`}
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                id="field-code"
                autoFocus={index === 0}
                placeholder="-"
                onChange={(event) => handleChangeWithNextField(event, field.onChange)}
                onKeyUp={(event) => handleRemoveByKey(event)}
                inputProps={{
                  maxLength: 1,
                  sx: {
                    p: 0,
                    textAlign: 'center',
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 },
                  },
                }}
              />
            )}
          />
        ))}
      </Stack>
      <Box sx={{ textAlign: 'right' }}>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 5, width: '25%' }}
        >
          تایید
        </LoadingButton>
      </Box>
    </form>
  );
}
