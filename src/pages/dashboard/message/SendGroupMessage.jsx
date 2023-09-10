import {Card} from '@mui/material';
import React from 'react';
import useSettings from '../../../hooks/useSettings';
import CustomContainer from '../../../components/CustomContainer';
import Page from '../../../components/Page';
import {PATH_DASHBOARD} from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import SendGroupSmsForm from "../../../sections/@dashboard/message/SendGroupSmsForm";
import CustomCard from "../../../components/CustomCard";

export const GroupContactContextSend = React.createContext([]);

const SendGroupMessage = () => {
    const {themeStretch} = useSettings();
    return (
        <Page title={'ارسال پیام'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'ارسال پیام'},
                    {name: 'ارسال پیام گروهی'}
                ]}
            />

            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <CustomCard>
                    <SendGroupSmsForm/>
                </CustomCard>
            </CustomContainer>
        </Page>
    );
}

export default SendGroupMessage;
