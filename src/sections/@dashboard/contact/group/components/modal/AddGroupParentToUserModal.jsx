import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, RHFSelect } from '../../../../../../components/hook-form';
import { useParams } from 'react-router';
import BaseStyleModal from '../../../../../../components/modal/BaseStyleModal';
import { ListGeneratorFromEnum } from '../../../../../../utils/functions';
import CustomMenuItem from '../../../../../../components/CustomMenuItem';
import { GroupAccessType, ServiceTypeEnum } from '../../../../../../utils/enums';
import { lineUserSearch } from '../../../../../../services/lines/user';
import { assignGroupParenttoUser, getAllGroup, serachGroupParent } from '../../../../../../services/contact/group';

// import {useQueryClient} from "@tanstack/react-query";
// import { FormProvider, RHFSelect } from '../../../../../components/hook-form';
// import { useParams } from 'react-router';
// import BaseStyleModal from '../../../../../components/modal/BaseStyleModal';
// import { ListGeneratorFromEnum } from '../../../../../utils/functions';
// import CustomMenuItem from '../../../../../components/CustomMenuItem';
// import { editServiceAccessibilityParent } from '../../../../../services/smsRequestManagement/serviceAccessibilities';
// import { ServiceTypeEnum } from '../../../../../utils/enums';
// // import {ServiceTypeEnum} from "../../../../../utils/enums";

const AddGroupParentToUserModal = ({ state, handleClose, data, userId }) => {
  const [userSearchModal, setUserSearchModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const loading = open && search.length >= 3;

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;

    (async () => {
      setOptions([]);

      const data = await serachGroupParent(search);

      if (active) {
        setOptions(data?.data);
      }
 
    })();
    return () => {
      active = false;
    };
  }, [search]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      groupId: data?.id,
      accessType: data?.accessType,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = async (data) => {
    const values = {
      ...data,
      userId: userId,
    };
    const response = await assignGroupParenttoUser(values);
    if (response.isSuccess) {
      enqueueSnackbar('عملیات با موفقیت انجام شد.');
      queryClient.invalidateQueries(['contactsByIdParent'])
      handleClose();
    }
  };
  return (
    <BaseStyleModal title={data ? 'ویرایش دسترسی' : ' افزودن دسترسی'} handleClose={handleClose} show={state}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            paddingY: 2,
            display: 'grid',
            rowGap: 3,
            columnGap: 1,
          }}
          marginBottom={1}
        >
          {!data && (
            <Autocomplete
              sx={{ width: '100%' }}
              noOptionsText={search.length <= 2 ? 'جستجو کنید...' : 'کاربری یافت نشد'}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setValue('groupId', value?.id ?? '');
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="جستجوی گروه"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Stack paddingRight={3} direction={'row'} alignItems={'center'}>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}

                        {params.InputProps.endAdornment}
                      </Stack>
                    ),
                  }}
                />
              )}
            />
          )}

          <RHFSelect label="دسترسی" name="accessType">
            {ListGeneratorFromEnum(GroupAccessType).map((item) => (
              <CustomMenuItem value={item.id}>{item.title}</CustomMenuItem>
            ))}
          </RHFSelect>
        </Box>
        <Stack flexDirection={'row'} justifyContent={'flex-end'}>
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
    </BaseStyleModal>
  );
};
export default AddGroupParentToUserModal;
