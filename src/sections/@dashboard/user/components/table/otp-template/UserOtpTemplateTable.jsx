import React from 'react';
import {Table, TableBody, TableContainer} from '@mui/material';
import {useSnackbar} from 'notistack';
import useTableData from '../../../../../../hooks/useTableData';
import useModal from '../../../../../../hooks/useModal';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import TableLoading from '../../../../../../components/table/TableLoading';
import Scrollbar from '../../../../../../components/Scrollbar';
import DeleteConfirmModal from '../../../../../../components/modal/DeleteConfirmModal';
import UserReceiveLogTableToolbar from './UserReceiveLogTableToolbar';
import UserOtpTemplateTableRow from './UserOtpTemplateTableRow';
// import {deleteOtpTemplate} from "src/services/smsRequestManagement/otpTemplate";
// import UserOtpTemplateTableRow from './UserOtpTemplateTableRow';
// import useTableData from "../../../../../hooks/useTableData";
// import Scrollbar from "../../../../../components/Scrollbar";
// import {TableHeadCustom, TableNoData} from "../../../../../components/table";
// import TableLoading from "../../../../../components/table/TableLoading";
// import DeleteConfirmModal from "../../../../../components/modal/DeleteConfirmModal";
// import useModal from "../../../../../hooks/useModal";
// import UserOtpTemplateTableToolbar from "./UserOtpTemplateTableToolbar";

const TABLE_HEAD = [
    {id: 'title', label: 'نام قالب'},
    {id: 'priceLimit', label: 'آخرین متن'},
    {id: 'priceLimit', label: 'متن تایید شده'},
    {id: 'restrictIp', label: 'نوع ارسال'},
    {id: 'expireDate', label: 'نوع پیام'},
    {id: 'operation', label: 'عملیات', align: 'center'},
];

const UserOtpTemplateTable = ({data, isLoading, filters, refetch}) => {
    const [tableData, setTableData] = useTableData(data);

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();

    const {enqueueSnackbar} = useSnackbar();

    const handleDeleteRow = async () => {
        // const response = await deleteOtpTemplate(deleteModalData.id);
        // if (response.isSuccess) {
        //     enqueueSnackbar('حذف قالب با موفقیت انجام شد.');
        //     refetch()
        //     closeDeleteModal();
        // }
    };

    return (
        <>
            <UserReceiveLogTableToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom headLabel={TABLE_HEAD} rowCount={data?.data?.length}/>
                        <TableBody>
                            {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                            {!isLoading &&
                                <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                            {tableData?.map((row, index) => (
                                <UserOtpTemplateTableRow
                                    key={index}
                                    row={row}
                                    onDeleteRow={() => openDeleteModal(row)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
            {
                isDeleteOpen && <DeleteConfirmModal
                    state={isDeleteOpen}
                    handleClose={closeDeleteModal}
                    onConfirm={handleDeleteRow}
                    title={'حذف قالب'}
                    description={'آیا از حذف این قالب اطمینان دارید ؟'}
                    data={deleteModalData}
                />
            }
        </>
    );
};

export default UserOtpTemplateTable;
