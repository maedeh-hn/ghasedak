import React, { useEffect, useState } from 'react';
import { Box, Card, Table, TableBody, TableContainer, useTheme } from '@mui/material';
import Scrollbar from '../../../../../components/Scrollbar';
import { TableNoData } from '../../../../../components/table';
import TableLoading from '../../../../../components/table/TableLoading';

import SmsModalTableRow from './SmsModalTableRow';
import useTableData from "../../../../../hooks/useTableData";
import CustomCard from "../../../../../components/CustomCard";

const TABLE_HEAD = [
  //   { id: 'apiKey', label: 'کلید شناسه' },
  //   { id: 'url', label: 'ادرس' },
  { id: '1', label: 'عنوان' },
  { id: '2', label: 'نتیجه' },
];

const SmsModalTable = ({ data, isLoading }) => {
  const [tableData, setTableData] = useTableData(data);

  return (
    <Box>
      <CustomCard>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            <Table>
              <TableBody>
                {isLoading ? (
                  <TableLoading />
                ) : (
                  <>
                    {tableData.map((row, index) => (
                      <SmsModalTableRow
                        key={index}
                        row={row}
                      />
                    ))}
                    <TableNoData isNotFound={tableData.length === 0} />
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </CustomCard>
    </Box>
  );
};

export default SmsModalTable;
