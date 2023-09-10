// import FromDateFilter from "../../../../../components/filters/FromDateFilter";
// import ToDateFilter from "../../../../../components/filters/ToDateFilter";
// import EnumSelectFilter from "../../../../../components/filters/EnumSelectFilter";
// import {TransactionTypeEnum} from "../../../../../utils/enums";
// import CollapseFilter from "../../../../../components/CollapseFilter";

import CollapseFilter from "../../../../../../components/CollapseFilter";
import EnumSelectFilter from "../../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../../components/filters/FromDateFilter";
import ToDateFilter from "../../../../../../components/filters/ToDateFilter";
import { TransactionTypeEnum } from "../../../../../../utils/enums";

const UserTransactionReportToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <FromDateFilter value={filterValue.StartDate} setValue={setFilterValue} objKey={'StartDate'}/>
                <ToDateFilter value={filterValue.EndDate} setValue={setFilterValue} objKey={'EndDate'}/>
                <EnumSelectFilter value={filterValue.TransactionType} setValue={setFilterValue} objKey={'TransactionType'}
                                  label={'نوع تراکنش'}
                                  enumData={TransactionTypeEnum} allValue={0}/>
            </>}
        />
    );

export default UserTransactionReportToolbar;