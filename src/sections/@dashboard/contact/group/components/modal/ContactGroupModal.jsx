import { Alert, Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { createGroup, editGroup } from 'src/services/contact/group';
import { FormProvider, RHFTextField } from '../../../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import BaseStyleModal from '../../../../../../components/modal/BaseStyleModal';
import { useTheme } from '@mui/material/styles';

const ContactGroupModal = ({ state, setOpen, setData, refetch, data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const GroupNameSchema = Yup.object().shape({
    name: Yup.string().required('نام گروه را وارد کنید.').nullable('نام را وارد کنید.'),
  });

  const methods = useForm({
    resolver: yupResolver(GroupNameSchema),
    defaultValues: state.data,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const handleClose = () => {
    setOpen({
      edit: false,
      data: { show: false, parent_id: 0, id: null, name: null },
    });
    reset();
  };

  const onSubmit = async (values) => {
    if (state.edit) {

      const response = await editGroup({ name: values.name, parentId: state.data.parent_id, id: state.data.id });
      if (response.isSuccess) {

        refetch();
        enqueueSnackbar('گروه با موفقیت تغییر کرد.');
        handleClose();
      }
    } else {

      const response = await createGroup({ name: values.name, parentId: state.data.parent_id });

      if (response.isSuccess) {
        setData((perv) => [...perv, { id: response.data.id, name: values.name, parentId: state.data.parent_id }]);
        refetch();
        enqueueSnackbar('گروه با موفقیت اضافه شد.');
        handleClose();
      }
    }
    reset();
  };

  return (
    <BaseStyleModal show={state.data.show} handleClose={handleClose} title={state.edit ? 'تغییر گروه' : 'افزودن گروه'}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} marginY={3}>
          <RHFTextField name="name" label="نام گروه" defaultValue={state.data.name ? state.data.name : ''} />
        </Stack>

        <Stack flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            size="large"
            sx={{
              minWidth: 84,
              minHeight: 36,
              maxHeight: 36,
              color: theme.palette.text.disabled,
              marginRight: 1,
              border: 'none',
              ':hover': {
                color: theme.palette.grey[100] + '!important',
                backgroundColor: theme.palette.grey[700] + '!important',
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
  );
};

export default ContactGroupModal;
