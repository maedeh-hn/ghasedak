import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, InputAdornment, IconButton, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { useQuery } from '@tanstack/react-query';
import { getUser, UpdateUserProfile } from 'src/services/users/user';
import LoadingWidget from '../../../../components/LoadingWidget';

// ----------------------------------------------------------------------

import Gravatar from 'react-gravatar';
import Iconify from '../../../../components/Iconify';
import ChangePhoneModal from '../../../../components/modal/ChangePhoneModal';
import SettingDetailModal from "../components/modal/SettingDetailModal";
import RHFMobileField from "../../../../components/hook-form/RHFMobileField";
import CustomCard from "../../../../components/CustomCard";
import {toPersianNumber} from "../../../../utils/functions";

export default function AccountGeneral() {
  const { isLoading, data } = useQuery(['profile'], getUser);

  const [changePhoneModal, setChangePhoneModal] = useState(false);



  const { enqueueSnackbar } = useSnackbar();

  const { user, changeUser } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    address: Yup.string().nullable(),
    email: Yup.string().email('ایمیل معتبری را وارد کنید.').nullable(),
    fullName: Yup.string().nullable(),
  });

  useEffect(() => {
    if (data) {
      try {
        Object.keys(data?.data).map((item) => setValue(item, data?.data[item]));
      } catch (e) {}
    }
  }, [data]);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const response = await UpdateUserProfile(values);
    if (response.isSuccess) {
      const { data: user } = response;
      await changeUser(user);
      enqueueSnackbar('تغییرات با موفقیت اعمال شد.');
    } else {
      enqueueSnackbar(response.message, { variant: 'error' });
    }
  };

  return isLoading ? (
    <LoadingWidget />
  ) : (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CustomCard sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <Gravatar
                email={user?.email || 'default@gmail.com'}
                default={'mp'}
                size={150}
                style={{
                  borderRadius: '50%',
                  margin: '20px auto',
                }}
              />
              <p>عکس پروفایل از سرویس Gravatar استفاده می کند</p>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={9}>
            <CustomCard sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField disabled={true} name="userName" label="نام کاربری" />
                <RHFTextField name="fullName" label="نام و نام خانوادگی" />
                <RHFMobileField
                  disabled={true}
                  name="mobile"
                  label="موبایل"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setChangePhoneModal(!changePhoneModal)} edge="end">
                          تغییر شماره
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <RHFTextField name="email" label="ایمیل" />
              </Box>
              <RHFTextField sx={{ width: '100%', mt: 4 }} name="address" multiline rows={4} label="آدرس" />
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  ذخیره تغییرات
                </LoadingButton>
              </Stack>
            </CustomCard>
          </Grid>
        </Grid>
      </FormProvider>
      {changePhoneModal && <ChangePhoneModal show={changePhoneModal} setShow={setChangePhoneModal} />}

    </>
  );
}
