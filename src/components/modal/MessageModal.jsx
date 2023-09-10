import React from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
import BaseStyleModal from './BaseStyleModal';

const MessageModal = ({state, handleClose, title, data}) => {
    return (
        <BaseStyleModal title={title} handleClose={handleClose} show={state}>
            <Box sx={{display: 'flex', mr: 2, alignItems: 'center'}}>
                <Typography
                    variant={'enNum'}
                    style={{
                        scrollBehavior: 'smooth',
                        display: 'inline-block',
                        unicodeBidi: 'plaintext',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {data?.split('%')
                        .join('percent')
                        .replace(/percent/g, ' % ')}
                </Typography>
            </Box>
            <Stack sx={{mt: 1}} flexDirection={'row'} justifyContent={'flex-end'}>
                <Button
                    color={'inherit'}
                    variant="outlined"
                    onClick={handleClose}
                >
                    بستن
                </Button>
            </Stack>
        </BaseStyleModal>
    );
};
export default MessageModal;
