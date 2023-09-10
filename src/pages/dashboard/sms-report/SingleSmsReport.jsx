import React, {useState} from 'react';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {PATH_DASHBOARD} from '../../../routes/paths';
import CustomContainer from '../../../components/CustomContainer';
import useSettings from '../../../hooks/useSettings';
import {useQuery} from '@tanstack/react-query';
import {SearchSingleSms, getSingleSmsExecle} from "../../../services/smsRequestManagement/singleSms"
import SingleSmsReportTable from '../../../sections/@dashboard/sms-report/table/SingleSms/SingleSmsReportTable';
import CustomPagination from '../../../components/CustomPagination';
import SingleSmsReportHeader from '../../../sections/@dashboard/sms-report/table/SingleSms/SingleSmsReportHeader';

import { useEffect } from 'react';
import PageHeader from '../../../components/PageHeader';
import TableToolbarActionButton from '../../../components/table/TableToolbarActionButton';

const INITIAL_VALUES = {
    Content: '',
    LineNumber: '',
    Receptor: '',
    FromDate: '',
    ToDate: '',
    Status: -1,
    PageIndex: 1,
    PageSize: 5,
};

const SingleSmsReport = () => {
    const {themeStretch} = useSettings();
    const [downloadLoading,setDownloadLoading]=useState(false)
    const [filterValue, setFilterValue] = useState(INITIAL_VALUES);
    const { PageIndex, PageSize, ...filteredFilterValue } = filterValue;
    
    const {isLoading, data, refetch} = useQuery(['SingleSmsListParent', filterValue], () =>
    SearchSingleSms(filterValue)
    );


//   const handleExceleData=async()=>{
//     const data = await getSingleSmsExecle(filteredFilterValue);
//     const excelBlob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const excelURL = URL.createObjectURL(excelBlob);
  
//     const a = document.createElement('a');
//     a.href = excelURL;
//     a.download = 'Single sms report.xlsx'; // Set the desired filename
//     a.style.display = 'none';
  
//     document.body.appendChild(a);
//     a.click();
  
//     document.body.removeChild(a);
//     URL.revokeObjectURL(excelURL);

//   }

  const handleExceleData = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    setDownloadLoading(true)
    try {
      const response = await fetch(
        `http://gateway.ghasedak.me/SMSRequestManagement/api/v1/SingleSms/GetSmsExcelReport?Content=${filteredFilterValue.Content}&LineNumber=${filteredFilterValue.LineNumber}&Status=${filteredFilterValue.Status}`,
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
      a.download = 'Single sms report.xlsx';

      a.click();

      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <Page title={'گزارشات ارسال تکی'}>
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'گزارشات'},
                    {name: 'گزارشات ارسال تکی'}
                ]}
            />
            <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
                {/* <SingleSmsReportHeader setDownloadExecle={handleExceleData}/> */}
                <PageHeader title={'گزارشات ارسال تکی'}
                    actions={<TableToolbarActionButton tooltip={'خروجی اکسل'} title={'خروجی اکسل'} onClick={handleExceleData}/>}/>
                <SingleSmsReportTable
                    data={data ? data?.data?.items : []}
                    filters={{
                        filterValue: filterValue,
                        setFilterValue: setFilterValue,
                    }}
                    isLoading={isLoading}
                    refetch={refetch}
                />
                <CustomPagination
                    totalPage={(data && data?.totalPages) || 0}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    totalCount={(data && data?.totalCount) || 0}
                />
            </CustomContainer>
        </Page>
    );
};

export default SingleSmsReport;
