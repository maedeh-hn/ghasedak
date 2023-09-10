import React from 'react';
import {useParams} from 'react-router-dom';

import {Box, Button, Stack, Typography} from '@mui/material';
import BaseStyleModal from '../../../../../../components/modal/BaseStyleModal';
import {
    FormProvider,
    RHFTextField,
    RHFDatePicker,
    RHFRadioGroup,
} from '../../../../../../components/hook-form';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';

import {useTheme} from '@mui/material/styles';
import RHFEmailField from "../../../../../../components/hook-form/RHFEmailField";
import RHFMobileField from "../../../../../../components/hook-form/RHFMobileField";
import { createGroupNumberParent, editGroupNumberParent } from '../../../../../../services/contact/group-number';

const AddPhoneNumberModalParent = ({state, handleClose, refetch, data}) => {
    const params = useParams();
    console.log(params);
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const GroupNameSchema = Yup.object().shape({
        number: Yup.string().required('شماره تلفن را وارد کنید.'),
    });

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(GroupNameSchema),
        defaultValues: {
            ...data,
            gender: data?.gender ? data?.gender : 0
        },
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        values['groupId'] = params.GroupId;
        let response;
        if (data) {
            response = await editGroupNumberParent({...values,gender: Number(values?.gender),userId:params.userId,groupId:params.GroupId});
        } else {
            response = await createGroupNumberParent({...values, gender: Number(values?.gender),userId:params.userId,groupId:params.GroupId});
        }
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
            refetch();
            handleClose();
        }
    };
    return (
        <BaseStyleModal title={data ? 'ویرایش مخاطب' : 'افزودن مخاطب'} handleClose={handleClose}
                        show={state}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 2,
                        gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'},
                    }}
                    marginBottom={1}
                >
                    <RHFTextField fullWidth name="firstName" label="نام"/>

                    <RHFTextField fullWidth name="lastName" label="نام خانوادگی"/>

                    <RHFEmailField fullWidth name="email" label="ایمیل"/>

                    <RHFMobileField fullWidth name="number" label="موبایل"/>

                    <RHFTextField fullWidth name="cityName" label="شهر"/>

                    <RHFTextField fullWidth name="company" label="نام شرکت"/>

                    <RHFDatePicker maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}  fullWidth name="birthDate" label="تاریخ تولد"/>

                    <Stack flexDirection={'row'} spacing={1} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="subtitle1">جنسیت</Typography>
                        <Box>
                            <RHFRadioGroup name="gender" options={[0, 1]} getOptionLabel={['زن', 'مرد']}/>
                        </Box>
                    </Stack>
                </Box>
                <Stack sx={{mt: 3}} flexDirection={'row'} justifyContent={'flex-end'}>
                    <Button
                        size="large"
                        sx={{
                            minHeight: 36,
                            maxHeight: 36,
                            border: 'none',
                            color: theme.palette.text.disabled,
                            ':hover': {
                                color: theme.palette.grey[100] + '!important',
                                backgroundColor: theme.palette.grey[700] + '!important',
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
export default AddPhoneNumberModalParent;
