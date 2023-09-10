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
import { authenticationInfoWithSms } from '../../services/authentication/authentication';

const ConfirmMobileModal = ({ show, setShow,mobileNum }) => {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  







  const ChangeMobileSchema = Yup.object().shape();

  const changeMobileMethods = useForm({
    resolver: yupResolver(ChangeMobileSchema),
    
  });

  const {
    handleSubmit: changeMobileHandleSubmit,
 

    formState: { errors: changeMobileErrors, isSubmitting: changeMobileIsSubmitting },
  } = changeMobileMethods;

  const onClose = () => {

    setShow(!show);
  };

  // const codeOnSubmit = async (values) => {
  //   const response = await UserChangeMobile({mobile: values.mobile});
  //   if (response.isSuccess) {
  //     changeMobileSetValue('newMobile', values.mobile);
  //     setNewMobile(true);
  //     enqueueSnackbar('کد احراز هویت برای شما ارسال شد.');
  //   }
  // };

  const changeMobileOnSubmit = async (values) => {
    console.log(values);
    const response = await authenticationInfoWithSms({Mobile:mobileNum,Token:values.Token});
    if (response.isSuccess) {
    
      enqueueSnackbar('شماره همراه با موفقیت تایید شد');
      setShow(!show);
    }
  };

  return (
    <BaseStyleModal show={show} handleClose={onClose} title={`تایید شماره موبایل ${mobileNum}`}>
      
        <FormProvider methods={changeMobileMethods} onSubmit={changeMobileHandleSubmit(changeMobileOnSubmit)}>
          <Stack spacing={3} marginY={3}>
            {!!changeMobileErrors.afterSubmit && (
              <Alert severity="error">{changeMobileErrors.afterSubmit.message}</Alert>
            )}
            {/* <RHFTextField name="newMobile" label="شماره موبایل جدید" disabled={true} /> */}
            <RHFTextField name="Token" label="کد ارسالی" />
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
              onClick={() => setShow(false)}
            >
              بازگشت
            </Button>
            <LoadingButton
              sx={{ minHeight: 36, maxHeight: 36, minWidth: 84 }}
              type="submit"
              variant="contained"
              loading={changeMobileIsSubmitting}
            >
      تایید
            </LoadingButton>
          </Stack>
        </FormProvider>
 
    </BaseStyleModal>
  );
};

export default ConfirmMobileModal;
