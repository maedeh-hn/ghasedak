import React from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import {LoadingButton} from "@mui/lab";
import SvgIconStyle from './SvgIconStyle';


const TableHeaderActionButton = ({ tooltip, title, onClick, color, isLoading=false, icon = null, comIcon = null, iconSize = 20 }) => (
    <Tooltip
      followCursor
      title={tooltip}
      placement="top"
      arrow
      sx={{
        width: { xs: '100%', sm: '30%', md: 'auto' },
      }}
    >
      <LoadingButton loading={isLoading} sx={{ borderRadius: '10px !important' }} variant="outlined" color={color || 'primary'} onClick={onClick}>
        {icon && !comIcon && <SvgIconStyle sx={{ width: iconSize, height: iconSize }} src={`/icons/ic_${icon}.svg`} />}
        {comIcon && !icon && comIcon}
        <Typography marginLeft={icon ? 1 : 0}>{title}</Typography>
      </LoadingButton>
    </Tooltip>
  );

export default TableHeaderActionButton;