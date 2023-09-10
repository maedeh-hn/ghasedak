const generatePath = (namespace: string, path: string) => {
  return `/${namespace}/api/v1/${path}`;
};

export const servicesPath = {
  users: {
    city: {
      getProvinces: generatePath('Users', 'City/GetProvinces'),
      getCitiesByProvince: (provinceId: string) =>
        generatePath('Users', `City/GetCityByProvinceId?ProvinceId=${provinceId}`),
    },
    authenticate: {
      login: generatePath('Users', 'Authenticate/Login'),
      register: generatePath('Users', 'Authenticate/RegisterUser'),
      generateCaptcha: generatePath('Users', 'Authenticate/GenerateCaptcha'),
    },
    user: {
      getUserProfile: generatePath('Users', 'User/GetUserProfile'),
      updateProfile: generatePath('Users', 'User/UpdateProfile'),
      AllUnallocatedLinestoAUserParent: (userId: any) => generatePath('Users', `Parent/User/GetUserById?Id=${userId}`),
      getUserById: (userId: any) => generatePath('Users', `Parent/User/GetUserById?Id=${userId}`),
      changeMobile: generatePath('Users', 'User/ChangeMobile'),
      changeUserPassword: generatePath('Users', 'User/ChangeUserPassword'),
      chargeAccount: generatePath('Users', 'User/ChargeAccount'),
  
      searchSubUsers: generatePath('Users', 'Parent/User/SearchSubUsers'),
      addUser: generatePath('Users', 'Parent/User/CreateUser'),
      editUser: generatePath('Users', 'Parent/User/UpdateUser'),
      advanceLineUserSearchByUserId: (userId: any) =>
        generatePath('Users', `Parent/User/AdvanceLineUserSearch?UserId=${userId}`),
      lineUserSearch: (value: any) => generatePath('Users', `Parent/User/LineUserSearch?Input=${value}`),
      advanceLineUserSearch: generatePath('Users', 'Parent/User/AdvanceLineUserSearch'),
    },
    apiKeys: {
      getAllApiKeys: generatePath('Users', 'ApiKeys/GetAllApiKeys'),

      getAllApiKeysParent: (userId: any) => generatePath('Users', `Parent/ApiKeys/GetAllApiKeys?userId=${userId}`),
      getApiKeyById: (apiKeyId: string) => generatePath('Users', `ApiKeys/GetApiKeyById/${apiKeyId}`),
      createApiKey: generatePath('Users', 'ApiKeys'),
      editApiKey: generatePath('Users', 'ApiKeys'),
      deleteApiKey: (apiKeyId: string) => generatePath('Users', `ApiKeys?Id=${apiKeyId}`),
      addApiKeyParent: generatePath('Users', 'Parent/ApiKeys'),
      editApiKeyParent: generatePath('Users', 'Parent/ApiKeys'),
      deleteApiKeyParent: generatePath('Users', 'Parent/ApiKeys'),
    },
    transaction: {
      check: (transactionId: string) => generatePath('Users', `Transaction/Check?transactionId=${transactionId}`),
      searchTransaction: generatePath('Users', 'Transaction/SearchTransaction'),
      searchCreditLogs: generatePath('Users', 'Transaction/SearchCreditLogs'),
      searchCreditLogsParent: generatePath('Users', 'Parent/Transaction/SearchCreditLogs'),
      searchTransactionParent: generatePath('Users', 'Parent/Transaction/SearchTransaction'),
      createTransactionParent: generatePath('Users', 'Parent/Transaction/CreateTransaction'),
      refreshTokenBuyModule: generatePath('Users', 'Authenticate/RefreshToken'),
      //     checkCrmOrderCode: (amount, crmCode) =>
      //     generatePath('Users', `Parent/Transaction/CheckCrmOrderCode?Amount=${amount}&CrmCode=${crmCode}`),
    },
    link: {
      getAllLinks: generatePath('Users', 'Link/GetAllLinks'),
      create: (url: string) => generatePath('Users', `Link?url=${url}`),
      edit: (url: string, userLinkId: string) => generatePath('Users', `Link?url=${url}&id=${userLinkId}`),
      delete: (userLinkId: string) => generatePath('Users', `Link?Id=${userLinkId}`),
    },
    tokenStore: {
      verifyRegisteration: generatePath('Users', 'TokenStore/VerifyRegisteration'),
      SendAuthenticationConfirm:generatePath('Users', 'TokenStore/SendAuthenticationConfirmationOTP'),
      resetPassword: generatePath('Users', 'TokenStore/ResetPassword'),
      changeMobile: generatePath('Users', 'TokenStore/changeMobile'),
      activateGoogleAuthenticator: generatePath('Users', 'TokenStore/ActivateGoogleAuthenticator'),
      authenticateUserTwoStepIsOn: generatePath('Users', 'TokenStore/AuthenticateUserTwoStepIsOn'),
      sendTwoStepCodeAsSMS: generatePath('Users', 'TokenStore/SendTwoStepCodeAsSMS'),
      sendConfirmationOTP: generatePath('Users', 'TokenStore/SendConfirmationOTP'),
      confirmNewUser: generatePath('Users', 'TokenStore/ConfirmNewUser'),
      forgotPassword: generatePath('Users', 'TokenStore/ForgotPassword'),
    },
    userSettings: {
      getUserSetting: generatePath('Users', 'UserSettings'),
      editUserSetting: generatePath('Users', 'UserSettings'),
    },
  },
  lines: {
    lines: {
      getAll: generatePath('Lines', 'Lines/GetAllLines'),
      getAllGroupSendLines: generatePath('Lines', 'Lines/GetAllGroupSendLines'),
      getAllFreeLinesToBuy: generatePath('Lines', 'Lines/GetAllFreeLinesToBuy'),
      buyLine: (lineId: string) => generatePath('Lines', `Lines/BuyLine?lineId=${lineId}`),
      getAllLineByUserId: (userId: any) => generatePath('Lines', `Parent/Line/GetAllLines?UserId=${userId}`),
    },

    lineSettings: {
      getLineSettingsByLineId: (lineId: string) =>
        generatePath('Lines', `LineSettings/GetLineSettingsByLineId?LineId=${lineId}`),
      updateLineSetting: generatePath('Lines', 'LineSettings'),
      getLineSettingByLineId: (lineId: any) =>
        generatePath('Lines', `Parent/LineSettings/GetLineSettingsByLineId?LineId=${lineId}`),
      editLineSettings: generatePath('Lines', 'Parent/LineSettings'),
    },
    legalUsers: {
      getLegalUsersByLineId: (lineId: string) => generatePath('Lines', `LegalUsers/GetLegalUsersByLineId?Id=${lineId}`),
      createLegalUsers: generatePath('Lines', 'LegalUsers'),
      editLegalUsers: generatePath('Lines', 'LegalUsers'),
    },
    naturalUsers: {
      GetNaturalUsersByLineId: (lineId: string) =>
        generatePath('Lines', `NaturalUsers/GetNaturalUsersByLineId?lineId=${lineId}`),
      createNaturalUsers: generatePath('Lines', 'NaturalUsers'),
      editNaturalUsers: generatePath('Lines', 'NaturalUsers'),
      getNaturalUsersByLineId: (lineId: string) =>
        generatePath('Lines', `NaturalUsers/GetNaturalUsersByLineId?Id=${lineId}`),
    },
    lineUsers: {
      editLineUserSettingParent: generatePath('Lines', 'Parent/LineUsers'),
      allUsersLineParent: generatePath('Lines', `Parent/LineUsers/GetAllUserLines`),
      editPriority: (lineId: string, priority: string) =>
        generatePath('Lines', `LineUsers?lineId=${lineId}&priority=${priority}`),
      deleteLineUserByUserId: generatePath('Lines', 'Parent/LineUsers/DeleteLineUserByLineAndUserId'),
      addLineUserSettings: generatePath('Lines', 'Parent/LineUsers'),
      LineUserParentSetting: (lineId: any) => generatePath('Lines', `Parent/LineUsers/GetLineUser?lineId=${lineId}`),
      AllUnallocatedLinestoAUserParent: (userId: any) =>
        generatePath('Lines', `Parent/Line/GetAllUnallocatedLinestoAUser?UserId=${userId}`),
    },
    line: {
      // getAllLineByUserId: (userId:any) => generatePath('Lines', `Admin/Line?userid=${userId}`),
      // searchLine: generatePath('Lines', 'Admin/Line/SearchLine'),
      getLineById: (lineId: any) => generatePath('Lines', `Parent/Line/GetLineById?LineId=${lineId}`),
      // editLine: generatePath('Lines', 'Admin/Line'),
      // addLine: generatePath('Lines', 'Admin/Line/CreateLine'),
    },
  },
  baseInfo: {
    provider: {
      getPartSize: (providerCode: string) => generatePath('BaseInfo', `Provider/GetPartSize?code=${providerCode}`),
    },
    plan: {
      getPlan: generatePath('BaseInfo', 'Plan/GetPlan'),
      buyPlan: (planId: string) => generatePath('BaseInfo', `Plan/BuyPlan?planId=${planId}`),
    },
    priceRate: {
      getPriceRate: generatePath('BaseInfo', 'PriceRate'),
    },
  },
  contact: {
    groupNumber: {
      addContactsFromExcel: (groupId: string) =>
        generatePath('Contact', `GroupNumber/AddContactsFromExcel?GroupId=${groupId}`),
      groupNumber: (groupId: string) => generatePath('Contact', `GetGroupNumberById/${groupId}`),
      getGroupNumbersByGroupId: generatePath('Contact', 'GroupNumber/GetGroupNumbersByGroupId'),
      getGroupNumbersByGroupIdParent: generatePath('Contact', 'Parent/GroupNumber/GetGroupNumbersByGroupId'),
      searchGroupNumberByNumberAndFirstNameAndLastName: (groupId: string, input: string) =>
        generatePath('Contact', `GroupNumber/SearchGroupNumberByNumberAndFirstNameAndLastName/${groupId}/${input}`),
      deleteGroupNumber: (groupNumberId: string) =>
        generatePath('Contact', `GroupNumber/DeleteGroupNumber?Id=${groupNumberId}`),
      deleteMultipleGroupNumbers: generatePath('Contact', 'GroupNumber/DeleteMultipleGroupNumbers'),
      deleteMultipleGroupNumbersParent: generatePath('Contact', 'Parent/GroupNumber/DeleteMultipleGroupNumbers'),
      createGroupNumber: generatePath('Contact', 'GroupNumber/CreateGroupNumber'),
      createMultipleGroupNumbers: generatePath('Contact', 'GroupNumber/CreateMultipleGroupNumbers'),
      removeDuplicatedGroupNumbersInAGroup: (groupId: string) =>
        generatePath('Contact', `GroupNumber/RemoveDuplicatedGroupNumbersInAGroup?id/${groupId}`),
      removeDuplicatedGroupNumbersParent: (groupId: string, userId: string) =>
        generatePath('Contact', `Parent/GroupNumber/RemoveDuplicatedGroupNumbersInAGroup/${groupId}/${userId}`),
      searchGroupNumbersInAllUserGroups: (search: string) =>
        generatePath(
          'Contact',
          `GroupNumber/SearchGroupNumbersInAllUserGroups?input=${search}&PageIndex=1&PageSize=30`
        ),
      editGroupNumber: generatePath('Contact', 'GroupNumber/UpdateGroupNumber'),
      createMultipleGroupNumbersParent: generatePath('Contact', 'Parent/GroupNumber/CreateMultipleGroupNumbers'),
      editGroupNumberParent: generatePath('Contact', 'Parent/GroupNumber'),
    },
    groupSettingsParent: {
      edit: generatePath('Contact', 'Parent/GroupSettings'),
      addAutoSetting: generatePath('Contact', 'Parent/GroupSettings/SetAutoRegister'),
      addCancelSetting: generatePath('Contact', 'Parent/GroupSettings/SetAutoRegisterCancel'),
      getByIdParent: generatePath('Contact', `Parent/GroupSettings/GetGroupSettingsById`),
    },
    group: {
      getAllGroup: generatePath('Contact', 'Group/GetAllGroups'),
      getGroupById: (Id: string) => generatePath('Contact', `Group?Id=${Id}`),
      createGroup: generatePath('Contact', 'Group'),
      editGroup: generatePath('Contact', 'Group'),
      deleteGroup: (groupId: string) => generatePath('Contact', `Group?Id=${groupId}`),
      serachGroupParent:(Name: string) => generatePath('Contact', `Parent/Group/SearchGroups?Name=${Name}`),
    
      getAllGroups: generatePath('Contact', 'Parent/Group/GetAllGroups'),
      deleteGroupParent: generatePath('Contact', 'Parent/Group'),
      editGroupsParent: generatePath('Contact', 'Parent/Group'),
      addGroupsParent: generatePath('Contact', 'Parent/Group'),
      assignGroupParenttoUser: generatePath('Contact', 'Parent/UserGroup'),
    },
    groupSetting: {
      getGroupSettingsById: (groupId: string) =>
        generatePath('Contact', `GroupSettings/GetGroupSettingsById/${groupId}`),
      editGroupSetting: generatePath('Contact', 'GroupSettings'),
    },
  },
  smsRequestManagement: {
    serviceAccessibilities: {
      getAllServiceAccessibilitiesOfASubUser: generatePath(
        'SMSRequestManagement',
        'Parent/ServiceAccessibilities/GetAllServiceAccessibilitiesOfAUser'
      ),
      editServiceAccessibilitiesParent: generatePath('SMSRequestManagement', 'Parent/ServiceAccessibilities'),
    },
    bulkSms: {
      searchBulkSms: generatePath('SMSRequestManagement', 'BulkSms/SearchBulkSms'),
      getBulkSmsReportById: generatePath('SMSRequestManagement', 'BulkSms/GetBulkSmsReportById'),
      sendBulkSms: generatePath('SMSRequestManagement', 'BulkSms/SendBulkSms'),
      cancelBulkSms: generatePath('SMSRequestManagement', 'BulkSms/CancelBulkSms'),
      getBulkSmsExecle: generatePath('SMSRequestManagement', 'BulkSms/GetSmsExcelReport'),
    },
    receptor: {
      searchReceptorByStatus: generatePath('SMSRequestManagement', 'Receptor/SearchReceptorByStatus'),
      searchReceptorByStatusParent: generatePath('SMSRequestManagement', 'Parent/Receptor/SearchReceptorByStatus'),
    },
    sms: {
      getSmsByIdParent: generatePath('SMSRequestManagement', `Parent/Sms/GetSmsById`),
      searchBulkSmsParent: generatePath('SMSRequestManagement', 'Parent/Sms/SearchBulkSms'),
      getBulkSmsReportByIdParent: (reportId: any, type: any) =>
        generatePath('SMSRequestManagement', `Parent/BulkSms/GetBulkSmsReportById?Id=${reportId}&IsPanel=${type}`),
      // getSmsById: (userId:any) => generatePath('SMSRequestManagement', `Admin/Sms/GetSmsById?Id=${userId}`),
      // getToBeConfirmedSms: generatePath('SMSRequestManagement', 'Admin/Sms/GetToBeConfirmedSms'),
      // getToBeConfirmedSmsCount: (type:any) =>
      //   generatePath('SMSRequestManagement', `Admin/Sms/GetToBeConfirmedSmsCount?Type=${type}`),
      // confirmSms: generatePath('SMSRequestManagement', 'Admin/Sms/ConfirmSms'),
      // confirmBulkSms: generatePath('SMSRequestManagement', 'Admin/Sms/ConfirmBulkSms'),
      searchSingleSms: generatePath('SMSRequestManagement', 'Parent/Sms/SearchSingleSms'),
      searchSingleSmsParent: generatePath('SMSRequestManagement', 'Parent/Sms/SearchSingleSms'),
      // searchSendSmsReport: (type:any) =>
      //   generatePath('SMSRequestManagement', `Admin/Sms/SearchSendSmsReport?Hours=${type}`),
      // getBulkSmsStatusReportById: (reportId:any, type:any) =>
      //   generatePath('SMSRequestManagement', `Admin/Sms/GetBulkSmsStatusReportById?Id=${reportId}&IsPanel=${type}`),
    },
    singleSms: {
      getSmsById: (smsId: string) => generatePath('SMSRequestManagement', `SingleSms/GetSmsById?Id=${smsId}`),
      sendFastSms: generatePath('SMSRequestManagement', 'SingleSms/SendSimpleSms'),
      cancelSingleSms: generatePath('SMSRequestManagement', 'SingleSms/CancelSingleSms'),
      searchSingleSms: generatePath('SMSRequestManagement', 'SingleSms/SearchSingleSms'),
      getSingleSmsExecle: generatePath('SMSRequestManagement', 'SingleSms/GetSmsExcelReport'),
    },
    webServiceLog: {
      searchWebServiceLogs: generatePath('SMSRequestManagement', 'WebServiceLog/SearchWebServiceLogs'),
      searchStatusUpdatesLogsParent: generatePath(
        'SMSRequestManagement',
        'Parent/WebServiceLog/SearchStatusUpdatesLogs'
      ),
    },
    otpTemplate: {
      getAllOtpTemplates: generatePath('SMSRequestManagement', 'OtpTemplate/GetAllOtpTemplates'),
      getOtpTemplateById: (templateId: string) =>
        generatePath('SMSRequestManagement', `OtpTemplate/GetOtpTemplateById?id=${templateId}`),
      createOtpTemplate: generatePath('SMSRequestManagement', 'OtpTemplate/CreateOtpTemplate'),
      editOtpTemplate: generatePath('SMSRequestManagement', 'OtpTemplate'),
      deleteOtpTemplate: (templateId: string) => generatePath('SMSRequestManagement', `OtpTemplate?Id=${templateId}`),
      createOtpTemplateParent: generatePath('SMSRequestManagement', 'Parent/OtpTemplate/CreateOtpTemplate'),
    },
  },
  notification: {
    group: {
      getAllGroups: generatePath('Notification', 'Parent/Group/GetAllGroups'),
      // addGroup: generatePath('Notification', 'Admin/Group/CreateGroup'),
      // editGroup: generatePath('Notification', 'Admin/Group/UpdateGroup'),
      // deleteGroup: generatePath('Notification', 'Admin/Group/DeleteGroup'),
    },
    message: {
      getMessage: generatePath('Notification', 'Message/GetMessages'),
    },
  },
  receive: {
    receivedSms: {
      searchReceivedSmses: generatePath('Receive', 'ReceivedSms/SearchReceivedSmses'),
      searchUrlForwardLogs: generatePath('Receive', 'ReceivedSms/SearchUrlForwardLogs'),
      searchUrlForwardLogsParent: generatePath('Receive', 'Parent/ReceivedSms/SearchUrlForwardLogs'),
      searchReceivedSmsesParent: generatePath('Receive', 'Parent/ReceivedSms/SearchReceivedSmses'),
    },
  },
  authentication: {
    authentication: {
      checkMobileWithNationalCode: generatePath('Authentication', 'Authentication/CheckMobileWithNationalCode'),
      
      getAuthenticationInfo: generatePath('Authentication', 'Authentication/GetAuthenticationInfo'),
      getAuthenticationStage: generatePath('Authentication', 'Authentication/GetAuthenticationStage'),
      downloadAuthFile: (fileType: string) =>
        generatePath('Authentication', `Authentication/DownloadAuthFile?FileOrigin=${fileType}`),
      uploadNationalCardPicture: generatePath('Authentication', 'Authentication/UploadNationalCardPicture'),
      createUpdateAuthenticationInfo: generatePath('Authentication', 'Authentication/CreateOrUpdateAuthenticationInfo'),
      uploadStatementVideo: generatePath('Authentication', 'Authentication/UploadStatementVideo'),
      updateAuthenticationInfo: generatePath('Authentication', 'Authentication/UpdateAuthenticationInfo'),
      authenticationInfoWithSms: generatePath('Authentication', 'Authentication/AuthenticationInfoWithSms'),
      getAuthenticatinStage: generatePath('Authentication', 'Authentication/GetAuthenticationStage'),
    },
  },
  buyModule: {
    getAllModule: generatePath('Users', 'SubService/GetAll'),

    buyModule: generatePath('Users', 'SubService/BuySubService'),
  },
};
