import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from '@mui/material';
import Iconify from '../Iconify';
import {LoadingButton} from '@mui/lab';
import {useTheme} from "@mui/system";
import {useFormContext} from "react-hook-form";

const FromAcceptConfirmModal = ({state, handleClose, title, description, onConfirm}) => {
    const theme = useTheme()
    const {handleSubmit} = useFormContext()
    return (
        <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.info.dark,
                    maxHeight: 10,
                    paddingY: 1,
                }}
            />
            <DialogContent>
                <Stack spacing={1} marginTop={2} justifyContent={'center'} alignItems={'center'}>
                    <Iconify
                        icon={'fluent-mdl2:accept-medium'}
                        width={40}
                        height={40}
                        sx={{
                            background: theme.palette.info.dark,
                            color: theme.palette.info.lighter,
                            borderRadius: 25,
                        }}
                    />
                    <DialogContentText color={'black'} fontSize={25} textAlign={'center'} id="alert-dialog-description">
                        {title}
                    </DialogContentText>
                    <DialogContentText color={'black'} fontSize={15} textAlign={'center'} id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </Stack>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'right',
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
                        انصراف
                    </Button>
                    <LoadingButton
                        sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                        variant={'contained'}
                        onClick={handleSubmit(onConfirm)}
                    >
                        بله مطمئنم
                    </LoadingButton>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default FromAcceptConfirmModal;
