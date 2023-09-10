import React from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import IncreasPriceRate from "../../../sections/@dashboard/buy/IncreasPriceRate";
import CustomCard from "../../../components/CustomCard";
import useResponsive from "../../../hooks/useResponsive.jsx";

const IncreasPrice = () => {
    const {themeStretch} = useSettings();
    const lgDown = useResponsive('down', 'lg');

    return (
        <Page title={'افزایش اعتبار'}>
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'خرید'},
                {name: 'افزایش اعتبار'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <CustomCard style={{
                    width:lgDown ? '100%' : '50%'
                }}>
                    <IncreasPriceRate/>
                </CustomCard>
            </CustomContainer>
        </Page>
    );
};

export default IncreasPrice;
