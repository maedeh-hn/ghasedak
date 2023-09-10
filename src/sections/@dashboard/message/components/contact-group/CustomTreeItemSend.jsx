import React, { useState } from 'react';
import {Box, Checkbox, Stack, Typography, useTheme} from '@mui/material';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import SelectNumbersModal from '../modal/SelectNumbersModal';
import Label from '../../../../../components/Label';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const theme = useTheme();

  const [selector, setSelector] = useState({
    open: false,
    data: null,
  });

  const { control, getValues } = useFormContext();

  const groupIds = useWatch({
    control,
    name: 'groupIds',
  });

  const {
    classes,
    className,
    item,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    handleAdd,
    handleRemove,
  } = props;

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    <Box
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        // [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      onMouseDown={handleMouseDown}
      ref={ref}
      sx={{
        '&:hover': {backgroundColor: `${theme.palette.primary.lighter} !important`},
        backgroundColor: theme.palette.background.customBgPrimary,
        borderRadius: 2,
        border: 'none',
        justifyContent: 'space-between',
        paddingY: '4px !important ',
        paddingX: '4px !important ',
        marginY: '2px !important ',
      }}
    >
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Stack sx={{backgroundColor: 'white', p: 0.9, borderRadius: '50%'}} onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </Stack>
        <Checkbox
          disabled={item?.groupNumbersCount <= 0}
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

        <Typography>{item.name}</Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
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
            item?.groupNumbersCount > 0 &&
              setSelector({
                open: true,
                data: item.id,
              });
          }}
          sx={{ width: '27px', height: '27px',borderRadius:'50%' ,ml:1,'&:hover': {
              backgroundColor: 'white'

            } }}
          id={item.id.toString()}
        />
      </Box>
      {selector.open && <SelectNumbersModal state={selector} setState={setSelector} />}
    </Box>
  );
});

const CustomTreeItemSend = (props) => <TreeItem ContentComponent={CustomContent} {...props} />;

export default CustomTreeItemSend;
