import CollapseFilter from "../../../components/CollapseFilter";
import TextFilter from "../../../components/filters/TextFilter";


// ----------------------------------------------------------------------


const NotificationTableToolbar = ({filterValue, setFilterValue}) => {
    return (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.Title} setValue={setFilterValue} objKey={'Title'} label={'عنوان'}/>
            </>}
        />
    );
};

export default NotificationTableToolbar;
