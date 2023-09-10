// import FromDateFilter from "../../../../../components/filters/FromDateFilter";
// import ToDateFilter from "../../../../../components/filters/ToDateFilter";
// import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";
// import {ActionTypeEnum} from "../../../../../utils/enums";
// import CollapseFilter from "../../../../../components/CollapseFilter";

import CollapseFilter from "../../../../../../../components/CollapseFilter";
import EnumSelectFilter from "../../../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../../../components/filters/ToDateFilter";
import { ActionTypeEnum } from "../../../../../../../utils/enums";

// ----------------------------------------------------------------------

const UserReceiveSmsForwardLogTableToolbar = ({ filterValue, setFilterValue }) => (
      <CollapseFilter
        filters={<>
            <FromDateFilter value={filterValue.FromDate} setValue={setFilterValue} objKey={'FromDate'} />
            <ToDateFilter value={filterValue.ToDate} setValue={setFilterValue} objKey={'ToDate'} />
            {/* <EnumSelectFilter value={filterValue.Origin} setValue={setFilterValue} objKey={'Origin'} label={'میدا ارسال'} */}
            {/*              enumData={originEnum}/> */}
            <EnumSelectFilter value={filterValue.ActionType} setValue={setFilterValue} objKey={'ActionType'} label={'متد فراخوانی'}
                              enumData={ActionTypeEnum}/>
        </>}
      />
  );

export default UserReceiveSmsForwardLogTableToolbar;