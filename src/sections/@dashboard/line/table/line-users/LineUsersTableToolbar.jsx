

// ----------------------------------------------------------------------

import CollapseFilter from "../../../../../components/CollapseFilter";
import { SearchUser } from "../../../../../components/SearchUser";

const LineUsersTableToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <SearchUser  setFilterValue={setFilterValue} />
            </>}
        />
    )

export default LineUsersTableToolbar;