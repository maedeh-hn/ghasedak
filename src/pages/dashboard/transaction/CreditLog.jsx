import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import {SearchCreditLogs} from "src/services/users/transaction";
import CreditReportTable from "../../../sections/@dashboard/transaction/table/credit/CreditReportTable";

const CreditLog = () => {
    const {themeStretch} = useSettings();

    const [filterValue, setFilterValue] = useState({
        StartDate: '',
        EndDate: '',
        CreditType: 0,
        PageIndex: 1,
        PageSize: 5,
    });

    const {isLoading, data} = useQuery(['SearchCreditLog', filterValue], () =>
        SearchCreditLogs(filterValue)
    );

    return (

        <Page title={'گزارشات مالی داخلی'}>
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'گزارشات مالی'},
                {name: 'ریز تراکنشات'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                {/*<CreditReportHeader/>*/}
                <CreditReportTable
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

export default CreditLog;
