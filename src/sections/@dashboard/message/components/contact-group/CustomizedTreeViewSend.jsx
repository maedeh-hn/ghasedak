import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import TreeView from '@mui/lab/TreeView';
import { useContext } from 'react';
import GroupTreeGeneratorSend from './GroupTreeGeneratorSend';
import { GroupContactContextSend } from '../../../../../pages/dashboard/message/SendFastMessage';

export default function CustomizedTreeViewSend(props) {
  const data = useContext(GroupContactContextSend);

  return (
    <TreeView aria-label="customized" defaultExpanded={['1']} sx={{ flexGrow: 1 }}>
      <GroupTreeGeneratorSend arr={data} parent_id={0} modals={props} />
    </TreeView>
  );
}
