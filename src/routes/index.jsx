import {Suspense, lazy} from 'react';
import {Navigate, useRoutes, useLocation} from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import {PATH_AFTER_LOGIN} from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import UserManagement from '../pages/dashboard/user/UserManagement';
import PrivateRoute from '../guards/PrivateRoute';
import Page404 from '../pages/Page404';
import CreateUser from '../pages/dashboard/user/CreateUser';
import OtpTemplateAddEditParent from '../sections/@dashboard/otp-template/components/OtpTemplateAddEditParent';
import SingleSmsStatusLogParent from '../pages/status-log/SingleSmsStatusLogParent';
import UserGroupSmsReportChartParent from '../pages/dashboard/user/UserGroupSmsReportChartParent';
import UserGroupSmsReportFromChartParent from '../pages/dashboard/user/UserGroupSmsReportFromChartParent';
import GroupSmsReportChartTableParent from '../pages/dashboard/sms-report/GroupSmsReportChartTableParent';
import UserReceivedSmsForwardLogsParent from '../pages/dashboard/user/UserReceivedSmsForwardLogsParent';
// import GroupNumbersParent from '../pages/dashboard/contect/group-number/GroupNumbersParent';






// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {pathname} = useLocation();

    return (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')}/>}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login/>
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <Register/>
                        </GuestGuard>
                    ),
                },
                {path: 'login-unprotected', element: <Login/>},
                {path: 'register-unprotected', element: <Register/>},
                {path: 'forgot-password', element: <ForgotPassword/>},
                {path: 'verify', element: <VerifyCode/>},
            ],
        },

        // Dashboard Routes
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout/>
                </AuthGuard>
            ),
            children: [
                {element: <Navigate to={PATH_AFTER_LOGIN} replace/>, index: true},
                {
                    path: 'users',
                    children: [
                        {path: '', element:(<PrivateRoute><UserManagement/></PrivateRoute>) },
                        {path: 'create', element:(<PrivateRoute><CreateUser/></PrivateRoute>)},
                        {path: ':username/:userId', element: <PrivateRoute><UserDetails/></PrivateRoute>},
                        // {path: ':username/:userId/line/:lineId/:lineNumber/owner', element: <LineOwner/>},
                        {path: ':username/:userId/line/:lineId/:lineNumber/detail', element: <PrivateRoute><UserLineDetail/></PrivateRoute>},
                        {path: ':username/:userId/line/:lineNumber/receiveLog', element: <PrivateRoute><UserLineReceiveLog/></PrivateRoute>},
                      
                        {path: ':username/:userId/groupSms/:reportId/chart/:type', element: <PrivateRoute><UserGroupSmsReportChartParent/></PrivateRoute>},
                        {path: 'subUserContacts/:GroupId/:userId/:userName', element: <PrivateRoute><GroupNumbersParent/></PrivateRoute>},
                        {path: ':username/:userId/financialReport', element: <PrivateRoute><FinancialParent/></PrivateRoute>},
                        {
                            path: ':username/:userId/receivedSms/:receiveSmsId/ForwardLogs',
                            element: <PrivateRoute><UserReceivedSmsForwardLogsParent/></PrivateRoute>
                        },
                        {
                            path: ':username/:userId/groupSms/:reportId/:type/:statusId/table',
                            element: <PrivateRoute><UserGroupSmsReportFromChartParent/></PrivateRoute>
                        },
                        // {
                        //     path: ':username/:userId/groupSms/:reportId/:statusId/table/statusLog/:smsId',
                        //     element: <UserGroupSmsStatusLog/>
                        // },
                        {
                            path: ':username/:userId/singleSms/statusLog/:smsId',
                            element: <PrivateRoute><SingleSmsStatusLogParent/></PrivateRoute>
                        },
                    ],
                },
                {
                    path: 'home',
                    children: [{path: '', element: <Home/>}],
                },
                {
                    path: 'panelPrice',
                    children: [{path: '', element: <PanelPrice/>}],
                },
                {
                    path: 'contacts',
                    children: [
                        {path: '', element: <Contacts/>},
                        {path: ':id', element: <GroupNumbers/>},
                    ],
                },
                {path: 'apiKeys', element: <ApiKeys/>},
                // { path: 'forgetPassword', element: <AccountChangePassword /> },
                {
                    path: 'buy',
                    children: [
                        {path: 'line', element: <BuyLine/>},
                        {path: 'plan', element: <BuyPlan/>},
                        {path: 'IncreaseCredit', element: <IncreasPrice/>},
                        {path: 'BuyModule', element:<BuyModule/>}
                    ],
                },

                {
                    path: 'lineList',
                    children: [
                        {path: '', element: <LineListPage/>},
                        {path: 'setting/:lineId', element: <LineSetting/>},
                        {path: 'owner/:lineId', element: <LineOwner/>},
                    ],
                },
                {
                    path: 'smsReport',
                    children: [
                        {element: <Navigate to="/dashboard/smsReport/singleSms" replace/>, index: true},
                        {path: 'singleSms', element: <SingleSmsReport/>},
                        {path: 'groupSms', element: <GroupSmsReportChart/>},
                        {path: 'groupSms/:reportId/:statusId/:type/table', element: <GroupSmsReportChartTable/>},
                        {path: 'groupSms/:reportId/:type/chart', element: <ChartInfo/>},
                        {path: 'logSms', element: <LogSmsReport/>},
                        {path: 'receivedSms', element: <ReceivedSmsReport/>},
                        {path: 'receivedSms/:smsId/forwardLogs', element: <ReceivedSmsForwardLog/>},
                        {path: 'groupSms/:reportId/:type/:statusId/table', element: <GroupSmsReportChartTableParent /> },
                    ],
                },
                {
                    path: 'user',
                    children: [
                        {element: <Navigate to="/dashboard/user/account" replace/>, index: true},
                        {path: 'account', element: <UserAccount/>},
                    ],
                },
                {
                    path: 'sms',
                    children: [
                        {element: <Navigate to="/dashboard/sms/fastSend" replace/>, index: true},
                        {path: 'fastSend', element: <SendFastMessage/>},
                        {path: 'groupSend', element: <SendGroupMessage/>},
                    ],
                },
               
                {
                    path: 'buyLine',
                    children: [
                        {path: '', element: <LineListPage/>},
                        {path: 'setting/:lineId', element: <LineSetting/>},
                        {path: 'owner/:lineId/:legalType', element: <LineOwner/>},
                    ],
                },
                {
                    path: 'otp-template',
                    children: [
                        {path: '', element: <OtpTemplate/>},
                        {path: 'add', element: <OtpTemplateAdd/>},
                        {path: ':templateId', element: <OtpTemplateEdit/>},
                    ],
                },
                {
                    path: 'otp-template-Parent',
                    children: [
                        {path: '', element: <OtpTemplate/>},
                        {path: 'add', element: <PrivateRoute><OtpTemplateAddEditParent/></PrivateRoute>},
                        {path: ':templateId', element: <OtpTemplateEdit/>},
                    ],
                },
                {
                    path: 'transaction',
                    children: [
                        {path: 'internal', element: <Transaction/>},
                        {path: 'creditLog', element: <CreditLog/>},
                    ],
                },
                {
                    path: 'order/:isModule/:orderId',
                    element: <Order/>
                },
                {
                    path: 'notification',
                    element: <Notification/>
                },
                {
                    path: 'authentication',
                    element: <Authentication/>
                },
            ],
        },

        // Main Routes
        // {
        //     path: '*',
        //     element: <LogoOnlyLayout/>,
        //     children: [{path: '*', element: <Navigate to="/dashboard/contacts" replace/>}],
        // },
        {
            path: '404',
            children: [{path: '', element: <Page404/>}],
        },
        {
            path: '/',
            element: <Navigate to={PATH_AFTER_LOGIN} replace/>,
        },
        {path: '*', element: <Navigate to="/404" replace/>},
    ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// AuthenticationWizard
const Authentication = Loadable(lazy(() => import('../pages/dashboard/authentication/Authentication')));

// USER
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/user/UserAccount')));
const UserDetails = Loadable(lazy(() => import('../pages/dashboard/user/UserSettingsTab')));
//CONTACTS
const Contacts = Loadable(lazy(() => import('../pages/dashboard/contect/contact/Contacts')));
const GroupNumbers = Loadable(lazy(() => import('../pages/dashboard/contect/group-number/GroupNumbers')));
const GroupNumbersParent = Loadable(lazy(() => import('../pages/dashboard/contect/group-number/GroupNumbersParent')));

//Api keys
const ApiKeys = Loadable(lazy(() => import('../pages/dashboard/api-keys/ApiKeys')));
//lines
const LineListPage = Loadable(lazy(() => import('../pages/dashboard/Lines/LineListPage.jsx')));
const LineSetting = Loadable(lazy(() => import('../pages/dashboard/Lines/LineSetting')));
const LineOwner = Loadable(lazy(() => import('../pages/dashboard/Lines/LineOwner')));
const UserLineReceiveLog = Loadable(lazy(() => import('../pages/dashboard/user/UserLineReceiveLog')));
const UserLineDetail = Loadable(lazy(() => import('../pages/dashboard/user/UserLineDetail')));
// Otp Template
const OtpTemplate = Loadable(lazy(() => import('../pages/dashboard/otp-template/OtpTemplate')));
const OtpTemplateAdd = Loadable(lazy(() => import('../pages/dashboard/otp-template/OtpTemplateAdd')));
const OtpTemplateEdit = Loadable(lazy(() => import('../pages/dashboard/otp-template/OtpTemplateEdit')));
// Sms Report
const SingleSmsReport = Loadable(lazy(() => import('../pages/dashboard/sms-report/SingleSmsReport')));
const GroupSmsReportChart = Loadable(lazy(() => import('../pages/dashboard/sms-report/GroupSmsReport')));
const GroupSmsReportChartTable = Loadable(lazy(() => import('../pages/dashboard/sms-report/GroupSmsChartReport')));
const LogSmsReport = Loadable(lazy(() => import('../pages/dashboard/sms-report/LogSmsReport')));
const ReceivedSmsReport = Loadable(lazy(() => import('../pages/dashboard/sms-report/ReceivedSmsReport')));
const ReceivedSmsForwardLog = Loadable(lazy(() => import('../pages/dashboard/sms-report/ReceivedSmsForwardLog')));

// Home
const Home = Loadable(lazy(() => import('../pages/dashboard/home/Home')));
const Order = Loadable(lazy(() => import('../pages/dashboard/home/Order')));
//Buy
const BuyLine = Loadable(lazy(() => import('../pages/dashboard/buy/BuyLine')));
const BuyPlan = Loadable(lazy(() => import('../pages/dashboard/buy/BuyPlan')));
const BuyModule = Loadable(lazy(() => import('../pages/dashboard/buy/BuyModule')));
//Transaction
const Transaction = Loadable(lazy(() => import('../pages/dashboard/transaction/Transactions')));
// eslint-disable-next-line no-unused-vars
const CreditLog = Loadable(lazy(() => import('../pages/dashboard/transaction/CreditLog')));

// Notification
const Notification = Loadable(lazy(() => import('../pages/dashboard/notification/Notifications')));
const IncreasPrice = Loadable(lazy(() => import('../pages/dashboard/buy/IncreasPrice')));


const SendFastMessage = Loadable(lazy(() => import('../pages/dashboard/message/SendFastMessage')));
const SendGroupMessage = Loadable(lazy(() => import('../pages/dashboard/message/SendGroupMessage')));
const ChartInfo = Loadable(lazy(() => import('../pages/dashboard/sms-report/GroupSmsReportChart')));
const PanelPrice = Loadable(lazy(() => import('../pages/dashboard/panelPrice/PanelPrice')));
//financial
const FinancialParent = Loadable(lazy(() => import('../pages/dashboard/transaction/FinancialParent')));