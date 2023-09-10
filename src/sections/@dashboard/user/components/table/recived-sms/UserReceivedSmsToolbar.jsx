import CollapseFilter from "../../../../../../components/CollapseFilter";
import FromDateFilter from "../../../../../../components/filters/FromDateFilter";
import TextFilter from "../../../../../../components/filters/TextFilter";
import ToDateFilter from "../../../../../../components/filters/ToDateFilter";


const UserReceivedSmsToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} objKey={'LineNumber'} label={'شماره خط'}/>
                <TextFilter value={filterValue.Mobile} setValue={setFilterValue} objKey={'Mobile'} label={'موبایل'}/>
                <FromDateFilter value={filterValue.FromDate} setValue={setFilterValue} objKey={'FromDate'}/>
                <ToDateFilter value={filterValue.ToDate} setValue={setFilterValue} objKey={'ToDate'}/>
            </>}
        />
    );

export default UserReceivedSmsToolbar;