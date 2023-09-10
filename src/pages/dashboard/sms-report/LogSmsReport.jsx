import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import LogSmsReportHeader from '../../../sections/@dashboard/sms-report/table/logSms/LogSmsReportHeader';
import LogSmsReportTable from '../../../sections/@dashboard/sms-report/table/logSms/LogSmsReportTable';
import {SearchWebServiceLogs} from 'src/services/smsRequestManagement/webServiceLog';

const INITIAL_VALUES = {
    from: '',
    to: '',
    statusCode: '',
    PageIndex: 1,
    PageSize: 5,
};
const LogSmsReport = () => {
    const {themeStretch} = useSettings();

    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {isLoading, data} = useQuery(['LogSmsReport', filterValue], () =>
        SearchWebServiceLogs(filterValue)
    );
    return (
        <Page title={'گزارشات فراخوانی'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات'},
                    {name: 'گزارشات فراخوانی'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <LogSmsReportHeader/>
                <LogSmsReportTable
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

export default LogSmsReport;
