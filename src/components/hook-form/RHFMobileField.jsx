import PropTypes from 'prop-types';
// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {TextField} from '@mui/material';
import {useEffect} from "react";

// ----------------------------------------------------------------------

RHFMobileField.propTypes = {
    name: PropTypes.string,
};

export default function RHFMobileField({name, ...other}) {
    const {control, setValue, setError, getValues, clearErrors, watch} = useFormContext();

    useEffect(()=>{
        const reg = new RegExp("09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}");
        const value = getValues(name)
        if(!reg.test(value) && value?.length > 0) {
            setError(name, {'message': 'فرمت شماره وارد شده صحیح نیست.'})
        }else{
            clearErrors(name)
        }
    }, [watch(name)])

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other}
                           onChange={(event) => {
                               const onlyNums = event.target.value.replace(/[^0-9]/g, '');
                               if(onlyNums.length <= 11) {
                                   setValue(name, onlyNums)
                               }
                           }}
                           sx={{
                               input: {
                                   direction: 'rtl'
                               }
                           }}
                />
            )}
        />
    );
}
