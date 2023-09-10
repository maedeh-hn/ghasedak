import {MenuItem} from "@mui/material";

const CustomMenuItem = (props) => {
    return(
        <MenuItem {...props} sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
        }}
        >
            {props.children}
        </MenuItem>
    )
}

export default CustomMenuItem