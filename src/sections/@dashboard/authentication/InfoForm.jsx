import { FormProvider, RHFDatePicker, RHFTextField } from '../../../components/hook-form';
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import RHFNumberField from '../../../components/hook-form/RHFNumberField';
import RHFMobileField from '../../../components/hook-form/RHFMobileField';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { createUpdateAuthenticationInfo } from 'src/services/authentication/authentication';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAuthenticationInfo } from '../../../services/authentication/authentication';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@emotion/react';
import RealAuthPerson from './component/RealAuthPerson';
import useTabsNew from '../../../hooks/useTabsNew';
import LegalAuthPerson from './component/LegalAuthPerson';

const InfoForm = ({ data, activeStep, setFormDone }) => {
  //   const {currentTab, onChangeTab} = useTabsNew(line?.legalType == -1 ? 'real' : line?.legalType == 0 ? 'real' : 'legal');
  const { currentTab, onChangeTab } = useTabsNew('real');

  const theme = useTheme();

  //    const { data, isLoading } = useQuery(['getAuthenticationInfo'],()=> getAuthenticationInfo());
  //  const [test,setTest]=useState({

  //  })
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
console.log(currentTab);
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '5px' }}>
        <Typography
          sx={{ background: `${theme.palette.warning.main}`, width: '12px', height: '12px', borderRadius: '50%' }}
        ></Typography>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>ثبت مشخصات فردی</Typography>
      </Box>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        {PERSON_TABS.map(
          (tab) => tab && <Tab sx={{fontSize:"16px"}} disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        )}
      </Tabs>

      <Box sx={{ mb: 3 }} />
      {currentTab === 'real' ? (
        <RealAuthPerson data={data} activeStep={activeStep} setFormDone={setFormDone} />
      ) : (
        <LegalAuthPerson data={data} activeStep={activeStep} setFormDone={setFormDone} />
      )}
    </>
  );
};

export default InfoForm;
