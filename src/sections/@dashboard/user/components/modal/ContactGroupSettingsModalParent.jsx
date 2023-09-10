import {Box, Tab, Tabs} from "@mui/material";
import React, {useState} from "react";
// import {getContactGroupSettingsById} from "src/services/contact/groupSettings";


import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import BaseStyleScrollModal from "../../../../../components/modal/BaseStyleScrollModal";
import useTabsNew from "../../../../../hooks/useTabsNew";
import Iconify from "../../../../../components/Iconify";

import AutoRegisterFormParent from "../../../contact/group/components/modal/group-settings/AutoRegisterFormParent";
import {getContactGroupSettingsParent} from "../../../../../services/contact/group-settings"
import CancelAutoRegisterFormParent from "../../../contact/group/components/modal/group-settings/CancelAutoRegisterFormParent";
// import AutoRegisterForm from "../../../contact/group/components/modal/group-settings/AutoRegisterForm";
// import CancelAutoRegisterForm from "../../../contact/group/components/modal/group-settings/CancelAutoRegisterForm";
// import BaseStyleScrollModal from "../../../../../../components/modal/BaseStyleScrollModal";
// import useTabs from "../../../../../../hooks/useTabs";
// import Iconify from "../../../../../../components/Iconify";
// import AutoRegisterForm from "./AutoRegisterForm";
// import CancelAutoRegisterForm from "./CancelAutoRegisterForm";
// import LoadingWidget from "../../../../../../components/LoadingWidget";
// import Error from "../../../../../../components/Error";


const ContactGroupSettingsModalParent = ({state, setOpen}) => {
    const {userId} = useParams();

    const {currentTab, onChangeTab} = useTabsNew('AutoRegister', 'subActive');
    const INITIAL_VALUES = {
        UserId:userId,
        Id:state.group_id
    };
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);

    const {
        isLoading,
        data,
        isError
    } = useQuery(['GroupSetting', filterValue], () => getContactGroupSettingsParent(filterValue), {
        staleTime: 0,
        cacheTime: 0
    });
    const handleClose = () => {
        setOpen({
            show: false,
            group_id: 0
        })
    }
    const ACCOUNT_TABS = [
        {
            value: 'AutoRegister',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <AutoRegisterFormParent item={{...data?.data, groupId: state.group_id}} close={handleClose} userId={userId}/>,
            label: 'عضویت خودکار'
        },
        {
            value: 'CancelAutoRegister',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20}/>,
            component: <CancelAutoRegisterFormParent item={{...data?.data, groupId: state.group_id}} close={handleClose} userId={userId}/>,
            label: 'لغو عضویت خودکار'
        },
    ];


    return (
        <BaseStyleScrollModal show={state.show} handleClose={handleClose}
                              title={'تنظیمات گروه'}>
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

                {ACCOUNT_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                    })}

            </>

        </BaseStyleScrollModal>
    );
}

export default ContactGroupSettingsModalParent;
