import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { getAllServiceAccessibilitiesOfASubUser } from '../../../../../services/smsRequestManagement/serviceAccessibilities';
import UserAccessibilityTable from '../../accessibility/UserAccessibilityTable';
// import UserAccessibilityTable from "../table/accessibility/UserAccessibilityTable";
// import {getAllServiceAccessibilitiesOfAUser} from "../../../../services/smsRequestManagement/serviceAccessibilities";

const UserGeneralAccessibility = () => {

    const {userId} = useParams();
    const [filterValue, setFilterValue] = useState({
        userId,
    });

    const {
        data,
        isLoading,
        refetch
    } = useQuery(['getAllServiceAccessibilitiesOfASubUser', filterValue], () => getAllServiceAccessibilitiesOfASubUser(filterValue))

    return <UserAccessibilityTable data={data?? []} isLoading={isLoading} refetch={refetch}/>

}

export default UserGeneralAccessibility;