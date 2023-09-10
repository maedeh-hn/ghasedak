import React from 'react';
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from '@mui/material';
import Iconify from '../Iconify';
import {useTheme} from "@mui/system";

const ErrorNotifModal = ({state, handleClose, description}) => {
    const theme = useTheme()
    return (
        <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.error.dark,
                    maxHeight: 10,
                    paddingY: 1,
                }}
            />
            <DialogContent>
                <Stack spacing={1} marginTop={2} justifyContent={'center'} alignItems={'center'}>
                    <Iconify
                        icon={'material-symbols:error'}
                        width={40}
                        height={40}
                        sx={{
                            background: theme.palette.error.dark,
                            color: 'white',
                            borderRadius: 25,
                        }}
                    />
                    <DialogContentText color={'black'} fontSize={15} textAlign={'center'}>
                        {description}
                    </DialogContentText>
                </Stack>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'right',
                    padding: 'unset'
                }}
            >
                <Box sx={{display: 'flex !important', justifyContent: 'right !important'}}>
                    <Button
                        size="large"
                        sx={{
                            mr: 1,
                            minWidth: 84,
                            minHeight: 36,
                            maxHeight: 36,
                            border: 'none',
                            color: theme.palette.text.disabled,
                            ':hover': {
                                color: theme.palette.grey[100] + '!important',
                                backgroundColor: theme.palette.grey[700] + '!important',
                            },
                        }}
                        color={'inherit'}
                        variant="outlined"
                        onClick={handleClose}
                    >
                        بستن
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorNotifModal;
