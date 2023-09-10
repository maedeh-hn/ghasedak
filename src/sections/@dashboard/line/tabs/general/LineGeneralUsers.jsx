import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import CustomPagination from "../../../../../components/CustomPagination";
import LineUserTableHeader from "../../table/LineUserTableHeader";
import { getAllUsersLineParent } from "../../../../../services/lines/lineUsers";
import LineUsersTable from "../../table/line-users/LineUsersTable";
// import {getLineUsers} from "src/services/lines/lineUsers";
// import LineUsersTable from "../../tables/line-users/LineUsersTable";
// import CustomPagination from "../../../../../components/CustomPagination";
// import LineUserTableHeader from "../../tables/line-users/LineUserTableHeader";


const LineGeneralUsers = () => {
    const params = useParams();
    console.log(params);
    const initial_values = {
        LineId:"",
        UserId: params.userId,
        // PageIndex: 1,
        // PageSize: 5
    }
    const [filterValue, setFilterValue] = useState(initial_values);

    const {isLoading, data, refetch} = useQuery(['lineDetailsParent', filterValue], () => getAllUsersLineParent(filterValue));

    return (
        <>
            <LineUserTableHeader 
            refetch={refetch}

             totalCount={data?.totalCount} />
            <LineUsersTable data={data} filters={{
                filterValue,
                setFilterValue,
                initialValues: initial_values
            }}
             isLoading={isLoading} 
            refetch={refetch} 
            />
            {/* <CustomPagination filterValue={filterValue} setFilterValue={setFilterValue} totalCount={(data && data?.totalCount) || 0} totalPage={data ? data?.totalPages : 0} /> */}
        </>
    )
}

export default LineGeneralUsers;