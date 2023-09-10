// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import {Box} from "@mui/material";
// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{width: 1, height: 1}}/>;

const ICONS = {
    blog: getIcon('ic_shopping_bag'),
    cart: getIcon('ic_cart'),
    chat: getIcon('ic_chat'),
    mail: getIcon('ic_message_text_square'),
    user: getIcon('ic_user_square'),
    subUser: getIcon('ic_user'),
    kanban: getIcon('ic_kanban'),
    booking: getIcon('ic_line_chart_up'),
    invoice: getIcon('ic_invoice'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_home'),
    contacts: getIcon('ic_users_check'),
    template: getIcon('ic_notification_text'),
    wallet: getIcon('ic_credit_card'),
    notification: getIcon('ic_announcement'),
    key: <VpnKeyOutlinedIcon/>,
    line: getIcon('ic_phone_call'),
};

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'عمومی',
        items: [
            {
                title: 'خانه', path: PATH_DASHBOARD.home.root,
                icon: ICONS.dashboard
            },
            {title: 'مدیریت زیر‌کاربران', path: PATH_DASHBOARD.userManagement.root, icon: ICONS.subUser},
            {
                title: 'ارسال مدارک', path: PATH_DASHBOARD.authentication.root,
                icon: ICONS.dashboard
            },
            {
                title: 'ارسال پیام',
                icon: ICONS.mail,
                path: PATH_DASHBOARD.sms.root,
                children: [
                    {title: 'ارسال سریع', path: PATH_DASHBOARD.sms.fastSend},
                    {title: 'ارسال گروهی', path: PATH_DASHBOARD.sms.groupSend},
                ],
            },
            {
                title: 'سرویس اعتبار سنجی',
                path: PATH_DASHBOARD.otpTemplate.root,
                icon: ICONS.template
            },
            {
                title: 'گزارشات',
                path: PATH_DASHBOARD.smsReport.root,
                icon: ICONS.booking,
                children: [
                    {title: 'ارسال تکی', path: PATH_DASHBOARD.smsReport.singleSms},
                    {title: 'ارسال گروهی', path: PATH_DASHBOARD.smsReport.groupSms},
                    {title: 'پیام های دریافتی', path: PATH_DASHBOARD.smsReport.receivedSms},
                    {title: ' فراخوانی وب سرویس', path: PATH_DASHBOARD.smsReport.logSms},

                ],
            },
            {
                title: 'اخبار و اطلاع رسانی',
                path: PATH_DASHBOARD.notification.root,
                icon: ICONS.notification
            },

            {
                title: 'مدیریت خطوط',
                path: PATH_DASHBOARD.lines.root,
                icon: ICONS.line
            },

            {
                title: 'گزارشات مالی',
                icon: ICONS.wallet,
                path: PATH_DASHBOARD.transaction.root,
                children: [
                    {title: ' تراکنشات مالی', path: PATH_DASHBOARD.transaction.transaction},
                    {title: 'ریز گزارشات', path: PATH_DASHBOARD.transaction.creditLog},
                ],
            },
            {
                title: 'خرید',
                path: PATH_DASHBOARD.buy.root,
                icon: ICONS.blog,
                children: [
                    {title: 'خرید خط اختصاصی', path: PATH_DASHBOARD.buy.line},
                    {title: 'خرید سرویس ', path: PATH_DASHBOARD.buy.plan},
                    {title: 'افزایش اعتبار', path: PATH_DASHBOARD.buy.IncreaseCredit},
                    {title: 'خرید ماژول ها', path: PATH_DASHBOARD.buy.BuyModule},
                ],
            },
            {
                title: 'حساب کاربری',
                path: PATH_DASHBOARD.user.account,
                icon: ICONS.user
            },
            {
                title: 'گروه های مخاطبین',
                path: PATH_DASHBOARD.contacts.root,
                icon: ICONS.contacts
            },
        ],
    },

];

export default navConfig;
