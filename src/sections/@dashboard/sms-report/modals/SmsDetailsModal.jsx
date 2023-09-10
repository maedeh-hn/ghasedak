import React from 'react';
import {Box, Button, Divider, LinearProgress, Stack, Typography} from '@mui/material';
import BaseStyleScrollModal from "../../../../components/modal/BaseStyleScrollModal.jsx";

const SmsDetailModal = ({state, handleClose, title, data, content, isLoading    }) => {
    return (
        <BaseStyleScrollModal title={title} handleClose={handleClose} show={state}>
            <Box sx={{display: 'flex', mr: 2, alignItems: 'center'}}>
                <Typography>
                    {data}
                </Typography>
            </Box>
            <Divider sx={{ borderStyle: 'dashed', paddingY:1 }} />
            {
                isLoading ? <LinearProgress/> : content
            }
            <Stack sx={{mt: 1}} flexDirection={'row'} justifyContent={'flex-end'}>
                <Button color={'primary'} variant="outlined" onClick={handleClose}>
                    بستن
                </Button>
            </Stack>
        </BaseStyleScrollModal>
    );
};
export default SmsDetailModal;
