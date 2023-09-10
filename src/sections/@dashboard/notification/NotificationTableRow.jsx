import {Stack, TableCell, TableRow, Typography} from '@mui/material';
import {fDateTimeJalali} from "../../../utils/formatTime";
import IconMessageButtonModal from "../../../components/IconMessageButtonModal";
import Iconify from "../../../components/Iconify";
import {Box} from "@mui/system";
import CustomTooltip from "../../../components/CustomTooltip";

// ----------------------------------------------------------------------
const categoryIcon = (type) => {
    switch (type) {
        case 0:
            return <CustomTooltip title={'اطلاع رسانی'}><Iconify icon={'material-symbols:info-outline-rounded'} width={24} height={24} color={theme => theme.palette.info.main}/></CustomTooltip>
            break;
        case 2:
            return <CustomTooltip title={'هشدار'}><Iconify icon={'material-symbols:warning-outline'} width={24} height={24} color={theme => theme.palette.warning.main}/></CustomTooltip>
            break;
        case 3:
            return <CustomTooltip title={'اخطار'}><Iconify icon={'ic:round-dangerous'} width={24} height={24} color={theme => theme.palette.error.main}/></CustomTooltip>
            break;
    }
}
const NotificationTableRow = ({ row }) => {
  return (
    <TableRow hover>
      <TableCell align="center">
          <Stack direction={'row'} spacing={1} alignContent={'center'} justifyContent={'left'}>
              <Box>
                  {categoryIcon(row.category)}
              </Box>
              <Typography>
                  {row.title}
              </Typography>
          </Stack>
      </TableCell>
      <TableCell align="center"> <IconMessageButtonModal message={row.description} title={'متن پیام'} /></TableCell>
      <TableCell align="center">{fDateTimeJalali(row.sendDate)}</TableCell>
    </TableRow>
  );
};

export default NotificationTableRow;
