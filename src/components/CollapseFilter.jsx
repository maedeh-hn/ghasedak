import {useState} from "react";
import {Collapse, IconButton, Stack, useTheme, Typography, Button, Divider} from "@mui/material";
import Iconify from "./Iconify";
import CustomTooltip from "./CustomTooltip";

const CollapseFilter = ({filters, subFilters}) => {
    const theme = useTheme()
    const [more, setMore] = useState(false)

    return (
        <>
            <Stack marginBottom={2} display={'flex'} direction="row" alignItems={'center'}>
                <Stack direction="row" spacing={1}
                >
                    {filters}
                    {
                        subFilters &&
                        <CustomTooltip title={'فیلتر بیشتر'}>

                            <Stack direction="row" display={'flex'} alignItems={'center'} onClick={() => setMore(!more)}
                                   paddingX={1}
                                   sx={{
                                       borderLeft:theme=> `1px solid ${theme.palette.grey[400]}`,
                                       marginLeft: '8px',
                                       height: '32px'
                                   }}>

                                <IconButton sx={{color: theme.palette.primary.main}} onClick={() => setMore(!more)}>
                                    <Iconify icon={'material-symbols:filter-alt'} width={20} height={20}/>
                                </IconButton>

                                <Typography color={theme.palette.primary.main} sx={{
                                    cursor: 'pointer',
                                    fontSize: 16
                                }}>
                                    فیلتر
                                </Typography>
                            </Stack>
                        </CustomTooltip>


                    }
                </Stack>

            </Stack>
            <Collapse in={more}>
                <Stack
                    direction="row"
                    flexWrap={'wrap'}
                    sx={{
                        paddingY: 1,
                        rowGap: 1,
                        columnGap: 1,
                    }}>
                    {subFilters}
                </Stack>
            </Collapse>
        </>
    )
}

export default CollapseFilter