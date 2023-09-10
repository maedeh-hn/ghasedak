import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import CustomPagination from '../../../components/CustomPagination';
import GroupSmsReportHeader from '../../../sections/@dashboard/sms-report/table/groupSms/GroupSmsReportHeader';
import GroupSmsReportTable from '../../../sections/@dashboard/sms-report/table/groupSms/GroupSmsReportTable';
import {SearchBulkSms} from 'src/services/smsRequestManagement/bulkSms';
import PageHeader from '../../../components/PageHeader';
import TableToolbarActionButton from '../../../components/table/TableToolbarActionButton';
import {getBulkSmsExecle} from "../../../services/smsRequestManagement/bulkSms"

const INITIAL_VALUES = {
    Content: '',
    LineNumber: '',
    Receptor: '',
    FromDate: '',
    ToDate: '',
    Status: -1,
    PageIndex: 1,
    PageSize: 5,
    IsPanel: 'true'
};

const GroupSmsReport = () => {
    const {themeStretch} = useSettings();
    const [downloadLoading,setDownloadLoading]=useState(false)
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const { PageIndex, PageSize, ...filteredFilterValue } = filterValue;
    const {isLoading, data, refetch} = useQuery(['BulkSmsList', filterValue], () =>
        SearchBulkSms(filterValue)
    );
   
      const handleExceleData = async () => {
        const accessToken = window.localStorage.getItem('accessToken');
        setDownloadLoading(true)
        try {
          const response = await fetch(
            `http://gateway.ghasedak.me:7000/SMSRequestManagement/api/v1/BulkSms/GetSmsExcelReport?Content=${filteredFilterValue.Content}&LineNumber=${filteredFilterValue.LineNumber}&Status=${filteredFilterValue.Status}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
    
          const arrayBuffer = await response.arrayBuffer();
       
          if(arrayBuffer){
            setDownloadLoading(false)
           }
          const blob = new Blob([arrayBuffer]);
    
          const blobURL = URL.createObjectURL(blob);
    
          const a = document.createElement('a');
          a.href = blobURL;
          a.download = 'Bulk sms report.xlsx';
    
          a.click();
    
          URL.revokeObjectURL(blobURL);
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <Page title={'گزارشات ارسال گروهی'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات'},
                    {name: 'گزارشات ارسال گروهی'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                {/* <GroupSmsReportHeader setDownloadExecle={handleExceleData}/> */}
                <PageHeader title={'گزارشات ارسال گروهی'}
    actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={handleExceleData}/>}/>
                <GroupSmsReportTable
                    data={data?data ?. data?.items : []}
                    filters={{
                        filterValue: filterValue,
                        setFilterValue: setFilterValue,
                    }}
                    isLoading={isLoading}
                    refetch={refetch}
                    
                />
                <CustomPagination
                    totalPage={(data && data ?. data?.totalPages) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    totalCount={(data && data ?. data?.totalCount) || 0}
                />
            </CustomContainer>
        </Page>
    );
};

export default GroupSmsReport;
