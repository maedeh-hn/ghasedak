import React from 'react';
import {Divider, Dialog, DialogTitle, DialogContent} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
        </DialogTitle>
    );
}

const BaseStyleScrollModal = ({show, handleClose, children, title, mdWidth = 500, lgWidth = 600}) => {
    const theme = useTheme()
    //style
    const BoxModalStyle = {
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        borderRadius: theme.borderRadius || 2,
        backgroundColor: theme.palette.background.paper,
        m: 1,
        width: {xs: 400, md: mdWidth, lg: lgWidth},

    };
    return (
        <BootstrapDialog
            fullWidth
            open={show}
            onClose={handleClose}
        >
            <BootstrapDialogTitle fullWidth
                                  id="customized-dialog-title"
                                  onClose={handleClose}
            >
                {title}
            </BootstrapDialogTitle>
            <Divider
                sx={{
                    marginBottom: 1,
                    borderStyle: 'dashed',
                    paddingX: 2
                }}
            />
            <DialogContent fullWidth>{children}</DialogContent>
        </BootstrapDialog>
    );
};
export default BaseStyleScrollModal;
