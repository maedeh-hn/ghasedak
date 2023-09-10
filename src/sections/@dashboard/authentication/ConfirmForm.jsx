import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../../components/hook-form';
import { Box, Button, Stack, Typography } from '@mui/material';

import { useState } from 'react';
import ConfirmMobileModal from '../../../components/modal/ConfirmMobileModal';
import { useSnackbar } from 'notistack';
import { createUpdateAuthenticationInfo } from '../../../services/authentication/authentication';
import { fDateJalali } from '../../../utils/formatTime';
import { SendAuthenticationConfirm } from '../../../services/users/tokenStore/index';
import { LoadingButton } from '@mui/lab';

const ConfirmForm = ({ data, setFormDone, stage }) => {
  const [confirmMobileModal, setConfirmMobileModal] = useState(false);
  const [loadingidentity, setLoadingIdentity] = useState(false);
  const [sendSmsCode, setSendSmsCode] = useState(false);
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
    setLoadingIdentity(true);
    const response = await createUpdateAuthenticationInfo({
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      birthDate: data?.data?.birthDate,
      nationalCode: data?.data?.nationalCode,
      isConfirmedByUser: true,
    });
    if (response.isSuccess) {
      setFormDone(true);
      setLoadingIdentity(false);
      enqueueSnackbar('با موفقت تغییر کرد.');
    }
  };

  const handleGetConfirmCode = async () => {
    if (stage > 4) {
      setSendSmsCode(true);
      setConfirmMobileModal(!confirmMobileModal);
      const response = await SendAuthenticationConfirm();
      if (response) {
        setSendSmsCode(false);
      }
      console.log(response);
    }
  };

  return (
    <>
      <FormProvider>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '50px', gap: '5px' }}>
          <Typography
            sx={{ background: `${theme.palette.warning.main}`, width: '12px', height: '12px', borderRadius: '50%' }}
          ></Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>تایید مشخصات فردی و شماره موبایل</Typography>
        </Box>
        <Typography sx={{ marginBottom: '20px', fontSize: '15px' }}>
          از صحت اطلاعات وارد شده مطابق زیر مطمئنم:
        </Typography>
        <Stack spacing={3}>
          <Box sx={{ borderBottom: `2px dashed ${theme.palette.grey[300]}`, paddingBottom: '40px' }}>
            <Box
              sx={{
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingY: '30px',
                paddingX:"50px",
                borderRadius: '10px',
                border: `1px solid ${theme.palette.grey[300]}`,
              }}
            >
              <Box sx={{fontSize:"14px"}}>
                <Typography sx={{ paddingBottom: '15px',fontSize:"14px",fontWeight:"bold" }}>نام: {data?.data?.firstName}</Typography>
                <Typography sx={{fontSize:"14px",fontWeight:"bold"}}>نام خانوادگی: {data?.data?.lastName}</Typography>
              </Box>
              <Box>
                <Typography sx={{ paddingBottom: '15px' ,fontSize:"14px",fontWeight:"bold"}}>تاریخ تولد: {fDateJalali(data?.data?.birthDate)}</Typography>
                <Typography sx={{fontSize:"14px",fontWeight:"bold"}}>شماره شناسنامه: {data?.data?.nationalCode}</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                textAlign: 'right',
                marginTop: '15px',
              }}
            >
              <LoadingButton
                onClick={handleSendConfirm}
                variant="contained"
                loading={loadingidentity}
                sx={{ maxWidth: '200px', width: '100% !important', marginTop: '10px' }}
              >
                تایید اطلاعات
              </LoadingButton>
            </Box>
          </Box>
          <Box sx={{ paddingBottom: '30px' }}>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             
              <Button variant="contained" onClick={handleSendConfirm}>
                تایید
              </Button>
            </Box> */}
            <Box sx={{ width: '100%' }}>
              <Typography color={stage < 4 ? `${theme.palette.grey[500]}` : null}>
                {' '}
                شماره موبایل خود به شماره {data?.data?.mobile} را تایید می کنم.
              </Typography>

              <Box
                sx={{
                  textAlign: 'right',
                  marginTop: '15px',
                }}
              >
                <LoadingButton
                  onClick={handleGetConfirmCode}
                  variant="contained"
                  loading={sendSmsCode}
                  color={stage < 4 ? 'inherit' : "primary"}
                  sx={{ maxWidth: '200px', width: '100% !important' }}
                >
                  دریافت کد تایید
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Stack>
      </FormProvider>
      {confirmMobileModal && (
        <ConfirmMobileModal show={confirmMobileModal} setShow={setConfirmMobileModal} mobileNum={data?.data?.mobile} />
      )}
    </>
  );
};

export default ConfirmForm;
