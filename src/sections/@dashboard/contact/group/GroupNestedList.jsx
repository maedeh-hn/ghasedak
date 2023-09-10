import React, {useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {CircularProgress, Typography} from '@mui/material';
// routes
import {deleteGroupById} from 'src/services/contact/group';
import ContactGroupModal from './components/modal/ContactGroupModal';
import {useSnackbar} from 'notistack';
import useResponsive from '../../../../hooks/useResponsive';
import GroupSettingsModal from './components/modal/group-settings/GroupSettingsModal';
import DeleteConfirmModal from '../../../../components/modal/DeleteConfirmModal';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import CustomizedTreeView from './components/contact-group/CustomizedTreeView';
import PageHeader from "../../../../components/PageHeader";
import useTableData from "../../../../hooks/useTableData";
import useModal from "../../../../hooks/useModal";
import CustomCard from "../../../../components/CustomCard";

const GroupNestedList = ({data: api_data, refetch, isLoading}) => {
    const [data, setData] = useTableData(api_data);

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();

    const [GroupModal, setGroupModal] = useState({
        edit: false,
        data: {show: false, parent_id: 0, id: null, name: null},
    });

    const [groupSettingsModal, setGroupSettingsModal] = useState({
        show: false,
        group_id: 0,
    });

    const {enqueueSnackbar} = useSnackbar();

    const sendDeleteRequestHandler = async (groupId) => {
        const response = await deleteGroupById(groupId);
        if (response.isSuccess) {
            setData((perv) => perv.filter((item) => item.id != groupId));
            enqueueSnackbar('حذف گروه با موفقیت انجام شد.');
            closeDeleteModal();
            console.log(perv)
        }
    };

    const lgDown = useResponsive('down', 'lg');

    return (
        <>
            <PageHeader title={'لیست گروه های مخاطبین'} actions={<TableToolbarActionButton
                tooltip={'افزودن گروه'}
                title={'افزودن گروه'}
                onClick={() =>
                    setGroupModal({
                        edit: false,
                        data: {show: true, parent_id: 0, id: null, name: null},
                    })
                }
            />}/>

            <CustomCard
                sx={{mt: 3}}
                style={{
                    padding: '30px 5px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <List
                    sx={{width: '100%', maxWidth: `${lgDown ? '100%' : '70%'}`}}
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
                        >
                        </ListSubheader>
                    }
                >
                    {
                        isLoading ? <CircularProgress/> : <>
                            {data?.length > 0 ? (
                                <CustomizedTreeView
                                    arr={data}
                                    parent_id={0}
                                    setGroupSettingsModal={setGroupSettingsModal}
                                    setDeleteModal={openDeleteModal}
                                    setGroupModal={setGroupModal}
                                    data={data}
                                />
                            ) : (
                                <Typography textAlign={'center'}>گروهی اضافه نشده است</Typography>
                            )}
                        </>
                    }

                </List>
                <ContactGroupModal state={GroupModal} setOpen={setGroupModal} setData={setData} refetch={refetch} data={data}/>
                {groupSettingsModal.show &&
                    <GroupSettingsModal state={groupSettingsModal} setOpen={setGroupSettingsModal}/>}
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
            </CustomCard>
        </>
    );
};

export default GroupNestedList;
