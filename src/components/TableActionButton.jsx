import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { useTheme } from '@mui/system';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const TableActionButton = ({ title, icon, type, size = 25, onClick = () => {} }) => {
  const [editIcon, setEditIcon] = useState(false);
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [ownerIcon, setOwnerIcon] = useState(false);
  const [settingIcon, setSettingIcon] = useState(false);
  const [chartIcon, setChartIcon] = useState(false);
  const [contactIcon, setContactIcon] = useState(false);
  const [textIcon, setTextIcon] = useState(false);
  const [rejectIcon, setRejectIcon] = useState(false);
  const [receiveLog, setReceiveLog] = useState(false);
  const [addGroup, setAddGroup] = useState(false);

  const theme = useTheme();

  return (
    <Tooltip followCursor title={title} placement="top" arrow={true}>
      <IconButton
        size="medium"
        className={`${icon}-table-svg`}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={onClick}
      >
        {type === 'edit' &&
          (editIcon ? (
            <ModeEditRoundedIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setEditIcon(false)}
            />
          ) : (
            <EditOutlinedIcon sx={{ width: `${size}px`, height: `${size}px` }} onMouseOver={() => setEditIcon(true)} />
          ))}
        {type === 'addGroup' &&
          (addGroup ? (
            <GroupAddIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setAddGroup(false)}
            />
          ) : (
            <GroupAddOutlinedIcon sx={{ width: `${size}px`, height: `${size}px` }} onMouseOver={() => setAddGroup(true)} />
          ))}

        {type === 'delete' &&
          (deleteIcon ? (
            <DeleteRoundedIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setDeleteIcon(false)}
            />
          ) : (
            <DeleteOutlinedIcon
              sx={{ width: `${size}px`, height: `${size}px` }}
              onMouseOver={() => setDeleteIcon(true)}
            />
          ))}
        {type === 'add' &&
          (deleteIcon ? (
            <AddCircleRoundedIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setDeleteIcon(false)}
            />
          ) : (
            <AddCircleOutlineOutlinedIcon
              sx={{ width: `${size}px`, height: `${size}px` }}
              onMouseOver={() => setDeleteIcon(true)}
            />
          ))}
        {type === 'person_setting' &&
          (ownerIcon ? (
            <ManageAccountsRoundedIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setOwnerIcon(false)}
            />
          ) : (
            <ManageAccountsOutlinedIcon
              sx={{ width: `${size}px`, height: `${size}px` }}
              onMouseOver={() => setOwnerIcon(true)}
            />
          ))}
        {type === 'setting' &&
          (settingIcon ? (
            <SettingsRoundedIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setSettingIcon(false)}
            />
          ) : (
            <SettingsOutlinedIcon
              sx={{ width: `${size}px`, height: `${size}px` }}
              onMouseOver={() => setSettingIcon(true)}
            />
          ))}
        {type === 'chart' &&
          (chartIcon ? (
            <InsertChartIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setChartIcon(false)}
            />
          ) : (
            <InsertChartOutlinedIcon sx={{ width: `20px`, height: `20px` }} onMouseOver={() => setChartIcon(true)} />
          ))}
        {type === 'contact' &&
          (contactIcon ? (
            <ContactsRoundedIcon
              sx={{ width: `${size}px`, height: `${size}px`, color: theme.palette.primary.main }}
              onMouseLeave={() => setContactIcon(false)}
            />
          ) : (
            <ContactsOutlinedIcon
              sx={{ width: `${size}px`, height: `${size}px` }}
              onMouseOver={() => setContactIcon(true)}
            />
          ))}
        {type === 'message' &&
          (textIcon ? (
            <TextsmsRoundedIcon
              sx={{ width: '25px', height: '25px', color: theme.palette.primary.main }}
              onMouseLeave={() => setTextIcon(false)}
            />
          ) : (
            <TextsmsOutlinedIcon sx={{ width: '25px', height: '25px' }} onMouseOver={() => setTextIcon(true)} />
          ))}
        {type === 'reject' &&
          (rejectIcon ? (
            <DangerousRoundedIcon
              sx={{ width: '25px', height: '25px', color: theme.palette.primary.main }}
              onMouseLeave={() => setRejectIcon(false)}
            />
          ) : (
            <DangerousOutlinedIcon sx={{ width: '25px', height: '25px' }} onMouseOver={() => setRejectIcon(true)} />
          ))}
        {type === 'receiveLog' &&
          (receiveLog ? (
            <FactCheckRoundedIcon
              sx={{ width: '25px', height: '25px', color: theme.palette.primary.main }}
              onMouseLeave={() => setReceiveLog(false)}
            />
          ) : (
            <FactCheckOutlinedIcon sx={{ width: '25px', height: '25px' }} onMouseOver={() => setReceiveLog(true)} />
          ))}
        {type === 'more' &&
          (receiveLog ? (
            <MoreVertOutlinedIcon
              sx={{ width: '25px', height: '25px', color: theme.palette.primary.main }}
              onMouseLeave={() => setReceiveLog(false)}
            />
          ) : (
            <MoreVertOutlinedIcon sx={{ width: '25px', height: '25px' }} onMouseOver={() => setReceiveLog(true)} />
          ))}
      </IconButton>
    </Tooltip>
  );
};

export default TableActionButton;
