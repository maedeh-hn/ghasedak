import React from 'react';

//services
import {getAllLines} from 'src/services/lines/lines';

//routes
import Page from '../../../components/Page';
import {useQuery} from '@tanstack/react-query';
import LineTable from "../../../sections/@dashboard/line/table/LineTable";
import useSettings from "../../../hooks/useSettings";
import CustomContainer from "../../../components/CustomContainer";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";

const LineListPage = () => {
    const {themeStretch} = useSettings();
    const {isLoading, data, refetch} = useQuery(['LineList'], getAllLines);
    console.log(data)
    return (
        <>
            <Page title={'لیست خطوط'}>
                <HeaderBreadcrumbs
                    links={[{name: 'داشبورد', href: PATH_DASHBOARD.root},
                        {name: 'مدیریت خطوط'},
                        {name: 'لیست خطوط'}
                    ]}
                />
                <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                    <LineTable data={data ? data.data : []} refetch={refetch} isLoading={isLoading}/>
                </CustomContainer>
            </Page>
        </>
    );
};

export default LineListPage;