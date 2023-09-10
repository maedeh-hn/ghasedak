// @mui
import { Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { AccountGeneral, AccountProSetting, AccountChangePassword } from '../../../sections/@dashboard/user/account';
import CustomContainer from '../../../components/CustomContainer';
import AccountLinks from "../../../sections/@dashboard/user/account/AccountLinks";
import AccountApiKey from "../../../sections/@dashboard/user/account/AccountApiKey";

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
      label: 'عمومی',
    },
    {
      value: 'apiKey',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountApiKey />,
      label: 'کلید شناسه',
    },
    {
      value: 'notifications',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountProSetting />,
      label: 'تنظیمات پیشرفته',
    },
    {
      value: 'links',
      icon: <Iconify icon={'dashicons:admin-links'} width={20} height={20} />,
      component: <AccountLinks />,
      label: 'لینک های من',
    },
    {
      value: 'change_password',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
      label: 'تغییر رمز عبور',
    },
  ];

  return (
    <Page title="تنظیمات حساب">
      <HeaderBreadcrumbs
        heading="حساب کاربری"
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'حساب کاربری', href: PATH_DASHBOARD.user.root },
          { name: 'تنظیمات حساب کاربری' },
        ]}
      />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
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

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </CustomContainer>
    </Page>
  );
}
