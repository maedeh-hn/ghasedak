import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, useTheme } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import Gravatar from "react-gravatar";
import CustomMenuItem from "../../../components/CustomMenuItem";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'پروفایل',
    linkTo: '/dashboard/user/account',
  },
  {
    label: 'خانه',
    linkTo: '/',
  },
  // {
  //   label: 'Profile',
  //   linkTo: PATH_DASHBOARD.user.profile,
  // },
  // {
  //   label: 'Settings',
  //   linkTo: PATH_DASHBOARD.user.account,
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('خروج ناموفق!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Gravatar
            email={user?.email || 'default@gmail.com'}
            default={'mp'}
            size={40}
            style={{
              borderRadius: '50%',
              // margin: '20px auto',
            }}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: '0.75',
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>
          <Typography fontSize={'13px'} sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider sx={{ borderStyle: 'dashed' }} />

        <Box>
          <CustomMenuItem
            component={RouterLink}
            to={'/dashboard/home'}
            onClick={handleClose}
            sx={{ m: 1, '&:hover': { backgroundColor: `${theme.palette.primary.lighter} !important` } }}
          >
            خانه
          </CustomMenuItem>
          <CustomMenuItem
            component={RouterLink}
            to={'/dashboard/user/account?active=notifications'}
            onClick={handleClose}
            sx={{ m: 1, '&:hover': { backgroundColor: `${theme.palette.primary.lighter} !important` } }}
          >
            تنظیمات
          </CustomMenuItem>
          <CustomMenuItem
            component={RouterLink}
            to={'/dashboard/user/account?active=general'}
            onClick={handleClose}
            sx={{ m: 1, '&:hover': { backgroundColor: `${theme.palette.primary.lighter} !important` } }}
          >
            پروفایل
          </CustomMenuItem>
          <CustomMenuItem
            onClick={handleLogout}
            sx={{ m: 1, '&:hover': { backgroundColor: `${theme.palette.primary.lighter} !important` } }}
          >
            خروج
          </CustomMenuItem>
        </Box>
      </MenuPopover>
    </>
  );
}
