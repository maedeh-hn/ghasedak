import React from 'react';
import {Box, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import GroupSmsReportToolbar from './GroupSmsReportToolbar';
import GroupSmsReportTableRow from './GroupSmsReportTableRow';
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";
import RejectConfirmModal from "../../../../../components/modal/RejectConfirmModal";
import useModal from "../../../../../hooks/useModal";
import {useMutation} from "@tanstack/react-query";
import {cancelBulkSms} from "src/services/smsRequestManagement/bulkSms";
import {useSnackbar} from "notistack";

const TABLE_HEAD = [
    {id: 'title', label: 'شماره خط',align: 'left'},
    {id: 'expireDate', label: 'متن پیام',align: 'left'},
    {id: 'origin', label: 'مبدا ارسال',align: 'left'},
    {id: 'origin', label: 'تعداد گیرندگان',align: 'left'},
    {id: 'expireDate', label: 'قیمت (ریال)',align: 'left'},
    {id: 'expireDate', label: 'تاریخ ارسال',align: 'left'},
    {id: 'expireDate', label: 'وضعیت',align: 'center'},
    {id: 'expireDate', label: 'نمودار',align: 'left'},
];

const GroupSmsReportTable = ({data, filters, isLoading, refetch}) => {

    const [tableData, setTableData] = useTableData(data)

    const {
        isOpen: isConfirmOpen,
        openModal: openConfirmModal,
        closeModal: closeConfirmModal,
        modalData: confirmModalData
    } = useModal();

    const {enqueueSnackbar} = useSnackbar()


    const handleCancelSms = useMutation({
        mutationFn: (smsId) => cancelBulkSms(smsId),
        onSuccess: data => {
            if (data.isSuccess) {
                enqueueSnackbar('ارسال پیام با موفقت لغو شد.')
                closeConfirmModal()
                refetch()
            }
        },
    })



    return (
        <Box>
            <CustomCard>
                {filters &&
                    <GroupSmsReportToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>}
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={TABLE_HEAD.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => (
                                    <GroupSmsReportTableRow
                                        key={index}
                                        row={row}
                                        onCancelSms={() => openConfirmModal(row.id)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            <RejectConfirmModal state={isConfirmOpen} handleClose={closeConfirmModal}
                                onConfirm={handleCancelSms.mutate} title={'لغو ارسال'}
                                description={'آیا از لغو ارسال پیام اطمینان دارید؟'} data={confirmModalData}/>
        </Box>
    );
};

export default GroupSmsReportTable;
