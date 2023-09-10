import CollapseFilter from "../../../../../components/CollapseFilter";
import FromDateFilter from "../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../components/filters/ToDateFilter";


const TransactionReportToolbar = ({ filterValue, setFilterValue }) => {
  return (
      <CollapseFilter
        filters={<>
            <FromDateFilter value={filterValue.StartDate} setValue={setFilterValue} objKey={'StartDate'} />
            <ToDateFilter value={filterValue.EndDate} setValue={setFilterValue} objKey={'EndDate'} />
        </>}
      />
  );
};

export default TransactionReportToolbar;
