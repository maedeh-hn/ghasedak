import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
//
import Image from '../Image';
import RejectionFiles from './RejectionFiles';
import BlockContent from './BlockContent';
import { Stack } from 'immutable';
import { UploadIllustration } from '../../assets';
import { useTheme } from '@emotion/react';

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

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadSingleFile({ error = false, file, helperText, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });
  const theme = useTheme();
  return (
    <Box sx={{ maxWidth: '400px',width:"100%", ...sx,marginX:"auto" }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          
          }),
          ...(file && {
            
          }),
        }}
      >
        <input {...getInputProps()} />
        {
          other.fileImage&&!file&&
      <Image
            alt="file preview"
            src={ other.fileImage}
            
            sx={{
          
              borderRadius: "10px",
             
              width: '100%',
              height: '200px',
             
            }}
          />}{file && (
            <Image
              alt="file preview"
              src={ file.preview}
              
              sx={{
            
                borderRadius: 1,
               
                width: '100%',
                height: '200px',
               
              }}
            />
          )}
           {}

       
          <Box
    display="flex"
  
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column' }}
      sx={{ width: 1, textAlign: { xs: 'center' } ,flexDirection:"column",paddingY:"0px"}}
    >
          {(!file&&!other.fileImage) && 
      <Box>
      <UploadIllustration sx={{ width: 220 }} />
      </Box>}
  
      <Typography gutterBottom variant="h7" sx={{fontSize:"14px",marginTop:"15px",border:`1px solid ${theme.palette.grey[500_32]}`,padding:"5px",borderRadius:"10px"}}>
        انتخاب فایل جدید
        </Typography>
     
    </Box>

      </DropZoneStyle>
<Typography sx={{fontSize:"12px",marginTop:"10px"}}> حداکثر حجم فایل: {other.imageSize} Mb</Typography>
      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </Box>
  );
}
