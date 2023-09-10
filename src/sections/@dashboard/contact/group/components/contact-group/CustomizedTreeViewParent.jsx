import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import { useContext } from 'react';

import { GroupContactSubUserContext } from '../../../../user/components/tabs/UserGeneralContactGroup';
import GroupTreeGeneratorParent from './GroupTreeGeneratorParent';

export default function CustomizedTreeViewParent(props) {
  const path = window.location.pathname;
  let data = useContext(GroupContactSubUserContext);

  return (
    <TreeView aria-label="customized" defaultExpanded={['1']} sx={{ flexGrow: 1 }}>
      <GroupTreeGeneratorParent
        arr={data}
        parent_id={0}
        modals={props}
        userId={props.userId}
        rowData={props.arr}
        AddGroupFromParent={props.AddGroupFromParent}
      />
    </TreeView>
  );
}
