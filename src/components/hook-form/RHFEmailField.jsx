import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { useEffect } from "react";

// ----------------------------------------------------------------------

RHFEmailField.propTypes = {
    name: PropTypes.string,
};

export default function RHFEmailField({ name, ...other }) {
    const { control, setValue, setError, getValues, clearErrors, watch } = useFormContext();

    useEffect(() => {
        const reg = new RegExp("^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})*$");
        const value = getValues(name)
        if (!reg.test(value) && value?.length > 0) {
            setError(name, { 'message': 'فرمت ایمیل وارد شده صحیح نیست.' })
        } else {
            clearErrors(name)
        }
    }, [watch(name)])

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} sx={{
                    input: {
                        direction: 'rtl'
                    }
                }} />
            )}
        />
    );
}
