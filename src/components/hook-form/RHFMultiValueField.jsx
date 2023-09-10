import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// form
import {useFormContext, Controller, useFieldArray} from 'react-hook-form';
import {Chip, Grid, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {useSnackbar} from "notistack";


export default function RHFMultiValueField({name, rows = 5, label, placeholder, regex = false, ...other}) {

    const inputRef = useRef(null);

    function handleClick() {
        const enterKeyEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true,
            cancelable: true,
        });
        inputRef.current.dispatchEvent(enterKeyEvent);
    }

    const {control, getValues} = useFormContext();
    const {enqueueSnackbar} = useSnackbar()

    const {
        replace
    } = useFieldArray({
        name: name,
        control: control
    })

    const [selected, setSelected] = useState(getValues(name) ?? []);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        replace(selected)
    }, [selected])

    function onChange(e, value) {
        if (regex) {
            const errorValue = value.find((value) => !regex.test(value));
            if (errorValue) {
                enqueueSnackbar('مقدار وارد شده صحیح نمی باشد!', {variant: 'error'})
                setInputValue(errorValue);
                setError(true);
            } else {
                setError(false);
            }
            setSelected(value.filter((email) => regex.test(email)));
        } else {
            setSelected(value.filter((email) => email));
        }
    }

    function onDelete(value) {
        setSelected(selected.filter((e) => e !== value));
    }

    function onInputChange(e, newValue) {
        setInputValue(newValue);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (inputValue?.length == 11) {
                handleClick()
            }
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [inputValue])

    const renderTags = (value, getTagProps) => (

        <Grid container spacing={1} padding={1}>
            {/*<Stack maxHeight={'100%'} sx={{*/}
            {/*    overflowY: 'auto'*/}
            {/*}}>*/}
                {value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({index})} />
                ))}
            {/*</Stack>*/}
        </Grid>
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <Autocomplete
                    {...other}
                    onChange={onChange}
                    id="tags-filled"
                    value={selected}
                    inputValue={inputValue}
                    onInputChange={onInputChange}
                    multiple
                    options={[]}
                    freeSolo
                    renderTags={renderTags}
                    error={!!error}
                    helperText={error?.message}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            ref={inputRef}
                            label={label}
                            multiline={true}
                            error={!!error}
                            helperText={error?.message}
                            placeholder={placeholder}
                            rows={rows}
                        />
                    )}
                />)}/>
    );
}

