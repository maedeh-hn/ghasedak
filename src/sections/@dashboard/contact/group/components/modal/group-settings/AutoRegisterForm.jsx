import React from 'react';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../../../../../components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Button, MenuItem, Stack} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { editGroupSetting } from 'src/services/contact/group-settings';
import { useQuery } from '@tanstack/react-query';
import { getAllLines } from 'src/services/lines/lines';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import CustomMenuItem from "../../../../../../../components/CustomMenuItem";

const AutoRegisterForm = ({ item, close }) => {
  const { isError, isLoading, data } = useQuery(['LineList'], () => getAllLines());
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const AutoRegisterSchema = Yup.object().shape({
    autoRegister: Yup.string().required('وضعیت باید مشخص شود.').nullable(true),
    autoRegisterMessage: Yup.string().required('پیام را وارد کنید.').nullable(true),
    autoRegisterKeyWord: Yup.string().required('کلید را وارد کنید.').nullable(true),
    autoRegisterLineNumber: Yup.string().required('شماره را انتخاب کنید.').nullable(true),
  });

  const methods = useForm({
    resolver: yupResolver(AutoRegisterSchema),
    defaultValues: item,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const response = await editGroupSetting({
      ...values,
      autoRegister: values.autoRegister === 'true' ? 1 : 0,
    });
    if (response.isSuccess) {
      enqueueSnackbar('تغییرات اعمال شد.');
      close();
    } else {
      enqueueSnackbar('خطایی پیش آمده', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFSwitch name={'autoRegister'} label={'فعال بودن عضویت خودکار'} sx={{ m: 0 }} />
        <RHFSelect name="autoRegisterLineNumber" label="شماره">
          {!isLoading &&
            !isError &&
            data.data.map((data) => (
              <CustomMenuItem key={data.id} value={data.id}>
                {data.number}
              </CustomMenuItem>
            ))}
        </RHFSelect>
        <RHFTextField name={'autoRegisterKeyWord'} label={'کلید واژه'} />
        <RHFTextField name={'autoRegisterMessage'} label={'پیام خودکار بعد از عضویت'} />

        <Stack flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            onClick={close}
            size="large"
            sx={{
              minWidth: 84,
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
          >
            انصراف
          </Button>
          <LoadingButton
            sx={{ minHeight: 36, maxHeight: 36, minWidth: 84 }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            ذخیره
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default AutoRegisterForm;
