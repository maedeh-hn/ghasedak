// import TextFilter from "../../../../../../components/filters/TextFilter";
// import EnumSelectFilter from "../../../../../../components/filters/EnumSelectFilter";
// import {OriginEnum, SmsStatusEnum} from "../../../../../../utils/enums";
// import FromDateFilter from "../../../../../../components/filters/FromDateFilter";
// import ToDateFilter from "../../../../../../components/filters/ToDateFilter";
// import SelectFilter from "../../../../../../components/filters/SelectFilter";
// import CustomMenuItem from "../../../../../../components/CustomMenuItem";
// import CollapseFilter from "../../../../../../components/CollapseFilter";

import CollapseFilter from "../../../../../../../components/CollapseFilter";
import CustomMenuItem from "../../../../../../../components/CustomMenuItem";
import EnumSelectFilter from "../../../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../../../components/filters/FromDateFilter";
import SelectFilter from "../../../../../../../components/filters/SelectFilter";
import TextFilter from "../../../../../../../components/filters/TextFilter";
import ToDateFilter from "../../../../../../../components/filters/ToDateFilter";
import { SmsStatusEnum } from "../../../../../../../utils/enums";

const UserGroupSmsReportToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <SelectFilter value={filterValue.IsPanel} setValue={setFilterValue} label={'مبدا ارسال'}
                              objKey={'IsPanel'}>
                    <CustomMenuItem value>
                        پنل
                    </CustomMenuItem>
                    <CustomMenuItem value={false}>
                        وب سرویس
                    </CustomMenuItem>
                </SelectFilter>
                <TextFilter value={filterValue.Content} setValue={setFilterValue} label={'محتوا'} objKey={'Content'}/>
                <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} label={'شماره خط'}
                            objKey={'LineNumber'}/>
                <EnumSelectFilter value={filterValue.Status} setValue={setFilterValue} objKey={'Status'}
                                  label={'وضعیت پیام'}
                                  enumData={SmsStatusEnum}/>
            </>}
            subFilters={<>
                <FromDateFilter value={filterValue.StartDate} setValue={setFilterValue} objKey={'StartDate'}/>
                <ToDateFilter value={filterValue.EndDate} setValue={setFilterValue} objKey={'EndDate'}/>
            </>}
        />
    );

export default UserGroupSmsReportToolbar;