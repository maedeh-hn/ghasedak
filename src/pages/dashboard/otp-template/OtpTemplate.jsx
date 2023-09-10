import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import OtpTemplateTable from '../../../sections/@dashboard/otp-template/table/OtpTemplateTable';
import {useQuery} from '@tanstack/react-query';
import {getAllOtpTemplate} from 'src/services/smsRequestManagement/otpTemplate';

const INITIAL_VALUES = {
    PageIndex: 1,
    PageSize: 5,
};
const OtpTemplate = () => {
    const {themeStretch} = useSettings();
    const [filterValues, setFilterValues] = useState(INITIAL_VALUES);
    const {isLoading, data, refetch} = useQuery(['OtpTemplateList',filterValues], ()=> getAllOtpTemplate(filterValues));
    console.log(data)
    return (
        <Page title={'کلید شناسه'}>
            <HeaderBreadcrumbs links={[
                {name: 'داشبورد', href: PATH_DASHBOARD.root},
                {name: 'سرویس اعتبارسنجی'}
            ]}/>
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                <OtpTemplateTable data={data ? data?.data : []} refetch={refetch} isLoading={isLoading} filters={{
                    filterValues,
                    setFilterValues,
                }}/>
            </CustomContainer>
        </Page>
    );
};

export default OtpTemplate;
