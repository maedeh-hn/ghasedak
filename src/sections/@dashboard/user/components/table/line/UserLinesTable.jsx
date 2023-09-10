import {Card, Table, TableBody, TableContainer} from '@mui/material';

import {useSnackbar} from 'notistack';
import {useParams} from "react-router";

import DeleteConfirmModal from '../../../../../../components/modal/DeleteConfirmModal';
import { TableHeadCustom, TableNoData } from '../../../../../../components/table';
import Scrollbar from '../../../../../../components/Scrollbar';
import useTableData from '../../../../../../hooks/useTableData';
import useModal from '../../../../../../hooks/useModal';
import TableLoading from '../../../../../../components/table/TableLoading';
import UserLinesTableRow from './UserLinesTableRow';
import {deleteLineUser} from "../../../../../../services/lines/lineUsers"
import LineUrlSettingModal from '../../../../line/components/modal/LineUrlSettingModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'number', label: 'شماره خط'},
    {id: 'provider', label: 'سرویس دهنده'},
    {id: 'resellerPrice', label: 'قیمت فروشنده (ریال)'},
    {id: 'userPrice', label: 'قیمت کاربر (ریال)'},
    {id: 'isReserved', label: 'وضعیت'},
    {id: '', label: 'عملیات'},
];

const UserLinesTable = ({data, isLoading, refetch}) => {
    const {userId} = useParams()
    const {enqueueSnackbar} = useSnackbar();
    const [tableData, setTableData] = useTableData(data)
console.log(data);
    const {
        isOpen: isEditOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
        modalData: editModalData
    } = useModal();

    const {
        isOpen: isDeleteOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        modalData: deleteModalData
    } = useModal();

    const onEditRow = (lineId) => {
        openEditModal(lineId);
    };

    const handleDeleteRow = async (item) => {
        openDeleteModal(item)
    };

    const deleteRequestHandler = async () => {
        const response = await deleteLineUser(deleteModalData.id, userId);
        if (response.isSuccess) {
            refetch();
            enqueueSnackbar('حذف کاربر با موفقیت انجام شد.');
        }
        closeDeleteModal()
    };

    return (
        <Card>
            <Scrollbar>
                <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                    <Table>
                        <TableHeadCustom
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                            {!isLoading && <TableNoData count={TABLE_HEAD.length} isNotFound={tableData.length === 0}/>}
                            {tableData.map((row) => (
                               
                                <UserLinesTableRow key={row.id} row={row} onEditRow={() => onEditRow(row.id)}
                                                   onDeleteRow={() => handleDeleteRow(row)}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
            {
                isEditOpen && <LineUrlSettingModal state={isEditOpen} data={editModalData} handleClose={closeEditModal}/>
            }
            {
                isDeleteOpen && <DeleteConfirmModal
                    state={isDeleteOpen}
                    handleClose={closeDeleteModal}
                    onConfirm={deleteRequestHandler}
                    title={'حذف دسترسی'}
                    description={'آیا از حذف دسترسی کاربر به این خط اطمینان دارید؟'}
                    data={deleteModalData}
                />
            }
        </Card>
    );
};

export default UserLinesTable;
