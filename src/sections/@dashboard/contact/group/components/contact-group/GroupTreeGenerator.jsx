import React, {useContext} from 'react';
import {GroupContactContext} from '../../../../../../pages/dashboard/contect/contact/Contacts';
import CustomTreeItem from './CustomTreeItem';

const GroupTreeGenerator = ({arr, parent_id, modals}) => {
    const data = useContext(GroupContactContext);

    const NormalNode = ({item}) => {
        return <CustomTreeItem sx={{my: parent_id == 0 ? '12px !important': '2px !important'}} nodeId={item.id} ContentProps={{item: item, ...modals}}/>;
    };

    const NodeParent = ({item, data}) => {
        return (
            <CustomTreeItem sx={{my: parent_id == 0 ? '12px !important': '2px !important'}} nodeId={item.id} ContentProps={{item: item, ...modals}}>
                <GroupTreeGenerator arr={data} parent_id={item.id} modals={modals}/>
                
            </CustomTreeItem>
        );
    };

    const show = arr.filter((item) => item.parentId == parent_id);
    return show.map((item, index) => {
        let child = data.filter((inner) => inner.parentId == item.id);
        return child.length > 0 ? (
            <NodeParent key={index} item={item} data={child}/>
        ) : (
            <NormalNode key={index} item={item}/>
        );
    });
};

export default GroupTreeGenerator;
