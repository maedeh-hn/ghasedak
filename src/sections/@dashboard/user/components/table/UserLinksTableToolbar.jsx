import React from 'react';
import TableToolbarActionButton from "../../../../../components/table/TableToolbarActionButton";
import PageHeader from "../../../../../components/PageHeader";

const UserLinksTableToolbar = ({setModal}) => {

    return (
        <PageHeader actions={<TableToolbarActionButton
            tooltip={'ایجاد آدرس جدید'}
            title={'ایجاد آدرس جدید'}
            onClick={() => setModal()}
        />}/>
    );
};

export default UserLinksTableToolbar;
