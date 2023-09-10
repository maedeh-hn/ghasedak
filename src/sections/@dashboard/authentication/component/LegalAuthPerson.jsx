import React from 'react'
import { FormProvider, RHFDatePicker, RHFTextField } from '../../../../components/hook-form'
import * as Yup from 'yup';
import { Box, Stack} from '@mui/material'
import RHFNumberField from '../../../../components/hook-form/RHFNumberField'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useTheme } from '@emotion/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createUpdateAuthenticationInfo } from '../../../../services/authentication/authentication';


const LegalAuthPerson = ({data, activeStep, setFormDone}) => {
    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        birthDate: Yup.string(),
        nationalCode: Yup.string(),
      });
      const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    
        defaultValues: { ...data?.data },
      });
      const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
      } = methods;
    
      const onSubmit = async (values) => {
        const response = await createUpdateAuthenticationInfo(values);
        if (response.isSuccess) {
          setFormDone(true);
          enqueueSnackbar('با موفقیت  ثبت شد.');
        }
      };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3}>
    <RHFTextField name="firstName" label="نام" />
    <RHFTextField name="lastName" label="نام خانوادگی" />
    <RHFDatePicker
      maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}
      fullWidth
      name="birthDate"
      label="تاریخ تولد"
    />
    <RHFNumberField name="nationalCode" label="کد ملی" />
    <RHFTextField name="lastName" label="شناسه ملی شرکت" />
    <RHFTextField name="lastName" label="نام شرکت" />
    <RHFTextField name="lastName" label="شناسه ثبت شرکت" />
    {/*<RHFMobileField name="mobile" label="موبایل"/>*/}
    <Box sx={{ textAlign: 'right', paddingBottom: '30px' }}>
      <LoadingButton 
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ maxWidth: '200px', width: '100%' }}
      >
        ذخیره اطلاعات
      </LoadingButton>
    </Box>
  </Stack>
  </FormProvider>
  )
}

export default LegalAuthPerson