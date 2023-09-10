import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider } from '../../../components/hook-form';
import { forgotPassword } from 'src/services/users/tokenStore';
import { Box } from '@mui/system';
import RHFMobileField from "../../../components/hook-form/RHFMobileField";

// ----------------------------------------------------------------------

ForgotPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetMobile: PropTypes.func,
};

export default function ForgotPasswordForm({ onSent, onGetMobile }) {
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    mobile: Yup.string()
      .trim()
      .matches(/09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}/, 'شماره همراه وارد شده صحیح نمباشد!')
      .required('شماره همراه را وارد کنید.'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.mobile);
    if (response.isSuccess === true) {
      onSent();
      onGetMobile(data.mobile);
    } else {
      if (isMountedRef.current) {
        setError('afterSubmit', { message: response?.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFMobileField name="mobile" label="شماره همراه" />
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <LoadingButton sx={{ width: '30%' }} size="large" type="submit" variant="contained" loading={isSubmitting}>
            تغییر رمز
          </LoadingButton>
        </Box>
      </Stack>
    </FormProvider>
  );
}
