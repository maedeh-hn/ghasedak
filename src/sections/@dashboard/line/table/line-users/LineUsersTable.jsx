import { Card, Table, TableBody, TableContainer } from '@mui/material';
import { useState } from 'react';
// import {deleteLine} from 'src/services/lines/lineUsers';
import { useSnackbar } from 'notistack';
import useModal from '../../../../../hooks/useModal';
import useTableData from '../../../../../hooks/useTableData';
import useTable from '../../../../../hooks/useTable';
import { TableHeadCustom, TableNoData } from '../../../../../components/table';
import Scrollbar from '../../../../../components/Scrollbar';
// import EditLineUserSettingModal from '../../components/modal/EditLineUserSettingModal';
import DeleteConfirmModal from '../../../../../components/modal/DeleteConfirmModal';
import TableLoading from '../../../../../components/table/TableLoading';
// import LineUsersTableToolbar from './LineUsersTableToolbar';
import LineUsersTableRow from './LineUsersTableRow';
import { deleteLineUser } from '../../../../../services/lines/lineUsers';
import EditLineModalParent from '../../components/modal/EditLineModalParent';
import { useParams } from 'react-router';
// import {TableHeadCustom, TableNoData} from '../../../../../components/table';
// import useTable from '../../../../../hooks/useTable';
// import Scrollbar from '../../../../../components/Scrollbar';
// import LoadingWidget from '../../../../../components/LoadingWidget';
// import LineUsersTableToolbar from './LineUsersTableToolbar';
// import LineUsersTableRow from './LineUsersTableRow';
// import EditLineUserSettingModal from '../../components/modal/EditLineUserSettingModal';
// import DeleteConfirmModal from '../../../../../components/modal/DeleteConfirmModal';
// import TableLoading from "../../../../../components/table/TableLoading";
// import useTableData from "../../../../../hooks/useTableData";
// import useModal from "../../../../../hooks/useModal";

const TABLE_HEAD = [
  // { id: 'name', label: 'کاربر', align: 'center' },
  { id: 'purchasePrice', label: 'شماره خط', align: 'center' },
  { id: 'canRecieve', label: 'دریافت پیام', align: 'center' },
  { id: 'canSendToGroups', label: 'ارسال گروهی', align: 'center' },
  { id: 'canUseWebservice', label: 'ارسال وب سرویس', align: 'center' },
  { id: 'purchasePrice', label: 'نیاز به تایید ارسال', align: 'center' },
  // { id: 'purchasePrice', label: 'محدودیت ارسال بدون تایید', align: 'center' },
  // {id: 'purchasePrice', label: 'قیمت خرید (ریال)', align: 'center'},
  { id: '', label: 'عملیات', align: 'center' },
];

const LineUsersTable = ({ data, isLoading, refetch, filters = false }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [openAddUser, setOpenAddUser] = useState(false);
  const { dense, order, orderBy, onSort } = useTable();
  const [tableData, setTableData] = useTableData(data);
  const params = useParams();

  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
    modalData: editModalData,
  } = useModal();

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    modalData: deleteModalData,
  } = useModal();

  const handleDeleteRow = async (item) => {
    openDeleteModal(item);
  };

  const deleteRequestHandler = async () => {
    const response = await deleteLineUser(deleteModalData.lineId, Number(params.userId));
    if (response.isSuccess) {
      refetch();
      enqueueSnackbar('حذف کاربر با موفقیت انجام شد.');
    }
    closeDeleteModal();
  };

  const handleEditRow = (item) => {
    openEditModal(item);
  };

  return (
    <Card>
      {/* {filters && (
                <LineUsersTableToolbar
                    filterValue={filters.filterValue}
                    setFilterValue={filters.setFilterValue}
                    initialValue={filters.initialValues}
                />
            )} */}

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {isLoading && <TableLoading count={TABLE_HEAD.length} />}
              {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0} />}
              {tableData.map((row) => (
                <LineUsersTableRow
                  key={row.id}
                  row={row}
                  handleEditRow={() => handleEditRow(row)}
                  handleDeleteRow={() => handleDeleteRow(row)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      {isEditOpen && (
        <EditLineModalParent state={isEditOpen} handleClose={closeEditModal} data={editModalData} refetch={refetch} />
      )}
      {isDeleteOpen && (
        <DeleteConfirmModal
          state={isDeleteOpen}
          handleClose={closeDeleteModal}
          onConfirm={deleteRequestHandler}
          title={'حذف کاربر'}
          description={'آیا از حذف این کاربر اطمینان دارید؟'}
          data={deleteModalData}
        />
      )}
    </Card>
  );
};

export default LineUsersTable;
