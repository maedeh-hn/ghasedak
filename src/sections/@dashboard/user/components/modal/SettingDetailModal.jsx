import {Typography} from '@mui/material';
import React from 'react';
import BaseStyleModal from "../../../../../components/modal/BaseStyleModal";


const SettingDetailModal = ({ state, setState }) => {
  return (
    <BaseStyleModal
      show={state.show}
      handleClose={() => setState({
        show: false,
        data: null
      })}
      title={state.data.title}
    >
      <Typography>
        {
          state.data.detail
        }
      </Typography>
    </BaseStyleModal>
  );
};

export default SettingDetailModal;
