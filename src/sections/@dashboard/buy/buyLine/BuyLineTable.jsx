import React, {useState} from 'react';
import {Box, Card, Table, TableBody, TableContainer} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../components/table';
import TableLoading from '../../../../components/table/TableLoading';
import BuyLineTableRow from './BuyLineTableRow';
import BuyLineModal from '../../../../components/modal/BuyLineModal';
import useTableData from "../../../../hooks/useTableData";
import useModal from "../../../../hooks/useModal";
import CustomCard from "../../../../components/CustomCard";

const TABLE_HEAD = [
    {id: 'number', label: 'شماره خط'},
    {id: 'price', label: 'قیمت (ریال)'},
    {id: 'buy', label: 'پرداخت'},
];

const BuyLineTable = ({data, isLoading}) => {

    const [tableData, setTableDate] = useTableData(data)

    const {
        isOpen: isBuyLineOpen,
        openModal: openBuyLineModal,
        closeModal: closeBuyLineModal,
        modalData: buyLineModalData
    } = useModal();

    return (
        <Box>
            <CustomCard>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData?.length}/>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={5}/>}
                                {!isLoading &&
                                <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {tableData.map((row, index) => (
                                    <BuyLineTableRow
                                        key={index}
                                        row={row}
                                        handleSelectLine={() => openBuyLineModal(row)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {isBuyLineOpen &&
            <BuyLineModal state={isBuyLineOpen} handleClose={closeBuyLineModal} data={buyLineModalData}/>}
        </Box>
    );
};

export default BuyLineTable;
