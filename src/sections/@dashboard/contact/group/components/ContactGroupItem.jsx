import React, { useState } from 'react';
import { ListItem, useTheme } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const ContactGroupItem = ({
  item,
  isCollapse,
  open,
  setOpen,
  setGroupModal,
  setDeleteModal,
  setGroupSettingsModal,
}) => {
  const [idHolder, setIdHolder] = useState(0);
  const handleClick = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  const [editIcon, setEditIcon] = useState(false);
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [addIcon, setAddIcon] = useState(false);
  const [settingIcon, setSettingIcon] = useState(false);
  const handleLeave = (e, id, type) => {
    if (type == 'edit') {
      setIdHolder(0);

      setEditIcon(false);
    }
    if (type == 'add') {
      setIdHolder(0);

      setAddIcon(false);
    }
    if (type == 'setting') {
      setIdHolder(0);

      setSettingIcon(false);
    }
    if (type == 'delete') {
      setIdHolder(0);

      setDeleteIcon(false);
    }
  };
  const handleOver = (e, id, type) => {
    if (type == 'edit') {
      setIdHolder(id);

      setEditIcon(true);
    }
    if (type == 'add') {
      setIdHolder(id);

      setAddIcon(true);
    }
    if (type == 'setting') {
      setIdHolder(id);

      setSettingIcon(true);
    }
    if (type == 'delete') {
      setIdHolder(id);

      setDeleteIcon(true);
    }
  };

  return (
    <ListItem
      sx={{
        mb: 3,
        '&:hover': { backgroundColor: theme.palette.grey[300] },
        backgroundColor: theme.palette.grey['200'],
      }}
      style={{
        borderRadius: 12,
        border: 'none',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex' }}>
        {isCollapse ? (
          open ? (
            <ExpandLess onClick={handleClick} style={{ cursor: 'pointer' }} />
          ) : (
            <ExpandMore onClick={handleClick} style={{ cursor: 'pointer' }} />
          )
        ) : null}
        <RouterLink
          to={PATH_DASHBOARD.contacts.view(item.id.toString())}
          style={{
            textDecoration: 'none',
            color: theme.palette.text.primary,
          }}
        >
          <ListItemText primary={item.name} />
        </RouterLink>
      </div>

      <ListItemIcon sx={{ display: 'flex', gap: 1, cursor: 'pointer', color: theme.palette.grey[700] }}>
        {editIcon && idHolder == item.id ? (
          <ModeEditRoundedIcon
            onClick={() =>
              setGroupModal({
                edit: true,
                data: { show: true, parent_id: item.parentId, name: item.name, id: item.id },
              })
            }
            sx={{
              width: '23px',
              height: '23px',
              '& .hover': {},
            }}
            onMouseLeave={(e) => handleLeave(e, item.id.toString(), 'edit')}
            id={item.id.toString()}
          />
        ) : (
          <EditOutlinedIcon
            sx={{ width: '23px', height: '23px' }}
            onMouseOver={(e) => handleOver(e, item.id.toString(), 'edit')}
            id={item.id.toString()}
          />
        )}

        {addIcon && idHolder == item.id ? (
          <AddCircleRoundedIcon
            onClick={() =>
              setGroupModal({
                edit: false,
                data: { show: true, parent_id: item.id, id: null, name: null },
              })
            }
            sx={{ width: '23px', height: '23px' }}
            onMouseLeave={(e) => handleLeave(e, item.id.toString(), 'add')}
            id={item.id.toString()}
          />
        ) : (
          <AddCircleOutlineOutlinedIcon
            sx={{ width: '23px', height: '23px' }}
            onMouseOver={(e) => handleOver(e, item.id.toString(), 'add')}
            id={item.id.toString()}
          />
        )}
        {settingIcon && idHolder == item.id ? (
          <SettingsRoundedIcon
            onClick={() => {
              setGroupSettingsModal({
                show: true,
                group_id: item.id,
              });
            }}
            sx={{ width: '23px', height: '23px' }}
            onMouseLeave={(e) => handleLeave(e, item.id.toString(), 'setting')}
            id={item.id.toString()}
          />
        ) : (
          <SettingsOutlinedIcon
            sx={{ width: '23px', height: '23px' }}
            onMouseOver={(e) => handleOver(e, item.id.toString(), 'setting')}
            id={item.id.toString()}
          />
        )}
        {deleteIcon && idHolder == item.id ? (
          <DeleteRoundedIcon
            onClick={() => {
              setDeleteModal({
                open: true,
                data: {
                  id: item.id,
                  name: item.name,
                },
              });
            }}
            sx={{ width: '23px', height: '23px' }}
            onMouseLeave={(e) => handleLeave(e, item.id.toString(), 'delete')}
            id={item.id.toString()}
          />
        ) : (
          <DeleteOutlinedIcon
            sx={{ width: '23px', height: '23px' }}
            onMouseOver={(e) => handleOver(e, item.id.toString(), 'delete')}
            id={item.id.toString()}
          />
        )}
      </ListItemIcon>
    </ListItem>
  );
};

export default ContactGroupItem;
