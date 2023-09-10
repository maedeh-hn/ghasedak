import PropTypes from 'prop-types';
import {noCase} from 'change-case';
import {useEffect, useState} from 'react';
// @mui
import {
    Box,
    List,
    Badge,
    Button,
    Avatar,
    Tooltip,
    Divider,
    Typography,
    ListItemText,
    ListSubheader,
    ListItemAvatar,
    ListItemButton, Stack,
} from '@mui/material';
// utils
import {fDateTimeJalali, fToNow} from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import {IconButtonAnimate} from '../../../components/animate';
import {useTheme} from "@mui/material/styles";

// ----------------------------------------------------------------------
import * as signalR from '@microsoft/signalr'
import {PATH_DASHBOARD} from "../../../routes/paths";
import {useNavigate} from "react-router";

export default function NotificationsPopover() {
    const accessToken = window.localStorage.getItem('accessToken');

    const navigate = useNavigate()

    let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_SOCKET_URL}/Notification/`, {
                withCredentials: false, accessTokenFactory: () => `${accessToken}`
            }
        )
        .build();
    const [notifications, setNotifications] = useState([]);
    const [notifCount, setNotifCount] = useState(0);

    const theme = useTheme();


    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };


    const playSound = (music_path) => {
        const audio = new Audio(music_path);
        audio.addEventListener('canplaythrough', (event) => {
            // the audio is now playable; play it if permissions allow
            audio.play();
        });
    };

    useEffect(url => {
        connection.on("NewNotification", (message) => {
            switch (message.category) {
                case 3:
                    playSound('/notif/danger.wav')
                    break;
                case 2:
                    playSound('/notif/danger.wav')
                    break;
                default:
                    playSound('/notif/info.wav')
                    break;
            }
            setNotifCount(prevState => prevState + 1)
        });
        connection.start().then(() => connection.invoke('LoadNotifications').then(r => setNotifCount(r.total)))
    }, [])

    return (
        <Stack spacing={0.75} bgcolor={theme.palette.grey[500_12]} borderRadius={theme.borderRadius}>
            <IconButtonAnimate color={open ? 'primary' : 'default'} onClick={(event) => {
                connection.start().then(() => {
                    connection.invoke('LoadNotifications').then(r => {
                        setNotifications(r.notifications)
                        connection.invoke('SeenNotifications', ...notifications.map(item => item.id))
                    })
                })
                handleOpen(event)
            }} sx={{width: 40, height: 40}}>
                <Badge badgeContent={notifCount} color="error">
                    <Iconify icon="eva:bell-fill" width={20} height={20}/>
                </Badge>
            </IconButtonAnimate>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{width: 360, p: 0, mt: 1.5, ml: 0.75}}
            >
                <Scrollbar sx={{height: {xs: 340, sm: 'auto'}}}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{py: 1, px: 2.5, typography: 'overline'}}>
                                پیام ها
                            </ListSubheader>
                        }
                    >
                        {notifications.map((notification) => (
                            <NotificationItem  key={notification.id} notification={notification}/>
                        ))}
                    </List>
                </Scrollbar>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <Box sx={{p: 1}}>
                    <Button fullWidth disableRipple onClick={() => {
                        handleClose()
                        navigate(PATH_DASHBOARD.notification.root)
                    }}>
                        نمایش همه
                    </Button>
                </Box>
            </MenuPopover>
        </Stack>
    );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
    notification: PropTypes.shape({
        createdAt: PropTypes.instanceOf(Date),
        id: PropTypes.string,
        isUnRead: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        avatar: PropTypes.any,
    }),
};
const categoryIcon = (type) => {
    switch (type) {
        case 0:
            return <Iconify icon={'material-symbols:info-outline-rounded'} color={theme => theme.palette.info.main}/>
            break;
        case 2:
            return <Iconify icon={'material-symbols:warning-outline'} color={theme => theme.palette.warning.main}/>
            break;
        case 3:
            return <Iconify icon={'ic:round-dangerous'} color={theme => theme.palette.error.main}/>
            break;
    }
}
function NotificationItem({notification}) {
    const {avatar, title} = renderContent(notification);
    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected',
                }),
            }}
        >
            <ListItemAvatar>
                {categoryIcon(notification?.category)}
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled',
                        }}
                    >
                        {/*<Iconify icon="eva:clock-outline" sx={{mr: 0.5, width: 16, height: 16}}/>*/}
                        {fDateTimeJalali(notification.sendDate)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
        </Typography>
    );

    if (notification.category == '1') {
        return {
            avatar: (
                <img
                    alt={notification.title}
                    src="/icons/ic_info.svg"
                />
            ),
            title,
        };
    }
    if (notification.category == '2') {
        return {
            avatar: (
                <img
                    alt={notification.title}
                    src="/icons/ic_info.svg"
                />
            ),
            title,
        };
    }
    if (notification.category == '3') {
        return {
            avatar: (
                <img
                    alt={notification.title}
                    src="/icons/ic_danger.svg"
                />
            ),
            title,
        };
    }
    return {
        avatar: notification.avatar ? <img alt={notification.title} src={'#'}/> : null,
        title,
    };
}
