// import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";
// import {otpTemplateStatusEnum} from "../../../../../utils/enums";
// import TextFilter from "../../../../../components/filters/TextFilter";
// import CollapseFilter from "../../../../../components/CollapseFilter";

import CollapseFilter from "../../../../../../components/CollapseFilter";
import EnumSelectFilter from "../../../../../../components/filters/EnumSelectFilter";
import TextFilter from "../../../../../../components/filters/TextFilter";
import { OtpTemplateStatusEnum } from "../../../../../../utils/enums";

// ----------------------------------------------------------------------

const UserReceiveLogTableToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.TemplateName} setValue={setFilterValue} label={'عنوان'}
                            objKey={'TemplateName'}/>
                <EnumSelectFilter value={filterValue.Status} setValue={setFilterValue} objKey={'Status'} label={'وضعیت'}
                                  enumData={OtpTemplateStatusEnum}/>
            </>}
        />
    );

export default UserReceiveLogTableToolbar;