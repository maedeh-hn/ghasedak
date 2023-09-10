import {TextField} from "@mui/material";

const SelectFilter = ({value, setValue, objKey, label, children}) => {
    return (
        <TextField
            size={'small'}
            fullWidth
            select
            label={label}
            value={value}
            onChange={(event) => {
                setValue((perv) => ({...perv, [objKey]: event.target.value}));
            }}
            SelectProps={{
                MenuProps: {
                    sx: {'& .MuiPaper-root': {maxHeight: 260}},
                },
            }}
            sx={{
                maxWidth: {md: 160},
            }}
        >
            {children}
        </TextField>
    )
}

export default SelectFilter