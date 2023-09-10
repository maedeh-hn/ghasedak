// import TextFilter from "../../../../../../components/filters/TextFilter";
// import EnumSelectFilter from "../../../../../../components/filters/EnumSelectFilter";
// import {OriginEnum, ProviderEnum, SmsStatusEnum, SmsStatusReportEnum} from "../../../../../../utils/enums";
// import FromDateFilter from "../../../../../../components/filters/FromDateFilter";
// import ToDateFilter from "../../../../../../components/filters/ToDateFilter";
// import CollapseFilter from "../../../../../../components/CollapseFilter";

import CollapseFilter from "../../../../../../../components/CollapseFilter";
import EnumSelectFilter from "../../../../../../../components/filters/EnumSelectFilter";
import FromDateFilter from "../../../../../../../components/filters/FromDateFilter";
import TextFilter from "../../../../../../../components/filters/TextFilter";
import ToDateFilter from "../../../../../../../components/filters/ToDateFilter";
import { OriginEnum, ProviderEnum, SmsStatusEnum, SmsStatusReportEnum } from "../../../../../../../utils/enums";


const UserSingleSmsReportToolbar = ({filterValue, setFilterValue}) => (
        <CollapseFilter
            filters={<>
                <TextFilter value={filterValue.SmsId} setValue={setFilterValue} label={'شناسه پیام'} objKey={'SmsId'}/>
                <TextFilter value={filterValue.Content} setValue={setFilterValue} label={'محتوا'} objKey={'Content'}/>
                <TextFilter value={filterValue.LineNumber} setValue={setFilterValue} label={'شماره خط'}
                            objKey={'LineNumber'}/>
            </>}
            subFilters={<>

                <TextFilter value={filterValue.Receptor} setValue={setFilterValue} label={'گیرنده'}
                            objKey={'Receptor'}/>
                {/* <EnumSelectFilter value={filterValue.Origin} setValue={setFilterValue} objKey={'Origin'}
                                  label={'میدا ارسال'}
                                  enumData={OriginEnum}/> */}
                <EnumSelectFilter value={filterValue.SmsStatus} setValue={setFilterValue} objKey={'SmsStatus'}
                                  label={'وضعیت پیام'}
                                  enumData={SmsStatusEnum}/>
                <EnumSelectFilter value={filterValue.SmsStatusReport} setValue={setFilterValue}
                                  objKey={'SmsStatusReport'} label={'وضعیت گزارش پیام'}
                                  enumData={SmsStatusReportEnum}/>
                <FromDateFilter value={filterValue.StartDate} setValue={setFilterValue} objKey={'StartDate'}/>
                <ToDateFilter value={filterValue.EndDate} setValue={setFilterValue} objKey={'EndDate'}/>
                {/* <EnumSelectFilter value={filterValue.ProviderName} setValue={setFilterValue} objKey={'ProviderName'}
                                  label={'سرویس دهنده'}
                                  enumData={ProviderEnum} allValue={'100'}/> */}
            </>}
        />
    );

export default UserSingleSmsReportToolbar;