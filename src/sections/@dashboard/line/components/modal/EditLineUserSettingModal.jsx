import React from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {LoadingButton} from '@mui/lab';
import {useTheme} from '@mui/material/styles';
// import {editLineUserSetting} from 'src/services/lines/lineUsers';
import {useSnackbar} from 'notistack';
import {FormProvider, RHFSelect, RHFSwitch} from '../../../../../components/hook-form';
import BaseStyleScrollModal from '../../../../../components/modal/BaseStyleScrollModal';

import RHFNumberField from "../../../../../components/hook-form/RHFNumberField";

const EditLineUserSettingModal = ({state, handleClose, refetch, data}) => {
    const theme = useTheme();

    const {enqueueSnackbar} = useSnackbar();

    const methods = useForm({
        mode: 'onChange',
        defaultValues: data,
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        // const response = await editLineUserSetting({...values, sendTerms: parseInt(values.sendTerms)});
        // if (response.isSuccess) {
        //     enqueueSnackbar('تنظیمات ذخیره شد.');
        //     refetch();
        //     handleClose();
        // }
    };
    return (
        <Box sx={{borderRadius: '20px'}}>
            <BaseStyleScrollModal title={'ویرایش دسترسی'} handleClose={handleClose} show={state}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: {xs: 2, md: 20}}}>
                        <RHFSwitch name={'canRecieve'} label={'دریافت'} sx={{m: 0}}/>
                        <RHFSwitch name={'isOwnershipVisible'} label={'نمایش مالکیت'} sx={{m: 0}}/>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: {xs: 2, md: 16}}}>
                        <RHFSwitch name={'canSendToGroups'} label={'ارسال گروهی'} sx={{m: 0}}/>
                        <RHFSwitch name={'canUseWebservice'} label={'ارسال وب سرویس'} sx={{m: 0}}/>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: {sx: 2, md: 16}}}>
                        <RHFSwitch name={'needsConfirmationToSend'} label={'نیاز به تایید ارسال'} sx={{m: 0}}/>
                    </Box>
                    <Box sx={{my: 3}}>
                        <RHFNumberField name="maxBulkReceptorsWithoutConfirm" label="محدودیت ارسال گروهی بدون تایید"/>
                    </Box>
                    <Stack sx={{marginTop: 4}} flexDirection={'row'} justifyContent={'flex-end'}>
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
                            onClick={handleClose}
                        >
                            انصراف
                        </Button>
                        <LoadingButton
                            sx={{minHeight: 36, maxHeight: 36, color: 'white'}}
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

export default EditLineUserSettingModal;
