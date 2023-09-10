import React, {useState, useEffect} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
// @mui
import {useTheme} from '@mui/material/styles';
import {Box, Container, Card, Tab, Tabs, Typography, Alert} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';

// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

//routes
import {PATH_DASHBOARD} from '../../../routes/paths';
import Page from '../../../components/Page';
import CustomContainer from "../../../components/CustomContainer";
import useSettings from "../../../hooks/useSettings";
import {useSelector} from "react-redux";
import LineContextOwner from "../../../sections/@dashboard/line/lineownerShip/LineContextOwner";
import CustomCard from "../../../components/CustomCard";

// ----------------------------------------------------------------------
const LineOwner = () => {
    const {lineId} = useParams()
    const lines = useSelector((state)=> state.line).lines
    const line = lines.find(({id}) => id == lineId)
    const {themeStretch} = useSettings();
console.log(line);
    return (
        <>
            <Page title={'اطلاعات مالکیت خط'}>
                <HeaderBreadcrumbs
                    links={[
                        {name: 'داشبورد', href: PATH_DASHBOARD.root},
                        {name: 'لیست خطوط', href: PATH_DASHBOARD.lines.root},
                        {name: line?.number, href: PATH_DASHBOARD.lines.root},
                        {name: 'اطلاعات مالکیت خط'},
                    ]}
                />
                <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                    <CustomCard>
                        {
                            (line?.ghasedakConfirmationStatus != 1 && line?.confirmationDescriptionByGhasedak) &&  <Alert severity={'error'}>
                                {line.confirmationDescriptionByGhasedak}
                            </Alert>
                        }
                        {
                            line && <LineContextOwner line={line} />
                        }
                    </CustomCard>
                </CustomContainer>
            </Page>
        </>
    );
};

export default LineOwner;
