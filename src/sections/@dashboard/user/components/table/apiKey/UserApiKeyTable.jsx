import { Card, Table, TableBody, TableContainer, Box } from '@mui/material';
// components
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Scrollbar from '../../../../../../components/Scrollbar';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import TableLoading from '../../../../../../components/table/TableLoading';
import DeleteConfirmModal from '../../../../../../components/modal/DeleteConfirmModal';
import UserApiKeyTableHeader from './UserApiKeyTableHeader';
import UserApiKeyTableRow from './UserApiKeyTableRow';
import useTableData from '../../../../../../hooks/useTableData';
import useModal from '../../../../../../hooks/useModal';

import ApiKeysModalParent from '../../../../api-keys/components/modal/ApiKeyModalParent';
import { deleteApiKeyParent } from '../../../../../../services/users/apiKey';
// import Scrollbar from '../../../../../components/Scrollbar';
// import { TableHeadCustom, TableNoData } from '../../../../../components/table';
// import UserApiKeyTableRow from './UserApiKeyTableRow';
// import UserApiKeyTableHeader from './UserApiKeyTableHeader';
// import { deleteApiKey } from '../../../../../services/users/apiKeys';
// import DeleteConfirmModal from '../../../../../components/modal/DeleteConfirmModal';
// import useTableData from '../../../../../hooks/useTableData';
// import TableLoading from '../../../../../components/table/TableLoading';
// import useModal from '../../../../../hooks/useModal';
// import ApiKeyModal from '../../../api-keys/components/modal/ApiKeyModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'apiKey', label: 'کلید شناسه', align: 'center' },
  { id: 'title', label: 'عنوان', align: 'center' },
  { id: 'priceLimit', label: 'محدودیت هزینه', align: 'center' },
  { id: 'restrictIp', label: 'محدودیت IP', align: 'center' },
  { id: 'expireDate', label: 'تاریخ انقضا', align: 'center' },
  { id: 'apiKeyStatus', label: 'وضعیت', align: 'center' },
  { id: '', label: 'عملیات' },
];

const UserApiKeyTable = ({ data, refetch, isLoading }) => {
  const { userId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useTableData(data);

  const {
    isOpen: isApiKeyOpen,
    openModal: openApiKeyModal,
    closeModal: closeApiKeyModal,
    modalData: apiKeyModalData,
  } = useModal();

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    modalData: deleteModalData,
  } = useModal();

  const handleEditRow = (item) => {
    openApiKeyModal(item);
  };

  const handleDeleteRow = async (item) => {
    openDeleteModal(item);
  };

  const deleteRequestHandler = async () => {
    const response = await deleteApiKeyParent(deleteModalData.id, parseInt(userId));
    if (response.isSuccess) {
      refetch();
      enqueueSnackbar('حذف کلید شناسه با موفقیت انجام شد.');
    }
    closeDeleteModal();
  };
  console.log(tableData);
  return (
    <Box>
      <UserApiKeyTableHeader onApiKeyModal={openApiKeyModal} />
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {isLoading && <TableLoading count={TABLE_HEAD.length} />}
                {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0} />}
                {tableData?.items?.map((row) => (
                  <UserApiKeyTableRow key={row.id} row={row} onEditRow={handleEditRow} onDeleteRow={handleDeleteRow} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        {isApiKeyOpen && (
          <ApiKeysModalParent state={isApiKeyOpen} handleClose={closeApiKeyModal} refetch={refetch} data={apiKeyModalData} />
        )}
        {isDeleteOpen && (
          <DeleteConfirmModal
            state={isDeleteOpen}
            handleClose={closeDeleteModal}
            onConfirm={deleteRequestHandler}
            title={'حذف کلید شناسه'}
            description={'آیا مطمئن هستید که میخواهید این کلید شناسه را حذف کنید؟'}
            data={deleteModalData}
          />
        )}
      </Card>
    </Box>
  );
};

export default UserApiKeyTable;
