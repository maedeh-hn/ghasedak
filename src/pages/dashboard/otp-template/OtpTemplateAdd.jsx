import React from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import CustomContainer from "../../../components/CustomContainer";
import useSettings from "../../../hooks/useSettings";
import OtpTemplateAddEditForm from "../../../sections/@dashboard/otp-template/components/OtpTemplateAddEditForm";
import {Card} from "@mui/material";
import CustomCard from "../../../components/CustomCard";

const OtpTemplateAdd = () => {

    const {themeStretch} = useSettings()

    return (
        <>
            <Page title={ 'اضافه کردن قالب'}>
                <HeaderBreadcrumbs
                    links={[
                        {name: 'داشبورد', href: PATH_DASHBOARD.root},
                        {name: 'سرویس اعتبارسنجی', href: PATH_DASHBOARD.otpTemplate.root},
                        {name:  'اضافه کردن'}]}
                />
                <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                    <CustomCard>
                       <OtpTemplateAddEditForm/>
                    </CustomCard>
                </CustomContainer>
            </Page>
        </>
    )
}

export default OtpTemplateAdd
