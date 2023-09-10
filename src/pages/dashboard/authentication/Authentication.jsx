import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CustomContainer from '../../../components/CustomContainer';
import { PATH_DASHBOARD } from '../../../routes/paths';
import InfoForm from '../../../sections/@dashboard/authentication/InfoForm';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatinStage, getAuthenticationInfo } from '../../../services/authentication/authentication';
import ImageUploadForm from '../../../sections/@dashboard/authentication/ImageUploadForm';
import { useEffect } from 'react';
import VideoUploadForm from '../../../sections/@dashboard/authentication/VideoUploadForm';
import ConfirmForm from '../../../sections/@dashboard/authentication/ConfirmForm';
import WaitingForConfirm from '../../../sections/@dashboard/authentication/WaitingForConfirm';
import { useState } from 'react';
import useSettings from '../../../hooks/useSettings';
import { Container } from '@mui/material';
import useTabsNew from '../../../hooks/useTabsNew';

const steps = ['اطلاعات هویتی', 'آپلود تصویر ', 'آپلود ویدیو', ' تایید مراحل', 'وضعیت'];

export default function Authentication() {
  const { themeStretch } = useSettings();

  const [activeStep, setActiveStep] = useState(0);
  const [stage, setStage] =useState(0);
const [isformDone,setFormDone]=useState(false)

  const [skipped, setSkipped] = useState(new Set());
  const { data, isLoading } = useQuery(['getAuthenticationInfo'], getAuthenticationInfo);
console.log(stage);

  // useEffect(
    
  //   () => async () => {
  //     const data = await getAuthenticatinStage();
  //     console.log('hhh', data);
  //     if (data) {
  //       setActiveStep(data?.data);
  //       setStage(data?.data);
  //     }
  //   },[]);
  async function fetchData() {
    try {
      const dataStage = await getAuthenticatinStage(); // Corrected function name
 
      if (dataStage) {
        if(dataStage.data.length===0){
          setActiveStep(0);
          setStage(0);
        }else{
          setActiveStep(dataStage.data);
          setStage(dataStage.data);
        }
       
      }
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
  
    fetchData();
  }, []);
useEffect(()=>{
  if(isformDone&&stage<4){

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setFormDone(false)
  }else if(isformDone&&stage>=5){

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setFormDone(false)
  }
  
},[isformDone])
  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleClickOnSteps = (index) => {
    // console.log("index",index);
    // console.log("stage",stage);




    if ((index<=3)&&(index <= stage)) {
      setActiveStep(index);
    }else if(index>3 && stage>4){
      setActiveStep(index);
    }
// setActiveStep(2);
  };
  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
console.log(activeStep );
  return (
    <Page>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'احراز هویت', href: PATH_DASHBOARD.smsReport.groupSms },
        ]}
      />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ width: '100%', paddingY: '20px' ,background:"#fff",borderRadius:"10px" ,position:"relative"}}>
          <Stepper activeStep={activeStep} sx={{ overflow: 'auto'}} >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              //   if (isStepOptional(index)) {
              //     labelProps.optional = (
              //       <Typography variant="caption">Optional</Typography>
              //     );
              //   }
              //   if (isStepSkipped(index)) {
              //     stepProps.completed = false;
              //   }
              return (
                <Step key={label} {...stepProps} sx={{ minWidth: '150px', paddingBottom: '10px' }}>
                  <StepLabel sx={{cursor:"pointer"}} {...labelProps} onClick={()=>handleClickOnSteps(index)}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep != steps.length && (
            <React.Fragment>
              {activeStep === 0 && data && (
                <Box sx={{ padding: '20px',paddingTop:'40px' }} paddingX={{  md: "100px" }}>
                  <InfoForm data={data} activeStep={activeStep} setFormDone={setFormDone} />
                </Box>
              )}
              {activeStep === 1 && (
                <Box sx={{ padding: '20px',paddingTop:'40px'  }} paddingX={{  md: "100px" }}>
                  <ImageUploadForm data={data} stage={stage} setFormDone={setFormDone}/>
                </Box>
              )}
              {activeStep === 2 && (
                <Box sx={{ padding: '20px',paddingTop:'40px'  }} paddingX={{  md: "100px" }}>
                  <VideoUploadForm data={data} stage={stage} setFormDone={setFormDone}/>
                </Box>
              )}
              {activeStep === 3 && (
                <Box sx={{ padding: '20px',paddingTop:'40px'  }} paddingX={{  md: "100px" }}>
                  <ConfirmForm data={data} setFormDone={setFormDone} stage={stage}/>
                </Box>
              )}
              {activeStep > 5 && (
                <Box sx={{ padding: '20px',paddingTop:'40px'  }} paddingX={{  md: "100px" }}>
                  <WaitingForConfirm data={data} />
                </Box>
              )}
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: 2,
                  position: 'absolute',
                  bottom: "20px",
                  left: 40,
                  right: 40,
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, fontSize: '20px' }}
                >
                  قبلی
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
               
                {activeStep !== steps.length - 1 && (
                  <Button sx={{ fontSize: '20px' }} onClick={handleNext} 
                  // disabled={activeStep >= stage}
                  >
                    بعدی
                  </Button>
                )}
              </Box> */}
            </React.Fragment>
          )}
        </Box>
      </Container>
    </Page>
  );
}
