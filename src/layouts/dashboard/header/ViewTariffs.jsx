// @mui
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PATH_DASHBOARD } from '../../../routes/paths';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

// ----------------------------------------------------------------------

export default function ViewTariffs() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack spacing={0.75} bgcolor={theme.palette.background.neutral} borderRadius={theme.borderRadius}>
      <Typography
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => navigate('/dashboard/panelPrice')}
        color={theme.palette.text.primary}
        paddingY={1}
        paddingX={2}
      >
        مشاهده تعرفه ها
      </Typography>
    </Stack>
  );
}
