import React from 'react';
import { Alert, Button, Grid, Stack } from '@mui/material';
import BaseStyleModal from '../../../../../../components/modal/BaseStyleModal';
import { FormProvider, RHFTextarea } from '../../../../../../components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { createMultipleGroupNumbers } from 'src/services/contact/group-number';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const AddGroupNumberModal = ({ state, handleClose, refetch }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { id: groupId } = useParams();

  const theme = useTheme();

  const GroupNameSchema = Yup.object().shape({
    name: Yup.string().required('شماره تلفن را وارد کنید.'),
  });

  const methods = useForm({
    resolver: yupResolver(GroupNameSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const numberPhone = values.name.split(/\r?\n/);
    let temp = [];
    numberPhone.forEach((num) => {
      if (num.length > 0) temp.push(num);
    });
    const response = await createMultipleGroupNumbers(groupId, temp);
    if (response.isSuccess) {
      refetch();
      enqueueSnackbar(`${response?.data?.numbers?.length} شماره تلفن با موفقیت اضافه شد.`);
      handleClose();
    }
  };

  return (
    <>
      <BaseStyleModal title={'افزودن شماره'} handleClose={handleClose} show={state}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextarea fullWidth name="name" label="افزودن شماره" placeholder="شماره ها را با Enter از هم جدا کنید." />
          <Stack sx={{ mt: 3 }} flexDirection={'row'} justifyContent={'flex-end'}>
            <Button
              size="large"
              sx={{
                minHeight: 36,
                maxHeight: 36,
                minWidth: 84,
                color: theme.palette.text.disabled,
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
              ذخیره
            </LoadingButton>
          </Stack>
        </FormProvider>
      </BaseStyleModal>
    </>
  );
};

export default AddGroupNumberModal;
