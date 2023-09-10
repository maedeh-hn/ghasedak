import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useFormContext, Controller, useFieldArray} from 'react-hook-form';
import {useEffect, useState} from "react";
import SearchNotFound from '../nav-section/vertical/SearchNotFound';


export default function RHFStaticDataAutoComplete({name, optionData, defaultValue = [], ...other}) {
    const {control} = useFormContext();

    const {
        replace
    } = useFieldArray({
        name,
        control
    })

    const [selected, setSelected] = useState(defaultValue);
    const [options, setOptions] = useState(() => optionData.filter(elem => !defaultValue.some(item => item.id === elem.id)));
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        replace(selected)
    }, [selected])


    function onChange(e, value) {
        setOptions(optionData.filter(elem => !value.some(item => item.id === elem.id)))
        setSelected(value);
    }

    function onDelete(value) {
        setSelected(selected.filter((e) => e !== value));
    }

    function onInputChange(e, newValue) {
        setInputValue(newValue);
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <Autocomplete
                    options={options}
                    onChange={onChange}
                    inputValue={inputValue}
                    onInputChange={onInputChange}
                    noOptionsText={<SearchNotFound searchQuery={inputValue}/>}
                    multiple
                    fullWidth
                    defaultValue={selected}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                    renderInput={(params) => <TextField error={!!error}
                                          helperText={error?.message} {...params}
                                          {...other}/>}
                />
            )}
        />

    );
}

