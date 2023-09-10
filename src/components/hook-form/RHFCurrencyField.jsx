import PropTypes from 'prop-types';
// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import { IconButton, InputAdornment, TextField } from '@mui/material';
import {numberWithCommas} from 'src/utils/functions';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

RHFCurrencyField.propTypes = {
    name: PropTypes.string,
};

export default function RHFCurrencyField({name, ...other}) {
    const {control, setValue, getValues} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <TextField
                    {...field}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                    value={numberWithCommas(getValues(name))}
                    onChange={(event) => {
                        const onlyNums = event.target.value.replace(/(?!,)[^0-9]/g, '').replace(/^0+/, '');
                        setValue(name, onlyNums.replaceAll(',', ''));
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ریال</InputAdornment>,
                    }}
                />
            )}
        />
    );
}
