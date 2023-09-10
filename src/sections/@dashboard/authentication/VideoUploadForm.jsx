import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, RHFUploadSingleFile, RHFUploadVideoFile } from '../../../components/hook-form/index.jsx';
import { Box, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { uploadStatementVideo } from '../../../services/authentication/authentication/index';
import { useTheme } from '@emotion/react';
import { useSnackbar } from 'notistack';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const VideoUploadForm = ({ data, stage, setFormDone }) => {
  const validationSchema = Yup.object().shape({});
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [isVideoDownload, setIsvideoDownload] = useState(false);
  const [useWebCam,setUseWebCam]=useState(false)
  const [videoWebCam,setVideoWebCam]=useState()
  const [filevideo, setFileVideo] = useState();
 

  const { enqueueSnackbar } = useSnackbar();
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
  const handlePreviousImage = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    setDownloadLoading(true);
    try {
      const response = await fetch(
        'http://gateway.ghasedak.me/Authentication/api/v1/Authentication/DownloadAuthFile?FileOrigin=2',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response) {
        setIsvideoDownload(false);
      }
      const arrayBuffer = await response.arrayBuffer();

      if (arrayBuffer) {
        setDownloadLoading(false);
      }
      const blob = new Blob([arrayBuffer]);

      const blobURL = URL.createObjectURL(blob);

      console.log(blobURL);
      setFileVideo(blobURL);

      // const input = document.createElement('input');
      // a.href = blobURL;
      // a.download = 'National-Card.jpeg';
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isVideoDownload) {
      handlePreviousImage();
    }
  }, [isVideoDownload]);
  console.log(isVideoDownload);
  // const handlePreviousImage = async () => {
  //   const accessToken = window.localStorage.getItem('accessToken');
  //   setDownloadLoading(true)
  //   try {
  //     const response = await fetch(
  //       'http://gateway.ghasedak.me/Authentication/api/v1/Authentication/DownloadAuthFile?FileOrigin=2',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     const arrayBuffer = await response.arrayBuffer();
  //    if(arrayBuffer){
  //     setDownloadLoading(false)
  //    }

  //     const blob = new Blob([arrayBuffer]);

  //     const blobURL = URL.createObjectURL(blob);

  //     const a = document.createElement('a');
  //     a.href = blobURL;
  //     a.download = 'Auth-video.mp4';

  //     a.click();
  //     URL.revokeObjectURL(blobURL);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const onSubmit = async (values) => {
    if(useWebCam){
      const formData = new FormData();
      formData.append('File', videoWebCam);
      console.log(videoWebCam);
      const response = await uploadStatementVideo(formData);
      if (response.isSuccess) {
        setFormDone(true);
        enqueueSnackbar('با موفقت تغییر کرد.');
      }
    }else{

      console.log(values.File);
      const formData = new FormData();
      formData.append('File', values.File);
      const response = await uploadStatementVideo(formData);
      if (response.isSuccess) {
        setFormDone(true);
        enqueueSnackbar('با موفقت تغییر کرد.');
      }
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
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

  console.log(data);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '50px', gap: '5px' }}>
        <Typography
          sx={{ background: `${theme.palette.warning.main}`, width: '12px', height: '12px', borderRadius: '50%' }}
        ></Typography>
        <Typography sx={{ fontSize: '18px',fontWeight:"bold" }}>ویدیو تایید هویت</Typography>
      </Box>

      <Stack spacing={3}>
        {/* {methods.watch('media') && methods.watch('media').preview ? (
          <RHFUploadSingleFile name="media" accept="video/mp4" maxSize={20000000000000} onDrop={handleDrop} />
        ) : (
          <RHFUploadSingleFile name="media" accept="video/mp4" maxSize={20000000000000} onDrop={handleDrop} />
        )} */}
        <Typography
          sx={{
            textAlign: 'center',
            border: `1px solid ${theme.palette.warning.light}`,
            borderRadius: '10px',
            padding: '20px',
            background: `${theme.palette.warning.lighter}`,
            fontSize:"18px",
            fontWeight:"bold"
          }}
        >
          {data?.data?.statement}
        </Typography>
        <Box>
          <RHFUploadVideoFile
            name="File"
            accept="video/mp4"
            maxSize={20000000000000}
            onDrop={handleDrop}
            stage={stage}
            isVideoDownload={isVideoDownload}
            setIsvideoDownload={setIsvideoDownload}
            filevideo={filevideo}
            videoSize={data?.data?.maxStatementVideoSize}
            setUseWebCam={setUseWebCam}
            openWebCam={useWebCam}
            setVideoWebCam={setVideoWebCam}
            videoWebCam={videoWebCam}
          />
        </Box>

        <Box>
          {/* {stage > 2 && (
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

          {/* {methods.watch('media') && methods.watch('media').preview && (
          <video controls width="300">
            <source src={methods.watch('media').preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )} */}
          <Box sx={{ adding: '20px', borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <AnnouncementIcon sx={{ color: `${theme.palette.warning.light}`, marginBottom: '15px' }} />
              <Typography sx={{}}>با رعایت موارد زیر متن بالای کادر را بخوانید و ویدیو را ارسال کنید:</Typography>
            </Box>
            <Box sx={{ marginLeft: '30px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>کلمات را واضح و رسا بیان کنید.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>در زمان خواندن متن، سکوت برقرار باشد.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>متن را فقط یکبار بخوانید.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>فرد دیگری در تصویر حضور نداشته باشد.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>
                  نور محیط مناسب باشد و ترجیحا تصویر پس‌زمینه، دیوار سفید باشد.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px' }}>فیلم را بدون عینک، ماسک و کلاه ضبط کنید.</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                <Typography
                  sx={{
                    background: `${theme.palette.primary.light}`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                  }}
                ></Typography>
                <Typography sx={{ fontSize: '16px', marginBottom: '5px' }}>
                  توجه کنید که رعایت پوشش مناسب برای همه کاربران الزامی است.
                </Typography>
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
              sx={{ maxWidth: '200px', width: '100% !important' }}
            >
              ذخیره ویدیو
            </LoadingButton>
          </Box>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default VideoUploadForm;
