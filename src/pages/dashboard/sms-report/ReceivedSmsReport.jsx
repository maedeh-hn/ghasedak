import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import ReceivedSmsHeader from '../../../sections/@dashboard/sms-report/table/receivedSms/ReceivedSmsHeader';
import ReceivedSmsTable from '../../../sections/@dashboard/sms-report/table/receivedSms/ReceivedSmsTable';
import {ReceivedSms} from 'src/services/receive/receivedSms';

const INITIAL_VALUES = {
    LineNumber: '',
    Mobile: '',
    FromDate: '',
    ToDate: '',
    Origin: '',
    PageIndex: 1,
    PageSize: 10,
};

const ReceiveSms = () => {
    const {themeStretch} = useSettings();

    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {isLoading, data} = useQuery(['ReceivedSms', filterValue], () => ReceivedSms(filterValue));
    return (
        <Page title={'پیام های دریافتی'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات'},
                    {name: 'پیام های دریافتی'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <ReceivedSmsHeader/>
                <ReceivedSmsTable
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

export default ReceiveSms;
