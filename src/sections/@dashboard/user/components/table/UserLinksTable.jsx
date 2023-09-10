import React, {useState} from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import {useSnackbar} from 'notistack';
import UserLinksTableToolbar from './UserLinksTableToolbar';
import UserLinksTableRow from './UserLinksTableRow';
import {TableHeadCustom, TableNoData} from "../../../../../components/table";
import TableLoading from "../../../../../components/table/TableLoading";
import Scrollbar from "../../../../../components/Scrollbar";
import UserLinkModal from "../modal/UserLinkModal";
import {deleteUserLink} from "src/services/users/link";
import DeleteConfirmModal from "../../../../../components/modal/DeleteConfirmModal";
import useModal from "../../../../../hooks/useModal";
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";


const TABLE_HEAD = [
    {id: 'url', label: 'عنوان', align: 'left'},
    {id: 'apiKeyStatus', label: 'وضعیت', align: 'left'},
    {id: 'operation', label: 'عملیات', align: 'center'},
];

const UserLinksTable = ({data, refetch, isLoading}) => {
    const {enqueueSnackbar} = useSnackbar();

    const [tableData, setTableData] = useTableData(data);

    const {
        isOpen: isUserLinkOpen,
        openModal: openUserLinkModal,
        closeModal: closeUserLinkModal,
        modalData: userLinkModalData
    } = useModal();

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();

    const handleEditRow = async (row) => {
        openUserLinkModal(row)
    };

    const sendDeleteRequestHandler = async (userLinkId) => {
        const response = await deleteUserLink(userLinkId);
        if (response.isSuccess) {
            setTableData((perv) => perv.filter((item) => item.id !== userLinkId));
            enqueueSnackbar('حذف آدرس با موفقیت انجام شد.');
            closeDeleteModal();
        }
    };

    return (
        <Box>
            <UserLinksTableToolbar setModal={openUserLinkModal}/>
            <CustomCard>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom
                                headLabel={TABLE_HEAD}
                            />
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={5}/>}
                                {!isLoading &&
                                    <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0}/>}
                                {tableData.map((row, index) => (
                                    <UserLinksTableRow
                                        key={index}
                                        row={row}
                                        onDeleteRow={() => openDeleteModal(row)}
                                        onEditRow={() => handleEditRow(row)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {
                isUserLinkOpen &&
                <UserLinkModal state={isUserLinkOpen} handleClose={closeUserLinkModal} data={userLinkModalData}
                               refetch={refetch}/>
            }
            {isDeleteOpen && (
                <DeleteConfirmModal state={isDeleteOpen} handleClose={closeDeleteModal}
                                    onConfirm={sendDeleteRequestHandler}
                                    title={'حذف آدرس'} description={'آیا از حذف آدرس اطمینان دارید؟'}
                                    data={deleteModalData}/>
            )}
        </Box>
    );
};
export default UserLinksTable;
