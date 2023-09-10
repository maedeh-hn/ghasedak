import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Card, CircularProgress, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
// routes
// import { deleteGroupById } from 'src/services/contact/group';
// import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import useResponsive from '../../../../hooks/useResponsive';
import DeleteConfirmModal from '../../../../components/modal/DeleteConfirmModal';
import PageHeader from '../../../../components/PageHeader';
import TableHeaderActionButton from '../../../../components/TableHeaderActionButton';
import ContactGroupModalParent from './modal/ContactGroupModalParent';
import ContactGroupSettingsModalParent from './modal/ContactGroupSettingsModalParent';
// import useResponsive from '../../../../hooks/useResponsive';
// import DeleteConfirmModal from '../../../../components/modal/DeleteConfirmModal';
// import PageHeader from '../../../../components/PageHeader';
// import TableHeaderActionButton from '../../../../components/TableHeaderActionButton';

import { deleteGroupByIdParent } from '../../../../services/contact/group';
import useTableData from '../../../../hooks/useTableData';
import useModal from '../../../../hooks/useModal';
import { useQueryClient } from '@tanstack/react-query';
import CustomizedTreeViewParent from '../../contact/group/components/contact-group/CustomizedTreeViewParent';
import AddGroupParentToUserModal from '../../contact/group/components/modal/AddGroupParentToUserModal';
import { useTheme } from '@emotion/react';
// import ContactGroupModal from './modal/ContactGroupModal';
// import GroupSettingsModal from './modal/group-settings/GroupSettingsModal';

const GroupNestedListParent = ({ data: api_data, refetch, isLoading }) => {
  const [data, setData] = useTableData(api_data);
  const { isOpen, openModal:AddGroupFromParent, closeModal, modalData } = useModal();
  const { userId } = useParams();
  const theme = useTheme()
  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    modalData: deleteModalData,
  } = useModal();

  const [GroupModal, setGroupModal] = useState({
    edit: false,
    data: { show: false, parent_id: 0, id: null, name: null },
  });

  const [groupSettingsModal, setGroupSettingsModal] = useState({
    show: false,
    group_id: 0,
  });

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const sendDeleteRequestHandler = async (groupId) => {
    const response = await deleteGroupByIdParent(userId, groupId);
    if (response.isSuccess) {
      setData((perv) => perv.filter((item) => item.id != groupId));
      enqueueSnackbar('حذف گروه با موفقیت انجام شد.');
      closeDeleteModal();
  
      queryClient.invalidateQueries(['contactsByIdParent'])
    }
  };

  const lgDown = useResponsive('down', 'lg');

  return (
    <>
      <PageHeader
        actions={
          <>
            <TableHeaderActionButton
              tooltip={'افزودن گروه'}
              title={'افزودن گروه'}
              onClick={() =>
                setGroupModal({
                  edit: false,
                  data: { show: true, parent_id: 0, id: null, name: null },
                })
              }
            />
            <TableHeaderActionButton
      
              tooltip={' تخصیص گروه به زیرکاربر'}
              title={' تخصیص گروه به زیرکاربر'}
              onClick={() => AddGroupFromParent()}
            />
          </>
        }
      />

      <Card
        sx={{ mt: 3 }}
        style={{
          padding: '30px 5px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: `${lgDown ? '100%' : '70%'}` }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '',
                marginBottom: 10,
              }}
              component="div"
              id="nested-list-subheader"
            ></ListSubheader>
          }
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {data?.length > 0 ? (
                <>
                  <Typography sx={{ paddingX: '10px', paddingBottom: '10px' }}> لیست گروه ها</Typography>
                  <CustomizedTreeViewParent
                    userId={userId}
                    arr={data}
                    parent_id={0}
                    setGroupSettingsModal={setGroupSettingsModal}
                    setDeleteModal={openDeleteModal}
                    setGroupModal={setGroupModal}
                    data={data}
                    AddGroupFromParent={AddGroupFromParent}
                  />
                </>
              ) : (
                <Typography textAlign={'center'}>گروهی اضافه نشده است</Typography>
              )}
            </>
          )}
        </List>
        <ContactGroupModalParent
          state={GroupModal}
          setOpen={setGroupModal}
          setData={setData}
          refetch={refetch}
          data={data}
        />
        {groupSettingsModal.show && (
          <ContactGroupSettingsModalParent state={groupSettingsModal} setOpen={setGroupSettingsModal} />
        )}
        {isDeleteOpen && (
          <DeleteConfirmModal
            state={isDeleteOpen}
            handleClose={closeDeleteModal}
            onConfirm={sendDeleteRequestHandler}
            title={'حذف گروه'}
            description={'آیا از حذف این گروه اطمینان دارید؟'}
            data={deleteModalData}
          />
        )}
        {/* <ContactGroupModalParent state={GroupModal} setOpen={setGroupModal} setData={setData} refetch={refetch} />
        {groupSettingsModal.show && <ContactGroupSettingsModalParent state={groupSettingsModal} setOpen={setGroupSettingsModal} />}
        {deleteModal.open && (
          <DeleteConfirmModal
            state={deleteModal}
            setOpen={setDeleteModal}
            onConfirm={sendDeleteRequestHandler}
            title={'حذف گروه'}
            description={'آیا از حذف این گروه اطمینان دارید؟'}
          />
        )} */}
        {isOpen && (
          <AddGroupParentToUserModal state={isOpen} handleClose={closeModal} data={modalData} userId={userId} />
        )}
      </Card>
    </>
  );
};

export default GroupNestedListParent;
