import React from 'react';
import BaseStyleModal from '../../../../../components/modal/BaseStyleModal';
import { FormProvider } from '../../../../../components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Stack, Typography } from '@mui/material';

//services
import { useTheme } from '@mui/material/styles';
import Num2persian from 'num2persian';
import { tomanPrice } from 'src/utils/functions';
import { chargeAccount } from 'src/services/users/user';
import RHFCurrencyField from "../../../../../components/hook-form/RHFCurrencyField";

const ChargeAccountModal = ({ state, setState }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const ChargeSchema = Yup.object().shape({
    amount: Yup.string().required('مبلغ را وارد کنید.').test({
      name: 'amount',
      test: (value, ctx) => {
        if (parseInt(value) < 10000) {
          return ctx.createError({message: 'مبلغ وارد شده کمتر از حد مجاز است.'})
        }
        return true
      }
    }),
  });

  const handleClose = () => {
    reset();
    setState({
      open: false,
      data: null,
    });
  };

  const methods = useForm({
    resolver: yupResolver(ChargeSchema),
    defaultValues: {
      charge: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = async (values) => {
    const response = await chargeAccount(values);
    if (response.isSuccess) {
      enqueueSnackbar('درحال انتقال به درگاه ...');
      window.location.replace(response.data.bankUrl + response.data.bankCode);
    }
  };

  return (
    <BaseStyleModal title={'افزایش اعتبار حساب'} handleClose={handleClose} show={state.open} lgWidth={600}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Alert severity={'info'}>9 درصد مالیات بر ارزش افروده از اول سال 94 از میزان شارژ حساب شما کم می شود .</Alert>

          <RHFCurrencyField name="amount" label="مبلغ شارژ" />

          <Typography> معادل {Num2persian(tomanPrice(watch('amount')))}  تومان</Typography>
        </Stack>

        <Stack sx={{ mt: 6 }} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            size="large"
            sx={{
              minHeight: 36,
              maxHeight: 36,
              minWidth: 84,
              color: theme.palette.text.disabled,
              borderColor: theme.palette.text.disabled,
              marginRight: 1,
              border: 'none',
              ':hover': {
                color: theme.palette.grey[100],
                backgroundColor: theme.palette.grey[700],
              },
            }}
            color={'inherit'}
            variant="outlined"
            onClick={handleClose}
          >
            انصراف
          </Button>
          <LoadingButton
            sx={{ minHeight: 36, maxHeight: 36, minWidth: 84 }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            پرداخت
          </LoadingButton>
        </Stack>
      </FormProvider>
    </BaseStyleModal>
  );
};
export default ChargeAccountModal;
