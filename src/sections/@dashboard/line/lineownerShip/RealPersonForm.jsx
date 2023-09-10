import React, {useEffect, useState} from 'react';
import {useSnackbar} from 'notistack';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, LinearProgress, Stack} from '@mui/material';
import * as Yup from 'yup';
import {LoadingButton} from '@mui/lab';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {FormProvider, RHFDatePicker, RHFSelect, RHFTextarea, RHFTextField} from '../../../../components/hook-form';
import {NaturalIdentificationTypeEnum, GenderEnum, IranianEnum} from '../../../../utils/enums';
import LoadingWidget from '../../../../components/LoadingWidget';
import {getLineNaturalUser} from "../../../../services/lines/naturalUsers"
import {editNaturalUser,createNaturalUser} from 'src/services/lines/naturalUsers';
import RHFNumberField from '../../../../components/hook-form/RHFNumberField';
import RHFMobileField from "../../../../components/hook-form/RHFMobileField";
import RHFPhoneField from "../../../../components/hook-form/RHFPhoneField";
import RHFEmailField from "../../../../components/hook-form/RHFEmailField";
import CustomMenuItem from "../../../../components/CustomMenuItem";
import {getCitiesByProvince, getProvinces} from "src/services/users/city";

const RealPersonForm = ({line}) => {
    const {userId, lineId} = useParams();
console.log(line.legalType);
    const [cities, setCities] = useState([])

    const {enqueueSnackbar} = useSnackbar();
    const StatusSettingsSchema = Yup.object().shape({
        firstName: Yup.string().required('نام را وارد کنید.'),
        lastName: Yup.string().required('نام خانوادگی را وارد کنید.'),
        province: Yup.string().required('استان را وارد کنید.'),
        cityId: Yup.string().required('شهر را وارد کنید.'),
        identificationNumber: Yup.string().required('شماره شناسنامه را وارد کنید.'),
        certificationNumber: Yup.string().required('شناسه هویتی را وارد کنید.'),
        phoneNumber: Yup.string().required('شماره تلفن را وارد کنید.'),
        mobile: Yup.string().required('شماره همراه را وارد کنید.'),
        fatherName: Yup.string().required('نام پدر را وارد کنید.'),
        birthDate: Yup.string().required('تاریخ تولد را وارد کنید.'),
        birthPlace: Yup.string().required('محل تولد را وارد کنید.'),
        email: Yup.string().required('ایمیل را وارد کنید.'),
        address: Yup.string().required('آدرس را وارد کنید.'),
        postalCode: Yup.string().min(10, 'کد پستی باید حداقل 10 رقم باشد.').max(10, 'کد پستی باید حداکثر 10 رقم باشد.').required('کد پستی را وارد کنید.'),
        gender: Yup.string().required('جنسیت را وارد کنید.'),
        identificationType: Yup.string().required('نوع سناسه هویتی را وارد کنید.'),
        iranian: Yup.string().required('تابعیت را وارد کنید.'),
    });

    const {data, isLoading, isFetching} = useQuery(['LineNaturalOwner', lineId], () =>
            getLineNaturalUser(lineId), {
                enabled: line.legalType !== -1,
            }
    );

    const {data: provinceData, isLoading: provinceLoading} = useQuery(['getProvinces'], getProvinces)
console.log(data);
    const methods = useForm({
        mode: 'onChange',
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
            response = await editNaturalUser({
                ...values,
                identificationType: parseInt(values.identificationType),
                gender: parseInt(values.gender),
                lineId: parseInt(lineId),
                iranian: parseInt(values.iranian),
            });
        } else {
            response = await createNaturalUser({
                ...values,
                identificationType: parseInt(values.identificationType),
                gender: parseInt(values.gender),
                lineId: parseInt(line.id),
                iranian: parseInt(values.iranian),
            });
        }
        if (response.isSuccess) {
            enqueueSnackbar('با موفقت تغییر کرد.');
        }
    };

    useEffect(() => {
        if (data?.data) {
            {
                Object.keys(data?.data).map((option) => setValue(option, data?.data[option]));
            }
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
                    <RHFTextField name="fatherName" label="نام پدر"/>
                    <RHFNumberField name="identificationNumber" label="شماره شناسنامه"/>
                    <RHFSelect name="identificationType" label="نوع شناسه هویتی">
                        {Object.keys(NaturalIdentificationTypeEnum).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {NaturalIdentificationTypeEnum[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                    <RHFNumberField name="certificationNumber" label="شناسه هویتی"/>
                    <RHFSelect name="gender" label="جنسیت">
                        {Object.keys(GenderEnum).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {GenderEnum[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                    <RHFPhoneField name="phoneNumber" label="شماره تلفن"/>
                    <RHFMobileField name="mobile" label="شمار همراه"/>
                    <RHFTextField name="birthPlace" label="محل تولد"/>
                    <RHFDatePicker maxDate={new Date().setFullYear(new Date().getFullYear() - 18)} fullWidth
                                   name="birthDate" label="تاریخ تولد"/>
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
                    <RHFEmailField name="email" label="ایمیل"/>
                    <RHFNumberField name="postalCode" label="کد پستی"/>
                    <RHFSelect name="iranian" label="ایرانی/خارجی">
                        {Object.keys(IranianEnum).map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {IranianEnum[option]}
                            </CustomMenuItem>
                        ))}
                    </RHFSelect>
                </Box>
                <RHFTextarea name="address" label="آدرس" placeholder={'وجود شماره پلاک برای تایید آدرس ضروری می باشد'}/>
                <Stack spacing={3} alignItems="flex-end" sx={{mt: 3, color: 'white'}}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        ذخیره تغییرات
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default RealPersonForm;
