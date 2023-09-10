import React from 'react';
import {Pagination} from '@mui/lab';
import {MenuItem, Select, Stack, Typography} from '@mui/material';
import CustomMenuItem from "./CustomMenuItem";
import {numberWithCommas} from "src/utils/functions";

const CustomPagination = ({filterValue, setFilterValue, totalPage, totalCount}) => {
    return (
        <Stack spacing={2} marginY={2} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Pagination
                color="primary"
                onChange={(event, page) => setFilterValue((prevState) => ({...prevState, PageIndex: page}))}
                count={totalPage}
                variant="outlined"
                shape="rounded"
            />

            <Stack direction={'row'} flexWarp={'wrap'} alignItems={'center'} spacing={2}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                    <Typography>تعداد کل :</Typography>
                    <Typography>{numberWithCommas(totalCount)}</Typography>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'}>
                    <Typography>نمایش تعداد در هر صفحه :</Typography>
                    <Select
                        value={filterValue.PageSize}
                        onChange={(event) =>
                            setFilterValue((prevState) => ({
                                ...prevState,
                                PageSize: event.target.value,
                            }))
                        }
                        sx={{
                            height: 30,
                            ml: 1,
                        }}
                    >
                        {[5, 10, 50].map((option) => (
                            <CustomMenuItem key={option} value={option}>
                                {option}
                            </CustomMenuItem>
                        ))}
                    </Select>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CustomPagination;
