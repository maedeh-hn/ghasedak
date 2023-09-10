import {Box, Card, Container, Tab, Tabs} from '@mui/material';
import React from 'react';
import {useParams} from "react-router-dom";
import useSettings from '../../../../hooks/useSettings';
import useTabsNew from '../../../../hooks/useTabsNew';
import Label from '../../../../components/Label';
import Page from '../../../../components/Page';
import UserSingleSmsReportTable from '../../../../sections/@dashboard/user/components/table/sms-report/singleSms/UserSingleSmsReportTable';
import UserGroupSmsReportTable from '../../../../sections/@dashboard/user/components/table/sms-report/groupSms/UserGroupSmsReportTable';
// import useSettings from "../../../../hooks/useSettings";
// import useTabs from "../../../../hooks/useTabs";
// import Label from "../../../../components/Label";
// import Page from "../../../../components/Page";
// import UserSingleSmsReportTable
//     from "../../../../sections/@dashboard/users/table/sms-report/SingleSms/UserSingleSmsReportTable";
// import UserGroupSmsReportTable
//     from "../../../../sections/@dashboard/users/table/sms-report/groupSms/UserGroupSmsReportTable";

// ----------------------------------------------------------------------

const UserSmsReportManagement = () => {
    const {themeStretch} = useSettings();

    const {username} = useParams()

    const {currentTab, onChangeTab} = useTabsNew('singleSms', 'subActive');

    const SMS_TABS = [
        {
            value: 'singleSms',
            icon: <Label color="primary" />,
            component: <UserSingleSmsReportTable/>,
            label: 'ارسال تکی',
        },
        {
            value: 'groupSms',
            icon: <Label color="primary" />,
            component: <UserGroupSmsReportTable/>,
            label: 'ارسال گروهی',
        },
    ];
    return (
        <Page title={`گزارشات ارسال ${username}`}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <Tabs
                        allowScrollButtonsMobile
                        variant="scrollable"
                        scrollButtons="auto"
                        value={currentTab}
                        onChange={onChangeTab}
                        sx={{px: 2, bgcolor: 'background.neutral'}}
                    >
                        {SMS_TABS.map((tab) => (
                            <Tab disableRipple key={tab.value} label={tab.label} value={tab.value}/>
                        ))}
                    </Tabs>
                    <Box sx={{mb: 3}}/>
                    {SMS_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                    })}
                </Card>
            </Container>
        </Page>
    );
};

export default UserSmsReportManagement;
