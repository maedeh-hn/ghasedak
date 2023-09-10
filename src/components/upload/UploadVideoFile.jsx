import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
//
import Image from '../Image';
import RejectionFiles from './RejectionFiles';
import BlockContent from './BlockContent';
import { UploadIllustration } from '../../assets';
import { useTheme } from '@emotion/react';
import ProgressBar from '../ProgressBar';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(2, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

UploadVideoFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadVideoFile({ error = false, file, helperText, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });
  const theme = useTheme();
  const [openWebcam, setOpenWeb] = useState(false);
  const [stopVideoWebCam, setStopVideoWebCam] = useState(false);
  const [srartwebCam, setStartWebCam] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [loadingStartWebcam, setLoadingStartWebcam] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  console.log(cameraStream);
  const startCamera = () => {
    setLoadingStartWebcam(true);

    setOpenWeb(true);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLoadingStartWebcam(false);
        setCameraStream(stream);
        console.log(cameraStream);
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };
        console.log(mediaRecorderRef.current);
        mediaRecorderRef.current.onstop = () => {
          const recordedVideoBlob = new Blob(chunksRef.current, {
            type: 'video/webm',
          });
          other.setVideoWebCam(recordedVideoBlob);
          const recordedVideoUrl = URL.createObjectURL(recordedVideoBlob);

          // Display the recorded video as a preview
          videoRef.current.srcObject = null; // Stop the camera stream
          videoRef.current.src = recordedVideoUrl;
          videoRef.current.controls = true;

          stream.onremovetrack;
        };
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };
  const refreshVideo = () => {
    // Reset the video preview
    videoRef.current.src = null;

    // Clear any previously recorded data
    chunksRef.current = [];

    startCamera();

    setOpenWeb(true);
    setStartWebCam(false);
    // Restart camera
  };

  //   const stopRecording = () => {
  //     // Stop video recording logic
  //     setRecording(false);

  //     // Access the recorded video from the videoRef and set it as the video preview
  //     const recordedVideoStream = videoRef.current.srcObject;
  //     console.log(videoRef);
  //     other.setVideoWebCam(new Blob(recordedVideoStream))
  //     const mediaRecorder = new MediaRecorder(recordedVideoStream);
  //     const chunks = [];

  //     mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         chunks.push(event.data);
  //       }
  //     };

  //     mediaRecorder.onstop = () => {
  //       const recordedVideoBlob = new Blob(chunks, { type: 'video/webm' });
  //       const recordedVideoUrl = URL.createObjectURL(recordedVideoBlob);
  // console.log("recordedVideoBlob");
  //       // Display the recorded video as a preview
  //       videoRef.current.srcObject = null; // Stop the camera stream
  //       videoRef.current.src = recordedVideoUrl;
  //       videoRef.current.controls = true;
  //     };

  //     mediaRecorder.stop();
  //   };
  const startRecording = () => {
    if (!loadingStartWebcam) {
      setStartWebCam(true);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.start();
        setRecording(true);
      }
    }
  };

  // const stopRecording = () => {
  //   if (mediaRecorderRef.current && recording) {
  //     other.setUseWebCam(true);
  //     mediaRecorderRef.current.stop();
  //     setRecording(false);
  //   }
  //   console.log(mediaRecorderRef.current);
  // };
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      setStopVideoWebCam(true);
      // Stop the MediaRecorder
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Stop the camera stream
      const stream = cameraStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        setCameraStream(null);
        setOpenWeb(false); // Close the webcam view
      }
    }
  };
  return (
    <Box sx={{ maxWidth: '400px', width: '100%', ...sx, marginX: 'auto' }}>
      <DropZoneStyle
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
          ...(file && {}),
        }}
      >
        <input {...getInputProps()} />
        {other.stage > 2 && !file && !other.filevideo && (
          <Box
            sx={{ position: 'relative' }}
            onClick={() => {
              other.setIsvideoDownload(true);
            }}
          >
            <Image
              alt="file preview"
              src="/public/images/video-placeholder.jpg"
              sx={{
                borderRadius: 1,
                width: '100%',
                height: '200px',
              }}
            />
            {other.isVideoDownload && (
              <Box sx={{ position: 'absolute', top: '37.5%', left: '43.5%' }}>
                {' '}
                <CircularProgress size={50} />
              </Box>
            )}
          </Box>
        )}
        {other.filevideo && !file && (
          <video
            alt="file preview"
            controls
            src={other.filevideo}
            type="video/*"
            style={{
              borderRadius: 1,
              objectFit: 'contain !import',
              width: '100%',
              height: '200px',
            }}
          />
        )}
        {file && (
          <video
            alt="file preview"
            controls
            src={isString(file) ? file : file.preview}
            type="video/*"
            style={{
              borderRadius: 1,
              objectFit: 'contain !import',
              width: '100%',
              height: '200px',
            }}
          />
        )}
        <video
          ref={videoRef}
          autoPlay={!recording}
          muted={recording}
          style={{
            borderRadius: 1,
            objectFit: 'contain !import',
            width: '100%',
            height: '200px',
          }}
        />
        <Box
          display="flex"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column' }}
          sx={{ width: 1, textAlign: { xs: 'center' }, flexDirection: 'column', paddingY: '0px' }}
        >
          {!file && other.stage === 2 && (
            <Box>
              <UploadIllustration sx={{ width: 220 }} />
            </Box>
          )}
          {/* <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
            <Box {...getRootProps()} sx={{}}>
              <Typography
                gutterBottom
                variant="h7"
                sx={{
                  fontSize: '14px',

                  border: `1px solid ${theme.palette.grey[500_32]}`,
                  padding: '5px',
                  borderRadius: '10px',
                }}
              >
                انتخاب فایل جدید
              </Typography>
            </Box>
            <Box>
              <div>
                <Box>
                  {!openWebcam && !stopVideoWebCam ? (
                    <Typography
                      gutterBottom
                      variant="h7"
                      sx={{
                        fontSize: '14px',

                        border: `1px solid ${theme.palette.grey[500_32]}`,
                        padding: '5px',
                        borderRadius: '10px',
                      }}
                      onClick={startCamera}
                    >
                      باز شدن دوربین
                    </Typography>
                  ) : (
                    <>
                      {!srartwebCam ? (
                        <Box
                          gutterBottom
                          variant="h7"
                          sx={{
                            fontSize: '14px',

                            border: `1px solid ${theme.palette.grey[500_32]}`,
                            padding: '5px',
                            borderRadius: '10px',
                            minWidth: '100px',
                            width: '100%',
                          }}
                          onClick={startRecording}
                        >
                          {loadingStartWebcam ? (
                            
                              <CircularProgress size={'10px'} width={'20px'} />
                          
                          ) : (
                            '  شروع ضبط'
                          )}
                        </Box>
                      ) : (
                        <Box>
                          <Typography
                            gutterBottom
                            variant="h7"
                            sx={{
                              fontSize: '14px',
                              marginRight: '10px',
                              border: `1px solid ${theme.palette.grey[500_32]}`,
                              padding: '5px',
                              borderRadius: '10px',
                            }}
                            onClick={stopRecording}
                          >
                            پایان ضبط
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h7"
                            sx={{
                              fontSize: '14px',

                              border: `1px solid ${theme.palette.grey[500_32]}`,
                              padding: '5px',
                              borderRadius: '10px',
                            }}
                            onClick={refreshVideo}
                          >
                            ضبط مجدد
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </div>
            </Box>
          </Box> */}
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
            <Box {...getRootProps()} sx={{}}>
              <Typography
                gutterBottom
                variant="h7"
                sx={{
                  fontSize: '14px',

                  border: `1px solid ${theme.palette.grey[500_32]}`,
                  padding: '5px',
                  borderRadius: '10px',
                }}
              >
                انتخاب فایل جدید
              </Typography>
            </Box>
            <Box>
              <div>
                <Box>
                  {!openWebcam && !stopVideoWebCam ? (
                    <Typography
                      gutterBottom
                      variant="h7"
                      sx={{
                        fontSize: '14px',

                        border: `1px solid ${theme.palette.grey[500_32]}`,
                        padding: '5px',
                        borderRadius: '10px',
                      }}
                      onClick={startCamera}
                    >
                      باز شدن دوربین
                    </Typography>
                  ) : (
                    <>
                      {!srartwebCam ? (
                        <Box
                          gutterBottom
                          variant="h7"
                          sx={{
                            fontSize: '14px',

                            border: `1px solid ${theme.palette.grey[500_32]}`,
                            padding: '5px',
                            borderRadius: '10px',
                            minWidth: '100px',
                            width: '100%',
                          }}
                          onClick={startRecording}
                        >
                          {loadingStartWebcam ? (
                            
                              <CircularProgress size={'10px'} width={'20px'} />
                          
                          ) : (
                            '  شروع ضبط'
                          )}
                        </Box>
                      ) : (
                        <Box>
                          <Typography
                            gutterBottom
                            variant="h7"
                            sx={{
                              fontSize: '14px',
                              marginRight: '10px',
                              border: `1px solid ${theme.palette.grey[500_32]}`,
                              padding: '5px',
                              borderRadius: '10px',
                            }}
                            onClick={stopRecording}
                          >
                            پایان ضبط
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h7"
                            sx={{
                              fontSize: '14px',

                              border: `1px solid ${theme.palette.grey[500_32]}`,
                              padding: '5px',
                              borderRadius: '10px',
                            }}
                            onClick={refreshVideo}
                          >
                            ضبط مجدد
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </DropZoneStyle>
      <Typography sx={{ fontSize: '12px', marginTop: '10px' }}> max حجم فایل: Mb {other.videoSize}</Typography>
      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </Box>
  );
}
