import React from 'react';
import {Box, Button, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';
import {useTheme} from '@mui/material/styles';
// import {FormProvider, RHFSelect} from "src/components/hook-form";
// import {useParams} from "react-router";
// import BaseStyleModal from "src/components/modal/BaseStyleModal";
// import {ListGeneratorFromEnum} from "src/utils/functions";
// import CustomMenuItem from "src/components/CustomMenuItem";
// import {
//     editServiceAccessibility
// } from "src/services/smsRequestManagement/serviceAccessibilities";
import {useQueryClient} from "@tanstack/react-query";
import { FormProvider, RHFSelect } from '../../../../../components/hook-form';
import { useParams } from 'react-router';
import BaseStyleModal from '../../../../../components/modal/BaseStyleModal';
import { ListGeneratorFromEnum } from '../../../../../utils/functions';
import CustomMenuItem from '../../../../../components/CustomMenuItem';
import { editServiceAccessibilityParent } from '../../../../../services/smsRequestManagement/serviceAccessibilities';
import { ServiceTypeEnum } from '../../../../../utils/enums';
// import {ServiceTypeEnum} from "../../../../../utils/enums";


const AccessibilityModal = ({state, handleClose, data}) => {
    const {userId} = useParams()
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const queryClient = useQueryClient()

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {...data},
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        const response = await editServiceAccessibilityParent({...values, userId});
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
            queryClient.invalidateQueries(['getAllServiceAccessibilitiesOfAUser'])
            handleClose();
        }
    };
    return (
        <BaseStyleModal title={data ? 'ویرایش دسترسی' : 'اضافه کردن دسترسی'} handleClose={handleClose} show={state}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        paddingY: 2,
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 1,
                    }}
                    marginBottom={1}
                >
                    <RHFSelect label="سرویس" name="service">
                        {ListGeneratorFromEnum(ServiceTypeEnum).map(item => <CustomMenuItem
                            value={item.id}>{item.title}</CustomMenuItem>)}
                    </RHFSelect>
                    <RHFSelect label="دسترسی" name="isAccessible">
                        <CustomMenuItem value>فعال</CustomMenuItem>
                        <CustomMenuItem value={false}>غیرفعال</CustomMenuItem>
                    </RHFSelect>
                    {/* <RHFSelect label="محدویت آیپی" name="isIpRestricted">
                        <CustomMenuItem value>فعال</CustomMenuItem>
                        <CustomMenuItem value={false}>غیرفعال</CustomMenuItem>
                    </RHFSelect> */}
                </Box>
                <Stack flexDirection={'row'} justifyContent={'flex-end'}>
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
        </BaseStyleModal>
    );
};
export default AccessibilityModal;
