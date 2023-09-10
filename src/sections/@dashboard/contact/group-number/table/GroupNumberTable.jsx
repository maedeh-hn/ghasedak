import React from 'react';
import {Box, Card, IconButton, Stack, Table, TableBody, TableContainer, Tooltip} from '@mui/material';
import {deleteGroupNumber, deleteMultipleGroupNumbers} from 'src/services/contact/group-number';
import {TableHeadCustom, TableNoData, TableSelectedActions} from '../../../../../components/table';
import Iconify from '../../../../../components/Iconify';
import useTable from '../../../../../hooks/useTable';
import Scrollbar from '../../../../../components/Scrollbar';
import GroupNumberTableHeader from './GroupNumberTableHeader';
import GroupNumberTableRow from './GroupNumberTableRow';
import {useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import DeleteConfirmModal from '../../../../../components/modal/DeleteConfirmModal';
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import useModal from "../../../../../hooks/useModal";
import AddGroupNumberModal from "../components/modal/AddGroupNumberModal";
import AddPhoneNumberModal from "../components/modal/AddPhoneNumberModal";
import AddExcelModal from "../components/modal/AddExcelModal";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'firstName', label: 'نام', align: 'left'},
    {id: 'lastName', label: 'نام خانوادگی', align: 'left'},
    {id: 'email', label: 'ایمیل', align: 'left'},
    {id: 'number', label: 'شماره موبایل', align: 'left'},
    {id: 'birthDate', label: 'تاریخ تولد', align: 'left'},
    {id: 'operation', label: 'عملیات', align: 'center'},
];

const GroupNumberTable = ({data, refetch, isLoading}) => {
    const {id: groupId} = useParams();

    const [tableData, setTableData] = useTableData(data);

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();

    const {
        isOpen: isNumberOpen,
        openModal: openNumberModal,
        closeModal: closeNumberModal,
        modalData: numberModalData
    } = useModal();

    const {
        isOpen: isGroupNumberOpen,
        openModal: openGroupNumberModal,
        closeModal: closeGroupNumberModal,
        modalData: groupNumberModalData
    } = useModal();

    const {
        isOpen: isExcelOpen,
        openModal: openExcelModal,
        closeModal: closeExcelModal,
        modalData: excelModalData
    } = useModal();

    const {enqueueSnackbar} = useSnackbar();

    const {dense, order, orderBy, selected, onSelectRow, onSort, onSelectAllRows, setSelected} = useTable();

    const handleDeleteRows = async (selected) => {
        const response = await deleteMultipleGroupNumbers(selected, groupId);
        if (response.isSuccess) {
            refetch();
            enqueueSnackbar('شماره تلفن ها حذف شد.');
            setSelected([])
        }
    };

    const handleDeleteRow = async (groupNumberId) => {
        const response = await deleteGroupNumber(groupNumberId);
        if (response.isSuccess) {
            setTableData((perv) => perv.filter((item) => item.id !== groupNumberId));
            enqueueSnackbar('حذف مخاطب با موفقیت انجام شد.');
            closeDeleteModal();
        }
    };

    return (
        <Box>
            <GroupNumberTableHeader openAddNumberModal={openNumberModal} openAddGroupNumberModal={openGroupNumberModal}
                                    openExcelModal={openExcelModal} refetch={refetch}/>
            <CustomCard>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        {selected.length > 0 && (
                            <TableSelectedActions
                                numSelected={selected.length}
                                rowCount={tableData.length}
                                onSelectAllRows={(checked) =>
                                    onSelectAllRows(
                                        checked,
                                        tableData.map((row) => row.id)
                                    )
                                }
                                actions={
                                    <Stack spacing={1} direction="row">
                                        <Tooltip title="حذف موارد انتخاب شده" followCursor placement="top" arrow={true}>
                                            <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                                                <Iconify icon={'eva:trash-2-outline'}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                }
                            />
                        )}
                        <Table size={dense ? 'small' : 'medium'}>
                            <TableHeadCustom
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={tableData.length}
                                numSelected={selected.length}
                                onSort={onSort}
                                onSelectAllRows={(checked) =>
                                    onSelectAllRows(
                                        checked,
                                        tableData.map((row) => row.id)
                                    )
                                }
                            />
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length + 1}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length + 1}/>}
                                {tableData.map((row, index) => (
                                    <GroupNumberTableRow
                                        key={index}
                                        row={row}
                                        selected={selected.includes(row.id)}
                                        onSelectRow={() => onSelectRow(row.id)}
                                        onDeleteRow={() => openDeleteModal(row)}
                                        onEditRow={() => openNumberModal(row)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {isGroupNumberOpen && (
                <AddGroupNumberModal state={isGroupNumberOpen} handleClose={closeGroupNumberModal} refetch={refetch}/>
            )}
            {isNumberOpen &&
                <AddPhoneNumberModal state={isNumberOpen} handleClose={closeNumberModal} data={numberModalData} refetch={refetch}/>}
            {isExcelOpen && <AddExcelModal state={isExcelOpen} handleClose={closeExcelModal} refetch={refetch}/>}
            {isDeleteOpen && (
                <DeleteConfirmModal
                    state={isDeleteOpen}
                    handleClose={closeDeleteModal}
                    onConfirm={handleDeleteRow}
                    title={'حذف مخاطب'}
                    description={'آیا از حذف این مخاطب اطمینان دارید؟'}
                    data={deleteModalData}
                />
            )}
        </Box>
    );
};

export default GroupNumberTable;
