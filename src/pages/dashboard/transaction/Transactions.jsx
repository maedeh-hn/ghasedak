import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import {SearchTransaction} from 'src/services/users/transaction';
import TransactionReportTable from '../../../sections/@dashboard/transaction/table/transaction/TransactionReportTable';

const Transactions = () => {
    const {themeStretch} = useSettings();

    const [filterValue, setFilterValue] = useState({
        StartDate: '',
        EndDate: '',
        PageIndex: 1,
        PageSize: 5,
    });

    const {isLoading, data} = useQuery(['SearchTransaction', filterValue], () =>
        SearchTransaction(filterValue)
    );

    return (
        <>
            <Page title={'گزارشات مالی'}>
                <HeaderBreadcrumbs links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات مالی'},
                    {name: 'تراکنشات مالی'}
                ]}/>
                <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                    {/*<TransactionReportHeader/>*/}
                    <TransactionReportTable
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
        </>
    );
};

export default Transactions;
