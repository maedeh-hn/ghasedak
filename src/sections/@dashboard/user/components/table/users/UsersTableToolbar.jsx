import { PlanEnum, RoleNameEnum, UserStatusEnum } from '../../../../../../utils/enums';
import TextFilter from "../../../../../../components/filters/TextFilter";
import CollapseFilter from "../../../../../../components/CollapseFilter";
import EnumSelectFilter from "../../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../../components/filters/FromDateFilter";
import ToDateFilter from '../../../../../../components/filters/ToDateFilter';


// ----------------------------------------------------------------------

const UsersTableToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.Name} setValue={setFilterValue} label={'کاربر'} objKey={'Name'}/>
                <TextFilter value={filterValue.Mobile} setValue={setFilterValue} label={'موبایل'} objKey={'Mobile'}/>
                <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} label={'خط'} objKey={'LineNumber'}/>
            </>}
         
        />
    );

export default UsersTableToolbar;