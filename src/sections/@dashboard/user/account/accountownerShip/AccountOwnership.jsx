// @mui
import { Box, Card, Tab, Tabs } from '@mui/material';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import useTabs from '../../../../../hooks/useTabs';
import RealPersonForm from './RealPersonForm';
import LegalPersonForm from './LegalPersonForm';
import CustomCard from "../../../../../components/CustomCard";

// ----------------------------------------------------------------------

export default function AccountOwnership() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('ایمیل را وارد کنید.'),
    password: Yup.string().required('رمز عبور خود را وارد کنید.'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
    if (res?.data?.isSuccess !== true) {
      if (isMountedRef.current) {
        setError('afterSubmit', { message: res?.data?.message });
      }
    }
    if (res?.status_code === 306) {
      // saveNumber(data.)
    }
  };

  const { currentTab, onChangeTab } = useTabs('real');

  const PERSON_TABS = [
    {
      value: 'real',
      label: 'حقیقی',
    },
    {
      value: 'legal',
      label: 'حقوقی',
    },
  ];

  return (
    <CustomCard>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        {PERSON_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      <Box sx={{ mb: 5 }} />
      {currentTab === 'real' ? <RealPersonForm /> : <LegalPersonForm />}
    </CustomCard>
  );
}
