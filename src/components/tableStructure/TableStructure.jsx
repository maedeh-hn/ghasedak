import React from 'react';
// @mui
import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Stack,
  Switch,
  Tooltip,
  Divider,
  TableBody,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Container,
  Typography,
  InputAdornment,
  TextField,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../table';
import SearchIcon from '@mui/icons-material/Search';
import CustomCard from "../CustomCard";

// ----------------------------------------------------------------------

export default function TableStructure({
  tableHead,
  data,
  applySortFilter,
  filterParameter,
  setFilterParameter,
  handleDeleteRow,
  handleDeleteRows,
  handleEditRow,
  rowOfTable,
  setPageSize,
  setPageIndex,
}) {
  const theme = useTheme();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const themeWithLocale = React.useMemo(() => createTheme(theme, locales['faIR']), ['faIR', theme]);

  const dataFiltered = applySortFilter({
    data,
    comparator: getComparator(order, orderBy),
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound = !dataFiltered.length && !!filterParameter;

  if (!data) {
    return (
      <CustomCard sx={{ borderRadius: '5px' }}>
        <Typography color="error">شماره ای اضافه نشده است.</Typography>
      </CustomCard>
    );
  } else {
    return (
      <CustomCard>
        <Stack marginY={1} spacing={1}>
          <TextField
            // onKeyPress={(event) => {
            //   if (event.key === 'Enter') {
            //     searchTermHandler();
            //   }
            // }}
            sx={{
              width: '50%',
            }}
            size="small"
            value={filterParameter}
            onChange={(event) => setFilterParameter(event.target.value)}
            placeholder="جستجو..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={data.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      data.map((row) => row.id)
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
                  headLabel={tableHead}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      data.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <>
                      {rowOfTable ? (
                        <>{rowOfTable(tableHead, selected, onSelectRow, handleDeleteRow, handleEditRow, row)}</>
                      ) : null}
                    </>
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, data.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Stack>
      </CustomCard>
    );
  }
}
