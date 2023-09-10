import FromDateFilter from "../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../components/filters/ToDateFilter";
import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";
import {ActionTypeEnum} from "../../../../../utils/enums";
import CollapseFilter from "../../../../../components/CollapseFilter";

// ----------------------------------------------------------------------

const ReceiveSmsForwardLogTableToolbar = ({ filterValue, setFilterValue }) => {
  return (
      <CollapseFilter
        filters={<>
            <FromDateFilter value={filterValue.StartDate} setValue={setFilterValue} objKey={'StartDate'} />
            <ToDateFilter value={filterValue.EndDate} setValue={setFilterValue} objKey={'EndDate'} />
            <EnumSelectFilter value={filterValue.ActionType} setValue={setFilterValue} objKey={'ActionType'} label={'متد فراخوانی'}
                              enumData={ActionTypeEnum}/>
        </>}
      />
  );
};

export default ReceiveSmsForwardLogTableToolbar;
