import React from 'react';
import { Modal, Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BaseStyleModal = ({ show, handleClose, children, title, mdWidth = 500, lgWidth = 600 }) => {
  const theme = useTheme();

  //style
  const BoxModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    borderRadius: theme.borderRadius,
    backgroundColor: theme.palette.background.paper,
    m: 1,
    width: { xs: 400, md: mdWidth, lg: lgWidth },
  };
  return (
    <Modal
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'relative',
      }}
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        bgcolor={'background.default'}
        color={'text.primary'}
        p={3.5}
        borderRadius={theme.borderRadius}
        sx={BoxModalStyle}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
          <Box component="h4">{title}</Box>
        </Box>
        <Divider
          sx={{
            marginBottom: 1,
            borderStyle: 'dashed',
          }}
        />
        {children}
      </Box>
    </Modal>
  );
};
export default BaseStyleModal;
