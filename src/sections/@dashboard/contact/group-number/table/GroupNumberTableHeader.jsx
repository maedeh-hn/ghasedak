import React from 'react';
import { removeDuplicatedGroupNumbersInAGroup } from 'src/services/contact/group-number';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TableToolbarActionButton from '../../../../../components/table/TableToolbarActionButton';
import PageHeader from "../../../../../components/PageHeader";

const GroupNumberTableHeader = ({ refetch, openExcelModal, openAddNumberModal, openAddGroupNumberModal }) => {
  const { id: groupId } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const sendDeleteDuplicatedNumberRequestHandler = async () => {
    const response = await removeDuplicatedGroupNumbersInAGroup(groupId);
    if (response.isSuccess) {
      enqueueSnackbar('مخاطبین تکراری حذف شد.');
      refetch();
    }
  };

  return (
      <PageHeader title={'مخاطبین'} actions={<>
          <TableToolbarActionButton
              tooltip={'اکسل'}
              title={'افزودن مخاطب از فایل excel'}
              icon={'add_person'}
              onClick={() => openExcelModal()}
          />
          <TableToolbarActionButton
              tooltip={'افزودن مخاطب'}
              title={'افزودن مخاطب'}
              icon={'add_person'}
              onClick={() => openAddNumberModal()}
          />
          <TableToolbarActionButton
              tooltip={'افزودن شماره به صورت گروهی'}
              title={'افزودن گروهی'}
              icon={'add_people'}
              onClick={() => openAddGroupNumberModal()}
          />
          <TableToolbarActionButton
              tooltip={'حذف شماره های تکراری'}
              title={'حذف شماره تکراری'}
              comIcon={<DeleteOutlinedIcon />}
              onClick={sendDeleteDuplicatedNumberRequestHandler}
              color={'error'}
              isLoading={sendDeleteDuplicatedNumberRequestHandler.isLoading}
          />
      </>} />
  );
};

export default GroupNumberTableHeader