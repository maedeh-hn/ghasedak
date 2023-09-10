import {Container} from "@mui/material";

import {PATH_DASHBOARD} from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import Page from "../../../components/Page";

import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import CreateUserForm from "../../../sections/@dashboard/user/CreateUserForm";

const CreateUser = () => {
    const { themeStretch } = useSettings();

    return(
      <Page title="ایحاد کاربر جدید">
          <HeaderBreadcrumbs
              links={[
                  { name: 'داشبورد', href: PATH_DASHBOARD.root },
                  { name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root },
                  { name: 'ایجاد کاربر جدید' },
              ]}
          />
          <Container maxWidth={themeStretch ? false : 'xl'}>
              <CreateUserForm />
          </Container>
      </Page>
  )
}

export default CreateUser;