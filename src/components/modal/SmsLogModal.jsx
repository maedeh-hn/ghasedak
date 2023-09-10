import React from 'react';
import { Button, TableCell, TableRow, useTheme } from '@mui/material';
import BaseStyleModal from '../../components/modal/BaseStyleModal';
import { useState } from 'react';
import SmsModalTable from '../../sections/@dashboard/sms-report/table/smsModalTable/SmsModalTable';

const SmsLogModal = ({ show, setShow, detail }) => {
  const theme = useTheme();
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <BaseStyleModal title={'detail'} handleClose={handleClose} show={show} lgWidth={1000}>
        <SmsModalTable data={detail} />
      </BaseStyleModal>
    </>
  );
};

export default SmsLogModal;
