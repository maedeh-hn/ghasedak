import {Box, Stack, Tab, Tabs} from '@mui/material';
import React from 'react';
import {getGroupSetting} from 'src/services/contact/group-settings';
import BaseStyleModal from '../../../../../../../components/modal/BaseStyleModal';
import {useQuery} from '@tanstack/react-query';
import useTabs from '../../../../../../../hooks/useTabs';
import Iconify from '../../../../../../../components/Iconify';
import AutoRegisterForm from './AutoRegisterForm';
import CancelAutoRegisterForm from './CancelAutoRegisterForm';
import LoadingWidget from '../../../../../../../components/LoadingWidget';

const GroupSettingsModal = ({state, setOpen}) => {
    const {currentTab, onChangeTab} = useTabs('AutoRegister');

    const {isLoading, data, isError} = useQuery(['GroupSetting', state.group_id], () =>
            getGroupSetting(state.group_id), {
            cacheTime: 0
        }
    );

    const handleClose = () => {
        setOpen({
            show: false,
            group_id: 0,
        });
    };

    const ACCOUNT_TABS = [
        {
            value: 'AutoRegister',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <AutoRegisterForm item={{...data?.data, groupId: state.group_id}} close={handleClose}/>,
            label: 'عضویت خودکار',
        },
        {
            value: 'CancelAutoRegister',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <CancelAutoRegisterForm item={{...data?.data, groupId: state.group_id}} close={handleClose}/>,
            label: 'لغو عضویت خودکار',
        },
    ];

    return (
        <BaseStyleModal show={state.show} handleClose={handleClose} title={'تنظیمات گروه'}>
            {isLoading && <LoadingWidget/>}
            {data && (
                <Stack spacing={1}>
                    <Tabs variant="scrollable" scrollButtons="auto" value={currentTab} onChange={onChangeTab}>
                        {ACCOUNT_TABS.map((tab) => (
                            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value}/>
                        ))}
                    </Tabs>

                    {ACCOUNT_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                    })}
                </Stack>
            )}
        </BaseStyleModal>
    );
};

export default GroupSettingsModal;
