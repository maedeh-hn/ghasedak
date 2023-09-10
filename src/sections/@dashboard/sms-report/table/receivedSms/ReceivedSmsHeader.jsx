import React from 'react';
import TableToolbarActionButton from '../../../../../components/table/TableToolbarActionButton';
import PageHeader from '../../../../../components/PageHeader';

const ReceivedSmsHeader = () => {
  return (
    <PageHeader
      title={'پیام های دریافتی'}
      actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={() => {}} />}
    />
  );
};

export default ReceivedSmsHeader;
