import {Alert, Box, Card, Grid, Typography, useTheme} from '@mui/material';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import useSettings from '../../../hooks/useSettings';
import CustomContainer from '../../../components/CustomContainer';
import Page from '../../../components/Page';
import {PATH_DASHBOARD} from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {useNavigate, useParams} from 'react-router';
import ReactApexChart from 'react-apexcharts';
import {BulkSmsById} from "src/services/smsRequestManagement/bulkSms";
import {ReceptorStatusEnum, SmsStatusReportEnum} from '../../../utils/enums';
import LoadingWidget from '../../../components/LoadingWidget';
import CustomCard from "../../../components/CustomCard";


function ChartInfo() {
    const theme = useTheme();

    const {reportId, type} = useParams();
    const navigate = useNavigate();

    const {data: chartData, isLoading: chartLoading} = useQuery(['BulkSmsReportChart', {}], () =>
        BulkSmsById({
            id: reportId,
            isPanel: type === 'panel'
        })
    );


    const {themeStretch} = useSettings();
    return (
        <Page title={'ارسال پیام'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {
                        name: 'گزارشات ارسال گروهی',
                        href: PATH_DASHBOARD.smsReport.groupSms,
                    },
                    {name: `گزارش ارسال شماره ${reportId}`},
                ]}
            />

            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <Typography sx={{mb: 2, ml: 2}} variant={'h4'} fontWeight={'bold'}>
                    نمودار گزارش ارسال
                </Typography>

                <Grid container>
                    <Grid sx={{display: 'flex', justifyContent: 'center'}} xs={12} md={12}>

                        <CustomCard style={{
                            width: '100%'
                        }}>
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <Alert severity={'info'}>
                                    با کلیک بر روی نمودار میتوانید جزییات را مشاهده کنید
                                </Alert>
                            </Box>


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
                    </Grid>
                </Grid>
            </CustomContainer>
        </Page>
    );
}

export default ChartInfo;
