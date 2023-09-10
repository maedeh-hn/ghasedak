import React from 'react';
import PageHeader from "../../../../components/PageHeader";
import TableToolbarActionButton from "../../../../components/table/TableToolbarActionButton";

const BuyPlanHeader = () => {
    return (
        <PageHeader title={'خرید سرویس'}
                    actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={() => {}}/>}/>
    );
};

export default BuyPlanHeader;
