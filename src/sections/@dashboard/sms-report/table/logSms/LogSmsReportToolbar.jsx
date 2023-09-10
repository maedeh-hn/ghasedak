import {WebServiceLogStatusEnum} from '../../../../../utils/enums';
import CollapseFilter from "../../../../../components/CollapseFilter";
import FromDateFilter from "../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../components/filters/ToDateFilter";
import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";


const LogSmsReportToolbar = ({ filterValue, setFilterValue }) => {
  return (
      <CollapseFilter
          filters={<>
              <FromDateFilter value={filterValue.FromDate} setValue={setFilterValue} objKey={'FromDate'} />
              <ToDateFilter value={filterValue.ToDate} setValue={setFilterValue} objKey={'ToDates'} />
              <EnumSelectFilter value={filterValue.statusCode} setValue={setFilterValue} objKey={'statusCode'}
                                label={'کد وضعیت'}
                                enumData={WebServiceLogStatusEnum}/>
          </>}
      />
  );
};

export default LogSmsReportToolbar;
