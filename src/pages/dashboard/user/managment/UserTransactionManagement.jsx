import {Box, Card, Container, Tab, Tabs} from '@mui/material';
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useSettings from '../../../../hooks/useSettings';
import Label from '../../../../components/Label';

import useTabsNew from '../../../../hooks/useTabsNew';
import Page from '../../../../components/Page';
import PageHeader from '../../../../components/PageHeader';
import TableHeaderActionButton from '../../../../components/TableHeaderActionButton';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import UserCreditReportTable from '../../../../sections/@dashboard/user/components/table/credit/UserCreditReportTable';
import UserTransactionReportTable from '../../../../sections/@dashboard/user/components/table/transaction/UserTransactionReportTable';
// import useSettings from "../../../../hooks/useSettings";
// import Label from "../../../../components/Label";
// import useTabs from "../../../../hooks/useTabs";
// import Page from "../../../../components/Page";
// import UserCreditReportTable from "../../../../sections/@dashboard/users/table/credit/UserCreditReportTable";
// import UserTransactionReportTable
//     from "../../../../sections/@dashboard/users/table/transaction/UserTransactionReportTable";
// import UserTransactionReportHeader
//     from "../../../../sections/@dashboard/users/table/transaction/UserTransactionReportHeader";
// import PageHeader from "../../../../components/PageHeader";
// import TableHeaderActionButton from "../../../../components/TableHeaderActionButton";
// import {PATH_DASHBOARD} from "../../../../routes/paths";

// ----------------------------------------------------------------------

const UserTransactionManagement = () => {
    const {themeStretch} = useSettings();

    const {username, userId} = useParams()

    const navigate = useNavigate()

    const {currentTab, onChangeTab} = useTabsNew('credit', 'subActive');

    const SMS_TABS = [
        {
            value: 'credit',
            icon: <Label color="primary" />,
            component: <UserCreditReportTable/>,
            label: 'ریز گزارشات',
        },
        {
            value: 'transaction',
            icon: <Label color="primary" />,
            component: <UserTransactionReportTable/>,
            label: 'لیست تراکنش',
        },
    ];
    return (
        <Page title="مدیریت تراکنش ها">
            <Container
                maxWidth={themeStretch ? false : 'lg'}
            >
                <PageHeader actions={<>
                    <TableHeaderActionButton title={'ثبت تراکنش ها'} tooltip={'ثبت تراکنش ها'}
                                             onClick={() => navigate(PATH_DASHBOARD.userManagement.financialReportParent(username, userId))}/>
                </>}/>
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
    )
        ;
};

export default UserTransactionManagement;
