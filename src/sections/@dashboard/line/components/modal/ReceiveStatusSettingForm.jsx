import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { editLineSettings } from 'src/services/lines/lineSettings';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { FormProvider, RHFRadioGroup, RHFSwitch, RHFTextField } from '../../../../../components/hook-form';
import { editLineSettings } from '../../../../../services/lines/line-settings';
// import {
//   FormProvider,
//   RHFRadioGroup,
//   RHFSelect,
//   RHFSwitch,
//   RHFTextField,
// } from '../../../../../../components/hook-form';

const ReceiveStatusSettingForm = ({ item, close }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const StatusSettingsSchema = Yup.object().shape({
    urlGetStatusActionType: Yup.number(),
    isUrlGetStatusOn: Yup.boolean(),
    urlGetStatusAddress: Yup.string().test({
        name: 'urlGetStatusAddress',
        test: (value, ctx) => {
            if (ctx.parent.isUrlGetStatusOn && value.length <= 0) {
                return ctx.createError({message: 'آدرس فراخوانی را وارد کنید'})
            }
            return true
        }
    }),
  });

  const methods = useForm({
    resolver: yupResolver(StatusSettingsSchema),
    defaultValues: { ...item, urlGetStatusAddress: item?.urlGetStatusAddress ?? '' },
  });

  const {
    handleSubmit,
    formState: {  isSubmitting },
      watch
  } = methods;

  const onSubmit = async (values) => {
    const response = await editLineSettings(values);
    if (response.isSuccess) {
      enqueueSnackbar('عملیات با موفقیت انجام شد.');
        close();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ my: 3 }}>
        <RHFSwitch name="isUrlGetStatusOn" label="فعال سازی" />
      </Box>
      <RHFTextField
        disabled={!watch('isUrlGetStatusOn')}
        sx={{ mb: 1 }}
        name="urlGetStatusAddress"
        label="آدرس فراخوانی"
        fullWidth
      />
      <Typography sx={{ color: theme.palette.grey[500] }} variant="span" component="span">
        مثال: http://site.com/status
      </Typography>
      <Box
        sx={{
          display: 'flex !important',
          justifyContent: 'flex-start !important',
          alignItems: 'center',
          gap: 5,
        }}
        item
      >
        <Typography sx={{ marginTop: 2 }} variant="span" component="span" pr={2}>
           نوع متد فراخوانی
        </Typography>
        <RHFRadioGroup sx={{ mt: 2 }} name="urlForwardActionType" options={[0, 1]} getOptionLabel={['Get', 'Post']} />
      </Box>
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
    </FormProvider>
  );
};

export default ReceiveStatusSettingForm;
