import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { editContactGroupSettingById } from 'src/services/contact/groupSettings';
import { useQuery } from '@tanstack/react-query';
// import { getAllLinesByUserId } from 'src/services/lines/line';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { getAllLinesByUserId } from '../../../../../../../services/lines/lines';
import LoadingWidget from '../../../../../../../components/LoadingWidget';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../../../../../components/hook-form';
import CustomMenuItem from '../../../../../../../components/CustomMenuItem';
import { addCancelSettingContacyGroupParent} from '../../../../../../../services/contact/group-settings';
// import Error from '../../../../../../components/Error';
// import LoadingWidget from '../../../../../../components/LoadingWidget';
// import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../../../../components/hook-form';
// import CustomMenuItem from "../../../../../../components/CustomMenuItem";

const CancelAutoRegisterFormParent = ({ item, close,userId }) => {

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { isError, isLoading, data } = useQuery(['LineList', userId], () => getAllLinesByUserId(userId));

  const CancelAutoRegisterSchema = Yup.object().shape({
    autoRegisterCancel: Yup.string().required('وضعیت باید مشخص شود.').nullable(true),
    autoRegisterCancelMessage: Yup.string().required('پیام را وارد کنید.').nullable(true),
    autoRegisterCancelKeyWord: Yup.string().required('کلید را وارد کنید.').nullable(true),
    autoRegisterCancelLineNumber: Yup.string().required('شماره را انتخاب کنید.').nullable(true),
  });

  const methods = useForm({
    resolver: yupResolver(CancelAutoRegisterSchema),
    defaultValues: item,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (values) => {
   
    const response = await addCancelSettingContacyGroupParent({
      ...values,
      userId:userId,
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
        <RHFSwitch name={'autoRegisterCancel'} label={'فعال بودن لغو عضویت خودکار'} sx={{ m: 0 }} />
        <RHFSelect name="autoRegisterCancelLineNumber" label="شماره">
          <CustomMenuItem value={''} />
          { isLoading ? (
            <LoadingWidget />
          ) : (
            !isLoading &&!isError&&
            data?.map((data) => (
                <CustomMenuItem value={data.id} key={data.id}>{data.number}</CustomMenuItem>
            ))
          )}
        </RHFSelect>
        <RHFTextField name={'autoRegisterCancelKeyWord'} label={'کلید واژه'} />
        <RHFTextField name={'autoRegisterCancelMessage'} label={'پیام خودکار بعد از لغو عضویت'} />
        <Stack marginTop={1} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            size="large"
            sx={{
              minHeight: 36,
              maxHeight: 36,
              border: 'none',
              color: theme.palette.text.disabled,
              ':hover': {
                color: `${theme.palette.grey[100]  }!important`,
                backgroundColor: `${theme.palette.grey[700]  }!important`,
              },
              marginRight: 1,
            }}
            color={'inherit'}
            variant="outlined"
            onClick={close}
          >
            انصراف
          </Button>
          <LoadingButton
            sx={{ minHeight: 36, maxHeight: 36, color: 'white' }}
            size="large"
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

export default CancelAutoRegisterFormParent;
