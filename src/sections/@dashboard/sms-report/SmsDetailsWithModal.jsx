import React, {useState} from 'react';
import {
    IconButton,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from '@mui/material';
import {useQuery} from "@tanstack/react-query";
import {OriginEnum, SmsStatusReportEnum} from "../../../utils/enums";
import SmsDetailModal from "./modals/SmsDetailsModal";
import useModal from "../../../hooks/useModal";
import {fDateTimeJalali} from "../../../utils/formatTime";
import Scrollbar from "../../../components/Scrollbar";
import Iconify from "../../../components/Iconify";
import {numberWithCommas} from "src/utils/functions";
import {getSmsById} from "src/services/smsRequestManagement/singleSms";

const SmsDetailsWithModal = ({smsId, text}) => {

    const {data, isLoading, refetch} = useQuery(['BulkSmsList', smsId], () => getSmsById(smsId),
        {
            enabled: false
        }
    );

    const theme = useTheme()
    const {
        isOpen: isMessageOpen,
        openModal: openMessageModal,
        closeModal: closeMessageModal,
        modalData: messageModalData
    } = useModal();

    const handleShowModal = (value) => {
        refetch()
        openMessageModal(value)
    };

    const limitCharacter = (value) => {
        let message = value?.substring(0, 50);
        if (value?.length > 50) {
            message += '...';
        }
        return message;
    };
    const [more, setMore] = useState(false)
    return (
        <Stack justifyContent={'center'} alignItems={'center'} spacing={2}>
            <Typography variant={'enNum'} fontWeight={'medium'} sx={{
                cursor: 'pointer',
                "&:hover": {color: theme.palette.primary.light},
                color: theme.palette.primary.dark
            }}
                        onClick={() => handleShowModal(text)} display={'flex'} justifyContent={'center'}
                        alignItems={'center'}>
                {limitCharacter(text)}
            </Typography>
            {
                isMessageOpen && <SmsDetailModal isLoading={isLoading} title={'متن پیام'} state={isMessageOpen}
                                                 handleClose={closeMessageModal} data={messageModalData} content={
                    <>
                        <Scrollbar>
                            <TableContainer>
                                <Table>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">
                                                خط : {data?.data?.lineNumber}
                                            </TableCell>
                                            <TableCell align="left">
                                                شناسه پیام : {data?.data?.id}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">
                                                قیمت : {numberWithCommas(data?.data?.price)}
                                            </TableCell>
                                            <TableCell align="left">
                                                تعداد : {data?.data?.count}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'}
                                                       alignContent={'center'}>
                                                    شناسه کاربر :
                                                </Stack>

                                            </TableCell>
                                            <TableCell align="left">
                                                گیرنده : {data?.data?.receptor}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{
                                            display: !more && 'none'
                                        }}>
                                            <TableCell align="left">
                                                تاریخ ثبت : {fDateTimeJalali(data?.data?.sendDate)}
                                            </TableCell>
                                            <TableCell align="left">
                                                تاریخ ارسال : {fDateTimeJalali(data?.data?.actualSendDate)}
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            display: !more && 'none'
                                        }}>
                                            <TableCell align="left">
                                                مبدا ارسال : {OriginEnum[data?.data?.origin]}
                                            </TableCell>
                                            <TableCell align="left">
                                                زبان : {data?.data?.isUnicode ? 'فارسی' : 'انگلیسی'}
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            display: !more && 'none'
                                        }}>
                                            <TableCell align="left">
                                                گزارش وضعیت پیامک
                                                : {data?.data?.statusReport}
                                            </TableCell>
                                            <TableCell align="left">
                                                توضیحات گزارش وضعیت
                                                : {data?.data?.statusReportInfo}
                                            </TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">
                                                شناسه مرجع سرویس دهنده
                                                : {data?.data?.providerReferenceId}
                                            </TableCell>
                                            <TableCell align="left">
                                                کد شناسه سرویس دهنده : {data?.data?.providerResponseCode}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{
                                            display: !more && 'none'
                                        }}>
                                            <TableCell align="left">
                                                {' '} ارسال مجدد شده :
                                                {data?.data?.reboundFailure ? 'بله' : 'خیر'}
                                            </TableCell>
                                            <TableCell align="left">
                                                بازگشت هزینه
                                                : {data?.data?.refund ? 'بازگشت داده شده' : 'بازگشت داده نشده'}
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            display: !more && 'none'
                                        }}>
                                            <TableCell align="left">
                                                تعداد تکرار باز ارسال
                                                : {data?.data?.resendTryCount}
                                            </TableCell>
                                            <TableCell align="left">
                                                وضعیت ارسال : {SmsStatusReportEnum[data?.data?.status]}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{
                                            display: !more && 'none'
                                        }}>
                                            <TableCell align="left">
                                                شناسه مرجع کاربر : {data?.data?.clientReferenceId}
                                            </TableCell>
                                            <TableCell align="left">
                                                تعداد تکرار گزارش وضعیت : {data?.data?.statusTryCount}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>


                                </Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{width: '100%'}} align="left">
                                            جزییات
                                        </TableCell>
                                        <TableCell align="left">
                                            <IconButton sx={{color: theme.palette.primary.main, padding: 0}}
                                                        onClick={() => setMore(!more)}>
                                                {
                                                    more ? <Iconify icon={'ic:round-expand-less'}/> :
                                                        <Iconify icon={'ic:round-expand-more'}/>
                                                }
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </TableContainer>
                        </Scrollbar>
                    </>
                }/>
            }
        </Stack>
    );
};

export default SmsDetailsWithModal;
