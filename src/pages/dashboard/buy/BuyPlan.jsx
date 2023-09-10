import React from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import {getPlan} from "src/services/baseInfo/plan";
import BuyPlanTable from "../../../sections/@dashboard/buy/buyPlan/BuyPlanTable";

const BuyPlan = () => {
    const {themeStretch} = useSettings();
    const {data, isLoading} = useQuery(['BuyPlanList'], getPlan);
    let temp = [];
    for (let i = 0; i < data?.data[0]?.priceRates?.length; i++) {
        data?.data.map((item) => {
            temp.push({total: data?.data[i]?.price, prices: item?.priceRates[i]});
        });
    }
    const realData = [];
    for (let j = 0; j < temp.length; j += 3) {
        realData.push({
            title: temp[j].prices.providerDescription,
            total: temp[j].total,
            prices: [temp[j].prices.faPrice, temp[j + 1].prices.faPrice, temp[j + 2].prices.faPrice],
        });
    }

    return (
        <Page title={'خرید سرویس'}>
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'خرید'},
                {name: 'خرید سرویس'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <BuyPlanTable priceData={data?.data} data={realData} isLoading={isLoading}/>
            </CustomContainer>
        </Page>
    );
};

export default BuyPlan;
