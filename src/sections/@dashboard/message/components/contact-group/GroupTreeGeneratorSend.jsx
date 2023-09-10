import React, { useContext } from 'react';
import CustomTreeItemSend from './CustomTreeItemSend';
import { GroupContactContextSend } from '../../../../../pages/dashboard/message/SendFastMessage';
import CustomTreeItem from "../../../contact/group/components/contact-group/CustomTreeItem";

const GroupTreeGeneratorSend = ({ arr, parent_id, modals }) => {
  const data = useContext(GroupContactContextSend);

  const NormalNode = ({ item }) => {
    return <CustomTreeItemSend  sx={{my: parent_id == 0 ? '12px !important': '2px !important'}}  nodeId={item.id} ContentProps={{ item: item, ...modals }} />;
  };

  const NodeParent = ({ item, data }) => {
    return (
      <CustomTreeItemSend nodeId={item.id} ContentProps={{ item: item, ...modals }}>
        <GroupTreeGeneratorSend arr={data} parent_id={item.id} modals={modals} />
      </CustomTreeItemSend>
    );
  };

  const show = arr.filter((item) => item.parentId == parent_id);
  return show.map((item, index) => {
    let child = data.filter((inner) => inner.parentId == item.id);
    return child.length > 0 ? (
      <NodeParent key={index} item={item} data={child} />
    ) : (
      <NormalNode key={index} item={item} />
    );
  });
};

export default GroupTreeGeneratorSend;
