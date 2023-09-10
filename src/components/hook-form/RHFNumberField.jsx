import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFNumberField.propTypes = {
  name: PropTypes.string,
};

export default function RHFNumberField({ name, ...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          onChange={(event) => {
            const onlyNums = event.target.value.replace(/[^0-9]/g, '');
            setValue(name, onlyNums);
          }}
        />
      )}
    />
  );
}
