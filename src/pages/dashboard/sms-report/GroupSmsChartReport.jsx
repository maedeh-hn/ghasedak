import React, {useState} from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import CustomContainer from "../../../components/CustomContainer";
import {PATH_DASHBOARD} from "../../../routes/paths";
import CustomPagination from "../../../components/CustomPagination";
import ChartTable from "../../../sections/@dashboard/sms-report/table/chartReport/ChartTable";
import {useQuery} from "@tanstack/react-query";
import useSettings from "../../../hooks/useSettings";
import {searchReceptorBulk} from "src/services/smsRequestManagement/receptor";
import {useParams} from "react-router-dom";
import {SmsStatusReportEnum} from "../../../utils/enums";


const GroupSmsChartReport = () => {

    const {themeStretch} = useSettings();

    const {reportId, statusId, type} = useParams()

    const [filterValue, setFilterValue] = useState({
        BulkSmsId: reportId,
        StatusId: statusId,
        IsPanel: type === 'panel',
        Mobile: '',
        Status: -1,
        PageIndex: 1,
        PageSize: 5,
    });

    const {data, isLoading} = useQuery(['BulkSmsReport', filterValue], () =>
        searchReceptorBulk(filterValue)
    );

    return (
        <Page title={'گزارشات ارسال گروهی'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات ارسال گروهی', href: PATH_DASHBOARD.smsReport.groupSms},
                    {name: `گزارش ارسال شماره ${reportId}`, href: PATH_DASHBOARD.smsReport.groupSendReportChart(reportId, type)},
                    {name: `وضعیت ${SmsStatusReportEnum[statusId]}`},
                ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <ChartTable
                    data={data ? data?.data?.items : []}
                    filters={{
                        filterValue: filterValue,
                        setFilterValue: setFilterValue,
                    }}
                    isLoading={isLoading}
                />
                <CustomPagination
                    totalPage={(data && data?.data?.totalPages) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    totalCount={(data && data?.data?.totalCount) || 0}
                />
            </CustomContainer>
        </Page>
    );
};


export default GroupSmsChartReport