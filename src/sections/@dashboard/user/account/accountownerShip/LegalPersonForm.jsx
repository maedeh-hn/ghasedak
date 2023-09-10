import * as Yup from 'yup';
import React, { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFDatePicker, RHFSelect, RHFTextarea, RHFTextField } from '../../../../../components/hook-form';
import province from '../../../../../assets/jsons/provinces';
import cities from '../../../../../assets/jsons/cities';
import RHFMobileField from "../../../../../components/hook-form/RHFMobileField";
import CustomMenuItem from "../../../../../components/CustomMenuItem";

const CoTypes = [
  'سهامی عام',
  'سهامی خاص',
  'با مسئولیت محدود',
  'تضامنی',
  'مختلط غیر سهامی',
  'مختلط سهامی',
  'نسبی',
  'تعاونی',
  'دولتی',
  'وزارتخانه',
  'سفارتخانه',
  'مسجد',
  'مدرسه',
  'NGO',
];
const selectIdentificationType = ['کد ملی', 'گذرنامه', 'کارت آمایش', 'کارت پناهندگی', 'کارت هویت'];

// ----------------------------------------------------------------------

export default function LegalPersonForm() {
  const [provinceId, setProvinceId] = useState(1);

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
          <RHFTextField name="FirstName" label="نام مدیرعامل" />
          <RHFTextField name="LastName" label="نام خانوادگی مدیرعامل" />
          <RHFTextField name="FatherName" label=" مدیرعامل نام پدر" />
          <RHFTextField name="Tel" label="تلفن شرکت" />
          <RHFSelect name="selectGender" label="جنسیت  مدیرعامل">
            {['مرد', 'زن'].map((option) => (
              <CustomMenuItem key={option} value={option}>
                {option}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFNumberField name="CertificateNo" label="شماره شناسنامه مدیرعامل" />
          <RHFSelect name="selectIdentificationType" label="نوع شناسه هویتی مدیرعامل">
            {selectIdentificationType.map((option) => (
              <CustomMenuItem key={option} value={option}>
                {option}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFNumberField name="IdentificationNo" label="شناسه هویتی" />
          <RHFTextField name="BirthPlace" label="محل تولد مدیرعامل" />
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
          <RHFMobileField name="Mobile" label="موبایل مدیرعامل" />
          <RHFDatePicker maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}  fullWidth name="CoBirthDate" label="تاریخ تولد مدیرعامل" />
          <RHFTextField name="CoName" label="نام شرکت" />
          <RHFSelect name="CoType" label="نوع شرکت">
            {CoTypes.map((option) => (
              <CustomMenuItem key={option} value={option}>
                {option}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFSelect name="CoIdentificationType" label="نوع شناسه هویتی شرکت">
            {['شناسه ملی', 'شناسه فراگیر گذرنامه'].map((option) => (
              <CustomMenuItem key={option} value={option}>
                {option}
              </CustomMenuItem>
            ))}
          </RHFSelect>
          <RHFTextField name="CoIdentificationNo" label="شناسه هویتی شرکت" />
          <RHFNumberField name="CoRegistrationNo" label="شماره ثبت شرکت" />
          <RHFNumberField name="CoEconomicCode" label="کد اقتصادی شرکت" />
          <RHFTextField name="Website" label="وب سایت شرکت" />
          <RHFDatePicker fullWidth name="CoRegistrationDate" label="تاریخ ثبت شرکت" />
          <RHFTextField name="Tel" label="تلفن شرکت" />
          <RHFNumberField name="PostalCode" label="کد پستی شرکت" />
        </Box>
        <RHFTextarea name="Address" label="آدرس شرکت" placeholder={'وجود شماره پلاک برای تایید آدرس ضروری می باشد'} />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            ذخیره تغییرات
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
