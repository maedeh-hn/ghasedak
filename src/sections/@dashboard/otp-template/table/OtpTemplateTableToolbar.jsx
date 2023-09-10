import React from 'react';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import PageHeader from '../../../../components/PageHeader';

const OtpTemplateTableToolbar = () => {
  const navigate = useNavigate();

  return (
    <PageHeader
      title={'لیست قالب های اعتبارسنجی'}
      actions={
        <TableToolbarActionButton
          tooltip={'ایجاد قالب'}
          title={'ایجاد قالب'}
          onClick={() => navigate(PATH_DASHBOARD.otpTemplate.add)}
        />
      }
    />
  );
};

export default OtpTemplateTableToolbar;
