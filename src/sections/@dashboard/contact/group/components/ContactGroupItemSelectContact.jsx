import React, { useState } from 'react';
import { Checkbox, ListItem, useTheme } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Label from '../../../../../components/Label';
import SelectNumbersModal from '../../../message/components/modal/SelectNumbersModal';
import { useFormContext, useWatch } from 'react-hook-form';

const ContactGroupItem = ({ item, isCollapse, open, setOpen, handleAdd, handleRemove }) => {
  const { control, getValues } = useFormContext();

  const handleClick = () => {
    setOpen(!open);
  };

  const theme = useTheme();
  const [selector, setSelector] = useState({
    open: false,
    data: null,
  });

  const groupIds = useWatch({
    control,
    name: 'groupIds',
  });

  return (
    <>
      <ListItem
        sx={{
          '&:hover': { backgroundColor: theme.palette.grey[300] },
          backgroundColor: theme.palette.grey['200'],
          paddingY: 0,
        }}
        style={{
          borderRadius: 12,
          border: 'none',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isCollapse ? (
            open ? (
              <ExpandLess onClick={handleClick} style={{ cursor: 'pointer' }} />
            ) : (
              <ExpandMore onClick={handleClick} style={{ cursor: 'pointer' }} />
            )
          ) : null}
          <Checkbox
            sx={{
              '&:hover': {
                backgroundColor: 'unset',
              },
            }}
            size={'small'}
            checked={groupIds.includes(item.id)}
            onChange={() => {
              if (groupIds.includes(item.id)) {
                const index = groupIds.indexOf(item.id);
                if (index > -1) {
                  handleRemove(index);
                }
              } else {
                handleAdd(item.id);
              }
            }}
          />
          <ListItemText primary={item.name} />
        </div>

        <ListItemIcon sx={{ display: 'flex', gap: 1, cursor: 'pointer', color: theme.palette.grey[700] }}>
          <Label color="primary" sx={{ ml: 1 }}>
            {item?.groupNumbersCount}
          </Label>
          {getValues('receptors')?.filter((rec) => rec.groupId === item.id).length > 0 && (
            <Label color="primary" sx={{ ml: 1 }}>
              {getValues('receptors')?.filter((rec) => rec.groupId === item.id).length} مورد انتخاب شده
            </Label>
          )}

          <ManageSearchIcon
            onClick={() => {
              setSelector({
                open: true,
                data: item.id,
              });
            }}
            sx={{ width: '23px', height: '23px' }}
            id={item.id.toString()}
          />
        </ListItemIcon>
      </ListItem>
      {selector.open && <SelectNumbersModal state={selector} setState={setSelector} />}
    </>
  );
};

export default React.memo(ContactGroupItem);
