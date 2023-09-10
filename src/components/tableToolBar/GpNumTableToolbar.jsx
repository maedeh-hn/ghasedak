import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Stack, Button, Tooltip, TextField, InputAdornment, Typography } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
// components
import AddGroupNumberModal from '../../sections/@dashboard/contact/group-number/components/modal/AddGroupNumberModal';
import AddPhoneNumberModal from '../../sections/@dashboard/contact/group-number/components/modal/AddPhoneNumberModal';

// ----------------------------------------------------------------------

GpNumTableToolbar.propTypes = {
  filterParameter: PropTypes.string,
  onFilterParameter: PropTypes.func,
};

export default function GpNumTableToolbar({
  setTableData,
  deleteDuplicatedNumber,
  searchTermHandler,
  filterParameter,
  sendAddPhonenumberRequest,
  refetch,
}) {
  const { id: groupId } = useParams();
  const [openAddGroupNumber, setOpenAddGroupNumber] = useState(false);
  const [openAddNumber, setOpenAddNumber] = useState(false);

  return (
    <>
      <Stack
        spacing={2}
        mb={2}
        paddingX={1}
        direction={{ xs: 'column', sm: 'row', md: 'row' }}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems={'center'}
          sx={{
            display: 'flex',
            justifySelfstSelf: 'flex-start',
            width: { xs: '100%', sm: '50%', md: '40%' },
          }}
        >
          <Typography variant={'h4'} fontWeight={'bold'}>
            لیست مخاطبین
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} gap={1}>
          <Tooltip
            followCursor
            title="افزودن مخاطب"
            placement="top"
            arrow={true}
            sx={{
              width: { xs: '100%', sm: '30%', md: 'auto' },
            }}
          >
            <Button variant="outlined" color="success" onClick={() => setOpenAddNumber(!openAddNumber)}>
              <PersonAddAltRoundedIcon />
              <Typography marginLeft={1}>افزودن مخاطب</Typography>
            </Button>
          </Tooltip>
          <Tooltip
            followCursor
            title="افزودن شماره به صورت گروهی"
            placement="top"
            arrow={true}
            sx={{
              width: { xs: '100%', sm: '30%', md: 'auto' },
            }}
          >
            <Button variant="outlined" color="success" onClick={() => setOpenAddGroupNumber(!openAddGroupNumber)}>
              <GroupsIcon />
              <Typography>افزودن گروهی</Typography>
            </Button>
          </Tooltip>
          <Tooltip
            followCursor
            title="حذف شماره های تکراری"
            placement="top"
            arrow={true}
            sx={{
              width: { xs: '100%', sm: '30%', md: 'auto' },
            }}
          >
            <Button variant="outlined" color="error" onClick={deleteDuplicatedNumber}>
              <DeleteIcon />
              <Typography>حذف شماره تکراری</Typography>
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
      <AddGroupNumberModal
        show={openAddGroupNumber}
        setShow={setOpenAddGroupNumber}
        groupId={groupId}
        refetch={refetch}
      />
      <AddPhoneNumberModal
        show={openAddNumber}
        setShow={setOpenAddNumber}
        setTableData={setTableData}
        requestHandler={sendAddPhonenumberRequest}
        refetch={refetch}
      />
    </>
  );
}
