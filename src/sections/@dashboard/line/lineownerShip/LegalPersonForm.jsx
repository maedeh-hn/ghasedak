import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Stack, Alert, Box, MenuItem, LinearProgress} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import {FormProvider, RHFDatePicker, RHFSelect, RHFTextarea, RHFTextField} from '../../../../components/hook-form';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {
    createLegalUser, editLegalUser, getLineLegalUser,
} from 'src/services/lines/legalUsers';
import {LegalIdentificationType, CompanyTypeEnum, GenderEnum, IranianEnum} from '../../../../utils/enums';
import RHFNumberField from '../../../../components/hook-form/RHFNumberField';
import RHFMobileField from "../../../../components/hook-form/RHFMobileField";
import LoadingWidget from "../../../../components/LoadingWidget";
import {useSnackbar} from "notistack";
import RHFPhoneField from "../../../../components/hook-form/RHFPhoneField";
import RHFEmailField from "../../../../components/hook-form/RHFEmailField";
import CustomMenuItem from "../../../../components/CustomMenuItem";
import {getCitiesByProvince, getProvinces} from "src/services/users/city";

// ----------------------------------------------------------------------

export default function LegalPersonForm({line}) {

    const {userId, lineId, legalType} = useParams();

    const [cities, setCities] = useState([])

    const {enqueueSnackbar} = useSnackbar();
    const StatusSettingsSchema = Yup.object().shape({
        firstName: Yup.string().required('نام را وارد کنید.'),
        lastName: Yup.string().required('نام خانوادگی را وارد کنید.'),
        province: Yup.string().required('استان را وارد کنید.'),
        cityId: Yup.string().required('شهر را وارد کنید.'),
        identificationNumber: Yup.string().required('شماره شناسنامه را وارد کنید.'),
        certificationNumber: Yup.string().required('شماره ملی شرکت را وارد کنید.'),
        phoneNumber: Yup.string().required('شماره تلفن را وارد کنید.'),
        mobile: Yup.string().required('شماره همراه را وارد کنید.'),
        fatherName: Yup.string().required('نام پدر را وارد کنید.'),
        birthDate: Yup.string().required('تاریخ تولد را وارد کنید.'),
        birthPlace: Yup.string().required('محل تولد را وارد کنید.'),
        companyName: Yup.string().required('نام شرکت را وارد کنید.'),
        companyAddress: Yup.string().required('آدرس شرکت را وارد کنید.'),
        companyPostalCode: Yup.string().min(10, 'کد پستی باید حداقل 10 رقم باشد.').max(10, 'کد پستی باید حداکثر 10 رقم باشد.').required('کد پستی شرکت را وارد کنید.'),
        companyPhoneNumber: Yup.string().required('شماره تلفن شرکت را وارد کنید.'),
        companyEmail: Yup.string().required('ایمیل کمپانی را وارد کنید.'),
        companyRegisterationDate: Yup.string().required('تاریخ ثبت شرکت را وارد کنید.'),
        companyRegistrationNumber: Yup.string().required('شماره ثبت شرکت را وارد کنید.'),
        companyNationalCode: Yup.string().required('کد ملی شرکت را وارد کنید.'),
        companyEconomicCode: Yup.string().required('کد اقتصادی شرکت را وارد کنید.'),
        companyType: Yup.string().required('نوع شرکت را وارد کنید.'),
        gender: Yup.string().required('جنسیت مدیر عامل را وارد کنید.'),
        iranian: Yup.string().required('تابعیت را وارد کنید.'),
        identificationType: Yup.string().required('نوع شماره شناسنامه را وارد کنید.'),
    });

    const methods = useForm({
        resolver: yupResolver(StatusSettingsSchema),
        defaultValues: {
            iranian: '',
            identificationType: '',
            gender: '',
            province: '',
            cityId: '',
        }
    });

    const {
        handleSubmit,
        setValue,
        formState: {isSubmitting},
        watch,
        getValues
    } = methods;

    const onSubmit = async (values) => {
        let response;
        if (line.legalType != -1) {
            response = await editLegalUser({
                ...values,
                companyType: parseInt(values.companyType),
                gender: parseInt(values.gender),
                identificationType: parseInt(values.identificationType),
                iranian: parseInt(values.iranian),
                lineId: parseInt(lineId),
            });
        } else {
            response = await createLegalUser({
                ...values,
                companyType: parseInt(values.companyType),
                gender: parseInt(values.gender),
                identificationType: parseInt(values.identificationType),
                iranian: parseInt(values.iranian),
                lineId: parseInt(lineId),
            });
        }

        if (response.isSuccess) {
            enqueueSnackbar('با موفقت تغییر کرد.');
        }
    };

    const {data, isLoading, isFetching} = useQuery(['LineLegalUser', userId, lineId], () =>
            getLineLegalUser(lineId, userId ?? 0), {
            enabled: line.legalType !== -1,
        }
    );
console.log(data);
    const {data: provinceData, isLoading: provinceLoading} = useQuery(['getProvinces'], getProvinces)

    useEffect(() => {
        if (data?.data) {
            Object.keys(data?.data).map((option) => setValue(option, data?.data[option]));
        }
    }, [data]);

    const getCities = useMutation({
        mutationFn: provinceId => getCitiesByProvince(provinceId),
        onSuccess: data => {
            setCities(data?.data)
        }
    })

    useEffect(() => {
        getValues('province') && getCities.mutate(getValues('province'))
    }, [watch('province')]);

    if (isLoading && isFetching) {
        return <LoadingWidget/>;
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
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
                    <RHFTextField name="firstName" label="نام"/>
                    <RHFTextField name="lastName" label="نام خانوادگی"/>
                    <RHFNumberField name="identificationNumber" label="شماره ملی شرکت"/>
                    <RHFTextField name="fatherName" label="نام پدر"/>
                    <RHFNumberField name="certificationNumber" label="شماره شناسنامه"/>
                    <RHFPhoneField name="phoneNumber" label="شماره تلفن"/>
                    <RHFMobileField name="mobile" label="شماره همراه"/>
                    <RHFTextField name="birthPlace" label="محل تولد"/>
                    <RHFDatePicker maxDate={new Date().setFullYear(new Date().getFullYear() - 18)} fullWidth
                                   name="birthDate" label="تاریخ تولد"/>
                    <RHFTextField name="companyName" label="نام شرکت"/>
                    <RHFSelect name="companyType" label="نوع شرکت">
                        {Object.keys(CompanyTypeEnum).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {CompanyTypeEnum[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                    <RHFNumberField name="companyPostalCode" label="کد پستی شرکت"/>
                    <RHFPhoneField name="companyPhoneNumber" label="شماره تلفن شرکت"/>
                    <RHFEmailField name="companyEmail" label="ایمیل شرکت"/>
                    <RHFDatePicker fullWidth name="companyRegisterationDate" label="تاریخ ثبت شرکت"/>
                    <RHFNumberField name="companyRegistrationNumber" label="شماره ثبت شرکت"/>
                    <RHFNumberField name="companyNationalCode" label="کد ملی شرکت"/>
                    <RHFNumberField name="companyEconomicCode" label="کد اقتصادی شرکت"/>
                    <RHFSelect name="gender" label="جنسیت مدیر عامل">
                        {Object.keys(GenderEnum).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {GenderEnum[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                    <RHFSelect name="identificationType" label="نوع شناسه هویتی شرکت">
                        {Object.keys(LegalIdentificationType).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {LegalIdentificationType[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                    <RHFSelect name="iranian" label="ایرانی/خارجی">
                        {Object.keys(IranianEnum).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {IranianEnum[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                    {
                        provinceLoading ? <LinearProgress/> : <RHFSelect
                            name="province"
                            label="استان"
                            onChange={(e) => {
                                setValue('province', e.target.value);
                            }}
                        >
                            {provinceData.data.map((option) => (
                                <CustomMenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </CustomMenuItem>
                            ))}
                        </RHFSelect>
                    }
                    {
                        getCities.isLoading ? <LinearProgress/> : <RHFSelect name="cityId" label="شهر">
                            {cities.map((option) => (
                                <CustomMenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </CustomMenuItem>
                            ))}
                        </RHFSelect>
                    }
                </Box>
                <RHFTextarea
                    name="companyAddress"
                    label="آدرس"
                    placeholder={'وجود شماره پلاک برای تایید آدرس ضروری می باشد'}
                />
                <Stack spacing={3} alignItems="flex-end" sx={{mt: 3, color: 'white'}}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        ذخیره تغییرات
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    );
}
