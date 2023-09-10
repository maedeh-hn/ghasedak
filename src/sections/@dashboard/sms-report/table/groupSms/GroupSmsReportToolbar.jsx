import {SmsStatusEnum} from '../../../../../utils/enums';
import CustomMenuItem from "../../../../../components/CustomMenuItem";
import TextFilter from "../../../../../components/filters/TextFilter";
import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../components/filters/ToDateFilter";
import CollapseFilter from "../../../../../components/CollapseFilter";
import SelectFilter from "../../../../../components/filters/SelectFilter";


const GroupSmsReportToolbar = ({filterValue, setFilterValue}) => {
    return (
        <CollapseFilter
            filters={<>
                <SelectFilter value={filterValue.IsPanel} setValue={setFilterValue} label={'ارسال از طریق'}
                              objKey={'IsPanel'}>
                    <CustomMenuItem value={'true'}>
                        پنل
                    </CustomMenuItem>
                    <CustomMenuItem value={'false'}>
                        وب سرویس
                    </CustomMenuItem>
                </SelectFilter>
                <TextFilter value={filterValue.Content} setValue={setFilterValue} objKey={'Content'} label={'محتوا'}/>
                <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} objKey={'LineNumber'}
                            label={'شماره خط'}/>

                <EnumSelectFilter value={filterValue.Status} setValue={setFilterValue} objKey={'Status'}
                                  label={'وضعیت'}
                                  enumData={SmsStatusEnum}/>
            </>}
            subFilters={<>
                <TextFilter value={filterValue.Receptor} setValue={setFilterValue} objKey={'Receptor'}
                            label={'شماره گیرنده'}/>
                <FromDateFilter value={filterValue.FromDate} setValue={setFilterValue} objKey={'FromDate'}/>
                <ToDateFilter value={filterValue.ToDate} setValue={setFilterValue} objKey={'ToDates'}/>
            </>}
        />
    );
};

export default GroupSmsReportToolbar;
