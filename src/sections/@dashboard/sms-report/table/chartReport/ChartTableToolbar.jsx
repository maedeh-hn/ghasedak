import React from 'react';
import {MenuItem, Stack, TextField, Typography} from '@mui/material';
import {SmsStatusReportEnum} from '../../../../../utils/enums';
import CollapseFilter from "../../../../../components/CollapseFilter";
import TextFilter from "../../../../../components/filters/TextFilter";

const ChartTableToolbar = ({filterValue, setFilterValue}) => {
    return (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.Mobile} setValue={setFilterValue} objKey={'Mobile'} label={'موبایل'}/>

            </>}
        />
    );
};

export default ChartTableToolbar;
