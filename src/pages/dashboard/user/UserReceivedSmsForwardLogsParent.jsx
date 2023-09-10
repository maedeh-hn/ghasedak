import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import Page from '../../../components/Page';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useSettings from '../../../hooks/useSettings';
import UserForwardLogTableParent from '../../../sections/@dashboard/forward-log/UserForwardLogTableParent';
import { ReceiveLogParent } from '../../../services/receive/receivedSms';
// import { ReceiveLog } from 'src/services/receive/receivedSms';
// import CustomPagination from '../../../components/CustomPagination';
// import Page from '../../../components/Page';
// import { PATH_DASHBOARD } from '../../../routes/paths';
// import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// import UserForwardLogTable from '../../../sections/@dashboard/forward-log/table/UserForwardLogTable';
// import useSettings from '../../../hooks/useSettings';

const UserReceivedSmsForwardLogsParent = () => {
  const { username, userId, receiveSmsId } = useParams();
  const INITIAL_VALUES = {
    SmsId: receiveSmsId,
    UserId: userId,
    StartDate: '',
    EndDate: '',
    LineNumber: '',
    Origin: -1,
    ActionType: -1,
    PageIndex: 1,
    PageSize: 5,
  };
  const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

  const { isLoading, data } = useQuery([filterValue], () => ReceiveLogParent(filterValue));

  const { themeStretch } = useSettings();

  return (
    <Page title="گزارش وضعیت ارسال به url">
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root },
          {
            name: username,
            href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=ReceivedMessages`,
          },
          {
            name: 'پیام های دریافتی',
            href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=ReceivedMessages`,
          },
          { name: `گزارش ارسال به url پیام ${receiveSmsId}` },
        ]}
      />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <UserForwardLogTableParent
            data={(data && data?.data?.items) || []}
            filters={{
              filterValues: filterValue,
              setFilterValues: setFilterValue,
            }}
            isLoading={isLoading}
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

export default UserReceivedSmsForwardLogsParent;
