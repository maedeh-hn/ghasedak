import React from 'react';
import TableToolbarActionButton from '../../../../../components/table/TableToolbarActionButton';
import PageHeader from '../../../../../components/PageHeader';

const GroupSmsReportToolbar = (handleExceleData) => {
 console.log(handleExceleData);
  return (
    <PageHeader title={'گزارشات ارسال گروهی'}
    actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={handleExceleData}/>}/>
  );
};

export default GroupSmsReportToolbar;
