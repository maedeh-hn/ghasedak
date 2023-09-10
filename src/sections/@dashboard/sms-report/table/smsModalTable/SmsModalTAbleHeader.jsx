import React from 'react';
import { Stack, Typography } from '@mui/material';
import TableToolbarActionButton from '../../../../../components/table/TableToolbarActionButton';

const SmsModalTAbleHeader = () => {
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
          گزارشات فراخوانی
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} gap={1}>
        <TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={() => {}} />
      </Stack>
    </Stack>
  );
};

export default SmsModalTAbleHeader;
