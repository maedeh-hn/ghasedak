import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
// import {editLineUserSetting} from 'src/services/lines/lineUsers';
import { useSnackbar } from 'notistack';
import { FormProvider, RHFSelect, RHFSwitch } from '../../../../../components/hook-form';
import BaseStyleScrollModal from '../../../../../components/modal/BaseStyleScrollModal';

import RHFNumberField from '../../../../../components/hook-form/RHFNumberField';
import { editLineUserSettingParent, getLineUserParentSetting } from '../../../../../services/lines/lineUsers';

const EditLineModalParent = ({ state, handleClose, refetch, data }) => {
  const theme = useTheme();
  const [settingParent, setSettingParent] = useState();
  const { enqueueSnackbar } = useSnackbar();
console.log(data.needsParentConfirmationToSend);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      id: data.id,
      userId: data.userId,
      lineId: data.lineId,
      canReceive: data.canReceive,
      canUseWebservice: data.canUseWebservice,
      canSendToGroups: data.canSendToGroups,
      needsParentConfirmationToSend: data.needsParentConfirmationToSend,
    },
  });
  useEffect(() => {
    (async () => {
      let value;
      value = await getLineUserParentSetting(data?.lineId);
      setSettingParent(value ?? []);
    })();
  }, []);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
 
    const response = await editLineUserSettingParent({ ...values });
    if (response.isSuccess) {
      enqueueSnackbar('تنظیمات ذخیره شد.');
      refetch();
      handleClose();
    }
  };
  console.log(settingParent);
  return (
    <Box sx={{ borderRadius: '20px' }}>
      <BaseStyleScrollModal title={'ویرایش دسترسی'} handleClose={handleClose} show={state}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: { xs: 2, md: 20 } }}>
            <RHFSwitch
              name={'canReceive'}
              label={'دریافت'}
              sx={{ m: 0 }}
            
              disabled={settingParent?.canReceive === false}
            />
            {/* <RHFSwitch name={'isOwnershipVisible'} label={'نمایش مالکیت'} sx={{m: 0}}/> */}
            <RHFSwitch
              name={'canSendToGroups'}
              label={'ارسال گروهی'}
              sx={{ m: 0 }}
             
              disabled={settingParent?.canSendToGroups === false}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: { sx: 2, md: 16 } }}>
            <RHFSwitch
              name={'needsParentConfirmationToSend'}
              label={'نیاز به تایید ارسال'}
              sx={{ m: 0 }}
          
            />
            <RHFSwitch
              name={'canUseWebservice'}
              label={'ارسال وب سرویس'}
              sx={{ m: 0 }}
            
              disabled={settingParent?.canUseWebservice === false}
            />
          </Box>
          {/* <Box sx={{my: 3}}>
                        <RHFNumberField name="maxBulkReceptorsWithoutConfirm" label="محدودیت ارسال گروهی بدون تایید"/>
                    </Box> */}
          <Stack sx={{ marginTop: 4 }} flexDirection={'row'} justifyContent={'flex-end'}>
            <Button
              size="large"
              sx={{
                minHeight: 36,
                maxHeight: 36,
                border: 'none',
                color: theme.palette.text.disabled,
                ':hover': {
                  color: `${theme.palette.grey[100]}!important`,
                  backgroundColor: `${theme.palette.grey[700]}!important`,
                },
                marginRight: 1,
              }}
              color={'inherit'}
              variant="outlined"
              onClick={handleClose}
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
      </BaseStyleScrollModal>
    </Box>
  );
};

export default EditLineModalParent;
