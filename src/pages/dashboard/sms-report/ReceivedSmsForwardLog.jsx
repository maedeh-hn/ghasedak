import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import {ReceivedLogs, ReceivedSms} from 'src/services/receive/receivedSms';
import {useParams} from "react-router-dom";
import ReceiveSmsForwardLogTableHeader
    from "../../../sections/@dashboard/sms-report/table/receiveSmsForwardLog/ReceiveSmsForwardLogTableHeader";
import ReceiveSmsForwardLogTable
    from "../../../sections/@dashboard/sms-report/table/receiveSmsForwardLog/ReceiveSmsForwardLogTable";


const ReceiveSmsForwardLog = () => {
    const {themeStretch} = useSettings();

    const {smsId} = useParams

    const INITIAL_VALUES = {
        SmsId: smsId,
        StartDate: '',
        EndDate: '',
        LineNumber: '',
        ActionType: -1,
        Origin: -1,
        PageIndex: 1,
        PageSize: 10,
    };

    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {isLoading, data} = useQuery(['ReceivedSms', filterValue], () => ReceivedLogs(filterValue));

    return (
        <Page title={'لاگ ارسال وضعیت'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات'},
                    {name: 'پیام های دریافتی', href: PATH_DASHBOARD.smsReport.receivedSms},
                    {name: 'گزارش ارسال وضعیت'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <ReceiveSmsForwardLogTableHeader/>
                <ReceiveSmsForwardLogTable
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

export default ReceiveSmsForwardLog;
