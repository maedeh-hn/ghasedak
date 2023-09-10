import React from 'react';
import TableToolbarActionButton from '../../../../../components/table/TableToolbarActionButton';
import PageHeader from "../../../../../components/PageHeader";

const LogSmsReportToolbar = () => {
    return (
        <PageHeader title={'گزارشات فراخوانی'}
                    actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={() => {
                    }}/>
                    }/>
    );
};

export default LogSmsReportToolbar;
