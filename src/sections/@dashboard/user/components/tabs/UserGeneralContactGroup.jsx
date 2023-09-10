import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getContactGroupsById } from '../../../../../services/contact/group';
// import LoadingWidget from '../../../../components/LoadingWidget';
// import GroupNestedList from '../components/GroupNestedList';
// import CustomPagination from '../../../../components/CustomPagination';
import { Alert, Box, Button, Icon, Stack, Typography } from '@mui/material';
import LoadingWidget from '../../../../../components/LoadingWidget';
import CustomPagination from '../../../../../components/CustomPagination';
import GroupNestedListParent from '../GroupNestedListParent';
import { useTheme } from '@emotion/react';
import { InfoIcon } from '../../../../../theme/overrides/CustomIcons';

export const GroupContactSubUserContext = React.createContext([]);

const UserGeneralContactGroup = () => {
  const { userId } = useParams();
  const navigate=useNavigate()
  const theme = useTheme()
  const INITIAL_VALUES = {
    UserId: userId,
    PageIndex: "1",
    PageSize: "10",
  };
  const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
  console.log(filterValue);
  const { isLoading, data } = useQuery(['contactsByIdParent', filterValue], () => getContactGroupsById(filterValue));
  console.log(data?.items);
  if (isLoading) {
    return <LoadingWidget />;
  }
  return (
    <Box sx={{width:"100%"}}>

      
      <GroupContactSubUserContext.Provider value={data?.items ?? []}>
        <GroupNestedListParent data={data?.items ?? []} />
      </GroupContactSubUserContext.Provider>
      <CustomPagination
                    totalPage={(data && data?.totalPages) || 0}
                    totalCount={(data && data?.totalCount) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                />
    </Box>
  );
};

export default UserGeneralContactGroup;
