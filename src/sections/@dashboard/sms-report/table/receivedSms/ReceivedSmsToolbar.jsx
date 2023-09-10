import TextFilter from "../../../../../components/filters/TextFilter";
import FromDateFilter from "../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../components/filters/ToDateFilter";
import CollapseFilter from "../../../../../components/CollapseFilter";

const ReceivedSmsToolbar = ({filterValue, setFilterValue}) => {
    return (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.Mobile} setValue={setFilterValue} objKey={'Mobile'} label={'موبایل'}/>
                <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} objKey={'LineNumber'}
                            label={'شماره خط'}/>
            </>}
            subFilters={<>
                <FromDateFilter value={filterValue.FromDate} setValue={setFilterValue} objKey={'FromDate'}/>
                <ToDateFilter value={filterValue.ToDate} setValue={setFilterValue} objKey={'ToDates'}/>
            </>}
        />
    )
}

export default ReceivedSmsToolbar;
