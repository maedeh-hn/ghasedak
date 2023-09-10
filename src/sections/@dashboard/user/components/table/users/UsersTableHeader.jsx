import {useNavigate} from "react-router-dom";

import TableHeaderActionButton from "../../../../../../components/TableHeaderActionButton";
import PageHeader from "../../../../../../components/PageHeader";
import { PATH_DASHBOARD } from "../../../../../../routes/paths";

const UsersTableHeader = () => {
    const navigate = useNavigate()
    return (
        <PageHeader title={'مدیریت زیرکاربران'} actions={<>
            <TableHeaderActionButton
                title={'تعریف کاربر جدید'}
                color={'primary'}
                onClick={() => navigate(PATH_DASHBOARD.userManagement.create)}
                tooltip={'تعریف کاربر جدید'}
            />
        </>}/>
    );
};

export default UsersTableHeader;