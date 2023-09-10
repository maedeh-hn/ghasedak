import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../components/table';
import LineTableToolbar from './LineTableToolbar';
import LineTableRow from './LineTableRow';
import TableLoading from '../../../../components/table/TableLoading';
import useTableData from "../../../../hooks/useTableData";
import CustomCard from "../../../../components/CustomCard";
import useModal from "../../../../hooks/useModal.jsx";
import PriorityModal from "../components/modal/PriorityModal.jsx";
import {sort_by_number_value} from "src/utils/functions";

const TABLE_HEAD = [
    {id: 'priority', label: 'اولویت ارسال', align: 'left'},
    {id: 'number', label: 'شماره خط'},
    {id: 'operatorName', label: 'نام سرویس دهنده'},
    {id: 'legalType', label: 'نوع خط '},
    {id: 'expireDate', label: 'تاریخ انقضا'},
    {id: 'renewalPrice', label: 'قیمت تمدید (ریال)'},
    {id: 'ownershipStatus', label: 'وضعیت مالکیت'},
    {id: 'operation', label: 'تنظیمات', align: 'center'},
];


const LineTable = ({data, isLoading}) => {
    const [tableData, setTableData] = useTableData(data)
console.log(data);
    const {
        isOpen: isPriorityOpen,
        openModal: openPriorityModal,
        closeModal: closePriorityModal,
        modalData: priorityModalData
    } = useModal();

    return (
        <Box>
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
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {sort_by_number_value(tableData, 'priority').map((row, index) => (
                                    // console.log(row);
                                    <LineTableRow
                                        key={index}
                                        row={row}
                                        onPriorityChange={() => openPriorityModal(row)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {
                isPriorityOpen && <PriorityModal state={isPriorityOpen} handleClose={closePriorityModal} data={priorityModalData} />
            }
        </Box>
    );
};
export default LineTable;
