import {TextField} from "@mui/material";
import CustomMenuItem from "../CustomMenuItem";

const EnumSelectFilter = ({value, setValue, objKey, label, enumData, allValue = '-1'}) => {
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
            <CustomMenuItem key={allValue} value={allValue}>
                همه
            </CustomMenuItem>
            {Object.keys(enumData).map((option) => (
                <CustomMenuItem key={option} value={option}>
                    {enumData[option]}
                </CustomMenuItem>
            ))}
        </TextField>
    )
}

export default EnumSelectFilter