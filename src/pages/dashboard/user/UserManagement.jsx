// // @mui
// import {Container} from '@mui/material';
// // components
// import Page from 'src/components/Page';
// import React, {useState} from 'react';
// import {useQuery} from '@tanstack/react-query';
import {searchSubUser} from '../../../services/users/user';
// import CustomPagination from 'src/components/CustomPagination';
// import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
// import UsersTableHeader from '../../../sections/@dashboard/users/table/user/UsersTableHeader';
// import UsersTable from '../../../sections/@dashboard/users/table/user/UsersTable';
// import useSettings from '../../../hooks/useSettings';
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import useAuth from 'src/hooks/useAuth';
// import { useSearchParams } from 'react-router-dom';
// import { useEffect } from 'react';

import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import Page from "../../../components/Page";
import UsersTable from "../../../sections/@dashboard/user/components/table/users/UsersTable";
import UsersTableHeader from "../../../sections/@dashboard/user/components/table/users/UsersTableHeader";
import CustomPagination from "../../../components/CustomPagination";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

const INITIAL_VALUES = {
    Name: '',
    Mobile: '',
    LineNumber: '',
    StartDate: '',
    EndDate: '',
    Status: '-1',
    PageIndex: '1',
    PageSize: '5',
};

const UserManagement = () => {
    const {themeStretch} = useSettings();
    
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    
    const {data, isLoading, refetch} = useQuery(['searchSubUser', filterValue], () => searchSubUser(filterValue));
    const {login} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
console.log(filterValue);
    // useEffect(async () => {
    //     const access = searchParams.get('access');
    //     const refresh = searchParams.get('refresh');
    //     await login(access, refresh);
    // }, [searchParams]);
    return (

        <Page title="مدیریت زیرکاربران">
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'مدیریت زیرکاربران', href: PATH_DASHBOARD.userManagement.root},
                ]}
            />
            <Container
                maxWidth={themeStretch ? false : 'lg'}
            >
                <UsersTableHeader />
                <UsersTable
                    data={data?.items}
                    
                    filters={{
                        filterValue,
                        setFilterValue,
                    }}
                    isLoading={isLoading}
                />
                <CustomPagination
                    totalPage={(data && data?.totalPages) || 0}
                    totalCount={(data && data?.totalCount) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                />
            </Container>
        </Page>
    );
};

export default UserManagement;
