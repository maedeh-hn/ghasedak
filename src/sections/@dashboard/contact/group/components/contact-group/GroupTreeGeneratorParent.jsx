import React, { useContext } from 'react';

import { GroupContactSubUserContext } from '../../../../user/components/tabs/UserGeneralContactGroup';

import CustomTreeItemParent from './CustomTreeItemParent';
import { useParams } from 'react-router';

const GroupTreeGeneratorParent = ({ arr, parent_id, modals, userId, rowData, AddGroupFromParent }) => {
  const data = useContext(GroupContactSubUserContext);
  function removeDuplicates(arr) {
    const uniqueArray = [];

    for (let i = 0; i < arr.length; i++) {
        if (!uniqueArray.includes(arr[i])) {
            uniqueArray.push(arr[i]);
        }
    }

    return uniqueArray;
}

  const NormalNode = ({ item }) => {
console.log(parent_id);
    
    return (
      <CustomTreeItemParent
        sx={{ my: parent_id == 0 ? '12px !important' : '2px !important' }}
        nodeId={item.id}
        ContentProps={{ item: item, ...modals }}
        AddGroupFromParent={AddGroupFromParent}
      />
    );
  };
  const params = useParams();
  const NodeParent = ({ item, data }) => {
    return (
      <CustomTreeItemParent
        rowData={rowData}
        sx={{ my: parent_id == 0 ? '12px !important' : '2px !important' }}
        nodeId={item.id}
        ContentProps={{ item: item, ...modals }}
        userId={userId}
        AddGroupFromParent={AddGroupFromParent}
      >
        <GroupTreeGeneratorParent
          arr={data}
          parent_id={item.id}
          modals={modals}
          rowData={rowData}
          AddGroupFromParent={AddGroupFromParent}
        />
      </CustomTreeItemParent>
    );
  };
  const show = arr.filter((item) => item.parentId == parent_id);
let test2
let test
// const newArray=arr.map((item)=>{

// test = arr.filter((inner) => (inner.parentId!=0)&& (item.parentId != inner.id));



//  test2=test.map((item)=>{
//     return {
//       ...item,
//       parentId: 0
//     }
//   })
// })

const filteredArray = arr.filter(item => {
  if (item.parentId !== 0) {
    const matchingItem = arr.find(otherItem => otherItem.id === item.parentId);
    

    return !matchingItem;
  }
  return false;
});


// const filteredArray = arr.map(item => {
//   if (item.parentId !== 0) {
//     const matchingItem = arr.find(otherItem => otherItem.id === item.parentId);
//     if (matchingItem) {
//       matchingItem.parentId = 0;
//     }
//     return item;
//   }
//   return item;
// });

// console.log(filteredArray);
// const uniqueArray = [];
// const seenIds = new Set();

// for (const item of filteredArray ) {
//   if (!seenIds.has(item.id)) {
//     uniqueArray.push(item);
//     seenIds.add(item.id);
//   }
// }
// console.log(filteredArray);
// console.log(uniqueArray);
const modifiedShow = show.concat(filteredArray);
const newArray = removeDuplicates(modifiedShow);
console.log(newArray);

  return newArray.map((item, index) => {
    let child = data.filter((inner) => inner.parentId == item.id);
   
    
  
    return child.length > 0 ? (
      <NodeParent key={index} item={item} data={child} />
    ) : (
      <NormalNode key={index} item={item} />
    );
  });
};

export default GroupTreeGeneratorParent;
