import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Box, Divider, Grid, LinearProgress, Stack, Typography, useTheme} from '@mui/material';
import {FormProvider, RHFRadioGroup, RHFSelect, RHFTextarea} from '../../../components/hook-form';
import RHFDateTimePicker from '../../../components/hook-form/RHFDateTimePicker';
import {LoadingButton} from '@mui/lab';
import {useSnackbar} from 'notistack';
import {useForm} from 'react-hook-form';
import {sendFastSms} from 'src/services/smsRequestManagement/singleSms';
import {getPartSize} from 'src/services/baseInfo/provider';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useSelector} from 'react-redux';
import uuidv4 from '../../../utils/uuidv4';
import Label from "../../../components/Label";
import RHFMultiValueField from "../../../components/hook-form/RHFMultiValueField";
import CustomMenuItem from "../../../components/CustomMenuItem";
import moment from "jalali-moment";
import useModal from "../../../hooks/useModal";
import FormAcceptConfirmModal from "../../../components/modal/FormAcceptConfirmModal";
import {fDateTimeJalali} from "../../../utils/formatTime";
import SuccessNotifModal from "../../../components/modal/SuccessNotifModal";
import useAuth from "../../../hooks/useAuth";
import ErrorNotifModal from "../../../components/modal/ErrorNotifModal";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAllLines} from "src/services/lines/lines";


const getPersianLang = (message) => new RegExp(/[\u0600-\u06FF\uFB8A-\uFB8B\u067E\u0686\u06AF\u06A9\u06CC]+/g).test(message)

const SendFastSmsForm = () => {
    const {updateUser} = useAuth()
const [hasSendLineNumber,setHasLineNumber]=useState(false)
    const {
        isOpen: isSendOpen, openModal: openSendModal, closeModal: closeSendModal, modalData: sendModalData
    } = useModal();
    const {
        isOpen: isSuccessNotifOpen,
        openModal: openSuccessNotifModal,
        closeModal: closeSuccessNotifModal,
        modalData: notifSuccessModalData
    } = useModal();
    const {
        isOpen: isErrorNotifOpen,
        openModal: openErrorNotifModal,
        closeModal: closeErrorNotifModal,
        modalData: notifErrorModalData
    } = useModal();
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const smsSchema = Yup.object().shape({
        lineNumber: Yup.string().test({
            name: 'lineNumber', test(value, ctx) {
                if (value === '') {
                    return ctx.createError({message: 'شماره فرستنده را انتخاب کنید.'});
                }
                return true;
            },
        }), message: Yup.string().required(''), receptors: Yup.array()
    });

    const [smsPartInfo, setSmsPartInfo] = useState({
        messageCount: 0, charCount: 0, langType: 'فارسی',
    })


    const {isLoading: lineLoading, data: lines} = useQuery(['LineList'], () => getAllLines());
    console.log(lines);

    const getSmsPartSize = useMutation({
        mutationFn: (code) => getPartSize(code),
    })


    const defaultValues = useMemo(() => {
        if (!lineLoading&&hasSendLineNumber) {
            getSmsPartSize.mutate(lines?.data[0]?.providerCode)
        }
        return {
            lineNumber: lines?.data[0]?.number || '',
            message: '',
            receptors: [],
            dateType: 'now',
            date: moment(new Date(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss.sssZ'),
            isVoice: 'false',
        };
    }, [lineLoading]);

    const methods = useForm({
        mode: 'all', resolver: yupResolver(smsSchema), defaultValues: {
            ...defaultValues
        },
    });

    const {
        handleSubmit, formState: {isSubmitting}, watch, setValue, getValues, setFocus,
    } = methods;

    useEffect(() => {
       
        const line = lines?.data.find(({number}) => number == getValues('lineNumber'))
        line && getSmsPartSize.mutate(line.providerCode)
        if(line?.providerCode){

            setHasLineNumber(true)
        }
    }, [watch('lineNumber')])

    useEffect(() => {
        const langType = getPersianLang(getValues('message')) ? 'فارسی' : 'انگلیسی'
        if (getSmsPartSize.isLoading) {
            setSmsPartInfo({
                messageCount: 1, charCount: '...', langType: langType,
            })
        } else {
            let isPageOne = (Math.ceil((getValues('message')?.length) / getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage1Limit' : 'englishPage1Limit']) || 1) === 1
            const messageCount = (() => {
                if (isPageOne) {
                    return 1
                } else {
                    let inputTextCount = parseInt(getValues('message')?.length) - getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage1Limit' : 'englishPage1Limit']
                    return 1 + Math.ceil(inputTextCount / getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage2Limit' : 'englishPage2Limit'])
                }
            })()
            const charCount = (() => {
                if (isPageOne) {
                    return getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage1Limit' : 'englishPage1Limit'] - getValues('message')?.length
                } else {
                    let inputTextCount = parseInt(getValues('message')?.length) - getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage1Limit' : 'englishPage1Limit']
                    let remainingCharacter = (inputTextCount % getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage2Limit' : 'englishPage2Limit'])
                    return getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage2Limit' : 'englishPage2Limit'] - (remainingCharacter === 0 ? getSmsPartSize?.data?.data[getPersianLang(getValues('message')) ? 'unicodePage2Limit' : 'englishPage2Limit'] : remainingCharacter)
                }
            })()
            setSmsPartInfo({
                messageCount: getSmsPartSize.isLoading ? 1 : messageCount,
                charCount: getSmsPartSize.isLoading ? '...' : charCount,
                langType: langType,
            })
        }
    }, [watch('message'), getSmsPartSize?.data])

    const onSubmit = (values) => {
        if (values.receptors.length < 1) {
            enqueueSnackbar('گیرندگان را وارد کنید.', {variant: 'error'})
        } else {
            openSendModal()
        }
    };

    const onSubmitConfirmed = async (values) => {
        closeSendModal()
        values = {
            ...values,
            sendDate: values.dateType == 'now' ? moment(new Date(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss.sssZ') : values.date,
            receptors: values.receptors.map(item => item.startsWith('0') ? item : '0' + item),
            isVoice: false,
            clientReferenceId: uuidv4(),
        };
        delete values.dateType;
        delete values.otherReceptors;
        delete values.searchReceptors;

        const response = await sendFastSms(values);
        if (response.isSuccess) {
            openSuccessNotifModal('ارسال شما با موفقیت انجام شد.')
            updateUser()
        } else {
            openErrorNotifModal(response.message)
        }
    };
    const MessageOption = ({value}) => (<Box
        sx={{
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '4px',
            justifyContent: 'center',
            textAlign: 'center',
            verticalAlign: 'middle',
        }}
        onClick={() => {
            setValue('message', getValues('message') + value);
            setFocus('message');
        }}
    >
        <Typography sx={{height: '10px'}}>{value}</Typography>
    </Box>);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Grid container padding={1} rowSpacing={2} columnSpacing={2}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    marginBottom={4}
                >
                    <Alert severity={'info'}>توجه : شما در ارسال سریع نمیتوانید بیش از ۱۰ پیام ارسال کنید.</Alert>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                >
                    <Typography color={theme.palette.grey[800]} variant="span" component="span" pr={2}>
                        تاریخ ارسال :
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Stack direction={'row'}>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <RHFRadioGroup sx={{
                                flexGrow: 1,
                                height: '56px',
                            }} name="dateType" options={['now', 'date']}
                                           getOptionLabel={['هم اکنون', 'انتخاب تاریخ']}/>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <RHFDateTimePicker fullWidth name="date" label="انتخاب تاریخ"
                                               disabled={watch('dateType') !== 'date'}/>
                        </Grid>
                    </Stack>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                >
                    <Divider/>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                >
                    <Typography color={theme.palette.grey[800]} variant="span" component="span" pr={2}>
                        شماره فرستنده :
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Stack spacing={1}>
                        {lineLoading ? <LinearProgress/> : (<RHFSelect name="lineNumber" label="شماره فرستنده">
                            {lines?.data?.map((line) => (<CustomMenuItem key={line.id} value={line.number}>
                                <Typography>
                                    {line.number}
                                    {line.isPublic && ' - عمومی'}
                                    {line.isService && ' - خدماتی'}
                                </Typography>
                            </CustomMenuItem>))}
                        </RHFSelect>)}

                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                >
                    <Divider/>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                >
                    <Typography color={theme.palette.grey[900]} variant="span" component="span" pr={2}>
                        گیرندان :
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Box>
                        <RHFMultiValueField
                            sx={{
                                mt: 1, '& fieldset': {
                                    borderBottomRightRadius: 'unset', borderBottomLeftRadius: 'unset',
                                },
                            }}
                            fullWidth
                            name="receptors" label="گیرندگان"
                            regex={/^(0)?9\d{9}$/}
                            rows={1}
                        />
                        <Box
                            sx={{
                                display: 'flex', // justifyContent: 'space-between',
                                alignItems: 'start',
                                width: '100%',
                                height: '40px',
                                backgroundColor: theme.palette.background.customBgPrimary,
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                                p: 1,
                            }}
                        >
                            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                <Typography fontSize={{md: '14px', sx: '10px'}} variant="h6">گیرندگان را با
                                    Enter از
                                    هم جدا کنید.</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                >
                    <Divider/>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={3}
                >
                    <Typography color={theme.palette.grey[800]} variant="span" component="span" pr={2}>
                        متن پیام :
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Stack>
                        <RHFTextarea
                            sx={{
                                mt: 1,
                                '& fieldset': {
                                    borderBottomRightRadius: 'unset',
                                    borderBottomLeftRadius: 'unset',
                                },

                            }}
                            inputProps={{
                                style: {
                                    fontFeatureSettings: 'initial',
                                    MozFontFeatureSettings: 'initial',
                                    WebkitFontFeatureSettings: 'initial',
                                }
                            }}
                            fullWidth
                            rows={watch('isVoice') === 'false' ? 6 : 8}
                            label="متن پیام"
                            variant="outlined"
                            name={'message'}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '40px',
                                backgroundColor: theme.palette.background.customBgPrimary,
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                                p: 1,
                            }}
                        >
                            {/*{getValues('isVoice') == 'false' ? (*/}
                            {/*    <>*/}
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography fontSize={{md: '14px', sx: '10px'}} variant="h6">تعداد پیام
                                    : {smsPartInfo.messageCount}</Typography>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography fontSize={{md: '14px', sx: '10px'}} variant="h6">نوع پیام :
                                    <Label color={'info'}>
                                        {smsPartInfo.langType}
                                    </Label>
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography fontSize={{md: '14px', sx: '10px'}} variant="h6">تعداد
                                    کاراکتر باقیمانده
                                    : {smsPartInfo.charCount}
                                </Typography>
                            </Box>
                            {/*</>*/}
                            {/*) : (*/}
                            {/*    <Box sx={{display: 'flex', gap: 4, alignItems: 'center'}}>*/}
                            {/*        <MessageOption value={'َ'}/>*/}
                            {/*        <MessageOption value={'ِ'}/>*/}
                            {/*        <MessageOption value={'ُ'}/>*/}
                            {/*        <MessageOption value={'ْ'}/>*/}
                            {/*        <MessageOption value={'ّ'}/>*/}
                            {/*    </Box>*/}
                            {/*)}*/}
                        </Box>
                    </Stack>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={12}
                >
                    <Box sx={{display: 'flex', justifyContent: 'end', pr: 1}}>
                        <LoadingButton
                            sx={{minHeight: 36, maxHeight: 36, color: 'white'}}
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            ارسال پیامک
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>


            <FormAcceptConfirmModal state={isSendOpen} handleClose={closeSendModal} onConfirm={onSubmitConfirmed}
                                    title={'ارسال پیام'}
                                    description={`آیا از ارسال پیام در تاریخ ${getValues('dateType') == 'now' ? fDateTimeJalali(moment(new Date(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss.sssZ')) : fDateTimeJalali(getValues('date'))} اطمینان دارید؟`}
            />
            <SuccessNotifModal state={isSuccessNotifOpen} handleClose={closeSuccessNotifModal}
                               description={notifSuccessModalData}/>
            <ErrorNotifModal state={isErrorNotifOpen} handleClose={closeErrorNotifModal}
                             description={notifErrorModalData}/>
        </FormProvider>);
};
export default SendFastSmsForm;
