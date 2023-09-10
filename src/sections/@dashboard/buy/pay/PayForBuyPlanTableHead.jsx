import React from 'react';
import { Stack, Typography } from '@mui/material';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const PayForBuyPlanTableHeader = (row) => {
  return (
    <Stack
      spacing={2}
      mb={2}
      paddingX={1}
      direction={{ xs: 'column', sm: 'row', md: 'row' }}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Stack
        direction="row"
        alignItems={'center'}
        sx={{
          display: 'flex',
          justifySelfstSelf: 'flex-start',
          width: { xs: '100%', sm: '50%', md: '40%' },
        }}
      >
        <Typography variant={'h4'} fontWeight={'bold'}>
          {row.number} تایید خرید خط به شماره
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PayForBuyPlanTableHeader;
