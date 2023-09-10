import React from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import useModal from '../../../../hooks/useModal';
import { TableHeadCustom, TableNoData } from '../../../../components/table';
import TableLoading from '../../../../components/table/TableLoading';
import Scrollbar from '../../../../components/Scrollbar';
import useTableData from '../../../../hooks/useTableData';
import UserAccessibilityTableRow from './UserAccessibilityTableRow';
import AccessibilityModal from '../components/modal/AccessibilityModal';
// import UserAccessibilityTableRow from './UserAccessibilityTableRow';
// import useModal from "../../../../../hooks/useModal";
// import {TableHeadCustom, TableNoData} from "../../../../../components/table";
// import TableLoading from "../../../../../components/table/TableLoading";
// import Scrollbar from "../../../../../components/Scrollbar";
// import useTableData from "../../../../../hooks/useTableData";
// import AccessibilityModal from "../../components/modal/AccessibilityModal";

const TABLE_HEAD = [
    {id: '', label: 'سرویس'},
    {id: '', label: 'دسترسی'},

    {id: '', label: 'عملیات'}
];

const UserAccessibilityTable = ({data, isLoading, refetch}) => {

    const [tableData, setTableData] = useTableData(data)

    const {
        isOpen, openModal, closeModal, modalData
    } = useModal();

    return (
        <Box>
            {/* <UserAccessibilityHeader onAddModal={() => openModal()}/> */}
            <Card>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length} />
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <TableNoData isNotFound={tableData.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => <UserAccessibilityTableRow key={index} row={row}
                                                                                          onEditRow={() => openModal(row)}/>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
            {isOpen &&
                <AccessibilityModal state={isOpen} handleClose={closeModal} data={modalData}/>
            }
        </Box>
    );
};

export default UserAccessibilityTable;
