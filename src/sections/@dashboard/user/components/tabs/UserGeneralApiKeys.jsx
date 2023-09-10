import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { getApiKeysByUserId } from '../../../../services/users/apiKeys';


import { Box } from '@mui/material';
import CustomPagination from '../../../../../components/CustomPagination';
import { getApiKeysByUserId } from '../../../../../services/users/apiKey';
import UserApiKeyTable from '../table/apiKey/UserApiKeyTable';

const UserGeneralApiKeys = () => {
  const { userId } = useParams();
  const INITIAL_VALUES = {
    PageIndex: 1,
    PageSize: 10,
  };
  const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
  const { isLoading, data, refetch } = useQuery(['userApiKeysParent', userId], () => getApiKeysByUserId(userId));
 
  return (
    <Box>
      <UserApiKeyTable data={data} refetch={refetch} isLoading={isLoading} />;
      <CustomPagination
        totalPage={(data && data?.totalPages) || 0}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        totalCount={(data && data?.totalCount) || 0}
      />
    </Box>
  );
};

export default UserGeneralApiKeys;
