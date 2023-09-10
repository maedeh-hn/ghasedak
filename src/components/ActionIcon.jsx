import { IconButton, Tooltip } from '@mui/material';
import SvgIconStyle from './SvgIconStyle';
import React from 'react';

const ActionIcon = ({ onClick, icon, title, color }) => (
  <Tooltip followCursor title={title} placement="top" arrow={true}>
    <IconButton
      color={color}
      onClick={onClick}
      className={`${icon}-table-svg`}
      sx={{
        padding: '0 5px',
      }}
    >
      <SvgIconStyle src={`/icons/ic_${icon}.svg`} sx={{ width: 15, height: 20, cursor: 'pointer' }} />
    </IconButton>
  </Tooltip>
);
export default ActionIcon;
