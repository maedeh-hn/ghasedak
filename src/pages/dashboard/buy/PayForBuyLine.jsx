import React from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import {getAllFreeLine} from 'src/services/lines/lines';
import PayForBuyLineTableHeader from '../../../sections/@dashboard/buy/pay/PayForBuyLineTableHeader';
import PayForBuyLineTable from '../../../sections/@dashboard/buy/pay/PayForBuyLineTable';

const PayForBuyLine = () => {
    const {themeStretch} = useSettings();
    const {data, isLoading} = useQuery(['BuyLineList'], getAllFreeLine);
    return (
        <Page title={'خرید'}>
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'خرید'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <PayForBuyLineTableHeader/>
                <PayForBuyLineTable data={!isLoading ? data.data : []} isLoading={isLoading}/>
            </CustomContainer>
        </Page>
    );
};

export default PayForBuyLine;
