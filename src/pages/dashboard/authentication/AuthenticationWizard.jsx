import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import React from "react";
import CustomContainer from "../../../components/CustomContainer";
import {Card, LinearProgress, Tab, Tabs} from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import InfoForm from "../../../sections/@dashboard/authentication/InfoForm";
import ImageUploadForm from "../../../sections/@dashboard/authentication/ImageUploadForm";
import VideoUploadForm from "../../../sections/@dashboard/authentication/VideoUploadForm";
import {Stack} from "@mui/material";
import VerifyAuthCodeForm from "../../../sections/@dashboard/authentication/VerifyAuthCodeForm";
import {useQuery} from "@tanstack/react-query";
import {getAuthenticationInfo} from "../../../services/authentication/authentication";


const AuthenticationWizard = () => {
    const {currentTab, onChangeTab} = useTabs('info');

    const {data, isLoading} = useQuery(['getAuthenticationInfo'], getAuthenticationInfo)

    const ACCOUNT_TABS = [
        {
            value: 'info',
            icon: <></>,
            component: <InfoForm data={data}/>,
            label: 'اطلاعات هویتی',
        },
        {
            value: 'images',
            icon: <></>,
            component: <ImageUploadForm data={data}/>,
            label: 'اپلود تصاویر',
        },
        {
            value: 'videos',
            icon: <></>,
            component: <VideoUploadForm data={data}/>,
            label: 'اپلود ویدیو',
        },
        {
            value: 'verify',
            icon: <></>,
            component: <VerifyAuthCodeForm data={data}/>,
            label: 'تایید',
        }
    ];
    console.log(data)

    return (
        <Page>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'احراز هویت', href: PATH_DASHBOARD.smsReport.groupSms}
                ]}/>
            <CustomContainer>
                <Card>
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
                    {isLoading ? <LinearProgress /> :  ACCOUNT_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return isMatched && <Stack marginY={2} key={tab.value}>{tab.component}</Stack>;
                    })}
                </Card>
            </CustomContainer>
        </Page>
    )
}

export default AuthenticationWizard;