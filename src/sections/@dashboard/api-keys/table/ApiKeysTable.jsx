import React, {useState} from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../components/table';
import DeleteConfirmModal from '../../../../components/modal/DeleteConfirmModal';
import {useSnackbar} from 'notistack';
import ApiKeysTableHeader from './ApiKeysTableHeader';
import ApiKeysTableRow from './ApiKeysTableRow';
import {deleteApiKey} from 'src/services/contact/api-keys';
import ApiKeysModal from '../components/modal/ApiKeysModal';
import TableLoading from "../../../../components/table/TableLoading";
import useTableData from "../../../../hooks/useTableData";
import useModal from "../../../../hooks/useModal";
import CustomCard from "../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'key', label: 'کلید شناسه'},
    {id: 'title', label: 'عنوان'},
    {id: 'priceLimit', label: 'محدودیت هزینه'},
    {id: 'restrictIp', label: 'محدودیت کلید شناسه'},
    {id: 'expireDate', label: 'تاریخ انقضاء'},
    {id: 'apiKeyStatus', label: 'وضعیت'},
    {id: 'operation', label: 'عملیات', align: 'center'},
];

const ApiKeysTable = ({data, refetch, isLoading}) => {
    const {enqueueSnackbar} = useSnackbar();

    const [tableData, setTableData] = useTableData(data);
    const {
        isOpen: isApiKeyOpen,
        openModal: openApiKeyModal,
        closeModal: closeApiKeyModal,
        modalData: apiKeyModalData
    } = useModal();

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();


    const handleDeleteRow = async (ApiKeyId) => {
        const response = await deleteApiKey(ApiKeyId);
        if (response.isSuccess) {
            enqueueSnackbar('حذف کلید شناسه با موفقیت انجام شد.');
            refetch();
            closeDeleteModal();
        }
    };

    return (
        <Box>
            <ApiKeysTableHeader openAddModal={() => openApiKeyModal()}/>
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
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData?.map((row, index) => (
                                    <ApiKeysTableRow
                                        key={index}
                                        row={row}
                                        onDeleteRow={() => openDeleteModal(row)}
                                        onEditRow={() => openApiKeyModal(row)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {isApiKeyOpen &&
                <ApiKeysModal state={isApiKeyOpen} handleClose={closeApiKeyModal} data={apiKeyModalData} refetch={refetch}/>}
            {isDeleteOpen && (
                <DeleteConfirmModal
                    state={isDeleteOpen}
                    handleClose={closeDeleteModal}
                    onConfirm={handleDeleteRow}
                    title={'حذف کلید شناسه'}
                    description={'آیا از حذف این کلید شناسه اطمینان دارید ؟'}
                    data={deleteModalData}
                />
            )}
        </Box>
    );
};
export default ApiKeysTable;
