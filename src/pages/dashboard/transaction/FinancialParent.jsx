import {Container} from "@mui/material";
import {useParams} from "react-router-dom";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useSettings from "../../../hooks/useSettings";
import Page from "../../../components/Page";
import FinancialReportParent from "../../../sections/@dashboard/user/financialReport/FinancialReportParent";

// import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
// import {PATH_DASHBOARD} from "../../../routes/paths";
// import useSettings from "../../../hooks/useSettings";
// import Page from "../../../components/Page";
// import FinancialReport from "../../../sections/@dashboard/users/table/financialReport/FinancialReport";

const FinancialParent = () => {
    const { themeStretch } = useSettings();
    const {username, userId} = useParams()
    return(
        <Page title="تراکنش ها">
            <HeaderBreadcrumbs
                links={[
                    {name: 'داشبورد', href: PATH_DASHBOARD.root},
                    {name: 'مدیریت کاربران', href: PATH_DASHBOARD.userManagement.root},
                    {name: username, href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=Financial`},
                    {
                        name: 'مالی',
                        href: `${PATH_DASHBOARD.userManagement.view(username, userId)}?active=Financial`
                    },
                    {name: 'ثبت تراکنش'}
                ]}
            />
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <FinancialReportParent />
            </Container>
        </Page>
    )
}

export default FinancialParent;