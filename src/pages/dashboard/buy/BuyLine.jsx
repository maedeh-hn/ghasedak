import React from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import {getAllFreeLine} from 'src/services/lines/lines';
import BuyLineTable from '../../../sections/@dashboard/buy/buyLine/BuyLineTable';


const BuyLine = () => {
    const {themeStretch} = useSettings();
    const {data, isLoading} = useQuery(['BuyLineList'], getAllFreeLine);
    return (
        <Page title={'خرید خط'}>
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'خرید'},
                {name: 'خرید خط اختصاصی'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <BuyLineTable data={!isLoading ? data.data : []} isLoading={isLoading}/>
            </CustomContainer>
        </Page>
    );
};

export default BuyLine;
