import React, {useState} from 'react';
import {
    Box,
    Grid,
    Stack,
    Table,
    TableBody,
    TableContainer,
    Typography,
    useTheme,
} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../components/table';
import TableLoading from '../../../../components/table/TableLoading';
import PanelPriceTableRow from './PanelPriceTableRow';
import {OperatorTypeEnum, ProviderNameEnum} from '../../../../utils/enums';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import {useForm} from 'react-hook-form';
import {FormProvider, RHFSelect} from '../../../../components/hook-form';
import RHFNumberField from '../../../../components/hook-form/RHFNumberField';
import {numberWithCommas} from 'src/utils/functions';
import ReactApexChart from "react-apexcharts";
import useTableData from "../../../../hooks/useTableData";
import CustomMenuItem from "../../../../components/CustomMenuItem";
import CustomCard from "../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'sms', label: 'اپراتور پیامکی', align: 'left'},
    {id: 'mobile', label: 'اپراتور موبایل', align: 'left'},
    {id: 'faSms', label: 'تعرفه هر پیامک فارسی'},
    {id: 'faSms', label: 'تعداد پیامک های قابل ارسال فارسی'},
    {id: 'enSms', label: 'تعرفه هر پیامک انگلیسی'},
    {id: 'enSms', label: 'تعداد پیامک های قابل ارسال انگلیسی'},
];

function average(object) {
    const total = object.reduce((sum, item) => sum + item.faPrice, 0);
    const average = total / object.length;
    return Math.trunc(average)
}

const PanelPriceTable = ({data, isLoading}) => {
    const [tableData, setTableData] = useTableData(data);
    const [calcRes, setCalcRes] = useState({
        one: 0,
        group: 0,
    });

    let providers = new Set();
    let operators = new Set();
    tableData?.map((item) => {
        providers.add(item.providerCode);
        operators.add(item.operatorCode);
    });

    const methods = useForm({
        defaultValues: {
            lang: 'fa'
        }
    });

    const {getValues} = methods;
    const theme = useTheme();

    return (
        <Stack spacing={2}>
            <CustomCard>
                <Grid container paddingY={2} gap={5}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{
                            paddingTop: 2
                        }}>
                            <FormProvider methods={methods}>
                                <Stack spacing={2}>
                                    <RHFSelect size={'small'} name={'lang'} label={'زبان پیام'}>
                                        <CustomMenuItem value={'fa'}>فارسی</CustomMenuItem>
                                        <CustomMenuItem value={'en'}>انگلیسی</CustomMenuItem>
                                    </RHFSelect>
                                    <RHFSelect size={'small'} defaultValue={-1} name={'providerCode'} label={'اپراتور'}>
                                        <CustomMenuItem value={-1}>انتخاب کنید</CustomMenuItem>
                                        {Array.from(providers).map((option, index) => {
                                            return <CustomMenuItem
                                                value={option}>{ProviderNameEnum[option]}</CustomMenuItem>;
                                        })}
                                    </RHFSelect>

                                    <RHFSelect size={'small'} defaultValue={-1} name={'operatorCode'}
                                               label={'اپراتور موبایل'}>
                                        <CustomMenuItem value={-1}>انتخاب کنید</CustomMenuItem>
                                        {Array.from(operators).map((option, index) => {
                                            return <CustomMenuItem
                                                value={option}>{OperatorTypeEnum[option]}</CustomMenuItem>;
                                        })}
                                    </RHFSelect>
                                    <RHFNumberField size={'small'} name={'count'} label={'تعداد پیامک'}/>

                                    <TableToolbarActionButton
                                        tooltip={'محاسبه'}
                                        title={'محاسبه'}
                                        onClick={() => {
                                            let item = tableData
                                                .filter((item) => item.providerCode == getValues('providerCode'))
                                                .find((item) => item.operatorCode == getValues('operatorCode'));
                                            setCalcRes({
                                                one: getValues('lang') == 'fa' ? item.faPrice : item.enPrice,
                                                group: (parseInt(getValues('count')) * (getValues('lang') == 'fa' ? item.faPrice : item.enPrice)) || 0,
                                            });
                                        }}
                                    />
                                    {calcRes.one > 0 && (
                                        <Box sx={{
                                            backgroundColor: theme.palette.primary.lighter,
                                            borderRadius: 1,
                                            p: 1
                                        }}>
                                            <Typography>قیمت واحد : {numberWithCommas(calcRes.one)} ریال</Typography>
                                            <Typography>مبلغ کل : {numberWithCommas(calcRes.group)} ریال</Typography>
                                        </Box>
                                    )}
                                </Stack>
                            </FormProvider>
                        </Box>
                    </Grid>

                    <Grid sx={{display: 'flex', justifyContent: 'center'}} xs={12} md={8}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '400px',
                            }}
                        >
                            <ReactApexChart
                                type="bar"
                                series={[
                                    {
                                        data: Array.from(providers)?.map(
                                            (item) => average(tableData.filter(({providerCode}) => providerCode == item))
                                        ),
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
                                                    return 'ریال ';
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
                                            },
                                            dataPointMouseEnter: function (event) {
                                                event.target.style.cursor = "pointer"
                                            },
                                        },
                                        toolbar: {show: false},
                                        type: 'bar',
                                        height: '100%',
                                    },
                                    plotOptions: {
                                        bar: {
                                            borderRadius: 4,
                                            horizontal: false,
                                        },
                                    },
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function (val, opt) {
                                            return val + ' ریال ';
                                        },
                                    },
                                    xaxis: {
                                        categories: Array.from(providers)?.map((item) => ProviderNameEnum[item]),
                                        labels: {rotate: 45, style: {fontSize: 10}},
                                    },
                                    scales: {
                                        xAxes: [
                                            {
                                                ticks: {
                                                    autoSkip: true,
                                                    maxTicksLimit: 20,
                                                },
                                            },
                                        ],
                                    },
                                }}
                                width={'100%'}
                                height={'100%'}
                            />
                        </Box>
                    </Grid>
                </Grid>

            </CustomCard>
            <Box>
                <CustomCard>
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                            <Table>
                                <TableHeadCustom headLabel={TABLE_HEAD}/>
                                <TableBody>
                                    {isLoading && <TableLoading count={TABLE_HEAD.length} rows={10}/>}
                                    {!isLoading &&
                                        <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                    {tableData?.map((row, index) => (
                                        <PanelPriceTableRow key={index} row={row}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </CustomCard>
            </Box>
        </Stack>
    );
};
export default PanelPriceTable;
