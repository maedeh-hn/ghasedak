import React from 'react';
import BuyModuleCard from '../../../sections/@dashboard/buy/buyModules/BuyModuleCard';
import { buyModule, getAllModule } from '../../../services/buyModule';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from 'notistack';
const ModulesArray = [
  {
    title: 'ماژول زیرکاربران',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است',
  },
];

const BuyModule = () => {
  const { data, isLoading } = useQuery(['BuyLineList'], getAllModule);
  const [modules, setModules] = useState();
  const {enqueueSnackbar} = useSnackbar();
  const handleBuyModule = async (id,type) => {
    const data = { subServiceId: id };

    const response = await buyModule(data);
console.log(response);
    if (response.isSuccess) {
      enqueueSnackbar('درحال انتقال به درگاه ...');
      window.location.replace(response.data.bankUrl + response.data.bankCode);
      if(type===9){
        localStorage.set("panelType",3)
      }
    }
  };

  useEffect(() => {
    let modulesWithPrice;
    modulesWithPrice = data?.data?.map((item, index) => ({
      ...ModulesArray[index],
      price: item.price,
      id: item.id,
      type: item.type
    }));
    setModules(modulesWithPrice);
  }, [data]);

  return (
    <Page title={'خرید خط'}>
      <HeaderBreadcrumbs
        links={[{ name: 'داشبورد', href: PATH_DASHBOARD.root }, { name: 'خرید' }, { name: 'خرید ماژول' }]}
      />

      {modules?.map((item) => {
        return (
          <BuyModuleCard
            title={item.title}
            description={item.description}
            price={item.price}
            handleBuyModule={handleBuyModule}
            idModule={item.id}
            typemodule={item.type}
          />
        );
      })}
    </Page>
  );
};

export default BuyModule;
