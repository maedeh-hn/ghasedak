import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
// form
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
// @mui
import {Stack, Card, InputAdornment, IconButton, Box} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import {FormProvider, RHFTextField} from '../../../../components/hook-form';
import Iconify from '../../../../components/Iconify';
import {useState} from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import {UserChangePassword} from 'src/services/users/user';
import CustomCard from "../../../../components/CustomCard";

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
    const {enqueueSnackbar} = useSnackbar();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const ChangePassWordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('رمز عبور فعلی را وارد کنید!'),
        newPassword: Yup.string()
            .min(6, 'رمز عبور نمیتواند کمتر از 6 کاراکتر باشد.')
            .required('رمز عبور جدید را وارد کنید.'),
    });

    const defaultValues = {
        oldPassword: '',
        newPassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(ChangePassWordSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        const response = await UserChangePassword({
            password: values.oldPassword,
            newPassword: values.newPassword,
        });
        if (response.isSuccess) {
            enqueueSnackbar('رمز عبور شما با موفقیت تغییر کرد.');
            reset();
        }
    };

    const lgDown = useResponsive('down', 'lg');

    return (
        <CustomCard sx={{p: 3}}>
            <Box sx={{ml: {sx: 0}}}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={'row'} spacing={2} width={'100%'}>
                        <RHFTextField
                            fullWidth={true}
                            name="oldPassword"
                            label="رمزعبور فعلی"
                            type={showOldPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                                            <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <RHFTextField
                            fullWidth={true}
                            name="newPassword"
                            label="رمز عبور جدید"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <LoadingButton sx={{minWidth: 150}} type="submit" variant="contained" loading={isSubmitting}>
                            ذخیره تغییرات
                        </LoadingButton>

                    </Stack>
                </FormProvider>
            </Box>
        </CustomCard>
    );
}
