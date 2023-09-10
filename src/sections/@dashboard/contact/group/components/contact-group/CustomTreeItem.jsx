import React, { useState } from 'react';
import { Box, Button, Stack, useTheme } from '@mui/material';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import TableActionButton from '../../../../../../components/TableActionButton';
import Label from '../../../../../../components/Label';
import CustomMenuItem from '../../../../../../components/CustomMenuItem';
import { numberWithCommas } from 'src/utils/functions';
import { TableMoreMenu } from '../../../../../../components/table/index.jsx';
import { PanelType } from '../../../../../../utils/enums';
import useModal from '../../../../../../hooks/useModal';
import AddGroupParentToUserModal from '../modal/AddGroupParentToUserModal';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    classes,
    className,
    item,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    setDeleteModal,
    setGroupModal,
    setGroupSettingsModal,
  } = props;

  const { disabled, expanded, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };
  const [openMenu, setOpenMenuActions] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(false);
  };

  const { isOpen, openModal, closeModal, modalData } = useModal();

  return (
    <Box
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        // [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      onMouseDown={handleMouseDown}
      ref={ref}
      sx={{
        '&:hover': { backgroundColor: `${theme.palette.primary.lighter} !important` },
        backgroundColor: theme.palette.background.customBgPrimary,
        borderRadius: 2,
        border: 'none',
        justifyContent: 'space-between',
        paddingY: '4px !important ',
        paddingX: '4px !important ',
        marginY: '2px !important ',
        padding: 'unset',
      }}
    >
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Stack
          sx={{ backgroundColor: 'white', p: 0.7, borderRadius: '50%' }}
          onClick={handleExpansionClick}
          className={classes.iconContainer}
        >
          {icon}
        </Stack>
        <RouterLink
          to={PATH_DASHBOARD.contacts.view(item.id.toString())}
          style={{
            textDecoration: 'none',
            color: theme.palette.text.primary,
          }}
        >
          {item.name.substring(0, 50)}
        </RouterLink>
      </Box>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Label color="primary" sx={{ ml: 1, mr: 1 }}>
          {numberWithCommas(item?.groupNumbersCount)} مخاطب
        </Label>

        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <CustomMenuItem onClick={() => navigate(PATH_DASHBOARD.contacts.view(item.id.toString()))}>
                <TableActionButton type={'contact'} title={'مخاطبین'} />
                مخاطبین
              </CustomMenuItem>
              <CustomMenuItem
                onClick={() => {
                  setGroupSettingsModal({
                    show: true,
                    group_id: item.id,
                  });
                }}
              >
                <TableActionButton type={'setting'} title={'تنظیمات'} />
                تنظیمات
              </CustomMenuItem>
              <CustomMenuItem
                onClick={() =>
                  setGroupModal({
                    edit: true,
                    data: { show: true, parent_id: item.parentId, name: item.name, id: item.id },
                  })
                }
              >
                <TableActionButton type={'edit'} title={'ویرایش'} />
                ویرایش
              </CustomMenuItem>
              <CustomMenuItem
                onClick={() =>
                  setGroupModal({
                    edit: false,
                    data: { show: true, parent_id: item.id, id: null, name: null },
                  })
                }
              >
                <TableActionButton type={'add'} title={'افزودن گروه'} />
                افزودن گروه
              </CustomMenuItem>
              {/* {localStorage.getItem('panelType') === '2' && (
                <CustomMenuItem onClick={() => openModal()}>
                  <TableActionButton
                    type={'addGroup'}
                    title={'تخصیص گروه'}
                    variant="outlined"
                 
                  />
                 تخصیص گروه
                </CustomMenuItem>
              )} */}
              <CustomMenuItem
                onClick={() => {
                  setDeleteModal({
                    id: item.id,
                    name: item.name,
                  });
                }}
              >
                <TableActionButton type={'delete'} title={'حذف گروه'} />
                حذف گروه
              </CustomMenuItem>
            </>
          }
        />
      </Box>

    </Box>
  );
  s;
});

const CustomTreeItem = (props) => <TreeItem ContentComponent={CustomContent} {...props} />;

export default CustomTreeItem;
