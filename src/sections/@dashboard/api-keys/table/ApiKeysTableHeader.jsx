import React from 'react';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import PageHeader from "../../../../components/PageHeader";

const ApiKeysTableHeader = ({openAddModal}) => {
    return (
        <PageHeader actions={<TableToolbarActionButton
            tooltip={'ایجاد کلید شناسه'}
            title={'ایجاد کلید شناسه'}
            onClick={openAddModal}
        />}/>
    );
};

export default ApiKeysTableHeader;
