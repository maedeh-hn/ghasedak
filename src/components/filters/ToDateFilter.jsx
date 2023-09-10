import {TextField} from "@mui/material";
import CustomDatepicker from "../date-picker/CustomDatepicker";
import {fDateTimeToDate} from "../../utils/formatTime";

const ToDateFilter = ({value, setValue, objKey}) => {
    return (
        <CustomDatepicker
            label="تا تاریخ"
            value={value}
            onChangeValue={(e) => {
                setValue((perv) => ({
                    ...perv,
                    [objKey]: fDateTimeToDate(e)
                }));
            }}
            size={'small'}

            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    sx={{
                        maxWidth: {md: 160},
                    }}
                />
            )}
        />
    )
}

export default ToDateFilter