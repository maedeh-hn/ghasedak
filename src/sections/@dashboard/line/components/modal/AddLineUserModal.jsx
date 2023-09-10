import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, TextField, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Autocomplete, LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseStyleScrollModal from '../../../../../components/modal/BaseStyleScrollModal';
import { FormProvider, RHFSwitch } from '../../../../../components/hook-form';
import RHFCurrencyField from '../../../../../components/hook-form/RHFCurrencyField';
import RHFNumberField from '../../../../../components/hook-form/RHFNumberField';
import {
  AllUnallocatedLinestoAUserParent,
  addLineUser,
  getLineUserParentSetting,
} from '../../../../../services/lines/lineUsers';
import { lineUserSearch } from '../../../../../services/lines/user';

// import BaseStyleScrollModal from '../../../../../components/modal/BaseStyleScrollModal';
// import {FormProvider, RHFSwitch} from '../../../../../components/hook-form';
// import RHFCurrencyField from "../../../../../components/hook-form/RHFCurrencyField";
// import RHFNumberField from "../../../../../components/hook-form/RHFNumberField";

const AddLineUserModal = ({ state, setState, refetch, userName }) => {
  const theme = useTheme();
  const lineData = useSelector((state) => state.lineData)?.currentLine;
  const params = useParams();

  console.log(params);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState(params.userId);
  const [options, setOptions] = useState([]);
  const [selectLineId, setSelectLineId] = useState('');
  const [settingParent, setSettingParent] = useState();
  const loading = open && options.length === 0;

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    reset();
    setState(false);
  };

  const LineUserSchema = Yup.object().shape({
    lineId: Yup.string().required('خط را انتخاب کنید.'),
    canRecieve: Yup.boolean(),
    canUseWebservice: Yup.boolean(),
    canSendToGroups: Yup.boolean(),
    needsConfirmationToSend: Yup.boolean(),
    // purchasePrice: Yup.string(),
    // isOwnershipVisible: Yup.boolean(),
  });

  const methods = useForm({
    resolver: yupResolver(LineUserSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = async (values) => {
    const response = await addLineUser({ ...values, userId: params.userId });
    console.log(values);
    if (response.isSuccess) {
      enqueueSnackbar('کاربر ذخیره شد.');
      refetch();
      handleClose();
    }
  };
  console.log(options);
  useEffect(() => {
    let active = true;

    (async () => {
      const data = await AllUnallocatedLinestoAUserParent(search);

      if (active) {
        setOptions(data ?? []);
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    (async () => {
      let data;
      if (selectLineId) {
        data = await getLineUserParentSetting(selectLineId);
        setSettingParent(data ?? []);
      }
    })();
  }, [selectLineId]);
  console.log(settingParent);
  return (
    <BaseStyleScrollModal title={`تخصیص خط جدید برای  ${userName}`} handleClose={handleClose} show={state}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Box sx={{ marginBottom: 3 }}>
            <Autocomplete
              noOptionsText={'کاربری یافت نشد'}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.number}
              onChange={(event, value, reason, details) => {
                setValue('lineId', value?.id ?? '');
                setSelectLineId(value?.id);
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  sx={{ width: '100%' }}
                  {...params}
                  label="خطوط"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Box>
          {/* <Box sx={{marginBottom: 4}}>
                        <RHFCurrencyField name={'purchasePrice'} label={'قیمت خرید'}/>
                    </Box> */}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: { sx: 2, md: 20 } }}>
          <RHFSwitch
            name={'canRecieve'}
            label={'دریافت'}
            sx={{ m: 0 }}
            disabled={settingParent?.canReceive === false}
          />
          <RHFSwitch
            name={'canSendToGroups'}
            label={'ارسال گروهی'}
            sx={{ m: 0 }}
            disabled={settingParent?.canSendToGroups === false}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: { sx: 2, md: 16 } }}>
          <RHFSwitch
            name={'canUseWebservice'}
            label={'ارسال وب سرویس'}
            sx={{ m: 0 }}
            disabled={settingParent?.canUseWebservice === false}
          />
          <RHFSwitch name={'needsParentConfirmationToSend'} label={'نیاز به تایید ارسال'} sx={{ m: 0 }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3, px: 3, gap: { sx: 2, md: 16 } }}></Box>
        {/* <Box sx={{my: 3}}>
                    <RHFNumberField name="maxBulkReceptorsWithoutConfirm" label="محدودیت ارسال گروهی بدون تایید"/>
                </Box> */}

        <Stack sx={{ marginTop: 3 }} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            size="large"
            sx={{
              minHeight: 36,
              maxHeight: 36,
              border: 'none',
              color: theme.palette.text.disabled,
              ':hover': {
                color: `${theme.palette.grey[100]}!important`,
                backgroundColor: `${theme.palette.grey[700]}!important`,
              },
              marginRight: 1,
            }}
            color={'inherit'}
            variant="outlined"
            onClick={handleClose}
          >
            انصراف
          </Button>
          <LoadingButton
            sx={{ minHeight: 36, maxHeight: 36, color: 'white' }}
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            ذخیره
          </LoadingButton>
        </Stack>
      </FormProvider>
    </BaseStyleScrollModal>
  );
};

export default AddLineUserModal;
