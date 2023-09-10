import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//services
import {
    getGroupNumbersByGroupId
} from 'src/services/contact/group-number';
//routes
import {PATH_DASHBOARD} from '../../../../routes/paths';
import Page from '../../../../components/Page';
import {useQuery} from '@tanstack/react-query';
import useSettings from '../../../../hooks/useSettings';
import GroupNumberTable from '../../../../sections/@dashboard/contact/group-number/table/GroupNumberTable';
import CustomContainer from '../../../../components/CustomContainer';
import CustomPagination from "../../../../components/CustomPagination";

const GroupNumbers = () => {
    const {id: groupId} = useParams();

    const [filterValue, setFilterValue] = useState({
        GroupId: groupId,
        PageIndex: 1,
        PageSize: 5,
    });

    const {themeStretch} = useSettings();

    const {isLoading, data, refetch} = useQuery(['GroupNumber', filterValue], () =>
        getGroupNumbersByGroupId(filterValue)
    );

    return (
        <Page title={'لیست مخاطبین'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گروه های مخاطبین', href: PATH_DASHBOARD.contacts.root},
                    {name: 'لیست شماره تلفن ها'},
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <GroupNumberTable
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

export default GroupNumbers