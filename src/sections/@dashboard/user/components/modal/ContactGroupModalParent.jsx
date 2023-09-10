import { Alert, Button, Stack } from '@mui/material';
import React from 'react';
// import { addGroup, editGroup } from 'src/services/contact/group';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import BaseStyleScrollModal from '../../../../../components/modal/BaseStyleScrollModal';
import { FormProvider, RHFTextField } from '../../../../../components/hook-form';
import { addGroupParent, editGroupParent } from '../../../../../services/contact/group';
import { useQueryClient } from '@tanstack/react-query';
// import BaseStyleScrollModal from '../../../../../components/modal/BaseStyleScrollModal';
// import { FormProvider, RHFTextField } from '../../../../../components/hook-form';

const ContactGroupModalParent = ({ state, setOpen, setData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { userId } = useParams();
  const queryClient = useQueryClient();
  const GroupNameSchema = Yup.object().shape({
    name: Yup.string().required('نام گروه را وارد کنید.'),
  });

  const methods = useForm({
    resolver: yupResolver(GroupNameSchema),
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
     
      const response = await editGroupParent({
        userId,
        name: values.name,
        parentId: state.data.parent_id,
        id: state.data.id,
      });
      if (response.isSuccess) {
        setData((perv) => {
          const elementIndex = perv.findIndex((obj) => obj.id == state.data.id);
          perv[elementIndex] = {
            ...perv[elementIndex],
            id: state.data.id,
            name: values.name,
            parentId: state.data.parent_id,
          };
          return perv;
        });
        enqueueSnackbar('گروه با موفقیت تغییر کرد.');
        queryClient.invalidateQueries(['contactsByIdParent'])
        handleClose();
      } else {
        enqueueSnackbar('عملیات با خطا مواجه شد!', { variant: 'error' });
      }
    } else {
      const response = await addGroupParent({ userId, name: values.name, parentId: state.data.parent_id });
      if (response.isSuccess) {
        setData((perv) => [...perv, { id: response.data.id, name: values.name, parentId: state.data.parent_id }]);
        enqueueSnackbar('گروه با موفقیت اضافه شد.');
        queryClient.invalidateQueries(['contactsByIdParent'])
        handleClose();
      } else {
        enqueueSnackbar('عملیات با خطا مواجه شد!', { variant: 'error' });
      }
    }
    reset();
  };

  return (
    <BaseStyleScrollModal
      show={state.data.show}
      handleClose={handleClose}
      title={state.edit ? 'تغییر گروه' : 'افزودن زیرگروه'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} marginY={3}>
          <RHFTextField autoFocus name="name" label="نام گروه" defaultValue={state.data.name ? state.data.name : ''} />
        </Stack>
        <Stack marginTop={1} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            size="large"
            sx={{
              minHeight: 36,
              maxHeight: 36,
              color: theme.palette.text.disabled,
              marginRight: 1,
              border: 'none',
              ':hover': {
                color: `${theme.palette.grey[100]  }!important`,
                backgroundColor: `${theme.palette.grey[700]  }!important`,
              },
            }}
            color={'inherit'}
            variant="outlined"
            onClick={handleClose}
          >
            انصراف
          </Button>
          <LoadingButton
            sx={{ minHeight: 36, maxHeight: 36, color: 'white' }}
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

export default ContactGroupModalParent;
