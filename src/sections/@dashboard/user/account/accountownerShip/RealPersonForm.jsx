import * as Yup from 'yup';
import React, { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFDatePicker, RHFSelect, RHFTextarea, RHFTextField } from '../../../../../components/hook-form';
import province from '../../../../../assets/jsons/provinces';
import cities from '../../../../../assets/jsons/cities';
import RHFMobileField from "../../../../../components/hook-form/RHFMobileField";
import CustomMenuItem from "../../../../../components/CustomMenuItem";

// ----------------------------------------------------------------------

export default function RealPersonForm() {
  const [provinceId, setProvinceId] = useState(0);

  const RegisterSchema = Yup.object().shape({});

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <Box
          sx={{
            display: 'grid',
            rowGap: 3,
            columnGap: 2,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
          }}
        >
          <RHFTextField name="FirstName" label="نام" />
          <RHFTextField name="LastName" label="نام خانوادگی" />
          <RHFTextField name="FatherName" label="نام پدر" />
          <RHFTextField name="Tel" label="تلفن" />
          <RHFSelect name="gender" label="جنسیت">
            {['مرد', 'زن'].map((option) => (
              <CustomMenuItem key={option} value={option}>
                {option}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFNumberField name="CertificateNo" label="شماره شناسنامه" />
          <RHFSelect name="gender" label="نوع شناسه هویتی">
            {['کد ملی', 'گذرنامه', 'کارت آمایش', 'کارت پناهندگی', 'کارت هویت'].map((option) => (
              <CustomMenuItem key={option} value={option}>
                {option}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFTextField name="selectIdentificationType" label="شناسه هویتی" />
          <RHFTextField name="BirthPlace" label="محل تولد" />
          <RHFSelect name="Province" label="استان" onChange={(e) => setProvinceId(e.target.value)}>
            {province.map((option) => (
              <CustomMenuItem key={option.id} value={option.id}>
                {option.name}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFSelect name="City" label="شهر">
            {cities
              .filter((item) => item.province_id == provinceId)
              .map((option) => (
                <CustomMenuItem key={option.id} value={option.id}>
                  {option.name}
                </CustomMenuItem>
              ))}
          </RHFSelect>
          <RHFMobileField name="Mobile" label="موبایل" />
          <RHFDatePicker maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}  fullWidth name="CoBirthDate" label="تاریخ تولد" />
          <RHFTextField name="PostalCode" label="کد پستی" />
        </Box>
        <RHFTextarea name="Address" label="آدرس" placeholder={'وجود شماره پلاک برای تایید آدرس ضروری می باشد'} />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            ذخیره تغییرات
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
