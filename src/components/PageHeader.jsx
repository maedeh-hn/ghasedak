import React from 'react';
import { Stack, Typography } from '@mui/material';

const PageHeader = ({title, actions}) => {
    return (
        <Stack
            spacing={2}
            mb={2}
            // paddingX={1}
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
                <Typography variant={'h5'} fontWeight={'bold'}>
                    {title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} gap={1}>
                {actions}
            </Stack>
        </Stack>
    );
};

export default PageHeader;
