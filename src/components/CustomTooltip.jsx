import {Stack, Tooltip} from "@mui/material";

const CustomTooltip = ({title, children}) => {
    return (
        <Tooltip followCursor title={title} placement="top" arrow={true}>
            <Stack justifyContent={'center'} alignItems={'center'}>
                {children}
            </Stack>
        </Tooltip>
    )
}

export default CustomTooltip