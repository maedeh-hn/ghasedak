import {Button, Stack, Typography, useTheme} from '@mui/material';
import React from 'react';
import BaseStyleModal from '../../../../../components/modal/BaseStyleModal';

const SettingDetailModal = ({state, setState}) => {

    const theme = useTheme()

    const handleClose = () => {
        setState({
            show: false,
            data: null,
        })
    }
    return (
        <BaseStyleModal
            show={state.show}
            handleClose={() =>
                setState({
                    show: false,
                    data: null,
                })
            }
            title={state.data.title}
        >
            <Typography>{state.data.detail}</Typography>
            {state.data.child}
            <Stack sx={{mt: 1}} flexDirection={'row'} justifyContent={'flex-end'}>
                <Button
                    sx={{
                        color: theme.palette.text.disabled,
                        borderColor: theme.palette.text.disabled,
                        marginRight: 1,
                    }}
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

export default SettingDetailModal;
