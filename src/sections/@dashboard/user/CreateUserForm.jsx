import React, {useState} from "react";

import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
// import {createUser} from "src/services/users/user";
import {Box, Card, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import {FormProvider, RHFSelect, RHFTextField} from "../../../components/hook-form";

import RHFMobileField from "../../../components/hook-form/RHFMobileField";
import RHFDatePicker from "../../../components/hook-form/RHFDatePicker";
import RHFEmailField from "../../../components/hook-form/RHFEmailField";
import RHFCurrencyField from "../../../components/hook-form/RHFCurrencyField";
import province from "../../../assets/jsons/provinces";
import CustomMenuItem from "../../../components/CustomMenuItem";
import cities from "../../../assets/jsons/cities";
import {PlanEnum, UserStatusEnum, UserTypeEnum} from "../../../utils/enums";
import {PATH_DASHBOARD} from "../../../routes/paths";
import { useSnackbar } from "notistack";
import RHFPhoneField from "../../../components/hook-form/RHFPhoneField";
import { createUser } from "../../../services/users/user";

const CreateUserForm = () => {
    const navigate = useNavigate()
    const [provinceId, setProvinceId] = useState(0);

    const {enqueueSnackbar} = useSnackbar();

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('نام کاربری را وارد کنید.'),
        password: Yup.string().required('رمزعبور را وارد کنید.'),
        // password: Yup.string()
        // .required('رمزعبور را وارد کنید.')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        //     'حداقل 8 کاراکتر شامل کاراکتر خاص، عدد، حرف بزرگ و حرف کوچک باشد '
        // ),
        // userType: Yup.string().required('نوع را وارد کنید.'),
        fullName: Yup.string(),
        phoneNumber: Yup.string(),
        mobile: Yup.string().required('شماره موبایل را وارد کنید'),
        cityId: Yup.mixed().required('شهر را وارد کنید.'),
        email: Yup.string(),
        address: Yup.string(),
        // planId: Yup.mixed().required('پلن را وارد کنید.'),
        // webServicePassword: Yup.string(),
        // credit:Yup.string()
        // planExpireDate: Yup.string(),
        // status: Yup.mixed().required('وضعیت را وارد کنید.'),

    });

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;
    const onSubmit = async (values) => {
        const response = await createUser({
            ...values,
            // userType: parseInt(values.userType),
            // status: parseInt(values.status),
            // planId: parseInt(values.planId),
            cityId: parseInt(values.cityId),
        });
        console.log(response);
        if (response.isSuccess) {
            enqueueSnackbar('کاربر با موفقیت اضافه شد.');
            navigate(PATH_DASHBOARD?.userManagement?.root)
        }
    };

    return (
        <Card>
            <FormProvider methods={methods}
             onSubmit={handleSubmit(onSubmit)}
            >
   
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
                        <RHFTextField name="userName" label="نام کاربری"/>
                        <RHFTextField name="password" label="رمزعبور"/>
                        <RHFTextField name="fullName" label="نام کامل"/>
                        <RHFPhoneField name="phoneNumber" type="number" label="شماره تلفن ثابت"/>
                        <RHFMobileField name="mobile" label="شماره همراه"/>
                        {/* <RHFDatePicker name="planExpireDate" label={'تاریخ انقضا پلن'} minDate={new Date()}/> */}
                        <RHFEmailField name="email" label="ایمیل"/>
                        <RHFTextField name="address" label="آدرس"/>
                        {/* <RHFTextField name="webServicePassword" label="رمز وب سرویس"/> */}
                        <RHFSelect name="Province" label="استان" onChange={(e) => setProvinceId(e.target.value)}>
                            {province.map((option) => (
                                <CustomMenuItem key={option.id} value={option.id}>{option.name}</CustomMenuItem>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="cityId" label="شهر">
                            {cities
                                .filter((item) => item.province_id == provinceId)
                                .map((option) => (
                                    <CustomMenuItem key={option.id} value={option.id}>{option.name}</CustomMenuItem>
                                ))}
                        </RHFSelect>
                        {/* <RHFSelect name="userType" label="نوع کاربر">
                            {Object.keys(UserTypeEnum).map((option) => (
                                <CustomMenuItem value={option} key={option}>{UserTypeEnum[option]}</CustomMenuItem>
                            ))}
                        </RHFSelect> */}
                        {/* <RHFTextField name="credit" label="اعتبار"/> */}
                        {/* <RHFSelect name="planId" label="پلن">
                            {Object.keys(PlanEnum).map((option) => (
                                <CustomMenuItem value={option} key={option}>{PlanEnum[option]}</CustomMenuItem>
                            ))}
                        </RHFSelect> */}
                        {/* <RHFSelect name="status" label="وضعیت">
                            {Object.keys(UserStatusEnum).map((option) => (
                                <CustomMenuItem value={option} key={option}>{UserStatusEnum[option]}</CustomMenuItem>
                            ))}
                        </RHFSelect> */}
                    </Box>
                    <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>
                        <LoadingButton sx={{color: 'white'}} type="submit" variant="contained" loading={isSubmitting}>
                           ثبت کاربر
                        </LoadingButton>
                    </Stack>
                </Stack>
            </FormProvider>
        </Card>
    );
}

export default CreateUserForm;