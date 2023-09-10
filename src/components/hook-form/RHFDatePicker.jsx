import React from 'react';
import PropTypes from 'prop-types';
// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {TextField} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Iconify from '../Iconify';
import {alpha} from '@mui/material/styles';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from "jalali-moment";
import {fDateTimeToUTC} from "../../utils/formatTime.jsx";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
    name: PropTypes.string,
};

export default function RHFTextField({name, helperText, ...other}) {
    const theme = useTheme();
    const {control, getValues, setValue} = useFormContext();

    const customIcon = () => {
        return (
            <div
                style={{
                    background: alpha(theme.palette.primary.light, 0.15),
                    padding: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    borderRadius: 10,
                }}
            >
                <Iconify
                    icon={'uil:calender'}
                    sx={{
                        color: theme.palette.primary.main,
                        borderRadius: 1,
                    }}
                />
            </div>
        );
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                        {...other}
                        mask="____/__/__"
                        value={getValues(name) ?? null}
                        onChange={(e) => {
                            setValue(name, fDateTimeToUTC(e));
                        }}
                        components={{
                            OpenPickerIcon: customIcon,
                        }}
                        renderInput={(params) => <TextField {...params} error={!!error}
                                                            helperText={helperText ? helperText : error?.message}/>}
                    />
                </LocalizationProvider>
            )}
        />
    );
}
