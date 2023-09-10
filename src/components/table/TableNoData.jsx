// @mui
import PropTypes from 'prop-types';
import {TableRow, TableCell, Typography} from '@mui/material';
//
import EmptyContent from '../EmptyContent';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound, count }) {
  return (
      <>
        {isNotFound ? (
            <TableRow>
              <TableCell colSpan={count}>
                <Typography textAlign={'center'}>
                  داده ای یافت نشد
                </Typography>
              </TableCell>
            </TableRow>
        ) : (
            <TableRow>
              <TableCell colSpan={count} sx={{ p: 0 }} />
            </TableRow>
        )}
      </>
  );
}
