import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import { NavListRoot } from './NavList';
import { useState } from "react";

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
    ({ theme }) => ({
        ...theme.typography.overline,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        color: theme.palette.text.primary,
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shorter,
        }),
    })
);

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
    isCollapse: PropTypes.bool,
    navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }) {

    const [openMenu, setOpenMenu] = useState('')


    return (
        <Box {...other}>
            {navConfig.map((group) => (
                <List key={group.subheader} disablePadding sx={{ px: 2 }}>
                    <ListSubheaderStyle
                        sx={{
                            ...(isCollapse && {
                                opacity: 0,
                            }),
                        }}
                    >
                        {group.subheader}
                    </ListSubheaderStyle>


                    {group.items
                        .filter((list) => {
                            if (localStorage.getItem("panelType") !== "2") {
                                return list.title !== 'مدیریت زیر‌کاربران'
                            }
                            return list
                        })
                        .map((list) => (
                            <NavListRoot
                                key={list.title}
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}
                                list={list}
                                isCollapse={isCollapse}
                            />
                        ))}
                    {/* {group.items.map((list) => (
                   
                        <NavListRoot key={list.title} openMenu={openMenu} setOpenMenu={setOpenMenu} list={list} isCollapse={isCollapse}/>
                    ))} */}
                </List>
            ))}
        </Box>
    );
}
