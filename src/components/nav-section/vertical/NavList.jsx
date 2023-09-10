import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// @mui
import {List, Collapse} from '@mui/material';
//
import {NavItemRoot, NavItemSub} from './NavItem';
import {getActive} from '..';

// ----------------------------------------------------------------------

NavListRoot.propTypes = {
    isCollapse: PropTypes.bool,
    list: PropTypes.object,
};

export function NavListRoot({list, isCollapse, openMenu, setOpenMenu}) {
    const {pathname} = useLocation();

    const active = getActive(list.path, pathname);

    const [open, setOpen] = useState(active && (openMenu === list.title));

    const hasChildren = list.children;

    useEffect(() => {
        openMenu === list.title ? setOpen(true) : setOpen(false)
    }, [openMenu])

    if (hasChildren) {
        return (
            <>
                <NavItemRoot item={list} isCollapse={isCollapse} active={active} open={open} onOpen={() => {
                    setOpenMenu(list.title)
                    setOpen(!open)
                }}/>

                {!isCollapse && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List
                            sx={{
                                ':hover': {borderRadius: '8px'},
                            }}
                            component="div"
                            disablePadding
                        >
                            {(list.children || []).map((item) => (
                                <NavListSub key={item.title} list={item}/>
                            ))}
                        </List>
                    </Collapse>
                )}
            </>
        );
    }

    return <NavItemRoot item={list} active={active} isCollapse={isCollapse}/>;
}

// ----------------------------------------------------------------------

NavListSub.propTypes = {
    list: PropTypes.object,
};

function NavListSub({list}) {
    const {pathname} = useLocation();

    const active = getActive(list.path, pathname);

    const [open, setOpen] = useState(active);

    const hasChildren = list.children;

    if (hasChildren) {
        return (
            <>
                <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active}/>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{pl: 3}}>
                        {(list.children || []).map((item) => (
                            <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname)}/>
                        ))}
                    </List>
                </Collapse>
            </>
        );
    }

    return <NavItemSub item={list} active={active}/>;
}
