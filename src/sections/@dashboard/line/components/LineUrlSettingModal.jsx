import React from 'react';
import {Tab, Tabs} from '@mui/material';
import {useParams} from 'react-router-dom';
import {getLineSettingsByUserIdAndLineId} from "src/services/lines/lineSettings";
import {Box} from "@mui/system";
import {useQuery} from "@tanstack/react-query";
// import BaseStyleScrollModal from '../../../../../../components/modal/BaseStyleScrollModal';
// import LoadingWidget from "../../../../../../components/LoadingWidget";
// import Iconify from "../../../../../../components/Iconify";
// import useTabs from "../../../../../../hooks/useTabs";
// import ReceiveSettingForm from "./ReceiveSettingForm";
// import ReceiveStatusSettingForm from "./ReceiveStatusSettingForm";
import Iconify from '../../../../components/Iconify';
import BaseStyleScrollModal from '../../../../components/modal/BaseStyleScrollModal';
import LoadingWidget from '../../../../components/LoadingWidget';
import ReceiveSettingForm from './ReceiveSettingForm';
import ReceiveStatusSettingForm from './ReceiveStatusSettingForm';
import useTabs from '../../../../hooks/useTabs';

const LineUrlSettingModal = ({state, handleClose, data}) => {

    const {userId} = useParams();
    const {currentTab, onChangeTab} = useTabs('ReceiveSetting', 'subActive');
    const {
        isLoading,
        data:lineSetting,
    } = useQuery(['LineSettings', userId, data], () =>
        getLineSettingsByUserIdAndLineId(userId, data),
        {
            cacheTime: 0
        }
    );


    const ACCOUNT_TABS = [
        {
            value: 'ReceiveSetting',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <ReceiveSettingForm item={{...lineSetting?.data, groupId: data}} close={handleClose}/>,
            label: 'تنظیمات دریافت'
        },
        {
            value: 'ReceiveStatusSetting',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <ReceiveStatusSettingForm item={{...lineSetting?.data, groupId: data}} close={handleClose}/>,
            label: 'تنظیمات دریافت وضعیت'
        },
    ];


    return (
        <BaseStyleScrollModal title={'تنظیمات فراخوانی'} handleClose={handleClose} show={state}>
            <>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={currentTab}
                    onChange={onChangeTab}
                >
                    {ACCOUNT_TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value}/>
                    ))}
                </Tabs>

                {
                    isLoading ? <LoadingWidget/> : ACCOUNT_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                    })
                }

            </>
        </BaseStyleScrollModal>
    );
};
export default LineUrlSettingModal;
