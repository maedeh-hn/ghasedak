// @mui
import {Box, Button, Container, Tab, Tabs} from '@mui/material';
import {createContext, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
// import {getLineByLineId} from 'src/services/lines/line';
// import useSettings from '../../../hooks/useSettings';
// components
// import Page from '../../../components/Page';
// import useTabs from '../../../hooks/useTabs';
// import Iconify from '../../../components/Iconify';
// import LineGeneralUsers from '../../../sections/@dashboard/lines/tabs/general/LineGeneralUsers';
// import LineGeneralOwner from '../../../sections/@dashboard/lines/tabs/general/LineGeneralOwner';
// import {saveLine} from '../../../redux/slices/lineData';
import {store} from '../../../redux/store';
// import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import LoadingWidget from "../../../components/LoadingWidget";
// import useTabsNew from '../../../hooks/useTabsNew';

import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingWidget from '../../../components/LoadingWidget';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Iconify from '../../../components/Iconify';
import useTabsNew from '../../../hooks/useTabsNew';
import LineGeneralDetails from '../../../sections/@dashboard/line/tabs/general/LineGeneralDetails';
import { getLineByLineId } from '../../../services/lines/lines';
import { saveLine } from '../../../redux/slices/lineData';
import LineGeneralUsers from '../../../sections/@dashboard/line/tabs/general/LineGeneralUsers';
// ----------------------------------------------------------------------
export const LineDataContext = createContext({});

const UserLineDetail = () => {
    const {themeStretch} = useSettings();
    const {username, userId, lineId, lineNumber} = useParams();
    const {isLoading, data} = useQuery(['lineDetails', lineId], () => getLineByLineId(lineId));

    const {currentTab, onChangeTab} = useTabsNew('lineDetails');

    useEffect(() => {
        if (data) {
            store.dispatch(saveLine({...data}));
        }
    }, [data]);

    const ACCOUNT_TABS = [
        {
            value: 'lineDetails',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <LineGeneralDetails/>,
            label: 'اطلاعات خط',
        },
        {
            value: 'lineUsers',
            icon: <Iconify icon={'ic:round-receipt'} width={20} height={20}/>,
            component: <LineGeneralUsers/>,
            label: 'کاربران',
        },
        // {
        //     value: 'owner',
        //     icon: <Iconify icon={'clarity:users-solid'} width={20} height={20}/>,
        //     component: <LineGeneralOwner/>,
        //     label: 'مالکیت',
        // },
    ];
    return (
        <Page title="مدیریت کاربران">
            <HeaderBreadcrumbs
                links={[
                    { name: 'داشبورد', href: PATH_DASHBOARD.root },
                    { name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root },
                    { name: username , href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=lines` },
                    { name: `خط ${lineNumber}`, href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=lines` },
                    { name: 'ویرایش' },
                ]}
            />
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Tabs
                        allowScrollButtonsMobile
                        variant="scrollable"
                        scrollButtons="auto"
                        value={currentTab}
                        onChange={onChangeTab}
                    >
                        {ACCOUNT_TABS.map((tab) => (
                            <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value}/>
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{mb: 3}}/>
                <LineDataContext.Provider value={data}>
                    {
                        isLoading ? <LoadingWidget /> : ACCOUNT_TABS.map((tab) => {
                            const isMatched = tab.value === currentTab;
                            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                        })
                    }
                </LineDataContext.Provider>
            </Container>
        </Page>
    );
};

export default UserLineDetail;
