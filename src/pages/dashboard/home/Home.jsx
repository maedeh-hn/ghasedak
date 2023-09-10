import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import React, {useEffect, useState} from 'react';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Box, Grid, Card, Stack, InputAdornment, IconButton, Button, Typography, Alert} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import {FormProvider, RHFTextField} from '../../../components/hook-form';
import {useQuery} from '@tanstack/react-query';
import {getUser, UpdateUserProfile} from 'src/services/users/user';
import LoadingWidget from '../../../components/LoadingWidget';

// ----------------------------------------------------------------------

import Gravatar from 'react-gravatar';
import ChangePhoneModal from '../../../components/modal/ChangePhoneModal';
import RHFMobileField from "../../../components/hook-form/RHFMobileField";
import CustomCard from "../../../components/CustomCard";
import Iconify from "../../../components/Iconify";
import {useTheme} from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {SmsStatusReportEnum} from "../../../utils/enums";
import {BulkSmsById} from "../../../services/smsRequestManagement/bulkSms";

export default function Home() {
    const theme = useTheme()
    const {isLoading, data} = useQuery(['profile'], getUser);
    const { panelType} = useAuth();
    const [changePhoneModal, setChangePhoneModal] = useState(false);

console.log(panelType);
    const {enqueueSnackbar} = useSnackbar();

    const {user, changeUser} = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        address: Yup.string().nullable(),
        email: Yup.string().email('ایمیل معتبری را وارد کنید.').nullable(),
        fullName: Yup.string().nullable(),
    });
    const {data: chartData, isLoading: chartLoading} = useQuery(['BulkSmsReportChart', {}], () =>
        BulkSmsById({
            id: reportId,
            isPanel: type === 'panel'
        })
    );
    useEffect(() => {
        if (data) {
            try {
                Object.keys(data?.data).map((item) => setValue(item, data?.data[item]));
            } catch (e) {
            }
        }
    }, [data]);

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
    });

    const {
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (values) => {
        const response = await UpdateUserProfile(values);
        if (response.isSuccess) {
            const {data: user} = response;
            await changeUser(user);
            enqueueSnackbar('تغییرات با موفقیت اعمال شد.');
        } else {
            enqueueSnackbar(response.message, {variant: 'error'});
        }
    };
    return isLoading ? (
        <LoadingWidget/>
    ) : (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                <Box sx={{display: 'flex', p: 4, gap: 2, justifyContent: 'space-around'}} xs={12} md={4}>

                    <CustomCard sx={{textAlign: 'center'}}>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{backgroundColor: theme.palette.primary.lighter, p: 1, borderRadius: 1}}>
                                <Iconify icon={'radix-icons:person'} width={50} height={50}/>
                            </Box>
                            <Typography sx={{p: 1}}>
                                مخاطبین
                            </Typography>
                            <Typography sx={{p: 1, mt: 6}}>
                                125458266543
                            </Typography>
                        </Box>
                    </CustomCard>
                    <CustomCard sx={{textAlign: 'center', display: 'flex'}}>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{backgroundColor: theme.palette.primary.lighter, p: 1, borderRadius: 1}}>
                                <Iconify icon={'teenyicons:message-outline'} width={50} height={50}/>
                            </Box>
                            <Typography sx={{p: 1}}>
                                تیکت فعال
                            </Typography>
                            <Typography sx={{p: 1, mt: 6}}>
                                125458266543
                            </Typography>
                        </Box>
                    </CustomCard>
                    <CustomCard sx={{ textAlign: 'center'}}>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{backgroundColor: theme.palette.primary.lighter, p: 1, borderRadius: 1}}>
                                <Iconify icon={'ic:baseline-content-copy'} width={50} height={50}/>
                            </Box>
                            <Typography sx={{p: 1}}>
                                قالب فعال
                            </Typography>
                            <Typography sx={{p: 1, mt: 6}}>
                                125458266543
                            </Typography>
                        </Box>
                    </CustomCard>
                    <CustomCard sx={{ textAlign: 'center'}}>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{backgroundColor: theme.palette.primary.lighter, p: 1, borderRadius: 1}}>
                                <Iconify icon={'material-symbols:view-agenda-outline'} width={50} height={50}/>
                            </Box>
                            <Typography sx={{p: 1}}>
                                apikey
                            </Typography>
                            <Typography sx={{p: 1, mt: 6}}>
                                125458266543
                            </Typography>
                        </Box>
                    </CustomCard>

                </Box>
                <Box sx={{display: 'flex', p: 4, justifyContent: 'space-around'}} xs={12} md={4}>
                <CustomCard style={{
                    width:'100%'
                }}>
                        {chartLoading ? (
                            <LoadingWidget/>
                        ) : (
                            <ReactApexChart
                                type="bar"
                                series={[
                                    {
                                        data: chartData?.data?.map((item) => {
                                            return item.count;
                                        }),
                                    },
                                ]}
                                options={{
                                    tooltip: {
                                        y: {
                                            formatter: function (val) {
                                                return val;
                                            },
                                            title: {
                                                formatter: function (seriesName) {
                                                    return '';
                                                },
                                            },
                                        },
                                    },
                                    fill: {colors: [theme.palette.primary.light]},
                                    series: [
                                        {
                                            data: [1200, 1380],
                                        },
                                    ],
                                    chart: {
                                        fontFamily: 'IRANSans, Public Sans, sans-serif',
                                        events: {
                                            dataPointMouseEnter: function (event) {
                                                event.target.style.cursor = "pointer"
                                            },
                                            click: (event, chartContext, config) => {
                                                navigate(PATH_DASHBOARD.smsReport.groupSendChartReport(reportId, chartData?.data[config.dataPointIndex].status, type));
                                            },
                                        },
                                        toolbar: {show: false},
                                        type: 'bar',
                                        height: 350,
                                    },
                                    plotOptions: {
                                        bar: {
                                            borderRadius: 4,
                                            horizontal: false,
                                        },
                                    },
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    xaxis: {
                                        categories: chartData?.data?.map((item) => SmsStatusReportEnum[item.status]),
                                        labels: {rotate: 45, style: {fontSize: 10}},
                                    },
                                }}
                                width={'100%'}
                                height={450}
                            />
                        )}
                </CustomCard>
                </Box>
            </FormProvider>
        </>
    );
}
