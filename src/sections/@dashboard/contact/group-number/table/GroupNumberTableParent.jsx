import React from 'react';
import { Box, Card, IconButton, Stack, Table, TableBody, TableContainer, Tooltip } from '@mui/material';
import { deleteGroupNumber } from 'src/services/contact/group-number';
import { TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../../components/table';
import Iconify from '../../../../../components/Iconify';
import useTable from '../../../../../hooks/useTable';
import Scrollbar from '../../../../../components/Scrollbar';

import GroupNumberTableRow from './GroupNumberTableRow';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteConfirmModal from '../../../../../components/modal/DeleteConfirmModal';
import TableLoading from '../../../../../components/table/TableLoading';
import useTableData from '../../../../../hooks/useTableData';
import useModal from '../../../../../hooks/useModal';

import CustomCard from '../../../../../components/CustomCard';
import AddGroupNumberModalParent from '../components/modal/AddGroupNumberModalParent';
import GroupNumberTableHeaderParent from './GroupNumberTableHeaderParent';
import {
  deleteGroupNumberParent,
  deleteMultipleGroupNumbersParent,
} from '../../../../../services/contact/group-number';
import AddPhoneNumberModalParent from '../components/modal/AddPhoneNumberModalParent';

const TABLE_HEAD = [
  { id: 'firstName', label: 'نام', align: 'left' },
  { id: 'lastName', label: 'نام خانوادگی', align: 'left' },
  { id: 'email', label: 'ایمیل', align: 'left' },
  { id: 'number', label: 'شماره موبایل', align: 'left' },
  { id: 'birthDate', label: 'تاریخ تولد', align: 'left' },
  { id: 'operation', label: 'عملیات', align: 'center' },
];

const GroupNumberTableParent = ({ data, refetch, isLoading }) => {
  const params = useParams();

  const [tableData, setTableData] = useTableData(data);

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    modalData: deleteModalData,
  } = useModal();

  const {
    isOpen: isNumberOpen,
    openModal: openNumberModal,
    closeModal: closeNumberModal,
    modalData: numberModalData,
  } = useModal();

  const {
    isOpen: isGroupNumberOpen,
    openModal: openGroupNumberModal,
    closeModal: closeGroupNumberModal,
    modalData: groupNumberModalData,
  } = useModal();

  const {
    isOpen: isExcelOpen,
    openModal: openExcelModal,
    closeModal: closeExcelModal,
    modalData: excelModalData,
  } = useModal();

  const { enqueueSnackbar } = useSnackbar();

  const { dense, order, orderBy, selected, onSelectRow, onSort, onSelectAllRows, setSelected } = useTable();

  const handleDeleteRows = async (selected) => {
    const response = await deleteMultipleGroupNumbersParent(selected, params.GroupId, params.userId);
    if (response.isSuccess) {
      refetch();
      enqueueSnackbar('شماره تلفن ها حذف شد.');
      setSelected([]);
    }
  };
  console.log(deleteModalData);
  const handleDeleteRow = async (groupNumberId) => {
    console.log(groupNumberId);
    const response = await deleteGroupNumberParent({UserId:Number(params.userId),Id:groupNumberId} );
    if (response.isSuccess) {
      setTableData((perv) => perv.filter((item) => item.id !== groupNumberId));
      enqueueSnackbar('حذف مخاطب با موفقیت انجام شد.');
      closeDeleteModal();
    }
  };

  return (
    <Box>
      <GroupNumberTableHeaderParent
        openAddNumberModal={openNumberModal}
        openAddGroupNumberModal={openGroupNumberModal}
        openExcelModal={openExcelModal}
        refetch={refetch}
      />
      <CustomCard>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
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
                        <Iconify icon={'eva:trash-2-outline'} />
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
                {isLoading && <TableLoading count={TABLE_HEAD.length + 1} />}
                {!isLoading && <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length + 1} />}
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
        <AddGroupNumberModalParent state={isGroupNumberOpen} handleClose={closeGroupNumberModal} refetch={refetch} />
      )}
      {isNumberOpen && (
        <AddPhoneNumberModalParent
          state={isNumberOpen}
          handleClose={closeNumberModal}
          data={numberModalData}
          refetch={refetch}
        />
      )}
      {/* {isExcelOpen && <AddExcelModal state={isExcelOpen} handleClose={closeExcelModal} refetch={refetch}/>} */}
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

export default GroupNumberTableParent;
