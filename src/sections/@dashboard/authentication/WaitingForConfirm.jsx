import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../../components/hook-form';
import { Box, Button, Stack, Typography } from '@mui/material';

import { useState } from 'react';
import ConfirmMobileModal from '../../../components/modal/ConfirmMobileModal';
import { useSnackbar } from 'notistack';
import { createUpdateAuthenticationInfo } from '../../../services/authentication/authentication';
import { fDateJalali } from '../../../utils/formatTime';

const WaitingForConfirm = ({ data }) => {
  const [confirmMobileModal, setConfirmMobileModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    // resolver: yupResolver(validationSchema),
  });
  const theme = useTheme();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = methods;
  const handleSendConfirm = async () => {
    const response = await createUpdateAuthenticationInfo({
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      birthDate: data?.data?.birthDate,
      nationalCode: data?.data?.nationalCode,
      isConfirmedByUser: true,
    });
    if (response.isSuccess) {
      enqueueSnackbar('با موفقت تغییر کرد.');
    }
  };
  const onSubmit = async (values) => {
    // console.log(values.media);
    // const formData = new FormData();
    // formData.append('media', values.media);
    // const response = await uploadNationalCardPicture(formData);
    // if (response.isSuccess) {
    //   enqueueSnackbar('با موفقت تغییر کرد.');
    // }
  };
  

  return (
    <>
      <FormProvider>
        <Stack spacing={3}>
<Typography sx={{border:`1px solid ${theme.palette.primary.main}`,padding:"15px",borderRadius:"10px",background: `${theme.palette.primary.lighter}`}}>اطلاعات شما در مرحله ی در انتظار برای تایید ادمین می باشد.</Typography>
        </Stack>
      </FormProvider>
      {confirmMobileModal && (
        <ConfirmMobileModal show={confirmMobileModal} setShow={setConfirmMobileModal} mobileNum={data?.data?.mobile} />
      )}
    </>
  );
};

export default WaitingForConfirm;
