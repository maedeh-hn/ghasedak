import React from 'react';
// @mui
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//services
import {getApiKeys} from 'src/services/contact/api-keys';
//routes
import {PATH_DASHBOARD} from '../../../routes/paths';
import Page from '../../../components/Page';
import {useQuery} from '@tanstack/react-query';
import useSettings from '../../../hooks/useSettings';
import ApiKeysTable from '../../../sections/@dashboard/api-keys/table/ApiKeysTable';
import CustomContainer from '../../../components/CustomContainer';

const ApiKeys = () => {
    const {themeStretch} = useSettings();

    const {isLoading, data, refetch} = useQuery(['ApiKeysList'], getApiKeys);

    return (
        <Page title={'کلید شناسه'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'کلید شناسه'}
                ]}
                heading={'کلید شناسه'}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <ApiKeysTable data={data ? data.data : []} refetch={refetch} isLoading={isLoading}/>
            </CustomContainer>
        </Page>
    );
};

export default ApiKeys;
