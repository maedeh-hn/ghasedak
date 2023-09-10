import React, {useEffect, useState} from 'react';
import ApiKeysTableHeader from '../../api-keys/table/ApiKeysTableHeader';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import LoadingWidget from '../../../../components/LoadingWidget';
import {TableHeadCustom, TableNoData} from '../../../../components/table';
import DeleteConfirmModal from '../../../../components/modal/DeleteConfirmModal';
import {useSnackbar} from 'notistack';
import OtpTemplateTableToolbar from './OtpTemplateTableToolbar';
import OtpTemplateTableRow from './OtpTemplateTableRow';
import {deleteOtpTemplate} from 'src/services/smsRequestManagement/otpTemplate';
import TableLoading from "../../../../components/table/TableLoading";
import useTableData from "../../../../hooks/useTableData";
import useModal from "../../../../hooks/useModal";
import CustomCard from "../../../../components/CustomCard";
import { useQueryClient } from '@tanstack/react-query';

const TABLE_HEAD = [
    {id: 'title', label: 'نام قالب'},
    {id: 'priceLimit', label: 'متن'},
    {id: 'restrictIp', label: 'نوع ارسال'},
    {id: 'expireDate', label: 'نوع پیام'},
    {id: 'operation', label: 'عملیات', align: 'center'},
];

const OtpTemplateTable = ({data, refetch, isLoading}) => {
    const [tableData, setTableData] = useTableData(data);

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();

    const {enqueueSnackbar} = useSnackbar();
    const queryClient = useQueryClient();
    const handleDeleteRow = async (templateId) => {
        const response = await deleteOtpTemplate(templateId);
        if (response.isSuccess) {
            
            enqueueSnackbar('حذف قالب با موفقیت انجام شد.');
            closeDeleteModal();
            queryClient.invalidateQueries(['OtpTemplateList'])
        }
    };
    return (
        <Box>
            <OtpTemplateTableToolbar refetch={refetch}/>
            <CustomCard>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={5}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData?.items?.map((row, index) => (
                                    <OtpTemplateTableRow
                                        key={index}
                                        row={row}
                                        onDeleteRow={() => openDeleteModal(row)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {isDeleteOpen && (
                <DeleteConfirmModal
                    state={isDeleteOpen}
                    handleClose={closeDeleteModal}
                    onConfirm={handleDeleteRow}
                    title={'حذف قالب'}
                    description={'آیا از حذف این قالب اطمینان دارید ؟'}
                    data={deleteModalData}
                />
            )}
        </Box>
    );
};

export default OtpTemplateTable;
