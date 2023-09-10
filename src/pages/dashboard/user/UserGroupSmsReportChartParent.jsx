import React from "react";
import {useParams} from "react-router-dom";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Page from "../../../components/Page";
import GroupSmsChartParent from "../../../sections/@dashboard/sms-report/table/GroupSmsChartParent";
// import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import Page from "../../../components/Page";
// import GroupSmsChart from "../../../sections/@dashboard/sms-report/GroupSmsChart";

const UserGroupSmsReportChartParent = () => {
    const {username, userId, reportId} = useParams()

    return (
        <Page title="گزارش ارسال گروهی">
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root},
                    {name: username, href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=send`},
                    {
                        name: 'گزارش ارسال گروهی',
                        href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=send&subActive=groupSms`
                    },
                    {name: `گزارشات ارسال گروهی ${reportId}`}
                ]}
            />
            <GroupSmsChartParent />
        </Page>
    )
}

export default UserGroupSmsReportChartParent;