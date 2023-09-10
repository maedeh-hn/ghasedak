import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Page from "../../../components/Page";
import { SmsStatusReportEnum } from "../../../utils/enums";
import CustomPagination from "../../../components/CustomPagination";
import useSettings from "../../../hooks/useSettings";
import {searchReceptorBulkParent} from "../../../services/smsRequestManagement/receptor"
import UserChartTableParent from "../../../sections/@dashboard/user/components/table/sms-report/chartReport/UserChartTableParent";
// import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import Page from "../../../components/Page";
// import {SmsStatusReportEnum} from "../../../utils/enums";
// import CustomPagination from "../../../components/CustomPagination";
// import useSettings from "../../../hooks/useSettings";
// import UserChartTable from "../../../sections/@dashboard/users/table/sms-report/chartReport/UserChartTable";

const UserGroupSmsReportFromChartParent = () => {
    const params = useParams()
    console.log(params);
    const {themeStretch} = useSettings();

    const [filterValues, setFilterValues] = useState({
        UserId: params.userId,
        BulkSmsId: params.reportId,
        Status: params.statusId,
        Mobile: '',
        PageIndex: 1,
        PageSize: 5,
        IsPanel:true
    });

    const {data, isLoading} = useQuery(['BulkSmsDiagram', filterValues], () =>
    searchReceptorBulkParent(filterValues)
    );
console.log(data);
    return (
        <Page title="گزارش ارسال گروهی">
            
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root},
                    {name: params.username, href: `${PATH_DASHBOARD.userManagement.view(params.username, params.userId)}?active=send`},
                    {
                        name: 'گزارش ارسال گروهی',
                        href: `${PATH_DASHBOARD.userManagement.view(params.username, params.userId)}?active=send&subActive=groupSms`
                    },
                    {
                        name: `گزارشات ارسال گروهی ${params.reportId}`,
                        href: PATH_DASHBOARD.userManagement.groupSendReportChart(params.username, params.userId, params.reportId)
                    },
                    {name: `وضعیت ${SmsStatusReportEnum[params.statusId] || 'نامشخص'}`}
                ]}
            />
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <UserChartTableParent
                    data={data ? data?.items : []}
                    filters={{
                        filterValues,
                        setFilterValues,
                    }}
                    isLoading={isLoading}
                />
                <CustomPagination
                    totalPage={(data && data?.totalPages) || 0}
                    totalCount={(data && data?.totalCount) || 0}
                    filterValue={filterValues}
                    setFilterValue={setFilterValues}
                />
            </Container>
        </Page>
    )
}

export default UserGroupSmsReportFromChartParent;