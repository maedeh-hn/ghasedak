import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../../../../components/PageHeader';
import TableHeaderActionButton from '../../../../../../components/TableHeaderActionButton';
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
// import TableHeaderActionButton from 'src/components/TableHeaderActionButton';
// import PageHeader from "../../../../../components/PageHeader";
// import {PATH_DASHBOARD} from "../../../../../routes/paths";

const UserOtpTemplateTableHeader = () => {
  const navigate = useNavigate();

  return (
    <PageHeader
      actions={
        <TableHeaderActionButton
          tooltip={'ایجاد قالب'}
          title={'ایجاد قالب'}
          onClick={() => navigate(PATH_DASHBOARD.otpTemplate.addParent)}
        />
      }
    />
  );
};

export default UserOtpTemplateTableHeader;