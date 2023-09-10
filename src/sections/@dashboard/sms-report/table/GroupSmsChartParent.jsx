import {Alert, Box, Card, Container, Grid} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import React from "react";
import {useQuery} from "@tanstack/react-query";
// import {BulkSmsById} from "src/services/smsRequestManagement/sms";
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@emotion/react";
import useSettings from "../../../../hooks/useSettings";
import { ReceptorStatusEnum } from "../../../../utils/enums";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import LoadingWidget from "../../../../components/LoadingWidget";
import useTableData from "../../../../hooks/useTableData";
import { sort_by_number_value } from "../../../../utils/functions";
import { BulkSmsByIdParent } from "../../../../services/smsRequestManagement/sms";
// import useSettings from "../../../hooks/useSettings";
// import {ReceptorStatusEnum} from "../../../utils/enums";
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import LoadingWidget from "../../../components/LoadingWidget";
// import useTableData from "../../../hooks/useTableData";
// import {sort_by_number_value} from "../../../utils/functions";

const GroupSmsChartParent = () => {
    const theme = useTheme()
    const {username, userId, reportId, type} = useParams()

    const navigate = useNavigate()
    const {data: chartData, isLoading: chartLoading} = useQuery(['BulkSmsReportChartParent', reportId], () =>
    BulkSmsByIdParent(reportId, type )
    );
   
    
    const [chartDataList, _] = useTableData(chartData?.data)
   
console.log(chartData);
    const {themeStretch} = useSettings();
    return (
        <Container maxWidth={themeStretch ? false : 'lg'}>
            <Grid container>
                <Grid sx={{display: 'flex', justifyContent: 'center'}} xs={12} md={12}>
                    <Card
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <Alert severity={'info'}> با کلیک بر روی نمودار میتوانید جزییات را مشاهده کنید.</Alert>
                        </Box>
                        {chartLoading ? (
                            <LoadingWidget/>
                        ) : (
                            <ReactApexChart
                                type="bar"
                                series={[
                                    {
                                        data: sort_by_number_value(chartDataList, 'status').map((item) => item.count),
                                    },
                                ]}
                                options={{
                                    tooltip: {
                                        y: {
                                            formatter (val) {
                                                return val;
                                            },
                                            title: {
                                                formatter (seriesName) {
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
                                            click: (event, chartContext, config) => {
                                                userId ? navigate(PATH_DASHBOARD.userManagement.groupSendChartReport(username, userId, reportId, chartData?.data[config.dataPointIndex].status,type)) :
                                                    navigate(PATH_DASHBOARD.report.groupSendChartReport(reportId, chartData?.data[config.dataPointIndex].status, type));
                                            },
                                            dataPointMouseEnter (event) {
                                                event.target.style.cursor = "pointer"
                                            },
                                        },
                                        // toolbar: {show: false},
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
                                        enabled: true,
                                        formatter (val, opt) {
                                            return val;
                                        },
                                        distributed: true
                                    },
                                    xaxis: {
                                        categories: sort_by_number_value(chartDataList, 'status').map((item) => `${ReceptorStatusEnum[item.status]} : ${item.count}`  || 'نامشخص'),
                                        labels: {rotate: 45, style: {fontSize: 10}, },
                                        sorted: true,

                                    },
                                }}
                                width={'100%'}
                                height={450}
                            />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GroupSmsChartParent