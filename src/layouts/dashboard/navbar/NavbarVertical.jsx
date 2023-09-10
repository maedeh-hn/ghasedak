import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// @mui
import {alpha, styled, useTheme} from '@mui/material/styles';
import {Box, Stack, Drawer, Typography, Button} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {NAVBAR} from '../../../config';
// component
import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar';
import {NavSectionVertical} from '../../../components/nav-section';
//
import navConfig from './NavConfig';
import CollapseButton from './CollapseButton';
import ChargeAccountModal from "../../../sections/@dashboard/charge-account/components/modal/ChargeAccountModal";
import useAuth from "../../../hooks/useAuth.jsx";
import Iconify from "../../../components/Iconify.jsx";
import {numberWithCommas} from "src/utils/functions";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        height: '100%',
        flexShrink: 0,
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.shorter,
        }),
    },
}));

// ----------------------------------------------------------------------
NavbarVertical.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({isOpenSidebar, onCloseSidebar}) {
    const theme = useTheme();

    const {user} = useAuth()

    const {pathname} = useLocation();

    const isDesktop = useResponsive('up', 'lg');

    const {isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave} =
        useCollapseDrawer();

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    const [chargeModal, setChargeModal] = useState({
        open: false,
        data: null
    })

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {height: 1, display: 'flex', flexDirection: 'column'},
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 2.5,
                    flexShrink: 0,
                    ...(isCollapse && {alignItems: 'center'}),
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Logo/>

                        {!isDesktop && (
                            <Stack flexDirection={'column'}>
                                <Typography fontWeight={'600'} fontSize={'20px !important'} direction={'rtl'}>
                                    قاصدک
                                </Typography>
                                <Typography direction={'rtl'}>سامانه ارتباطات</Typography>
                            </Stack>
                        )}
                    </Stack>

                    {isDesktop && !isCollapse && (
                        <>
                            <Stack flexDirection={'column'}>
                                <Typography variant={'title'} fontWeight={'600'} color={theme.palette.grey[900]}
                                            fontSize={'20px !important'} direction={'rtl'}>
                                    قاصدک
                                </Typography>
                                <Typography>سامانه ارتباطات</Typography>
                            </Stack>
                            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick}/>
                        </>
                    )}
                </Stack>
                {/*{!isDesktop && (*/}
                {/*    <NavbarAccount isCollapse={isCollapse}/>*/}
                {/*)}*/}
                {/*{isDesktop && !isCollapse && (*/}
                {/*    <>*/}
                {/*        <NavbarAccount isCollapse={isCollapse}/>*/}
                {/*        /!*<CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />*!/*/}
                {/*    </>*/}
                {/*)}*/}

            </Stack>
            <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse}/>
            <Box sx={{
                marginTop: {md: 4, xs: 4},
                width: '80%',
                ml: 3,
                backgroundColor: theme.palette.grey[100],
                position: 'relative',
                borderColor: theme.palette.secondary.light,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                borderRadius: '12px',
                zIndex: 2,
                paddingX: '12px',
                marginBottom: '12px'
            }}>

                <Box sx={{
                    left: 80,
                    top: -25,
                    width: 50,
                    height: 50,
                    borderRadius: '100%',
                    backgroundColor: 'white',
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                    position: 'absolute',
                    zIndex: 1,
                    boxShadow: (theme) => theme.customShadows.secondary,
                }}>
                    <Stack sx={{
                        height: '100%'
                    }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Iconify icon="solar:wallet-linear" width={30} height={30}
                                 color={theme => theme.palette.warning.main}/>

                    </Stack>
                </Box>
                <Stack marginTop={4} justifyContent={'center'} alignItems={'center'}>
                    <Typography fontSize={18} color={theme.palette.secondary.main} sx={{textAlign: 'left'}}>
                        موجودی:
                    </Typography>
                    <Typography fontSize={16} color={theme.palette.grey[900]}
                                sx={{textAlign: 'left', m: 1}}>
                        {numberWithCommas(user.credit)} ریال
                    </Typography>

                </Stack>

                <Box sx={{mb: '12px'}}>
                    <Button fullWidth variant={'contained'} color={'secondary'} onClick={() => {
                        setChargeModal({
                            open: true,
                            data: null
                        })
                    }}>
                        افزایش اعتبار
                    </Button>
                    {
                        chargeModal.open && <ChargeAccountModal state={chargeModal} setState={setChargeModal}/>
                    }
                </Box>
            </Box>

        </Scrollbar>
    );

    return (
        <RootStyle
            sx={{
                width: {
                    lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
                },
                ...(collapseClick && {
                    position: 'absolute',
                }),
            }}
        >
            {!isDesktop && (
                <Drawer open={isOpenSidebar} onClose={onCloseSidebar}
                        PaperProps={{sx: {width: NAVBAR.DASHBOARD_WIDTH}}}>
                    {renderContent}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                    PaperProps={{
                        sx: {
                            width: NAVBAR.DASHBOARD_WIDTH,
                            borderRightStyle: 'dashed',
                            bgcolor: 'background.default',
                            transition: (theme) =>
                                theme.transitions.create('width', {
                                    duration: theme.transitions.duration.standard,
                                }),
                            ...(isCollapse && {
                                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
                            }),
                            ...(collapseHover && {
                                ...cssStyles(theme).bgBlur(),
                                boxShadow: (theme) => theme.customShadows.z24,
                            }),
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}
