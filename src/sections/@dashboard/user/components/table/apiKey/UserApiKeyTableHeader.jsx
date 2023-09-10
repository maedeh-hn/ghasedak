import PageHeader from "../../../../../../components/PageHeader";
import TableHeaderActionButton from "../../../../../../../src/components/TableHeaderActionButton"

const UserApiKeyTableHeader = ({ onApiKeyModal }) => (
      <PageHeader title={''} actions={<>
          <TableHeaderActionButton
              title={'ایجاد کلید شناسه'}
              color={'primary'}
              onClick={() => onApiKeyModal()}
              tooltip={'ایجاد کلید شناسه'}
          />
      </>} />
  );

export default UserApiKeyTableHeader;