import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
    name: PropTypes.string,
};

export default function RHFTextField({ name, defaultValue, ...other }) {
    const { control, setValue } = useFormContext();
    const theme = useTheme()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                
                    {...field}
                    value={field.value}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                    defaultValue={defaultValue}
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            color: theme.palette.grey[800],
                            fontWeight: 'medium'
                        },
                    }}
                    onChange={(event) => {
                        if (event.target.value.length <= 100) {
                            setValue(name, event.target.value)
                        }
                    }}
                />
            )}
        />
    );
}
