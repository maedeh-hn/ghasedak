import {Card} from '@mui/material';
import React from 'react';
import useSettings from '../../../hooks/useSettings';
import CustomContainer from '../../../components/CustomContainer';
import Page from '../../../components/Page';
import {PATH_DASHBOARD} from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import SendFastSmsForm from '../../../sections/@dashboard/message/SendFastSmsForm';
import CustomCard from "../../../components/CustomCard";

export const GroupContactContextSend = React.createContext([]);

function SendFastMessage() {
    const {themeStretch} = useSettings();
    return (
        <Page title={'ارسال پیام'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'ارسال پیام'},
                    {name: 'ارسال پیام تکی'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <CustomCard>
                    <SendFastSmsForm/>
                </CustomCard>
            </CustomContainer>
        </Page>
    );
}

export default SendFastMessage;
