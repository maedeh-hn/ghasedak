import React, {useEffect, useMemo, useState} from 'react';
import {Box, CircularProgress, Divider, Grid, LinearProgress, Stack, Typography, useTheme} from '@mui/material';
import {FormProvider, RHFRadioGroup, RHFSelect, RHFTextarea} from '../../../components/hook-form';
import SearchAutoComplete from './SearchAutoComplete';
import CustomizedTreeViewSend from './components/contact-group/CustomizedTreeViewSend';
import RHFDateTimePicker from '../../../components/hook-form/RHFDateTimePicker';
import {LoadingButton} from '@mui/lab';
import {GroupContactContextSend} from '../../../pages/dashboard/message/SendFastMessage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';
import {getAllGroup} from 'src/services/contact/group';
import {useFieldArray, useForm} from 'react-hook-form';
import {sendBulkSms} from 'src/services/smsRequestManagement/bulkSms';
import {getPartSize} from 'src/services/baseInfo/provider';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import uuidv4 from "../../../utils/uuidv4";
import CustomMenuItem from "../../../components/CustomMenuItem";
import RHFMultiValueField from "../../../components/hook-form/RHFMultiValueField";
import FormAcceptConfirmModal from "../../../components/modal/FormAcceptConfirmModal";
import useModal from "../../../hooks/useModal";
import moment from "jalali-moment";
import {fDateTimeJalali} from "../../../utils/formatTime";
import Label from "../../../components/Label";
import SuccessNotifModal from "../../../components/modal/SuccessNotifModal";
import useAuth from "../../../hooks/useAuth";
import ErrorNotifModal from "../../../components/modal/ErrorNotifModal";
import CustomCard from "../../../components/CustomCard";
import {getAllGroupSendLines} from "src/services/lines/lines";
import {toPersianNumber} from "src/utils/functions";

const getPersianLang = (message) => new RegExp(/[\u0600-\u06FF\uFB8A-\uFB8B\u067E\u0686\u06AF\u06A9\u06CC]+/g).test(message)

const SendFastSmsForm = () => {
    const {updateUser} = useAuth()
    const [hasSendLineNumber,setHasLineNumber]=useState(false)
    const {
        isOpen: isSendOpen,
        openModal: openSendModal,
        closeModal: closeSendModal,
        modalData: sendModalData
    } = useModal();

    const {
        isOpen: isNotifOpen,
        openModal: openNotifModal,
        closeModal: closeNotifModal,
        modalData: notifModalData
    } = useModal();
    const {
        isOpen: isErrorNotifOpen,
        openModal: openErrorNotifModal,
        closeModal: closeErrorNotifModal,
        modalData: notifErrorModalData
    } = useModal();

    const [smsPartInfo, setSmsPartInfo] = useState({
        messageCount: 0,
        charCount: 0,
        langType: 'فارسی',
    })

    const {isLoading: lineLoading, data: lines} = useQuery(['GroupLineList'], getAllGroupSendLines);
    console.log(lines);
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const {data, isLoading} = useQuery(['contacts'], getAllGroup, {
        cacheTime: 0,
    });

    const smsSchema = Yup.object().shape({
        lineNumber: Yup.string().test({
            name: 'lineNumber',
            test(value, ctx) {
                if (ctx?.parent?.isVoice == 'false' && value === '') {
                    return ctx.createError({message: 'شماره فرستنده را انتخاب کنید.'});
                }
                return true;
            },
        }),
        message: Yup.string().required(''),
        date: Yup.string().required('زمان ارسال را انتخاب کنید.')
    });

    const getSmsPartSize = useMutation({
        mutationFn: (code) => getPartSize(code),
    })

    const defaultValues = useMemo(() => {
        if (!lineLoading&&hasSendLineNumber) {
            getSmsPartSize.mutate(lines?.data[0]?.providerCode)
        }
        return ({
            lineNumber: lines?.data[0]?.number || '',
            message: '',
            groupIds: [],
            receptors: [],
            otherReceptors: [],
            searchReceptors: [],
            dateType: 'now',
            isVoice: 'false',
            date: moment(new Date(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss.sssZ')
        })
    }, [lines])

    const methods = useForm({
        resolver: yupResolver(smsSchema),
        defaultValues: defaultValues,
    });

    const {
        handleSubmit,
        formState: {isSubmitting, errors},
        watch,
        setValue,
        getValues,
        control,
        setFocus,
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
                messageCount: 1,
                charCount: '...',
                langType: langType,
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

    const {append, remove} = useFieldArray({
        control,
        name: 'groupIds',
    });

    const handleAdd = (groupId) => {
        append(groupId);
    };

    const handleRemove = (index) => {
        remove(index);
    };

    const onSubmit = () => {
        openSendModal()
    };

    const onSubmitConfirmed = async (values) => {
        console.log(values);
        closeSendModal()
        values = {
            ...values,
            sendDate: values.dateType == 'now' ? new Date().toJSON() : values.date,
            // receptors: Array.from(
            //     new Set([
            //         ...values.receptors.map((item) => item.receptor),
            //         ...values.otherReceptors.map(item => item.startsWith('0') ? item : '0' + item),
            //         ...values.searchReceptors,
            //     ])
            // ),
            groupIds: values.groupIds.filter((groupId) => !values.receptors.some((rec) => rec.groupId == groupId)),
            isVoice: watch('isVoice') === 'false' ? false : true,
            clientReferenceId: uuidv4(),
        };
        delete values.dateType;
        delete values.otherReceptors;
        delete values.searchReceptors;

        const response = await sendBulkSms(values);
        if (response.isSuccess) {
            openNotifModal('ارسال شما با موفقیت انجام شد.')
            updateUser()
        } else {
            openErrorNotifModal(response.message)
        }
    };
    const MessageOption = ({value}) => (
        <Box
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
        </Box>
    );
    
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container padding={1} rowSpacing={2} columnSpacing={2}>
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
                            }}
                                           name="dateType" options={['now', 'date']}
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
                        فرستنده :
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Stack spacing={2}>

                        {lineLoading ? <LinearProgress/> : (
                            <RHFSelect name="lineNumber" label="شماره فرستنده">
                                {lines?.data?.map((line) => (
                                    <CustomMenuItem key={line.id} value={line.number}>
                                        {toPersianNumber(line.number)}
                                        {line.isPublic && ' - عمومی'}
                                        {line.isService && ' - خدماتی'}
                                    </CustomMenuItem>
                                ))}
                            </RHFSelect>
                        )}
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
                        گیرندگان :
                    </Typography>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Stack spacing={2}>

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
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                >
                    <Typography color={theme.palette.grey[800]} variant="span" component="span" pr={2}>
                        گیرندگان گروهی :
                    </Typography>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={9}
                >
                    <Stack spacing={2}>
                        <SearchAutoComplete/>

                        <CustomCard sx={{
                            mt: 4,
                            height: '450px',
                            p: 4,
                            overflowY: 'auto',
                            maxHeight: 'fit-content',
                            minHeight: 'fit-content'
                        }}>
                            {isLoading ? (
                                <CircularProgress color="primary"/>
                            ) : data?.data?.items?.length > 0 ? (
                                <GroupContactContextSend.Provider value={data?.data?.items ?? []}>
                                    <CustomizedTreeViewSend handleAdd={handleAdd} handleRemove={handleRemove}/>
                                </GroupContactContextSend.Provider>
                            ) : (
                                <Box>گروه مخاطب وجود ندارد</Box>
                            )}
                        </CustomCard>

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
                                mt: 1, '& fieldset': {
                                    borderBottomRightRadius: 'unset', borderBottomLeftRadius: 'unset',
                                },
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
                                    : {toPersianNumber(smsPartInfo.messageCount)}</Typography>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography fontSize={{md: '14px', sx: '10px'}} variant="h6">نوع پیام :
                                    <Label color={'info'}>
                                        {toPersianNumber(smsPartInfo.langType)}
                                    </Label>
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography fontSize={{md: '14px', sx: '10px'}} variant="h6">تعداد
                                    کاراکتر باقیمانده
                                    : {toPersianNumber(smsPartInfo.charCount)}
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
                    <Box sx={{display: 'flex', justifyContent: 'end'}}>
                        <LoadingButton
                            sx={{minHeight: 36, maxHeight: 36, color: 'white'}}
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            ارسال پیامک
                        </LoadingButton>
                    </Box>
                    <FormAcceptConfirmModal state={isSendOpen} handleClose={closeSendModal}
                                            onConfirm={onSubmitConfirmed}
                                            title={'ارسال پیام'}
                                            description={`آیا از ارسال پیام در تاریخ ${getValues('dateType') == 'now' ? fDateTimeJalali(moment(new Date(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss.sssZ')) : fDateTimeJalali(getValues('date'))} اطمینان دارید؟`}
                    />
                    <SuccessNotifModal state={isNotifOpen} handleClose={closeNotifModal}
                                       description={notifModalData}/>
                    <ErrorNotifModal state={isErrorNotifOpen} handleClose={closeErrorNotifModal}
                                     description={notifErrorModalData}/>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default SendFastSmsForm;
