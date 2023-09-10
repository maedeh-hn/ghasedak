function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: {
    root: path(ROOTS_DASHBOARD, '/home'),
  },
  userManagement: {
    root: path(ROOTS_DASHBOARD, '/users'),
    view: (username, userId) => path(ROOTS_DASHBOARD, `/users/${username}/${userId}`),
    subUserContacts: (groupId,userId,userName) => path(ROOTS_DASHBOARD, `/users/subUserContacts/${groupId}/${userId}/${userName}`),
    create: path(ROOTS_DASHBOARD, '/users/create'),
    lineOwner: (username, userId, lineId, lineNumber) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/line/${lineId}/${lineNumber}/owner`),
    lineNumberReceiveLog: (username, userId, lineNumber) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/line/${lineNumber}/receiveLog`),
    groupNumber: (username, userId, groupId, groupName) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/contact/${groupId}/${groupName}`),
    lineNumberReceiveLog: (username, userId, lineNumber) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/line/${lineNumber}/receiveLog`),
    lineDetail: (username, userId, lineId, lineNumber) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/line/${lineId}/${lineNumber}/detail`),
    groupSendReportChart: (username, userId, reportId,type) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/groupSms/${reportId}/chart/${type}`),
    groupSendChartReport: (username, userId, reportId, statusId, type) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/groupSms/${reportId}/${type}/${statusId}/table`),
    groupSmsStatusLog: (username, userId, reportId, statusId, smsId, type) =>
      path(
        ROOTS_DASHBOARD,
        `/users/${username}/${userId}/groupSms/${reportId}/${type}/${statusId}/table/statusLog/${smsId}`
      ),
    singleSmsStatusLog: (username, userId, smsId) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/singleSms/statusLog/${smsId}`),
    receivedSmsForwardLogs: (username, userId, receivedSmsId) =>
      path(ROOTS_DASHBOARD, `/users/${username}/${userId}/receivedSms/${receivedSmsId}/ForwardLogs`),
    financialReportParent: (username, userId) => path(ROOTS_DASHBOARD, `/users/${username}/${userId}/financialReport`),

  },
  report:{
    groupSendChartReport: (reportId, statusId, type) =>
      path(ROOTS_DASHBOARD, `/smsReport/groupSms/${reportId}/${type}/${statusId}/table`),
  },
  transaction: {
    root: path(ROOTS_DASHBOARD, '/transaction'),
    transaction: path(ROOTS_DASHBOARD, '/transaction/internal'),
    creditLog: path(ROOTS_DASHBOARD, '/transaction/creditLog'),
  },
  contacts: {
    root: path(ROOTS_DASHBOARD, '/contacts'),
    view: (id) => path(ROOTS_DASHBOARD, `/contacts/${id}`),
  },
  apiKeys: {
    root: path(ROOTS_DASHBOARD, '/api-keys'),
  },
  panelPrice: {
    root: path(ROOTS_DASHBOARD, '/panelPrice'),
  },
  lines: {
    root: path(ROOTS_DASHBOARD, `/lineList`),
    owner: (lineId) => path(ROOTS_DASHBOARD, `/lineList/owner/${lineId}`),
    setting: (lineId) => path(ROOTS_DASHBOARD, `/lineList/setting/${lineId}`),
  },
  user: {
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  smsReport: {
    root: path(ROOTS_DASHBOARD, '/smsReport'),
    singleSms: path(ROOTS_DASHBOARD, '/smsReport/singleSms'),
    groupSms: path(ROOTS_DASHBOARD, '/smsReport/groupSms'),
    groupSmsWeb: path(ROOTS_DASHBOARD, '/smsReport/groupSmsWeb'),
    logSms: path(ROOTS_DASHBOARD, '/smsReport/logSms'),
    receivedSms: path(ROOTS_DASHBOARD, '/smsReport/receivedSms'),
    receiveSmsForwardLogs: (smsId) => path(ROOTS_DASHBOARD, `/smsReport/receivedSms/${smsId}/forwardLogs`),
    reportTable: path(ROOTS_DASHBOARD, '/smsReport/table/:reportId/:statusId'),
    groupSendReportChart: (reportId, type) => path(ROOTS_DASHBOARD, `/smsReport/groupSms/${reportId}/${type}/chart`),
    groupSendChartReport: (reportId, statusId, type) =>
      path(ROOTS_DASHBOARD, `/smsReport/groupSms/${reportId}/${statusId}/${type}/table`),
  },
  otpTemplate: {
    root: path(ROOTS_DASHBOARD, '/otp-template'),
    add: path(ROOTS_DASHBOARD, '/otp-template/add'),
    addParent: path(ROOTS_DASHBOARD, '/otp-template-Parent/add'),
    edit: (templateId) => path(ROOTS_DASHBOARD, `/otp-template/${templateId}`),
  },
  sms: {
    root: path(ROOTS_DASHBOARD, '/sms'),
    fastSend: path(ROOTS_DASHBOARD, '/sms/fastSend'),
    groupSend: path(ROOTS_DASHBOARD, '/sms/groupSend'),
  },
  buy: {
    root: path(ROOTS_DASHBOARD, '/buy'),
    line: path(ROOTS_DASHBOARD, `/buy/line`),
    plan: path(ROOTS_DASHBOARD, `/buy/plan`),
    IncreaseCredit: path(ROOTS_DASHBOARD, `/buy/IncreaseCredit`),
    BuyModule:path(ROOTS_DASHBOARD, `/buy/BuyModule`)
  },
  notification: {
    root: path(ROOTS_DASHBOARD, `/notification`),
  },
  authentication : {
    root: path(ROOTS_DASHBOARD, `/authentication`),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
