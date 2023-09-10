import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Alert, Box, IconButton, InputAdornment, Stack, OutlinedInput } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { resetPassword } from 'src/services/users/tokenStore';
import Iconify from '../../../components/Iconify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from '../../../routes/paths';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

ForgotPasswordForm.propTypes = {
  mobile: PropTypes.string,
};

export default function ForgotPasswordForm({ mobile }) {
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const ChangePassWordSchema = Yup.object().shape({
    code1: Yup.string().required('کد را وارد کنید!'),
    code2: Yup.string().required('کد را وارد کنید!'),
    code3: Yup.string().required('کد را وارد کنید!'),
    code4: Yup.string().required('کد را وارد کنید!'),
    code5: Yup.string().required('کد را وارد کنید!'),
    code6: Yup.string().required('کد را وارد کنید!'),
    password: Yup.string().trim().min(6, 'رمز عبور نمیتواند کمتر از 6 کاراکتر باشد').required('رمزعبور را وارد کنید!'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    let orgValues = { ...data };
    delete data['password'];
    const response = await resetPassword(mobile, orgValues.password, Object.values(data).join(''));
    if (response.isSuccess === true) {
      enqueueSnackbar('رمز عبور با موفقیت تغییر کرد.');
      navigate(PATH_AUTH.login, { replace: true });
    } else {
      if (isMountedRef.current) {
        setError('afterSubmit', { message: response?.message });
      }
    }
  };
  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const isMountedRef = useIsMountedRef();
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {/* <RHFTextField name="code" type="text" label="کد احراز هویت" /> */}
        <Box sx={{ mt: 5, mb: 3 }}>
          <Stack direction="row-reverse" spacing={2} justifyContent="center">
            {Object.keys(values)
              .splice(0, 6)
              .map((name, index) => (
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
        </Box>
        <RHFTextField
          name="password"
          label="رمز عبور جدید"
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
      </Stack>
    </FormProvider>
  );
}
