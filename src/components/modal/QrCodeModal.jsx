import { Button, Typography } from '@mui/material';
import React from 'react';
import BaseStyleModal from './BaseStyleModal';
import { useQuery } from '@tanstack/react-query';
import { ActivateGoogleAuthenticator } from 'src/services/users/tokenStore';
import LoadingWidget from '../LoadingWidget';

const ContactGroupModal = ({ show, setShow }) => {
  const { isLoading, data } = useQuery(['QrCode'], ActivateGoogleAuthenticator);

  return (
    <BaseStyleModal show={show} handleClose={() => setShow(false)} title={'نمایش Qr Code'}>
      {isLoading ? (
        <LoadingWidget />
      ) : (
        <>
          <Typography variant={'h3'}>کد دستی : {data.data.manualEntryKey}</Typography>
          <img src={data.data.qrCodeSetupImageUrl} alt={'qr code'} />
          <Button onClick={() => setShow(false)}>بستن</Button>
        </>
      )}
    </BaseStyleModal>
  );
};

export default ContactGroupModal;
