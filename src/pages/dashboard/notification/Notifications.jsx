// @mui
import {Container} from '@mui/material';
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import NotificationTable from "../../../sections/@dashboard/notification/NotificationTable";
import {getAllMessages} from "src/services/notification/message";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
// ----------------------------------------------------------------------

const INITIAL_VALUES = {
    Title: '',
    Status: '0',
    Type: '0',
    PageIndex: '1',
    PageSize: '5',
};

const Notifications = () => {
    const {themeStretch} = useSettings();

    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {data, isLoading} = useQuery(['notificationList', filterValue], () => getAllMessages(filterValue));

    return (
        <Page title="مدیریت پیام ها">
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'اخبار و اطلاع رسانی'}
                ]}
            />
            <Container maxWidth={themeStretch ? false : 'lg'}>
                {/*<NotificationTableHeader />*/}
                <NotificationTable
                    data={(data && data?.data?.items) || []}
                    filters={{
                        filterValue: filterValue,
                        setFilterValue: setFilterValue,
                    }}
                    isLoading={isLoading}
                />
                <CustomPagination
                    totalPage={(data && data?.data?.totalPages) || 0}
                    totalCount={(data && data?.data?.totalCount) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                />
            </Container>
        </Page>
    );
};

export default Notifications;
