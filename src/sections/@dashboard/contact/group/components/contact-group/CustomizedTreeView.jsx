import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import { useContext } from 'react';
import { GroupContactContext } from '../../../../../../pages/dashboard/contect/contact/Contacts';
import GroupTreeGenerator from './GroupTreeGenerator';


export default function CustomizedTreeView(props) {
  const path = window.location.pathname
  let  data = useContext(GroupContactContext);


  return (
    <TreeView aria-label="customized" defaultExpanded={['1']} sx={{ flexGrow: 1 }}>
      <GroupTreeGenerator arr={data} parent_id={0} modals={props} />
    </TreeView>
  );
}
