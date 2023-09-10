import React from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
import BaseStyleModal from '../../../../../../components/modal/BaseStyleModal';
import {FormProvider} from '../../../../../../components/hook-form';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';
import {useParams} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import {RHFExcelFile} from '../../../../../../components/hook-form/RHFFile';
import {useCallback} from 'react';
import {bytesToSize} from "src/utils/functions";
import {addContactExcel} from "src/services/contact/group-number";
import myFile from '../../../../../../assets/contacts.xlsx';


const handleDownload = async () => {
    const response = await fetch(myFile);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const AddExcelModal = ({state, handleClose, refetch}) => {
    const {enqueueSnackbar} = useSnackbar();

    const {id: groupId} = useParams();

    const theme = useTheme();

    const GroupNameSchema = Yup.object().shape({
        // name: Yup.string().required('مخاطب را وارد کنید.'),
    });

    const methods = useForm({
        resolver: yupResolver(GroupNameSchema),
    });

    const {
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
        setValue,
        getValues,
        watch
    } = methods;

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append('File', values.File);
        const response = await addContactExcel(groupId, formData);
        if (response.isSuccess) {
            refetch();
            enqueueSnackbar(`مخاطب با موفقیت اضافه شد.`);
            handleClose();
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setValue(
                    'File',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <>
            <BaseStyleModal lgWidth={'900px'} title={'افزودن مخاطب از اکسل'} handleClose={handleClose} show={state}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Box color={theme.palette.grey[500]}>
                        {
                            watch('File') ? (

                                <>
                                    <Box sx={{backgroundColor: '#edecec', justifyContent: 'center', display: 'flex'}}>

                                        <Box sx={{
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            py: 2,
                                            px: 5,
                                            flexDirection: 'column'
                                        }}>
                                            <Typography sx={{color: theme.palette.primary.main}}>نام فایل
                                                : {getValues('File')?.name}</Typography>
                                            <Typography sx={{color: theme.palette.primary.main}}>حجم فایل
                                                : {bytesToSize(getValues('File')?.size)}</Typography>

                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{borderRadius: 2, justifyContent: 'center', display: 'flex', marginTop: 1}}>
                                        <Button onClick={() => reset()}>حذف</Button>
                                    </Box>
                                </>

                            ) : <RHFExcelFile accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                              name="File" type={'file'} onDrop={handleDrop}/>
                        }
                        <Box sx={{mt: 2}}>
                            <Typography>برای وارد کردن اطلاعات از فایل excel به نکات زیر توجه فرمایید:</Typography>
                        </Box>
                        <Box sx={{mt: 2, ml: 3}}>
                            <Box sx={{display: 'flex', gap: 1}}>

                                <Typography>فرمت فایل باید office 2007 به بالا یا پسوند xlsx باشد.</Typography>
                                <a href="#" onClick={handleDownload}>فایل نمونه</a>
                            </Box>
                            <Box sx={{display: 'flex', gap: 1, mt: 1}}>
                                <Typography>ردیف اول از فایل شما اختصاص دارد به نام داده ها</Typography>

                            </Box>
                            <Box sx={{display: 'flex', gap: 1, mt: 1}}>
                                <Typography>
                                    نام داده باید به ترتیب ستون اول شماره موبایل,ستون دوم نام,ستون سوم نام خانوادگی,ستون
                                    چهارم ایمیل,ستون
                                    پنجم شهر,ستون ششم شرکت,ستون هفتم توضیحات,ستون هشتم جنسیت(آقا/خانم), ستون نهم تاریخ
                                    تولد
                                    , ستون دهم وضعیت
                                    ارسال تبریک تولد (1 غیرفعال , 2 فعال)
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Stack sx={{mt: 3}} flexDirection={'row'} justifyContent={'flex-end'}>
                        <Button
                            size="large"
                            sx={{
                                minHeight: 36,
                                maxHeight: 36,
                                minWidth: 84,
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
                            onClick={handleClose}
                        >
                            انصراف
                        </Button>
                        <LoadingButton
                            sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            آپلود فایل
                        </LoadingButton>
                    </Stack>
                </FormProvider>
            </BaseStyleModal>
        </>
    );
};

export default AddExcelModal;
