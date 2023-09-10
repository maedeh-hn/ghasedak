import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getAllLinesByUserId} from "../../../../../services/lines/lines";
import UserLinesTable from "../table/line/UserLinesTable";

const UserGeneralLines = () => {
    const {userId} = useParams();
 const {data, isLoading, refetch} = useQuery(['getAllLinesByUserId', userId], () => getAllLinesByUserId(userId))
console.log(data?.data);
    return <UserLinesTable 
    data={data} 

    refetch={refetch}
     isLoading={isLoading}
     />
}

export default UserGeneralLines;