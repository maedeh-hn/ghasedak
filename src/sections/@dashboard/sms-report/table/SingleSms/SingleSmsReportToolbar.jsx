import { SmsStatusEnum } from '../../../../../utils/enums';
import CollapseFilter from "../../../../../components/CollapseFilter";
import TextFilter from "../../../../../components/filters/TextFilter";
import FromDateFilter from "../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../components/filters/ToDateFilter";
import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";


const SingleSmsReportToolbar = ({ filterValue, setFilterValue }) => {
  return (
      <CollapseFilter
        filters={<>
            <TextFilter value={filterValue.Content} setValue={setFilterValue} objKey={'Content'} label={'محتوا'} />
            <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} objKey={'LineNumber'} label={'شماره خط'} />

            <EnumSelectFilter value={filterValue.Status} setValue={setFilterValue} objKey={'Status'}
                              label={'وضعیت'}
                              enumData={SmsStatusEnum}/>
        </>}
        subFilters={<>
            <TextFilter value={filterValue.Receptor} setValue={setFilterValue} objKey={'Receptor'} label={'شماره گیرنده'} />
            <FromDateFilter value={filterValue.FromDate} setValue={setFilterValue} objKey={'FromDate'} />
            <ToDateFilter value={filterValue.ToDate} setValue={setFilterValue} objKey={'ToDates'} />
        </>}
      />
  );
};

export default SingleSmsReportToolbar;
