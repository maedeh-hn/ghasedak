import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
// components
// import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//services
// import {
//     getGroupNumbersByGroupId
// } from 'src/services/contact/group-number';
//routes
// import {PATH_DASHBOARD} from '../../../../routes/paths';
// import Page from '../../../../components/Page';
import {useQuery} from '@tanstack/react-query';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';

import CustomPagination from '../../../../components/CustomPagination';
import CustomContainer from '../../../../components/CustomContainer';
import {getGroupNumbersByGroupIdParent} from "../../../../services/contact/group-number"
import GroupNumberTableParent from '../../../../sections/@dashboard/contact/group-number/table/GroupNumberTableParent';
// import useSettings from '../../../../hooks/useSettings';
// import GroupNumberTable from '../../../../sections/@dashboard/contact/group-number/table/GroupNumberTable';
// import CustomContainer from '../../../../components/CustomContainer';
// import CustomPagination from "../../../../components/CustomPagination";

const GroupNumbersParent = () => {
    const params = useParams();
    console.log(params);

    const [filterValue, setFilterValue] = useState({
        UserId:params.userId,
        GroupId: params.GroupId,
        PageIndex: 1,
        PageSize: 5,
    });

    const {themeStretch} = useSettings();

    const {isLoading, data, refetch} = useQuery(['GroupNumberParent', filterValue], () =>
        getGroupNumbersByGroupIdParent(filterValue)
    );
console.log(data);
    return (
        <Page title={'لیست مخاطبین'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    // {name: 'گروه های مخاطبین', href: PATH_DASHBOARD.contacts.root},
                    { name: 'مدیریت زیرکاربران', href: PATH_DASHBOARD.userManagement.root },
                    { name:params.userName, href: `${PATH_DASHBOARD.userManagement.view(params.userName, params.userId)}?active=contacts` },
                    { name:"مخاطبین", href: `${PATH_DASHBOARD.userManagement.view(params.userName, params.userId)}?active=contacts` },
                    {name: 'لیست شماره تلفن ها'},
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <GroupNumberTableParent
                    data={data?.data?.items || []}
                    refetch={refetch}
                    filters={{
                        filterValue: filterValue,
                        setFilterValue: setFilterValue,
                    }}
                    isLoading={isLoading}
                />
                <CustomPagination
                    totalPage={(data && data?.data?.totalPages) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    totalCount={(data && data?.data?.totalCount) || 0}
                />
            </CustomContainer>
        </Page>
    );
}

export default GroupNumbersParent