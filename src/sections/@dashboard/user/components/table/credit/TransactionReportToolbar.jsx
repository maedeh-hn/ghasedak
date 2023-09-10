// import FromDateFilter from "../../../../../components/filters/FromDateFilter";
// import ToDateFilter from "../../../../../components/filters/ToDateFilter";
// import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";
// import {CreditTypeEnum} from "../../../../../utils/enums";
// import CollapseFilter from "../../../../../components/CollapseFilter";

import CollapseFilter from "../../../../../../components/CollapseFilter";
import EnumSelectFilter from "../../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../../components/filters/ToDateFilter";
import { CreditTypeEnum } from "../../../../../../utils/enums";


const TransactionReportToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <FromDateFilter value={filterValue.StartDate} setValue={setFilterValue} objKey={'StartDate'}/>
                <ToDateFilter value={filterValue.EndDate} setValue={setFilterValue} objKey={'EndDate'}/>
                <EnumSelectFilter value={filterValue.CreditType} setValue={setFilterValue} objKey={'CreditType'}
                                  label={'نوع تراکنش'}
                                  enumData={CreditTypeEnum} allValue={0}/>
            </>}
        />
    );

export default TransactionReportToolbar;