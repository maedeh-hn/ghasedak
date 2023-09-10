import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../../components/table';
import SingleSmsReportToolbar from './SingleSmsReportToolbar';
import SingleSmsReportTableRow from './SingleSmsReportTableRow';
import TableLoading from "../../../../../components/table/TableLoading";
import useTableData from "../../../../../hooks/useTableData";
import {useMutation} from "@tanstack/react-query";
import {cancelSingleSms} from "src/services/smsRequestManagement/singleSms";
import {useSnackbar} from "notistack";
import RejectConfirmModal from "../../../../../components/modal/RejectConfirmModal";
import useModal from "../../../../../hooks/useModal";
import CustomCard from "../../../../../components/CustomCard";


const TABLE_HEAD = [
    {id: 'title', label: 'شماره خط', align: 'left'},
    {id: 'priceLimit', label: 'شماره گیرنده', align: 'left'},
    {id: 'expireDate', label: 'متن پیام', align: 'left'},
    {id: 'expireDate', label: 'قیمت (ریال)', align: 'left'},
    {id: 'expireDate', label: 'تاریخ ارسال', align: 'left'},
    {id: 'expireDate', label: 'سرویس دهنده', align: 'left'},
    {id: 'expireDate', label: 'وضعیت', align: 'center'},
];

const SingleSmsReportTable = ({data, filters, isLoading, refetch}) => {
    const [tableData, setTableData] = useTableData(data);
    const {enqueueSnackbar} = useSnackbar()

    const {
        isOpen: isConfirmOpen,
        openModal: openConfirmModal,
        closeModal: closeConfirmModal,
        modalData: confirmModalData
    } = useModal();

    const handleCancelSms = useMutation({
        mutationFn: (smsId) => cancelSingleSms(smsId),
        onSuccess: data => {
            if (data.isSuccess) {
                enqueueSnackbar('ارسال پیام با موفقیت لغو شد.')
                closeConfirmModal()
                refetch()
            }
        },
    })

    return (
        <Box>
            <CustomCard>
                {filters && (
                    <SingleSmsReportToolbar filterValue={filters.filterValue} setFilterValue={filters.setFilterValue}/>
                )}
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length}/>
                            <TableBody>
                                {isLoading &&
                                    <TableLoading count={TABLE_HEAD.length} rows={filters.filterValue.PageSize}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => (
                                    <SingleSmsReportTableRow
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

export default SingleSmsReportTable;
