import {Card, Container} from '@mui/material';
import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useParams} from "react-router-dom";
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import CustomPagination from '../../components/CustomPagination';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import StatusLogTableParent from '../../sections/@dashboard/status-log/table/StatusLogTableParent';
import {StatusLogParent} from "../../services/smsRequestManagement/webServiceLog"
// import {StatusLog} from "src/services/smsRequestManagement/webServiceLog";
// import useSettings from '../../../hooks/useSettings';
// import Page from '../../../components/Page';
// import CustomPagination from '../../../components/CustomPagination';
// import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import StatusLogTable from "../../../sections/@dashboard/status-log/table/StatusLogTable";

// ----------------------------------------------------------------------

const SingleSmsStatusLogParent = () => {
    const {themeStretch} = useSettings();
    const params = useParams();
    console.log(params);
    const INITIAL_VALUES = {
        smsId:params.smsId,
        StartDate: '',
        EndDate: '',
        LineNumber: '',
        ActionType: -1,
        PageIndex: 1,
        PageSize: 5,
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {isError, isLoading, data, refetch} = useQuery([filterValue], () => StatusLogParent(filterValue));

    return (
        <Page title="گزارش وضعیت ارسال">
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                { name: 'مدیریت زیرکاربران', href: PATH_DASHBOARD.userManagement.root },
                {name: 'ارسال تکی', href: `/dashboard/users/${params.username}/${params.userId}?active=send`},
                {name: `لاگ وضعیت شناسه پیام ${params.smsId}`}
            ]}/>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <StatusLogTableParent
                        data={(data && data?.data?.items) || []}
                        filters={{
                            filterValues: filterValue,
                            setFilterValues: setFilterValue,
                        }}
                        isLoading={isLoading}
                        refetch={refetch}
                    />
                </Card>
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

export default SingleSmsStatusLogParent;
