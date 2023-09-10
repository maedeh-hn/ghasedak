import React from 'react';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import {getAllGroup} from 'src/services/contact/group';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../../routes/paths';
import GroupNestedList from '../../../../sections/@dashboard/contact/group/GroupNestedList';
import {useQuery} from "@tanstack/react-query";
import CustomContainer from "../../../../components/CustomContainer";

export const GroupContactContext = React.createContext([]);


export default function Contacts() {
    const {themeStretch} = useSettings();
    const {isLoading, data, isError, refetch} = useQuery(['contacts'], getAllGroup, {
        cacheTime: 0
    });

    console.log(data?.data.items)

    return (
        <Page title="مخاطبین">
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'گروه های مخاطبین'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                    <GroupContactContext.Provider value={data?.data?.items ?? []}>
                        <GroupNestedList data={isError ? [] : data?.data.items}
                                         refetch={refetch} isLoading={isLoading}/>
                    </GroupContactContext.Provider>
            </CustomContainer>
        </Page>
    );
}
