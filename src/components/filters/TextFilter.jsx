import {TextField} from "@mui/material";
import {useEffect, useState} from "react";

const TextFilter = ({value, setValue, objKey, label}) => {

    const [newValue, setNewValue] = useState(value)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setValue((perv) => ({...perv,PageIndex:1, [objKey]: newValue}));
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [newValue])

    return (
        <TextField
            size={'small'}
            fullWidth
            label={label}
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            sx={{
                maxWidth: {md: 160},
            }}
        />
    )
}

export default TextFilter