import { Alert, Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import {addUserLink, editUserLink} from "src/services/users/link";
import BaseStyleModal from "../../../../../components/modal/BaseStyleModal";
import {FormProvider, RHFTextField} from "../../../../../components/hook-form";

const UserLinkModal = ({ state, handleClose, refetch, data }) => {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

    const LinkSchema = Yup.object().shape({
        url: Yup.string().required('آدرس را وارد کنید.'),
    });

    const methods = useForm({
        resolver: yupResolver(LinkSchema),
        defaultValues: data,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;


    const onSubmit = async (values) => {
        let response;
        if (data) {
            response = await editUserLink(values.url, values.id);
        } else {
            response = await addUserLink(values.url);
        }
        if (response.isSuccess) {
            enqueueSnackbar('عملیات با موفقیت انجام شد.');
            handleClose();
            refetch();
        }
    };

    return (
        <BaseStyleModal show={state} handleClose={handleClose} title={data ? 'تغییر آدرس' : 'افزودن آدرس'}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} marginY={3}>
                    <RHFTextField name="url" label="آدرس" />
                </Stack>

                <Stack flexDirection={'row'} justifyContent={'flex-end'}>
                    <Button
                        size="large"
                        sx={{
                            minWidth: 84,
                            minHeight: 36,
                            maxHeight: 36,
                            color: theme.palette.text.disabled,
                            marginRight: 1,
                            border: 'none',
                            ':hover': {
                                color: theme.palette.grey[100] + '!important',
                                backgroundColor: theme.palette.grey[700] + '!important',
                            },
                        }}
                        color={'inherit'}
                        variant="outlined"
                        onClick={handleClose}
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
            </FormProvider>
        </BaseStyleModal>
    );
};

export default UserLinkModal;
