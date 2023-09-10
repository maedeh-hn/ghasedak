import React from "react";
import Page from "../../../components/Page";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import CustomContainer from "../../../components/CustomContainer";
import useSettings from "../../../hooks/useSettings";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import OtpTemplateAddEditForm from "../../../sections/@dashboard/otp-template/components/OtpTemplateAddEditForm";
import {Card, LinearProgress} from "@mui/material";
import {getOtpTemplateById} from "src/services/smsRequestManagement/otpTemplate";
import CustomCard from "../../../components/CustomCard";

const OtpTemplateEdit = () => {

    const {templateId} = useParams()

    const {themeStretch} = useSettings()

    const {
        isLoading,
        data,
    } = useQuery(['OtpTemplateById', templateId], () => getOtpTemplateById(templateId));

    return (
        <Page title={templateId ? 'ویرایش قالب' : 'اضافه کردن قالب'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'سرویس اعتبارسنجی', href: PATH_DASHBOARD.otpTemplate.root},
                    {name: templateId ? 'ویرایش' : 'اضافه کردن'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <CustomCard>
                    {
                        isLoading ? <LinearProgress/> : <OtpTemplateAddEditForm data={data?.data}/>
                    }
                </CustomCard>
            </CustomContainer>
        </Page>
    )
}

export default OtpTemplateEdit
