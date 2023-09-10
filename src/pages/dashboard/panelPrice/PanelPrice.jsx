import React from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CustomContainer from '../../../components/CustomContainer';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import PanelPriceTable from '../../../sections/@dashboard/panel-price/table/PanelPriceTable';
import PageHeader from '../../../components/PageHeader';
import { useQuery } from '@tanstack/react-query';
import LoadingWidget from '../../../components/LoadingWidget';
import { panelRate } from 'src/services/baseInfo/priceRate';

const PanelPrice = () => {
  const { themeStretch } = useSettings();
  const { data, isLoading } = useQuery(['PanelPriceRate'], () => panelRate());
  return (
    <Page title={'تعرفه پیام ها'}>
      <HeaderBreadcrumbs links={[{ name: 'داشبورد', href: PATH_DASHBOARD.root }, { name: 'تعرفه پیام ها' }]} />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
        <PageHeader title={'تعرفه پیام ها'} />
        {isLoading ? <LoadingWidget /> : <PanelPriceTable data={!isLoading ? data.data : []} isLoading={isLoading} />}
      </CustomContainer>
    </Page>
  );
};

export default PanelPrice;
