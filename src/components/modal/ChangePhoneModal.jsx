import { Alert, Box, Button, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, RHFTextField } from '../hook-form';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import BaseStyleModal from './BaseStyleModal';
import { UserChangeMobile } from 'src/services/users/user';
import { changeMobile } from 'src/services/users/tokenStore';
import RHFMobileField from "../hook-form/RHFMobileField";

const ChangePhoneModal = ({ show, setShow }) => {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const [newMobile, setNewMobile] = useState(false);

  const sendCodeSchema = Yup.object().shape({
    mobile: Yup.string()
      .trim()
      .matches(/09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}/, 'شماره همراه وارد شده صحیح نمباشد!')
      .required('شماره همراه را وارد کنید.'),
  });

  const sendCodeMethods = useForm({
    resolver: yupResolver(sendCodeSchema),
  });

  const {
    handleSubmit: codeHandleSubmit,
    reset: codeReset,
    formState: { errors: codeErrors, isSubmitting: codeIsSubmitting },
  } = sendCodeMethods;

  const ChangeMobileSchema = Yup.object().shape({
    newMobile: Yup.string()
      .trim()
      .matches(/09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}/, 'شماره همراه وارد شده صحیح نمباشد!')
      .required('شماره همراه را وارد کنید.'),
    code: Yup.string().required('کد را وارد کنید.'),
  });

  const changeMobileMethods = useForm({
    resolver: yupResolver(ChangeMobileSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const {
    handleSubmit: changeMobileHandleSubmit,
    reset: changeMobileReset,
    setValue: changeMobileSetValue,
    formState: { errors: changeMobileErrors, isSubmitting: changeMobileIsSubmitting },
  } = changeMobileMethods;

  const onClose = () => {
    changeMobileReset();
    setShow(!show);
  };

  const codeOnSubmit = async (values) => {
    const response = await UserChangeMobile({mobile: values.mobile});
    if (response.isSuccess) {
      changeMobileSetValue('newMobile', values.mobile);
      setNewMobile(true);
      enqueueSnackbar('کد احراز هویت برای شما ارسال شد.');
    }
  };

  const changeMobileOnSubmit = async (values) => {
    const response = await changeMobile(values.newMobile, values.code);
    if (response.isSuccess) {
      codeReset();
      enqueueSnackbar('شماره همراه با موفقیت تغییر کرد');
      setShow(!show);
    }
  };

  return (
    <BaseStyleModal show={show} handleClose={onClose} title={'تغییر شماره'}>
      {newMobile ? (
        <FormProvider methods={changeMobileMethods} onSubmit={changeMobileHandleSubmit(changeMobileOnSubmit)}>
          <Stack spacing={3} marginY={3}>
            {!!changeMobileErrors.afterSubmit && (
              <Alert severity="error">{changeMobileErrors.afterSubmit.message}</Alert>
            )}
            <RHFTextField name="newMobile" label="شماره موبایل جدید" disabled={true} />
            <RHFTextField name="code" label="کد ارسالی" />
          </Stack>
          <Stack sx={{ mt: 6 }} flexDirection={'row'} justifyContent={'flex-end'}>
            <Button
              size="large"
              sx={{
                minHeight: 36,
                minWidth: 84,
                maxHeight: 36,
                color: theme.palette.text.disabled,
                borderColor: theme.palette.text.disabled,
                marginRight: 1,
                border: 'none',
                ':hover': {
                  color: theme.palette.grey[100],
                  backgroundColor: theme.palette.grey[700],
                },
              }}
              color={'inherit'}
              variant="outlined"
              onClick={() => setNewMobile(false)}
            >
              بازگشت
            </Button>
            <LoadingButton
              sx={{ minHeight: 36, maxHeight: 36, minWidth: 84 }}
              type="submit"
              variant="contained"
              loading={changeMobileIsSubmitting}
            >
              تغییر شماره
            </LoadingButton>
          </Stack>
        </FormProvider>
      ) : (
        <FormProvider methods={sendCodeMethods} onSubmit={codeHandleSubmit(codeOnSubmit)}>
          <Stack spacing={3} marginY={3}>
            {!!codeErrors.afterSubmit && <Alert severity="error">{codeErrors.afterSubmit.message}</Alert>}
            <RHFMobileField name="mobile" label="شماره موبایل جدید" />
          </Stack>
          <Box sx={{ display: 'flex !important', alignContent: 'right', justifyContent: 'right' }}>
            <Stack sx={{ mt: 6 }} flexDirection={'row'} justifyContent={'flex-end'}>
              <Button
                size="large"
                sx={{
                  minHeight: 36,
                  maxHeight: 36,
                  color: theme.palette.text.disabled,
                  borderColor: theme.palette.text.disabled,
                  marginRight: 1,
                  border: 'none',
                  ':hover': {
                    color: theme.palette.grey[100],
                    backgroundColor: theme.palette.grey[700],
                  },
                }}
                color={'inherit'}
                variant="outlined"
                onClick={onClose}
              >
                بازگشت
              </Button>
              <LoadingButton
                sx={{ minHeight: 36, maxHeight: 36 }}
                type="submit"
                variant="contained"
                loading={codeIsSubmitting}
              >
                ارسال کد
              </LoadingButton>
            </Stack>
          </Box>
        </FormProvider>
      )}
    </BaseStyleModal>
  );
};

export default ChangePhoneModal;
