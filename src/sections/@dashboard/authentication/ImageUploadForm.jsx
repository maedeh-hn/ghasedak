import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import FlareIcon from '@mui/icons-material/Flare';
import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/hook-form/index.jsx';
import RHFNumberField from '../../../components/hook-form/RHFNumberField.jsx';
import RHFMobileField from '../../../components/hook-form/RHFMobileField.jsx';
import { LoadingButton } from '@mui/lab';
import React, { useCallback, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { downloadAuthFile, uploadNationalCardPicture } from '../../../services/authentication/authentication/index';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const ImageUploadForm = ({ data, stage, setFormDone }) => {
  const [isImageSend, setIsImageSend] = useState(false);
  const [fileImage, setFileImage] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    File: Yup.string().required('یک تصویر انتخاب کنید'),
  });
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const theme = useTheme();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append('File', values.File);
    const response = await uploadNationalCardPicture(formData);
    if (response.isSuccess) {
      setFormDone(true);
      setIsImageSend(true);
      enqueueSnackbar('با موفقیت ثبت شد.');
    }
  };
  useEffect(() => {
    const handlePreviousImage = async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      setDownloadLoading(true);
      try {
        const response = await fetch(
          'http://gateway.ghasedak.me/Authentication/api/v1/Authentication/DownloadAuthFile?FileOrigin=1',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const arrayBuffer = await response.arrayBuffer();

        if (arrayBuffer) {
          setDownloadLoading(false);
        }
        const blob = new Blob([arrayBuffer]);

        const blobURL = URL.createObjectURL(blob);

        console.log(blobURL);
        setFileImage(blobURL);

        // const input = document.createElement('input');
        // a.href = blobURL;
        // a.download = 'National-Card.jpeg';
      } catch (error) {
        console.error(error);
      }
    };
    handlePreviousImage();
  }, [isImageSend]);
  // const handlePreviousImage = async () => {
  //   const accessToken = window.localStorage.getItem('accessToken');
  //   setDownloadLoading(true)
  //   try {
  //     const response = await fetch(
  //       'http://gateway.ghasedak.me/Authentication/api/v1/Authentication/DownloadAuthFile?FileOrigin=1',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     const arrayBuffer = await response.arrayBuffer();

  //     if(arrayBuffer){
  //       setDownloadLoading(false)
  //      }
  //     const blob = new Blob([arrayBuffer]);

  //     const blobURL = URL.createObjectURL(blob);

  //     // const a = document.createElement('a');
  //     // a.href = blobURL;
  //     // a.download = 'National-Card.jpeg';

  //     // a.click();

  //     URL.revokeObjectURL(blobURL);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'File',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '50px', gap: '5px' }}>
        <Typography
          sx={{ background: `${theme.palette.warning.main}`, width: '12px', height: '12px', borderRadius: '50%' }}
        ></Typography>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
          تصویر کارت ملی {data.data.firstName} {data.data.lastName}
        </Typography>
      </Box>
      <Stack spacing={3}>
        <Box sx={{ borderBottom: `2px dashed ${theme.palette.grey[300]}`, paddingBottom: '40px' }}>
          <RHFUploadSingleFile
            name="File"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
            fileImage={fileImage}
            imageSize={data?.data?.maxNationalCardImageSize}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '26px', gap: '5px' }}>
          <Typography
            sx={{ background: `${theme.palette.warning.main}`, width: '12px', height: '12px', borderRadius: '50%' }}
          ></Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}> تصویر روزنامه رسمی</Typography>
        </Box>
        <Box>
          <RHFUploadSingleFile
            name="File"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
            fileImage={fileImage}
            imageSize={data?.data?.maxNationalCardImageSize}
          />
        </Box>

        <Box
        // sx={{
        //   width: `${stage > 1 ? 'auto' : '100%'}`,
        //   marginX: `${stage > 1 ? '' : 'auto'}`,
        //   display: 'flex',
        //   justifyContent: 'center',
        //   gap:"20px",
        //   paddingBottom:"30px"
        // }}
        >
          {/* {stage > 1 && (
            <LoadingButton
              type="button"
              variant="outlined"
              loading={downloadLoading}
              sx={{
                maxWidth: '200px',
                width: '100%',
                color: theme.palette.warning.main,
                border: `1px solid ${theme.palette.warning.main}`,
              }}
              onClick={handlePreviousImage}
             
            >
              دانلود فایل قبلی
            </LoadingButton>
          )} */}

          <Box sx={{ adding: '20px', borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <AnnouncementIcon sx={{ color: `${theme.palette.warning.light}`, marginBottom: '15px' }} />
              <Typography sx={{}}>برای ارسال تصویر کارت ملی جهت تایید توسط ادمین به موارد زیر دقت نمایید:</Typography>
            </Box>
            <Box sx={{ marginLeft: '30px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.grey[500]}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>عکس کارت ملی باید رنگی و واضح باشد.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.grey[500]}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>تصویر کارت ملی باید با صاحب اکانت همخوانی داشته باشد.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.grey[500]}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>فقط از روی اصل کارت ملی خود عکس بگیرید.</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: 'right',
              marginTop: '15px',
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ maxWidth: '200px', width: '100%' }}
            >
              ذخیره تصویر
            </LoadingButton>
          </Box>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default ImageUploadForm;
