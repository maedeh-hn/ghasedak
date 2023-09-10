// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';




// import UserGeneralApiKeys from '../../../sections/@dashboard/users/tabs/UserGeneralApikeys';

import { PATH_DASHBOARD } from '../../../routes/paths';

// import UserGeneralOtpTemplate from "../../../sections/@dashboard/users/tabs/UserGeneralOtpTemplate";


// import UserGeneralPanelPrice from "../../../sections/@dashboard/users/tabs/UserGeneralPanelPrice";

import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import UserGeneralInfo from '../../../sections/@dashboard/user/components/tabs/UserGeneralInfo';

import useTabsNew from '../../../hooks/useTabsNew';
import UserGeneralSmsReport from '../../../sections/@dashboard/user/components/tabs/UserGeneralSmsReport';
import UserGeneralContactGroup from '../../../sections/@dashboard/user/components/tabs/UserGeneralContactGroup';
import UserGeneralApiKeys from '../../../sections/@dashboard/user/components/tabs/UserGeneralApiKeys';
import UserGeneralFinancial from '../../../sections/@dashboard/user/components/tabs/UserGeneralFinancial';
import UserGeneralOtpTemplate from '../../../sections/@dashboard/user/components/tabs/UserGeneralOtpTemplate';
import UserGeneralReceivedSms from '../../../sections/@dashboard/user/components/tabs/UserGeneralReceivedSms';
import UserGeneralAccessibility from '../../../sections/@dashboard/user/components/tabs/UserGeneralAccessibility';
import LineGeneralUsers from '../../../sections/@dashboard/line/tabs/general/LineGeneralUsers';

// ----------------------------------------------------------------------

const UserSettingsTab = () => {
  const { themeStretch } = useSettings();

  const { username, userId } = useParams();

  const { currentTab, onChangeTab } = useTabsNew('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <UserGeneralInfo />,
      label: 'اطلاعات کاربری',
    },
    {
      value: 'lines',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <LineGeneralUsers />,
      label: 'خطوط',
    },
    {
      value: 'send',
      icon: <Iconify icon={'ic:baseline-email'} width={20} height={20} />,
      component: <UserGeneralSmsReport />,
      label: 'ارسال ها',
    },
    {
      value: 'contacts',
      icon: <Iconify icon={'clarity:users-solid'} width={20} height={20} />,
      component: <UserGeneralContactGroup />,
      label: 'مخاطبین',
    },
    {
      value: 'apikey',
      icon: <Iconify icon={'akar-icons:key'} width={20} height={20} />,
      component: <UserGeneralApiKeys />,
      label: 'کلید شناسه',
    },
    {
      value: 'Financial',
      icon: <Iconify icon={'solar:dollar-linear'} width={20} height={20} />,
      component: <UserGeneralFinancial />,
      label: 'مالی',
    },
    // {
    //   value: 'templates',
    //   icon: <Iconify icon={'icon-park-outline:page-template'} width={20} height={20} />,
    //   component: <UserGeneralOtpTemplate />,
    //   label: 'قالب ها',
    // },
    {
      value: 'ReceivedMessages',
      icon: <Iconify icon={'ic:outline-sms'} width={20} height={20} />,
      component: <UserGeneralReceivedSms />,
      label: 'پیام های دریافتی',
    },
    // {
    //   value: 'roles',
    //   icon: <Iconify icon={'carbon:line-role'} width={20} height={20} />,
    //   component: <UserGeneralRole />,
    //   label: 'نقش ها',
    // },
    // {
    //   value: 'tariffs',
    //   icon: <Iconify icon={'icons8:price-tag'} width={20} height={20} />,
    //   component: <UserGeneralPanelPrice />,
    //   label: 'تعرفه کاربر',
    // },
    {
      value: 'accessibility',
      icon: <Iconify icon={'icons8:price-tag'} width={20} height={20} />,
      component: <UserGeneralAccessibility />,
      label: 'دسترسی ها',
    },
  ];

  return (
    <Page title={username}>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'مدیریت زیرکاربران', href: PATH_DASHBOARD.userManagement.root },
          { name: username },
        ]}
      />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box display={'flex'} alignItems={'center'}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ mb: 3 }} />
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
};

export default UserSettingsTab;
