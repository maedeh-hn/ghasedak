import React from 'react';
import {Stack} from '@mui/material';
import TextFilter from '../../../../../../../components/filters/TextFilter';
// import TextFilter from "../../../../../../components/filters/TextFilter";

const UserChartTableToolbarParent = ({filterValues, setFilterValues}) => (
        <Stack
            direction="row"
            flexWrap={'wrap'}
            sx={{
                padding: 2,
                rowGap: 1,
                columnGap: 1,
            }}
        >
            <TextFilter value={filterValues.Mobile} setValue={setFilterValues} label={'موبایل'} objKey={'Mobile'}/>
        </Stack>
    );

export default UserChartTableToolbarParent;
