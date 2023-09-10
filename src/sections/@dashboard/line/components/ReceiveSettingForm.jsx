import React from 'react';
import * as Yup from 'yup';
import { useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Stack, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {editLineSettings} from 'src/services/lines/lineSettings';
import {useSnackbar} from 'notistack';
import {useTheme} from '@mui/material/styles';
import {Box} from '@mui/system';
import { FormProvider ,RHFRadioGroup,RHFSwitch,RHFTextField,} from '../../../../components/hook-form';
// import {
//     FormProvider,
//     RHFRadioGroup,
//     RHFSwitch,
//     RHFTextField,
// } from '../../../../../../components/hook-form';

const ReceiveSettingForm = ({item, close}) => {
        const theme = useTheme();
        const {enqueueSnackbar} = useSnackbar();
        const ReceiveSettingsSchema = Yup.object().shape({
            urlForwardActionType: Yup.number(),
            isUrlForwardOn: Yup.boolean(),
            urlForwardAddress: Yup.string().test({
                    name: 'urlForwardAddress',
                    test: (value, ctx) => {
                        console.log(ctx.parent.isUrlForwardOn)
                        if (ctx.parent.isUrlForwardOn && value.length <= 0) {
                            return ctx.createError({message: 'آدرس فراخوانی را وارد کنید'})
                        }
                        return true
                    }
                }
            )
        });

        const methods = useForm({
            resolver: yupResolver(ReceiveSettingsSchema),
            defaultValues: {
                ...item,
                urlForwardAddress: item?.urlForwardAddress ?? '',
            },
        });

        const {
            handleSubmit,
            formState: {isSubmitting},
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
                <Box sx={{my: 3}}>
                    <RHFSwitch name="isUrlForwardOn" label="فعال سازی"/>
                </Box>
                <RHFTextField disabled={!watch('isUrlForwardOn')} sx={{mb: 1}} name="urlForwardAddress"
                              label="آدرس فراخوانی" fullWidth/>
                <Typography sx={{color: theme.palette.grey[500]}} variant="span" component="span">
                    مثال : http://site.com/receive
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
                    <Typography sx={{marginTop: 2}} variant="span" component="span" pr={2}>
                        نوع متد فراخوانی
                    </Typography>
                    <Box sx={{mt: 1}}>
                        <RHFRadioGroup sx={{mt: 2}} name="urlForwardActionType" options={[0, 1]}
                                       getOptionLabel={['Get', 'Post']}/>
                    </Box>
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
        );
    }
;

export default ReceiveSettingForm;
