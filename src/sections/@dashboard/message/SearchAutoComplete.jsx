import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { searchNumberInAllGroup } from 'src/services/contact/group-number';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchAutoComplete() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const loading = open && search.length > 0;

  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    let active = true;
    (async () => {
      if (search.length > 0) {
        const data = await searchNumberInAllGroup(search);
        if (active) {
          setOptions(data?.data?.items);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [search]);
  const AutoCompleteSchema = Yup.object().shape({
    name: Yup.string().required('مخاطب خود را انتخاب کنید.'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(AutoCompleteSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  return (
    <Box>
      <Autocomplete
        noOptionsText={'مخاطب یافت نشد'}
        multiple
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => `${option.number} : ${option.firstName ?? ''}${option.lastName ?? ''}`}
        options={options}
        onSelect={(item) => {
          setOptions([]);
        }}
        renderOption={(props, option, { selected }) => {
          if (!getValues('searchReceptors').includes(option.number)) {
            return (
              <li {...props} key={option.number}>
                <div onClick={() => setValue('searchReceptors', [...getValues('searchReceptors'), option.number])}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.number}
                  {(option.firstName || option.lastName) && ' : '}
                  {option.firstName ?? ''}
                  {' '}
                  {option.lastName ?? ''}
                </div>
              </li>
            );
          }
        }}
        renderInput={(params) => (
          <TextField
            name="name"
            sx={{ width: '100%' }}
            {...params}
            label="جستجوی مخاطب"
            onChange={(event) => {
              setSearch((perv) => event.target.value);
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
  );
}
