import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Accordion, Alert, Box, Button, Card, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFSwitch, RHFTextarea } from '../../../../components/hook-form';
import { useQuery } from '@tanstack/react-query';
import { getUserProSettings, updateUserProSettings } from 'src/services/users/userSettings';
import React, { useEffect, useState } from 'react';
import LoadingWidget from '../../../../components/LoadingWidget';
import QrCodeModal from '../../../../components/modal/QrCodeModal';
import SettingDetailModal from '../components/modal/SettingDatailModal';
import RHFCurrencyField from '../../../../components/hook-form/RHFCurrencyField';
import CustomCard from "../../../../components/CustomCard";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountProSetting() {
  const { enqueueSnackbar } = useSnackbar();

  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  const { isLoading, data } = useQuery(['userProSettings'], getUserProSettings);

  const [detailModal, setDetailModal] = useState({
    show: false,
    data: null,
  });

  const SettingCard = ({ title, description, name, children, formInput }) => (
    <CustomCard>
      <Stack spacing={2} padding={2} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <RHFSwitch key={name} name={name} label={title} sx={{ m: 0 }} />
        <Button
          sx={{ marginRight: 4, marginTop: '0 !important' }}
          title={'توضیحات'}
          onClick={() =>
            setDetailModal({
              show: true,
              data: {
                title: title,
                detail: description,
                child: children,
              },
            })
          }
          size={'small'}
        >
          <Typography>توضیحات</Typography>
        </Button>
      </Stack>
      {formInput}
    </CustomCard>
  );

  const methods = useForm();

  const {
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (data?.isSuccess) {
      Object.keys(data?.data).map((item) => {
        try {
          switch (item) {
            case 'creditAlarmPrice':
              setValue(item, '0');
              break;
            case 'whiteListSoapWebServiceIps':
              setValue(item, data?.data[item].replaceAll(',', '\n'));
              break;
            case 'whiteListLoginIps':
              setValue(item, data?.data[item].replaceAll(',', '\n'));
              break;
            default:
              setValue(item, data?.data[item]);
              break;
          }
        } catch (e) {}
      });
    }
  }, [data]);

  const onSubmit = async (values) => {
    const response = await updateUserProSettings({
      ...values,
      whiteListLoginIps: values.whiteListLoginIps.replaceAll('\n', ','),
      whiteListSoapWebServiceIps: values.whiteListSoapWebServiceIps.replaceAll('\n', ','),
      creditAlarmPrice: parseInt(values.creditAlarmPrice),
    });
    if (response.isSuccess) {
      enqueueSnackbar('تغییرات با موفقیت ذخیره شد');
    }
  };
  return isLoading ? (
    <LoadingWidget />
  ) : data?.isSuccess ? (
    <>
      <CustomCard sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <SettingCard
              title={'عضویت در خبرنامه و اطلاع رسانی های پیامکی'}
              name={'newsletterSubscribe'}
              description={
                'با فعال سازی این مورد، اخبار و اطلاعیه ها در قالب پیام کوتاه به شماره مکاتبات ثبت شده در اطلاعات حساب شما ارسال می گردد.'
              }
            />
            <SettingCard
              title={'عدم ارسال پیام های تکراری'}
              name={'checkDuplicateRequest'}
              description={
                'با وارد کردن مقدار checkid و فعال کردن این گزینه، در صورتی که پیام تکراری باشد، ارسال نخواهد شد.'
              }
            />

            <SettingCard
              title={'ورود دو مرحله ایی'}
              name={'twoFactorAuth'}
              description={
                'با فعال کردن این گزینه بعد از ورود به سیستم یک کد به شماره موبایل شما ارسال می شود و بعد از وارد کردن آن کد می توانید وارد حساب کاربری خود شوید .'
              }
              formInput={
                watch('twoFactorAuth') && (
                  <Box display={'flex'} justifyContent={'center'}>
                    <Button onClick={() => setShowQrCodeModal(true)}>
                      {!showQrCodeModal ? 'نمایش تصویر' : 'بستن تصویر'} Qr
                    </Button>
                  </Box>
                )
              }
            ></SettingCard>
            <SettingCard
              title={'حالت تست و خطایابی'}
              name={'debugMode'}
              description={'در صورت فعال بودن این گزینه پیام ها ارسال نمی گردند تا شما کد خود را تست نمائید'}
            />

            <SettingCard
              title={'تمدید خودکار سرویس'}
              name={'autoRenewal'}
              description={
                'با فعال سازی این مورد، در صورت داشتن موجودی کافی سرویس شما به صورت اتوماتیک یک سال دیگر تمدید خواهد شد .'
              }
            />
            <SettingCard
              title={'باز ارسال پیام های نرسیده به گیرنده'}
              name={'reboundFailure'}
              description={
                'با فعال بودن این گزینه پیامک هایی که به گیرنده نمی رسند (نرسیده به گیرنده) یا ارسال آنها از طرف مخابرات با خطا مواجه میشود به محض دریافت وضعیت های مورد نظر از مخابرات دوباره ارسال می شوند (این روند فقط یکبار اتفاق می افتد.) توجه نمائید هزینه هر بار ارسال پیامک از اعتبار شما کسر میشود. زیرا اپراتورها هزینه پیامک های نرسیده به گیرنده یا ارسال با خطا را بازگشت نمی دهند.'
              }
            />
            <SettingCard
              title={'اعلان اختلال'}
              name={'disruptionNotification'}
              description={'در صورت اختلال در سیستم اعلان برای شما ارسال خواهد شد .'}
            />
            <SettingCard
              title={'محدود سازی ip ورود'}
              name={'restrictIpLogin'}
              description={' لیست ip های مجاز برای ورود به حساب را وارد کرده و با Enter از هم جدا کنید.'}
              formInput={
                watch('restrictIpLogin') && (
                  <>
                    <RHFTextarea
                        inputProps={{
                            style: {
                                fontFeatureSettings: 'initial',
                                MozFontFeatureSettings: 'initial',
                                WebkitFontFeatureSettings: 'initial',
                            }
                        }}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/(?!\.)(?!\n)[^0-9]/g, '');
                        setValue(e.target.name, onlyNums);
                      }}
                      fullWidth
                      name={'whiteListLoginIps'}
                      label={'لیست ip با Enter از هم جدا شوند'}
                      style={{ display: 'block' }}
                    />
                          <Typography sx={{fontSize:'12px'}} padding={2}>
                              لیست ip های مجاز برای ورود به حساب را وارد کرده و با Enter از هم جدا کنید.
                          </Typography>
                  </>
                )
              }
            />
            <SettingCard
              title={'محدود سازی ip وب سرویس'}
              name={'restrictIpSoapWebService'}
              description={'  لیست ip های مجاز برای کار با وب سرویس را وارد کرده و با Enter از هم جدا کنید.'}
              formInput={
                watch('restrictIpSoapWebService') && (
                  <>
                    <RHFTextarea
                        inputProps={{
                            style: {
                                fontFeatureSettings: 'initial',
                                MozFontFeatureSettings: 'initial',
                                WebkitFontFeatureSettings: 'initial',
                            }
                        }}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/(?!\.)(?!\n)[^0-9]/g, '');
                        setValue(e.target.name, onlyNums);
                      }}
                      fullWidth
                      name={'whiteListSoapWebServiceIps'}
                      label={'لیست ip با Enter از هم جدا شوند'}
                      style={{ display: 'block' }}
                    />

                    <Typography sx={{fontSize:'12px'}} padding={2}>
                      لیست ip های مجاز برای کار با وب سرویس را وارد کرده و با Enter از هم جدا کنید.
                    </Typography>
                  </>
                )
              }
            />
            <SettingCard
              title={'هشدار اتمام شارژ'}
              name={'creditAlarm'}
              description={
                ' در صورتی که موجودی حساب شما به حداقل میزان تعیین شده برسد، هشدار کمبود موجودی برایتان ارسال خواهد شد .'
              }
              formInput={
                watch('creditAlarm') && (
                  <>
                    <RHFCurrencyField
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                        setValue(e.target.name, onlyNums);
                      }}
                      inputMode={'numeric'}
                      fullWidth
                      name={'creditAlarmPrice'}
                      label={'میزان شارژ(ریال)'}
                      style={{ display: 'block' }}
                      defaultValue={0}
                    />

                    <Typography sx={{fontSize:'12px'}} padding={2}>
                      در صورتی که موجودی حساب شما به حداقل میزان تعیین شده برسد، هشدار کمبود موجودی برایتان ارسال خواهد
                      شد .
                    </Typography>
                  </>
                )
              }
            />
          </Box>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              ذخیره تغییرات
            </LoadingButton>
          </Stack>
        </FormProvider>
      </CustomCard>
      {showQrCodeModal && <QrCodeModal show={showQrCodeModal} setShow={setShowQrCodeModal} />}
      {detailModal.show && <SettingDetailModal state={detailModal} setState={setDetailModal} />}
    </>
  ) : (
    <Alert severity="error">تنطیمات پیدا نشد</Alert>
  );
}
