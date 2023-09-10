import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useSettings from '../../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomPagination from '../../../components/CustomPagination';
import UserReceiveSmsForwardLogTable from '../../../sections/@dashboard/user/components/table/line/receiveLog/UserReceiveSmsForwardLogTable';
import {ReceiveLogParent} from "../../../services/receive/receivedSms"
// import { ReceiveLog } from 'src/services/receive/receivedSms';
// import useSettings from '../../../hooks/useSettings';
// import Page from '../../../components/Page';
// import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// import { PATH_DASHBOARD } from '../../../routes/paths';
// import CustomPagination from '../../../components/CustomPagination';
// import UserReceiveSmsForwardLogTable from '../../../sections/@dashboard/users/table/receiveLog/UserReceiveSmsForwardLogTable';

const UserLineReceiveLog = () => {
  const { themeStretch } = useSettings();
  const { username, userId, lineNumber } = useParams();

  const INITIAL_VALUES = {
    // UserId: userId,
    StartDate: '',
    EndDate: '',
    LineNumber: lineNumber,
    Origin: '',
    ActionType: '-1',
    PageIndex: 1,
    PageSize: 5,
  };

  const [filterValues, setFilterValues] = useState(INITIAL_VALUES);

  const { data, isLoading, refetch } = useQuery(['ReceiveLogParent', filterValues], () => ReceiveLogParent(filterValues));
console.log(data);
  return (
    <Page title="گزارش ارسال به url">
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root },
          { name: username, href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=lines` },
          { name: `خط ${lineNumber}`, href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=lines` },
          { name: 'گزارش ارسال به url' },
        ]}
      />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <UserReceiveSmsForwardLogTable
          data={(data && data?.items) || []}
      
          filters={{
            filterValues,
            setFilterValues,
          }}
          isLoading={isLoading}
          refetch={refetch}
        />
        <CustomPagination
          totalPage={(data && data?.totalPages) || 0}
          totalCount={(data && data?.totalCount) || 0}
          filterValue={filterValues}
          setFilterValue={setFilterValues}
        />
      </Container>
    </Page>
  );
};

export default UserLineReceiveLog;
