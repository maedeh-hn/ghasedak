import React, { useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
import TableActionButton from '../../../../../../components/TableActionButton';
import Label from '../../../../../../components/Label';
import CustomMenuItem from '../../../../../../components/CustomMenuItem';
import { numberWithCommas } from 'src/utils/functions';
import { TableMoreMenu } from '../../../../../../components/table/index.jsx';
import useModal from '../../../../../../hooks/useModal';
import AddGroupParentToUserModal from '../modal/AddGroupParentToUserModal';
import DeleteConfirmModal from '../../../../../../components/modal/DeleteConfirmModal';
import { deleteAccessGroupByIdParent } from '../../../../../../services/contact/group';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

const CustomContent = React.forwardRef(function CustomContent(props, ref, rowData) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal, modalData } = useModal();
  const params = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
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
  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    modalData: deleteModalData,
  } = useModal();
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
  
  const sendDeleteRequestHandler = async () => {
    const response = await deleteAccessGroupByIdParent({GroupId:deleteModalData.id,UserId:props.userId});
  
    if (response.isSuccess) {
      enqueueSnackbar('حذف گروه با موفقیت انجام شد.');
      queryClient.invalidateQueries(['contactsByIdParent'])
      closeDeleteModal();
 
    }
  };
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
        '&:hover': {
          backgroundColor: props.item.isAssigned
            ? `${theme.palette.warning.light} !important`
            : `${theme.palette.primary.light} !important`,
        },
        // backgroundColor: theme.palette.background.customBgPrimary,
        backgroundColor: props.item.isAssigned
          ? `${theme.palette.warning.lighter}`
          : `${theme.palette.primary.lighter} `,
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
          to={PATH_DASHBOARD.userManagement.subUserContacts(item.id.toString(), props.userId, params.username)}
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
        <Box  sx={{
    
           width: 'auto',
         
       }}>
        <TableMoreMenu

 
   open={openMenu}
   onOpen={handleOpenMenu}
   onClose={handleCloseMenu}
   actions={
     <Box>
       <CustomMenuItem
         onClick={() =>
           navigate(
             PATH_DASHBOARD.userManagement.subUserContacts(item.id.toString(), props.userId, params.username)
           )
         }
       >
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
       {props.item.isAssigned && (
         <CustomMenuItem onClick={() => props.AddGroupFromParent(props.item)}>
           <TableActionButton type={'edit'} title={'ویرایش دسترسی'} />
           ویرایش دسترسی
         </CustomMenuItem>
       )}
       {props.item.isAssigned && (
         <CustomMenuItem onClick={() => openDeleteModal(props.item)}>
           <TableActionButton type={'edit'} title={'حذف دسترسی'} />
           حذف دسترسی
         </CustomMenuItem>
       )}

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
     </Box>
   }
 />
        </Box>
        
      </Box>
      {isDeleteOpen && (
          <DeleteConfirmModal
            state={isDeleteOpen}
            handleClose={closeDeleteModal}
            onConfirm={sendDeleteRequestHandler}
            title={'حذف دسترسی'}
            description={'آیا از حذف دسترسی برای این گروه اطمینان دارید؟'}
            data={deleteModalData}
          />
        )}
    </Box>
  );
});

const CustomTreeItemParent = (props) => <TreeItem ContentComponent={CustomContent} {...props} />;

export default CustomTreeItemParent;
