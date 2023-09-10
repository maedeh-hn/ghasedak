import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import RHFMobileField from '../../../../../components/hook-form/RHFMobileField';
import {
  FormProvider,
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFTextarea,
} from '../../../../../components/hook-form';
import CustomMenuItem from '../../../../../components/CustomMenuItem';
import RHFTextAreaField from '../../../../../components/hook-form/RHFTextarea';

import ProSettingCard from '../ProSettingCard';
import { getUserById, updateUser } from '../../../../../services/users/user';
import { UserStatusEnum  } from '../../../../../utils/enums';
import RHFPhoneField from '../../../../../components/hook-form/RHFPhoneField';
import RHFEmailField from '../../../../../components/hook-form/RHFEmailField';
import RHFCurrencyField from '../../../../../components/hook-form/RHFCurrencyField';

const UserGeneralInfo = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  // const {
  //     data: priceCutData,
  //     isLoading: priceCutLoading
  // } = useQuery(['priceCutList'], getPriceCut);

  const { data } = useQuery(['getUserById', userId], () => getUserById(userId));

  // const {data: groups, isLoading: isLoadingGroups} = useQuery(['allGroups'], getAllGroups);

  const validationSchema = Yup.object().shape({
    userName: Yup.string(),
    mobile: Yup.string(),
    fullName: Yup.string(),
    cityId: Yup.string(),
    // planId: Yup.string(),
    password: Yup.string(),
    userType: Yup.string(),
    phoneNumber: Yup.string(),
    email: Yup.string(),
    address: Yup.string(),
    credit: Yup.string(),
    webServicePassword: Yup.string(),
    // planExpireDate: Yup.string(),
    status: Yup.string(),
    lastModifiedBy: Yup.string(),
    lastModifiedDate: Yup.string(),
    registerDate: Yup.string(),
  });

  useEffect(() => {
    if (data && data?.userSettings) {
        console.log(data);
      Object?.keys(data?.userSettings).map((item) => {
        try {
          switch (item) {
            case 'creditAlarmPrice':
              setValue(item, '0');
              break;
            case 'whiteListSoapWebServiceIps':
              setValue(item, data?.[item].replaceAll(',', '\n'));
              break;
            case 'whiteListLoginIps':
              setValue(item, data?.[item].replaceAll(',', '\n'));
              break;
            default:
              setValue(item, data?.[item]);
              break;
          }
        } catch (e) {}
      });
      Object.keys(data).map((item) => {

        setValue(item, data?.[item]??'');
       
      });

      setIsLoading(false);
    }
  }, [data]);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
    getValues,
  } = methods;

  const onSubmit = async (values) => {
    const response = await updateUser({
      ...values,
      status: parseInt(values.status),
      userType: parseInt(values.userType),
      cityId:values.cityId===""?null:values.cityId,
      // planId: parseInt(values.planId),
      // groupIds: values.groupIds.map(item => item.id),
      userSettings: {
        ...values.userSettings,
        whiteListLoginIps: values.userSettings.whiteListLoginIps.replaceAll('\n', ','),
        whiteListSoapWebServiceIps: values.userSettings.whiteListSoapWebServiceIps.replaceAll('\n', ','),
        creditAlarmPrice: parseInt(values.userSettings.creditAlarmPrice),
      },
    });
    if (response.isSuccess) {
      enqueueSnackbar('تغییرات با موفقت اعمال شد.');
    }
  };

  // if (isLoading) {
  //     return <LoadingWidget/>
  // }

  return (
    <Card>
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
            <RHFTextField name="userName" type="username" label="نام کاربری" disabled />
            <RHFMobileField name="mobile" type="mobile" label="موبایل" disabled />
            <RHFTextField name="fullName" type="fullName" label="نام کامل" />
            {/* <RHFDatePicker name="planExpireDate" label={'انقضا پلن'}/> */}
            <RHFDatePicker disabled name="registerDate" label={'تاریخ ثبت نام'} />
            {/* <RHFSelect name="planId" label="پلن">
                            {Object.keys(PlanEnum).map((option, index) => (
                                <CustomMenuItem key={index} value={option}>
                                    {PlanEnum[option]}
                                </CustomMenuItem>
                            ))}
                        </RHFSelect> */}
            <RHFTextField name="password" label="رمز عبور" />
            {/* <RHFTextField name="webServicePassword" label="رمز وب سرویس"/> */}
            {/* <RHFSelect name="userType" label="نوع کاربر">
                            {Object.keys(UserTypeEnum).map((option, index) => (
                                <CustomMenuItem key={index} value={option}>
                                    {UserTypeEnum[option]}
                                </CustomMenuItem>
                            ))}
                        </RHFSelect> */}
            <RHFSelect name="status" label="وضعیت">
              {Object.keys(UserStatusEnum).map((option, index) => (
                <CustomMenuItem key={index} value={option}>
                  {UserStatusEnum[option]}
                </CustomMenuItem>
              ))}
            </RHFSelect>
            <RHFPhoneField name="phoneNumber" label="شماره تلفن ثابت" />
            <RHFEmailField name="email" label="ایمیل" />
            <RHFCurrencyField name="credit" label="موجودی" disabled />
            {/* {
                            (priceCutLoading && isLoading) ? <LinearProgress/> :
                                <RHFSelect name="priceCutId" label="تخفیف">
                                    {priceCutData?.data.map((option, index) => (
                                        <CustomMenuItem key={index} value={option.id}>
                                            {option.name}
                                        </CustomMenuItem>
                                    ))}
                                </RHFSelect>
                        } */}
          </Box>
          <RHFTextAreaField fullWidth name="address" label="آدرس" rows={1} />
          {/* 
                    <RHFStaticDataAutoComplete
                        fullWidth
                        defaultValue={getValues('groupIds') ?? []}
                        optionData={isLoadingGroups ? [] : (groups?.data?.items ?? [])}
                        getOptionLabel={(option) => option.name}
                        name="groupIds"
                        label={'گروه ها'}
                    /> */}
          <Divider />
          <Typography variant={'h4'}>تنظیمات پیشرفته</Typography>
          <Box
            sx={{
              display: 'grid',
              rowGap: 1,
              columnGap: 1,
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            }}
          >
            <ProSettingCard>
              <RHFSwitch
                key={'newsletterSubscribe'}
                name={'userSettings.newsletterSubscribe'}
                label={'عضویت در خبرنامه و اطلاع رسانی های پیامکی'}
                sx={{ m: 0 }}
              />
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch
                key={'checkDuplicateRequest'}
                name={'userSettings.checkDuplicateRequest'}
                label={'عدم ارسال پیام های تکراری'}
                sx={{ m: 0 }}
              />
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch
                key={'twoFactorAuth'}
                name={'userSettings.twoFactorAuth'}
                label={'ورود دو مرحله ایی'}
                sx={{ m: 0 }}
              />
              {watch('userSettings.twoFactorAuth') && (
                <Button fullWidth variant={'contained'} onClick={() => setShowQrCodeModal(true)}>
                  نمایش کد Qr
                </Button>
              )}
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch key={'debugMode'} name={'userSettings.debugMode'} label={'حالت تست و خطایابی'} sx={{ m: 0 }} />
            </ProSettingCard>
            {/* <ProSettingCard>
                            <RHFSwitch
                                key={'autoRenewal'}
                                name={'userSettings.autoRenewal'}
                                label={'تمدید خودکار سرویس'}
                                sx={{m: 0}}
                            />
                        </ProSettingCard> */}
            <ProSettingCard>
              <RHFSwitch
                key={'reboundFailure'}
                name={'userSettings.reboundFailure'}
                label={'باز ارسال پیام های نرسیده به گیرنده'}
                sx={{ m: 0 }}
              />
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch
                key={'disruptionNotification'}
                name={'userSettings.disruptionNotification'}
                label={'اعلان اختلال'}
                sx={{ m: 0 }}
              />
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch key={'loginAlarm'} name={'userSettings.loginAlarm'} label={'هشدار ورود'} sx={{ m: 0 }} />
              {watch('userSettings.loginAlarm') && (
                <RHFMobileField
                  fullWidth
                  name={'userSettings.alarmReceptorNumber'}
                  label={'شماره تلفن دریافت هشدار'}
                  style={{ display: 'block' }}
                />
              )}
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch
                key={'restrictIpLogin'}
                name={'userSettings.restrictIpLogin'}
                label={'محدود سازی ip ورود'}
                sx={{ m: 0 }}
              />
              {watch('userSettings.restrictIpLogin') && (
                <RHFTextarea
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/(?!\.)(?!\n)[^0-9]/g, '');
                    setValue(e.target.name, onlyNums);
                  }}
                  fullWidth
                  name={'userSettings.whiteListLoginIps'}
                  label={'لیست ip با Enter از هم جدا شوند'}
                  style={{ display: 'block' }}
                />
              )}
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch
                key={'restrictIpSoapWebService'}
                name={'userSettings.restrictIpSoapWebService'}
                label={'محدود سازی ip وب سرویس'}
                sx={{ m: 0 }}
              />
              {watch('userSettings.restrictIpSoapWebService') && (
                <RHFTextarea
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/(?!\.)(?!\n)[^0-9]/g, '');
                    setValue(e.target.name, onlyNums);
                  }}
                  fullWidth
                  name={'userSettings.whiteListSoapWebServiceIps'}
                  label={'لیست ip با Enter از هم جدا شوند'}
                  style={{ display: 'block' }}
                />
              )}
            </ProSettingCard>
            <ProSettingCard>
              <RHFSwitch
                key={'creditAlarm'}
                name={'userSettings.creditAlarm'}
                label={'کمترین میزان شارژ'}
                sx={{ m: 0 }}
              />
              {watch('userSettings.creditAlarm') && (
                <RHFCurrencyField
                  fullWidth
                  name={'userSettings.creditAlarmPrice'}
                  label={'میزان شارژ'}
                  style={{ display: 'block' }}
                />
              )}
            </ProSettingCard>
            {/* <RHFTextarea name="userSettings.allowedWords" rows={5} label="کلمات مجاز"/> */}
            {showQrCodeModal && <QrCodeModal show={showQrCodeModal} setShow={setShowQrCodeModal} />}
          </Box>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton sx={{ color: 'white' }} type="submit" variant="contained" loading={isSubmitting}>
              ذخیره تغییرات
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Card>
  );
};

export default UserGeneralInfo;
