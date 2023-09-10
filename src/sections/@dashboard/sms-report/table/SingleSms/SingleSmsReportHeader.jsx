import React from 'react';
import TableToolbarActionButton from '../../../../../components/table/TableToolbarActionButton';
import PageHeader from "../../../../../components/PageHeader";


const SingleSmsReportToolbar = (setDownloadExecle) => {
    return (
        <PageHeader title={'گزارشات ارسال تکی'}
                    actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={setDownloadExecle}/>}/>
    );
};

export default SingleSmsReportToolbar;
