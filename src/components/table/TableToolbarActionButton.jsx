import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import SvgIconStyle from '../SvgIconStyle';
import {LoadingButton} from "@mui/lab";

const TableToolbarActionButton = ({ tooltip, title, onClick, color, icon = null, isLoading=false, comIcon = null, iconSize = 20 }) => {
  return (
    <Tooltip
      followCursor
      title={tooltip}
      placement="top"
      arrow={true}
      sx={{
        width: { xs: '100%', sm: '30%', md: 'auto' },
      }}
    >
      <LoadingButton  loading={isLoading} sx={{ borderRadius: '10px !important' }} variant="outlined" color={color || 'primary'} onClick={onClick}>
        {icon && !comIcon && <SvgIconStyle sx={{ width: iconSize, height: iconSize }} src={`/icons/ic_${icon}.svg`} />}
        {comIcon && !icon && comIcon}
        <Typography marginLeft={icon ? 1 : 0}>{title}</Typography>
      </LoadingButton>
    </Tooltip>
  );
};

export default TableToolbarActionButton;
