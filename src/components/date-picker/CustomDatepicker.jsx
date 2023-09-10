import React, {useState} from 'react';

// @mui
import {TextField} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Iconify from "../Iconify";
import AdapterJalali from "@date-io/date-fns-jalali";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

// ----------------------------------------------------------------------

const CustomDatepicker = ({name, label, value, onChangeValue = () => {}, ...other}) => {
    const theme = useTheme();
    const [selectedDay, setSelectedDay] = useState(null);

    const customIcon = () => {
        return (
            <div style={{
                background: alpha(theme.palette.primary.light, 0.15),
                padding: 3,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                borderRadius: 10,
            }}>
                <Iconify icon={'uil:calender'} sx={{
                    color: theme.palette.primary.main,
                    borderRadius: 1
                }}/>
            </div>
        )

    }

    return (
        <LocalizationProvider dateAdapter={AdapterJalali}>
            <DatePicker
                {...other}
                label={label}
                mask="____/__/__"
                value={selectedDay}
                onChange={(e) => {
                    onChangeValue(e)
                    setSelectedDay(e)
                }}
                components={{
                    OpenPickerIcon: customIcon
                }}

                renderInput={(params) => <TextField {...params} {...other} />}
            />
        </LocalizationProvider>
    );
}

export default CustomDatepicker;
