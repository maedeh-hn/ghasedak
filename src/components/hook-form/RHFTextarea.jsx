import PropTypes from 'prop-types';
// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {TextField} from '@mui/material';

// ----------------------------------------------------------------------

RHFTextAreaField.propTypes = {
    name: PropTypes.string,
};

export default function RHFTextAreaField({name, rows = 5, ...other}) {
    const {control} = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => {
                const fieldWithoutRef = {...field, ref: undefined};
                return (
                    <TextField  {...fieldWithoutRef} inputRef={field.ref} error={!!error}
                               helperText={error?.message} {...other}
                               multiline={true} rows={rows} InputLabelProps={{shrink: true}}/>
                )
            }}
        />
    );
}
