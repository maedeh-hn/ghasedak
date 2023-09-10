import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

// @mui
import {useTheme} from '@mui/material/styles';
import {Box, Card, Container, Grid, Tab, Tabs, Typography} from '@mui/material';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingWidget from '../../../components/LoadingWidget';
//routes
import {PATH_DASHBOARD} from '../../../routes/paths';
import Page from '../../../components/Page';
import {useQuery} from '@tanstack/react-query';

//sections
import {getLineSettings} from 'src/services/lines/line-settings';
import CustomContainer from "../../../components/CustomContainer";
import useSettings from "../../../hooks/useSettings";
import LineContextSetting from "../../../sections/@dashboard/line/LineSettingPart/LineContextSetting";
import {useSelector} from "react-redux";
import CustomCard from "../../../components/CustomCard";

const LineSetting = () => {
    const {lineId} = useParams();
    const lines = useSelector((state) => state.line).lines
    const line = lines.find(({id}) => id == lineId)
    //state
    const [settingData, setSettingData] = useState();
    const {themeStretch} = useSettings();

    const {
        isLoading,
        data: lineSettingData,
    } = useQuery(['lineSettingData', lineId], () => getLineSettings(lineId));

    const updateTableData = () => {
        if (lineSettingData) {
            setSettingData(lineSettingData.data);
        }
    };
    useEffect(() => {
        updateTableData();
    }, [lineSettingData]);


    return (
        <>
            <Page title={'تنظیمات خط'}>
                <HeaderBreadcrumbs
                    links={[
                        {name: 'داشبورد', href: PATH_DASHBOARD.root},
                        {name: 'لیست خطوط', href: PATH_DASHBOARD.lines.root},
                        {name: line?.number, href: PATH_DASHBOARD.lines.root},
                        {name: 'تنظیمات خط'},
                    ]}
                />
                <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                    {!isLoading ? (
                        <>
                            {settingData ? (
                                <CustomCard>
                                    <LineContextSetting settingData={settingData}/>
                                </CustomCard>
                            ) : (
                                <CustomCard sx={{borderRadius: '5px'}}>
                                    <Typography color="error">برای این خط تنظیماتی وجود ندارد.</Typography>
                                </CustomCard>
                            )}
                        </>
                    ) : (
                        <LoadingWidget/>
                    )}
                </CustomContainer>
            </Page>
        </>
    );
};

export default LineSetting;
