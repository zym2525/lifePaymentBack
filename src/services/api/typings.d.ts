declare namespace API {
  interface RequestConfig {
    [key: string]: any;
  }

  interface AccessRefreshToken {
    refreshToken?: string;
    clientId?: string;
  }

  interface AccessRequestDto {
    clientId?: string;
    userName?: string;
    userPassword?: string;
    scope?: string;
  }

  interface ActionApiDescriptionModel {
    uniqueName?: string;
    name?: string;
    httpMethod?: string;
    url?: string;
    supportedVersions?: string[];
    parametersOnMethod?: MethodParameterApiDescriptionModel[];
    parameters?: ParameterApiDescriptionModel[];
    returnValue?: ReturnValueApiDescriptionModel;
    allowAnonymous?: boolean;
    implementFrom?: string;
  }

  interface AddUpdateUserAccountInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    id?: string;
    /** 用户编号 */
    userId?: string;
    lifePayType?: LifePayOrderTypeEnum;
    /** 运营商 */
    operators: string;
    /** 手机号/户号 */
    content?: string;
    /** 省 */
    province?: string;
    /** 市 */
    city?: string;
    /** 拓展字段（电费类型） */
    extraProperties?: string;
    /** 备注 */
    remark?: string;
  }

  interface AllSubModule {
    pageButton?: ModuleButtonDto[];
    dataButton?: ModuleButtonDto[];
    column?: ModuleColumnDto[];
  }

  interface APIaddOrEditModuleStatusParams {
    id?: string;
    isMenu?: number;
    enabledMark?: number;
    isCache?: boolean;
  }

  interface APIapiDefinitionParams {
    includeTypes?: boolean;
  }

  interface APIcreateParams {
    systemEmail: string;
    systemPassword: string;
    versionId?: string;
    systemUserName: string;
    systemName: string;
    name: string;
    extraProperties?: Record<string, any>;
  }

  interface APIdeleteBackClientUserParams {
    /** 用户Id */
    id?: string;
  }

  interface APIdeleteDefaultConnectionStringParams {
    id?: string;
  }

  interface APIdeleteModuleButtonParams {
    id?: string;
  }

  interface APIdeleteModuleColumnParams {
    id?: string;
  }

  interface APIdeleteModuleParams {
    id?: string;
  }

  interface APIdeleteRoleParams {
    id?: string;
  }

  interface APIdeleteRoleParams {
    /** 角色Id */
    id?: string;
  }

  interface APIdeleteTenantParams {
    id?: string;
  }

  interface APIdeleteUserAccountParams {
    id?: string;
  }

  interface APIdeleteUserParams {
    id?: string;
  }

  interface APIdetailParams {
    id?: string;
  }

  interface APIfindByEmailParams {
    email?: string;
  }

  interface APIfindByIdParams {
    id?: string;
  }

  interface APIfindByUsernameParams {
    userName?: string;
  }

  interface APIfindByUserNameParams {
    userName?: string;
  }

  interface APIforbiddenRoleParams {
    roleName?: string;
    permissionName?: string;
  }

  interface APIforbiddenUserParams {
    userId?: string;
    permissionName?: string;
  }

  interface APIgetAllSubModuleParams {
    moduleId?: string;
  }

  interface APIgetCountParams {
    filter?: string;
  }

  interface APIgetCurrentSubModuleListParams {
    moduleId?: string;
  }

  interface APIgetDefaultConnectionStringParams {
    id?: string;
  }

  interface APIgetFirstCurrentUserModuleListCacheByModuleIdParams {
    moduleId?: string;
  }

  interface APIgetLifePayChannlesDtoParams {
    id?: string;
  }

  interface APIgetLifePayWxIndentityParams {
    /** 用户登录凭证 */
    code?: string;
  }

  interface APIgetListParams {
    filter?: string;
    clientId?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
  }

  interface APIgetListParams {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
  }

  interface APIgetParams {
    providerName?: string;
    providerKey?: string;
  }

  interface APIgetParams {
    id?: string;
  }

  interface APIgetParams {
    id?: string;
  }

  interface APIgetParams {
    providerName?: string;
    providerKey?: string;
  }

  interface APIgetParams {
    id?: string;
  }

  interface APIgetRolesIdRolesParams {
    id: string;
  }

  interface APIgetUserAccountDetailParams {
    id?: string;
  }

  interface APIgetUserLifePayOrderDetailParams {
    orderNo?: string;
  }

  interface APIgetUserLifePayOrderRefundParams {
    id?: string;
  }

  interface APIgetUserListByPhoneNumberParams {
    phoneNumber?: string;
    clientId?: string;
  }

  interface APIgetUserOrRoleModuleListParams {
    id?: string;
    objectType?: number;
  }

  interface APIgetUserOrRoleSubModuleListParams {
    id?: string;
    objectType?: number;
  }

  interface APIgetVersionModuleListParams {
    versionId?: string;
  }

  interface APIgetVersionSubModuleParams {
    versionId?: string;
  }

  interface APIsearchParams {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
  }

  interface APIsetForRoleParams {
    roleName?: string;
    permissionName?: string;
  }

  interface APIsetForUserParams {
    userId?: string;
    permissionName?: string;
  }

  interface APIsetLifePayChannelsStatusParams {
    id?: string;
    status?: LifePayChannelsStatsEnum;
  }

  interface APItestAliRechargeNotifyParams {
    outTradeNo?: string;
    tradeNo?: string;
    success?: boolean;
  }

  interface APIupdateDefaultConnectionStringParams {
    id?: string;
    defaultConnectionString?: string;
  }

  interface APIupdateParams {
    providerName?: string;
    providerKey?: string;
  }

  interface APIupdateParams {
    id?: string;
  }

  interface APIupdateParams {
    id?: string;
  }

  interface APIupdateParams {
    providerName?: string;
    providerKey?: string;
  }

  interface APIupdateParams {
    id?: string;
    name: string;
    extraProperties?: Record<string, any>;
  }

  interface APIupdateRolesParams {
    id?: string;
  }

  interface ApplicationApiDescriptionModel {
    modules?: Record<string, any>;
    types?: Record<string, any>;
  }

  interface ApplicationAuthConfigurationDto {
    policies?: Record<string, any>;
    grantedPolicies?: Record<string, any>;
  }

  interface ApplicationConfigurationDto {
    localization?: ApplicationLocalizationConfigurationDto;
    auth?: ApplicationAuthConfigurationDto;
    setting?: ApplicationSettingConfigurationDto;
    currentUser?: CurrentUserDto;
    features?: ApplicationFeatureConfigurationDto;
    multiTenancy?: MultiTenancyInfoDto;
    currentTenant?: CurrentTenantDto;
    timing?: TimingDto;
    clock?: ClockDto;
    objectExtensions?: ObjectExtensionsDto;
  }

  interface ApplicationFeatureConfigurationDto {
    values?: Record<string, any>;
  }

  interface ApplicationLocalizationConfigurationDto {
    values?: Record<string, any>;
    languages?: LanguageInfo[];
    currentCulture?: CurrentCultureDto;
    defaultResourceName?: string;
    languagesMap?: Record<string, any>;
    languageFilesMap?: Record<string, any>;
  }

  interface ApplicationSettingConfigurationDto {
    values?: Record<string, any>;
  }

  interface AreaDto {
    /** 编码 */
    areaCode?: number;
    /** 父级编码 */
    parentCode?: number;
    /** 名称 */
    areaName?: string;
    /** 1省 2市 3区 4镇 */
    layer?: number;
    /** 排序 */
    sort?: number;
  }

  interface AreaInfo {
    areaCode?: number;
    parentId?: number;
    areaName?: string;
    /** 1省 2市 3区 4镇 */
    layer?: number;
    sort?: number;
    children?: AreaInfo[];
    /** 简易拼音 */
    simpleSpelling?: string;
    /** 快速检索 */
    quickQuery?: string;
  }

  interface BaseAuthorizeDto {
    moduleType?: number;
    moduleId?: string;
    objectType?: number;
    objectId?: string;
    addOrDelete?: number;
  }

  interface BaseAuthorizeInput {
    moduleTypeInfo?: ModuleTypeInfo[];
    objectType?: number;
    objectId?: string;
  }

  interface ChangePasswordInput {
    currentPassword?: string;
    newPassword: string;
  }

  interface ChangeSortInput {
    id1?: string;
    sortCode1?: number;
    id2?: string;
    sortCode2?: number;
    type?: number;
  }

  interface ChannelsBaseInput {
    pageModel?: Pagination;
    checkChannelId?: string;
  }

  interface CheckLoginVerificationCodeInput {
    messageType?: string;
    phoneNumber: string;
    verificationCode?: string;
  }

  interface ClockDto {
    kind?: string;
  }

  interface ControllerApiDescriptionModel {
    controllerName?: string;
    controllerGroupName?: string;
    type?: string;
    interfaces?: ControllerInterfaceApiDescriptionModel[];
    actions?: Record<string, any>;
  }

  interface ControllerInterfaceApiDescriptionModel {
    type?: string;
  }

  interface CreateBackClientUserInput {
    /** 名称 */
    name?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 账户 */
    userName?: string;
    remark?: string;
    /** 角色 */
    roleNames?: string[];
    /** 组织架构公司id */
    companyOrgId?: string;
    /** 组织架构部门id */
    departmentOrgId?: string;
  }

  interface CreateBaseRoleInput {
    /** 名称 */
    name?: string;
    /** 排序 */
    sequence?: number;
    /** 部门Id */
    departmentId?: number;
    /** 数据范围 全部数据100 个人数据 10 */
    dataRange?: number;
    /** 备注 */
    remark?: string;
  }

  interface CreateEditPayChannelsInput {
    id?: string;
    channlesName?: string;
    channlesNum?: string;
    channlesRate?: number;
    switchType?: LifePaySwitchTypeEnum;
    status?: LifePayChannelsStatsEnum;
    channlesType?: LifePayChannlesTypeEnum;
  }

  interface CreateEditPayChannelsInputPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: CreateEditPayChannelsInput[];
  }

  interface CreateLifePayOrderOutput {
    orderNo?: string;
  }

  interface CreateOrUpdateRoleInput {
    /** 名称 */
    name?: string;
    /** 排序 */
    sequence?: number;
    /** 部门Id */
    departmentId?: number;
    /** 数据范围 全部数据100 个人数据 10 */
    dataRange?: number;
    /** 备注 */
    remark?: string;
    /** 角色Id */
    id?: string;
  }

  interface CurrentCultureDto {
    displayName?: string;
    englishName?: string;
    threeLetterIsoLanguageName?: string;
    twoLetterIsoLanguageName?: string;
    isRightToLeft?: boolean;
    cultureName?: string;
    name?: string;
    nativeName?: string;
    dateTimeFormat?: DateTimeFormatDto;
  }

  interface CurrentTenantDto {
    id?: string;
    name?: string;
    isAvailable?: boolean;
  }

  interface CurrentUserDto {
    isAuthenticated?: boolean;
    id?: string;
    tenantId?: string;
    impersonatorUserId?: string;
    impersonatorTenantId?: string;
    impersonatorUserName?: string;
    impersonatorTenantName?: string;
    userName?: string;
    name?: string;
    surName?: string;
    email?: string;
    emailVerified?: boolean;
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
    roles?: string[];
  }

  interface DateTimeFormatDto {
    calendarAlgorithmType?: string;
    dateTimeFormatLong?: string;
    shortDatePattern?: string;
    fullDateTimePattern?: string;
    dateSeparator?: string;
    shortTimePattern?: string;
    longTimePattern?: string;
  }

  interface ElectricParValueOutput {
    electricType?: string;
    areaName?: string;
    parValue?: string[];
    rate?: number;
    comments?: string;
  }

  interface ElectricParValueResponse {
    success?: boolean;
    requestNo?: string;
    partnerId?: string;
    service?: string;
    version?: string;
    protocol?: string;
    context?: string;
    ext?: any;
    code?: string;
    message?: string;
    detail?: string;
    electricParValue?: ElectricParValueOutput[];
  }

  interface ElectricSupportAreaChildCityListOutput {
    cityName?: string;
    cityParentId?: string;
    cityId?: string;
  }

  interface ElectricSupportAreaListOutput {
    childCityList?: ElectricSupportAreaChildCityListOutput[];
    cityName?: string;
    cityParentId?: string;
    cityId?: string;
    electricType?: string;
    parValue?: string[];
    rate?: number;
  }

  interface ElectricSupportAreaResponse {
    success?: boolean;
    requestNo?: string;
    partnerId?: string;
    service?: string;
    version?: string;
    protocol?: string;
    context?: string;
    ext?: any;
    code?: string;
    message?: string;
    detail?: string;
    electricAreaList?: ElectricSupportAreaListOutput[];
  }

  interface EntityExtensionDto {
    properties?: Record<string, any>;
    configuration?: Record<string, any>;
  }

  interface ExtensionEnumDto {
    fields?: ExtensionEnumFieldDto[];
    localizationResource?: string;
  }

  interface ExtensionEnumFieldDto {
    name?: string;
    value?: any;
  }

  interface ExtensionPropertyApiCreateDto {
    isAvailable?: boolean;
  }

  interface ExtensionPropertyApiDto {
    onGet?: ExtensionPropertyApiGetDto;
    onCreate?: ExtensionPropertyApiCreateDto;
    onUpdate?: ExtensionPropertyApiUpdateDto;
  }

  interface ExtensionPropertyApiGetDto {
    isAvailable?: boolean;
  }

  interface ExtensionPropertyApiUpdateDto {
    isAvailable?: boolean;
  }

  interface ExtensionPropertyAttributeDto {
    typeSimple?: string;
    config?: Record<string, any>;
  }

  interface ExtensionPropertyDto {
    type?: string;
    typeSimple?: string;
    displayName?: LocalizableStringDto;
    api?: ExtensionPropertyApiDto;
    ui?: ExtensionPropertyUiDto;
    attributes?: ExtensionPropertyAttributeDto[];
    configuration?: Record<string, any>;
    defaultValue?: any;
  }

  interface ExtensionPropertyUiDto {
    onTable?: ExtensionPropertyUiTableDto;
    onCreateForm?: ExtensionPropertyUiFormDto;
    onEditForm?: ExtensionPropertyUiFormDto;
    lookup?: ExtensionPropertyUiLookupDto;
  }

  interface ExtensionPropertyUiFormDto {
    isVisible?: boolean;
  }

  interface ExtensionPropertyUiLookupDto {
    url?: string;
    resultListPropertyName?: string;
    displayPropertyName?: string;
    valuePropertyName?: string;
    filterParamName?: string;
  }

  interface ExtensionPropertyUiTableDto {
    isVisible?: boolean;
  }

  interface FeatureDto {
    name?: string;
    displayName?: string;
    value?: string;
    provider?: FeatureProviderDto;
    description?: string;
    valueType?: IStringValueType;
    depth?: number;
    parentName?: string;
  }

  interface FeatureGroupDto {
    name?: string;
    displayName?: string;
    features?: FeatureDto[];
  }

  interface FeatureProviderDto {
    name?: string;
    key?: string;
  }

  interface GasOrgTypeValueResponse {
    success?: boolean;
    requestNo?: string;
    partnerId?: string;
    service?: string;
    version?: string;
    protocol?: string;
    context?: string;
    ext?: any;
    code?: string;
    message?: string;
    detail?: string;
    gasSupportMerchantInfos?: GasSupportMerchantInfos[];
  }

  interface GasParValueOutput {
    gasOrgName?: string;
    gasOrgCode?: string;
    parValue?: string[];
    rate?: number;
    comments?: string;
  }

  interface GasParValueResponse {
    success?: boolean;
    requestNo?: string;
    partnerId?: string;
    service?: string;
    version?: string;
    protocol?: string;
    context?: string;
    ext?: any;
    code?: string;
    message?: string;
    detail?: string;
    gasParValue?: GasParValueOutput[];
  }

  interface GasSupportMerchantInfos {
    gasOrgTypeCode?: string;
    gasOrgTypeName?: string;
  }

  interface GetAreaListInput {
    /** 1省 2市 3区 4镇 */
    layer?: number;
    /** 父级编码 */
    parentCode?: number;
  }

  interface GetBackClientUsersInput {
    pageModel?: Pagination;
    /** 账户是否锁住（是否禁用） */
    isLocked?: boolean;
    /** 查询条件：名称/账号 */
    queryCondition?: string;
  }

  interface GetFeatureListResultDto {
    groups?: FeatureGroupDto[];
  }

  interface GetPayOrderForJsAPIInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    orderNo: string;
    lifePayType?: LifePayTypeEnum;
    openId?: string;
    attach?: string;
    payAppId?: string;
  }

  interface GetPayStatusByOrderNoInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    orderNo?: string;
  }

  interface GetPermissionListResultDto {
    entityDisplayName?: string;
    groups?: PermissionGroupDto[];
  }

  interface GetRolesInput {
    pageModel?: Pagination;
    /** 查询条件：角色名称 */
    queryCondition?: string;
  }

  interface IanaTimeZone {
    timeZoneName?: string;
  }

  interface IdentityModelTokenCacheItem {
    accessToken?: string;
    expiresIn?: number;
    creationTime?: string;
    refreshToken?: string;
  }

  interface IdentityRoleCreateDto {
    extraProperties?: Record<string, any>;
    name: string;
    isDefault?: boolean;
    isPublic?: boolean;
    sequence?: number;
    note?: string;
    roleType?: number;
    isLeader?: boolean;
  }

  interface IdentityRoleDto {
    extraProperties?: Record<string, any>;
    id?: string;
    name?: string;
    isDefault?: boolean;
    isStatic?: boolean;
    isPublic?: boolean;
    concurrencyStamp?: string;
    sequence?: number;
    isEnable?: boolean;
    note?: string;
    roleType?: number;
  }

  interface IdentityRoleDtoListResultDto {
    items?: IdentityRoleDto[];
  }

  interface IdentityRoleDtoPagedResultDto {
    items?: IdentityRoleDto[];
    totalCount?: number;
  }

  interface IdentityRoleListInput {
    pageModel?: Pagination;
    name?: string;
    type?: number;
    roleIds?: string[];
  }

  interface IdentityRoleUpdateDto {
    extraProperties?: Record<string, any>;
    name: string;
    isDefault?: boolean;
    isPublic?: boolean;
    concurrencyStamp?: string;
    sequence?: number;
    isEnable?: boolean;
    roleType?: number;
    isLeader?: boolean;
    note?: string;
    isSetEnable?: boolean;
  }

  interface IdentityUserCreateDto {
    extraProperties?: Record<string, any>;
    userName: string;
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    lockoutEnabled?: boolean;
    sex?: number;
    roleNames?: string[];
    password?: string;
    versionId?: string;
    clientId?: string;
  }

  interface IdentityUserDto {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    tenantId?: string;
    userName?: string;
    name?: string;
    surname?: string;
    email?: string;
    sex?: number;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    lockoutEnabled?: boolean;
    lockoutEnd?: string;
    concurrencyStamp?: string;
    clientId?: string;
    roles?: IdentityRoleDto[];
  }

  interface IdentityUserDtoPagedResultDto {
    items?: IdentityUserDto[];
    totalCount?: number;
  }

  interface IdentityUserDtoPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: IdentityUserDto[];
  }

  interface IdentityUserUpdateDto {
    extraProperties?: Record<string, any>;
    userName: string;
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    lockoutEnabled?: boolean;
    sex?: number;
    roleNames?: string[];
    password?: string;
    concurrencyStamp?: string;
  }

  interface IdentityUserUpdateRolesDto {
    roleNames: string[];
  }

  interface IStringValueType {
    name?: string;
    properties?: Record<string, any>;
    validator?: IValueValidator;
  }

  interface IValueValidator {
    name?: string;
    properties?: Record<string, any>;
  }

  interface KeyInput {
    id?: string;
  }

  interface KeyPageInput {
    pageModel?: Pagination;
    id?: string;
  }

  interface LanguageInfo {
    cultureName?: string;
    uiCultureName?: string;
    displayName?: string;
    flagIcon?: string;
  }

  interface LifeElectricData {
    /** 充值面额，单位为元。 */
    parValue: number;
    /** 电网类型，例如："guowang"代表国家电网，"nanwang"代表南方电网。 */
    electricType: string;
    /** 电费类型，国网必传：住宅、企事业、店铺三个选项。 */
    electricAccountType: string;
    /** 电费户号。 */
    electricAccount: string;
    /** 省份。 */
    province: string;
    /** 城市。 */
    city?: string;
    /** 客户身份证后6位，南网必传。 */
    sixID?: string;
  }

  interface LifeElectricDataCreateLifePayOrderInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    userId?: string;
    /** 渠道名称 */
    channelId?: string;
    productData?: LifeElectricData;
  }

  interface LifeGasData {
    /** 充值面额，单位为元。 */
    parValue: number;
    /** 天然气公司类型，"zhong_ran"代表中燃燃气，"bei_jing"代表北京燃气。 */
    gasOrgType: string;
    /** 燃气户号 */
    gasAccount: string;
    /** 省份 */
    province: string;
    /** 城市 */
    city?: string;
  }

  interface LifeGasDataCreateLifePayOrderInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    userId?: string;
    /** 渠道名称 */
    channelId?: string;
    productData?: LifeGasData;
  }

  type LifePayChannelsStatsEnum = 10 | 20;

  type LifePayChannlesTypeEnum = 10 | 20;

  interface LifePayOrderListOutput {
    id?: string;
    userId?: string;
    /** 用户手机号 */
    phoneNumber?: string;
    lifePayType?: LifePayTypeEnum;
    /** 渠道名称 */
    channelName?: string;
    lifePayOrderType?: LifePayOrderTypeEnum;
    /** 订单号 */
    orderNo?: string;
    /** 充值金额 */
    rechargeAmount?: number;
    /** 优惠金额 */
    discountAmount?: number;
    /** 实付金额 */
    payAmount?: number;
    /** 支付时间 */
    payTime?: string;
    payStatus?: LifePayStatusEnum;
    /** 外部订单号 */
    outOrderNo?: string;
    lifePayOrderStatus?: LifePayOrderStatusEnum;
    /** 完成时间 */
    finishTime?: string;
    /** 退款凭证 */
    refundCredentialsImgUrl?: string;
    /** 下单时间 */
    creationTime?: string;
    /** 退款时间 */
    refundTime?: string;
    refundApplyRemark?: string;
    refundCheckRemark?: string;
    acoolyOrderNo?: string;
  }

  interface LifePayOrderListOutputPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: LifePayOrderListOutput[];
  }

  type LifePayOrderStatusEnum = 10 | 20 | 30 | 40 | 50 | 60;

  type LifePayOrderTypeEnum = 10 | 20 | 30;

  interface LifePayPhoneMesssageCodeLoginInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    /** 手机号 */
    phoneNumber: string;
  }

  interface LifePayRateInput {
    rateType?: LifePayRateTypeEnum;
    rate?: number;
    id?: string;
  }

  interface LifePayRateListOutput {
    rateType?: LifePayRateTypeEnum;
    rate?: number;
    id?: string;
  }

  type LifePayRateTypeEnum = 10 | 20 | 30 | 40;

  type LifePayStatusEnum = 10 | 20 | 30 | 40;

  type LifePaySwitchTypeEnum = 10 | 20 | 30;

  type LifePayTypeEnum = 10 | 20;

  interface LifePhoneData {
    /** 运营商编码，例如："yidong", "dianxin", "liantong"。 */
    ispCode: string;
    /** 充值面额，单位为元。测试账户：parValue=100:缴费成功，parValue>100：缴费失败。 */
    parValue: number;
    /** 手机号。 */
    phone: string;
    /** 机主名称(电信手机号必填) */
    name?: string;
  }

  interface LifePhoneDataCreateLifePayOrderInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    userId?: string;
    /** 渠道名称 */
    channelId?: string;
    productData?: LifePhoneData;
  }

  interface LocalizableStringDto {
    name?: string;
    resource?: string;
  }

  interface MethodParameterApiDescriptionModel {
    name?: string;
    typeAsString?: string;
    type?: string;
    typeSimple?: string;
    isOptional?: boolean;
    defaultValue?: any;
  }

  interface ModelPaymentMiniPay {
    nonceStr?: string;
    package?: string;
    signType?: string;
    paySign?: string;
    timestamp?: string;
    timeExpire?: string;
    message?: string;
  }

  interface ModuleApiDescriptionModel {
    rootPath?: string;
    remoteServiceName?: string;
    controllers?: Record<string, any>;
  }

  interface ModuleButtonDto {
    id?: string;
    moduleId?: string;
    parentId?: string;
    icon?: string;
    enCode?: string;
    name?: string;
    actionAddress?: string;
    sortCode?: number;
    buttonType?: number;
    hasCheck?: boolean;
  }

  interface ModuleColumnDto {
    id?: string;
    moduleId?: string;
    parentId?: string;
    enCode?: string;
    name?: string;
    sortCode?: number;
    description?: string;
    width?: number;
    hasCheck?: boolean;
    apiName?: string;
    isShow?: boolean;
    realColumn?: string;
  }

  interface ModuleDto {
    id?: string;
    description?: string;
    sortCode?: number;
    enabledMark?: number;
    parentId?: string;
    name?: string;
    isCache?: boolean;
    path?: string;
    viewAddress?: string;
    levelNum?: number;
    enCode?: string;
    icon?: string;
    hasCheck?: boolean;
    isMenu?: number;
    parentModuleName?: string;
  }

  interface ModuleExtensionDto {
    entities?: Record<string, any>;
    configuration?: Record<string, any>;
  }

  interface ModuleTypeInfo {
    moduleType?: number;
    moduleId?: string;
  }

  interface MultiTenancyInfoDto {
    isEnabled?: boolean;
  }

  interface MyModuleDto {
    id?: string;
    description?: string;
    sortCode?: number;
    enabledMark?: number;
    parentId?: string;
    name?: string;
    isCache?: boolean;
    path?: string;
    viewAddress?: string;
    levelNum?: number;
    enCode?: string;
    icon?: string;
    hasCheck?: boolean;
    isMenu?: number;
    parentModuleName?: string;
    sequence?: number;
  }

  interface NameValue {
    name?: string;
    value?: string;
  }

  interface ObjectExtensionsDto {
    modules?: Record<string, any>;
    enums?: Record<string, any>;
  }

  interface OrderInput {
    property?: string;
    order?: OrderTypeEnum;
  }

  type OrderTypeEnum = 0 | 1;

  interface OssSTSReponse {
    expiration?: string;
    ossAccessSecret?: string;
    ossAccessKeyId?: string;
    securityToken?: string;
    requestId?: string;
  }

  interface PageInput {
    pageModel?: Pagination;
  }

  interface PageUserInput {
    pageModel?: Pagination;
    key?: string;
    roleType?: string;
  }

  interface Pagination {
    rows?: number;
    page?: number;
    orderInput?: OrderInput[];
    totalCount?: number;
    totalPage?: number;
  }

  interface ParameterApiDescriptionModel {
    nameOnMethod?: string;
    name?: string;
    jsonName?: string;
    type?: string;
    typeSimple?: string;
    isOptional?: boolean;
    defaultValue?: any;
    constraintTypes?: string[];
    bindingSourceId?: string;
    descriptorName?: string;
  }

  interface PermissionGrantInfoDto {
    name?: string;
    displayName?: string;
    parentName?: string;
    isGranted?: boolean;
    allowedProviders?: string[];
    grantedProviders?: ProviderInfoDto[];
  }

  interface PermissionGroupDto {
    name?: string;
    displayName?: string;
    permissions?: PermissionGrantInfoDto[];
  }

  interface PhoneParValueOutput {
    ispCode?: string;
    ispName?: string;
    parValue?: string[];
    rate?: number;
    phoneSection?: string;
    comments?: string;
  }

  interface PhoneParValueResponse {
    success?: boolean;
    requestNo?: string;
    partnerId?: string;
    service?: string;
    version?: string;
    protocol?: string;
    context?: string;
    ext?: any;
    code?: string;
    message?: string;
    detail?: string;
    phoneParValue?: PhoneParValueOutput[];
  }

  interface PhoneToken {
    phone?: string;
    phoneCode?: string;
    clientId?: string;
  }

  interface ProfileDto {
    extraProperties?: Record<string, any>;
    userName?: string;
    email?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    isExternal?: boolean;
    hasPassword?: boolean;
  }

  interface PropertyApiDescriptionModel {
    name?: string;
    jsonName?: string;
    type?: string;
    typeSimple?: string;
    isRequired?: boolean;
  }

  interface ProviderInfoDto {
    providerName?: string;
    providerKey?: string;
  }

  interface QueryLifePayOrderListInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    lifePayOrderType?: LifePayOrderTypeEnum;
    lifePayType?: LifePayTypeEnum;
    /** 开始支付时间 */
    beginPayTime?: string;
    /** 结束支付时间 */
    endPayTime?: string;
    payStatus?: LifePayStatusEnum;
    lifePayOrderStatus?: LifePayOrderStatusEnum;
    /** 开始完成时间 */
    beginFinishTime?: string;
    /** 结束完成时间 */
    endFinishTime?: string;
    /** 用户Id */
    userId?: string;
    /** 搜索关键词 */
    keyWords?: string;
  }

  interface QueryUserAccountAllListInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    /** 用户Id */
    userId?: string;
    lifePayOrderType?: LifePayOrderTypeEnum;
  }

  interface QueryUserAccountListInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    /** 用户Id */
    userId?: string;
    lifePayOrderType?: LifePayOrderTypeEnum;
  }

  interface RefundLifePayOrderInput {
    id?: string;
    refundCredentialsImgUrl?: string;
    refundCheckRemark?: string;
  }

  interface RefundUserLifePayOrderInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    id?: string;
    /** 用户Id */
    userId?: string;
    refundApplyRemark?: string;
  }

  interface RegisterDto {
    extraProperties?: Record<string, any>;
    userName: string;
    emailAddress: string;
    sex?: number;
    password: string;
    appName: string;
  }

  interface RemoteServiceErrorInfo {
    code?: string;
    message?: string;
    details?: string;
    data?: Record<string, any>;
    validationErrors?: RemoteServiceValidationErrorInfo[];
  }

  interface RemoteServiceErrorResponse {
    error?: RemoteServiceErrorInfo;
  }

  interface RemoteServiceValidationErrorInfo {
    message?: string;
    members?: string[];
  }

  interface ResetPasswordDto {
    userId?: string;
    resetToken: string;
    password: string;
  }

  interface ResetPassWordInput {
    userId?: string;
    name?: string;
    userName?: string;
    phoneNumber?: string;
    password?: string;
  }

  interface Resource {
    algorithm: string;
    ciphertext: string;
    associatedData?: string;
    originalType: string;
    nonce: string;
  }

  interface ReturnValueApiDescriptionModel {
    type?: string;
    typeSimple?: string;
  }

  interface RoleDto {
    /** 角色Id */
    id?: string;
    /** 角色名 */
    name?: string;
  }

  interface RoleEnableOrForbidInput {
    /** 角色Id */
    id?: string;
    /** 启用：true，禁用：false */
    isEnable?: boolean;
  }

  interface RoleInfo {
    /** 角色Id */
    id?: string;
    /** 名称 */
    name?: string;
    /** 排序 */
    sequence?: number;
    /** 是否可用 */
    isEnable?: boolean;
    /** 部门Id */
    departmentId?: number;
    /** 数据范围 全部数据：100   个人数据：10 */
    dataRange?: number;
    /** 账号数量 */
    userCount?: number;
    /** 备注 */
    remark?: string;
  }

  interface RoleInfoPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: RoleInfo[];
  }

  interface SendPasswordResetCodeDto {
    email: string;
    appName: string;
    returnUrl?: string;
    returnUrlHash?: string;
  }

  interface SendPhoneMessageBaseInput {
    messageType?: string;
    phoneNumber: string;
  }

  interface SetLifePayOrderPayTypeInput {
    pageModel?: Pagination;
    checkChannelId?: string;
    orderNo: string;
    lifePayType?: LifePayTypeEnum;
    h5Type?: string;
    openId?: string;
    attach?: string;
  }

  interface SetMyModule {
    moduleId?: string;
    sequence?: number;
  }

  interface SetMyModuleInput {
    moduleIds?: SetMyModule[];
  }

  interface SetRoleUserInput {
    userId?: string[];
    roleId?: string;
  }

  interface SetUserRoleInput {
    userId?: string;
    roleName?: string[];
    extendId?: string;
    type?: number;
  }

  interface SetVersionModuleInput {
    versionId: string;
    modules: ModuleTypeInfo[];
  }

  interface TenantDto {
    extraProperties?: Record<string, any>;
    id?: string;
    name?: string;
  }

  interface TenantDtoPagedResultDto {
    items?: TenantDto[];
    totalCount?: number;
  }

  interface TimeZone {
    iana?: IanaTimeZone;
    windows?: WindowsTimeZone;
  }

  interface TimingDto {
    timeZone?: TimeZone;
  }

  interface TypeApiDescriptionModel {
    baseType?: string;
    isEnum?: boolean;
    enumNames?: string[];
    enumValues?: any[];
    genericArguments?: string[];
    properties?: PropertyApiDescriptionModel[];
  }

  interface UpdateBackClientUserInput {
    /** 名称 */
    name?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 账户 */
    userName?: string;
    remark?: string;
    /** 角色 */
    roleNames?: string[];
    /** 组织架构公司id */
    companyOrgId?: string;
    /** 组织架构部门id */
    departmentOrgId?: string;
    /** 用户Id */
    id?: string;
  }

  interface UpdateFeatureDto {
    name?: string;
    value?: string;
  }

  interface UpdateFeaturesDto {
    features?: UpdateFeatureDto[];
  }

  interface UpdatePassWordInput {
    id?: string;
    passWord?: string;
    code?: string;
  }

  interface UpdatePassWordInputWithNoCode {
    id?: string;
    passWord?: string;
  }

  interface UpdatePermissionDto {
    name?: string;
    isGranted?: boolean;
  }

  interface UpdatePermissionsDto {
    permissions?: UpdatePermissionDto[];
  }

  interface UpdateProfileDto {
    extraProperties?: Record<string, any>;
    userName?: string;
    email?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
  }

  interface UserAccountOutput {
    id?: string;
    lifePayType?: LifePayOrderTypeEnum;
    /** 运营商 */
    operators?: string;
    /** 手机号/户号 */
    content?: string;
    /** 省 */
    province?: string;
    /** 市 */
    city?: string;
    /** 拓展字段（电费类型） */
    extraProperties?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    creationTime?: string;
    isDeleted?: boolean;
  }

  interface UserAccountOutputPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: UserAccountOutput[];
  }

  interface UserData {
    id?: string;
    tenantId?: string;
    userName?: string;
    name?: string;
    surname?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    sex?: number;
    clientId?: string;
    creationTime?: string;
    lockoutEnd?: string;
    extraProperties?: Record<string, any>;
    lockoutEnabled?: boolean;
  }

  interface UserDataListResultDto {
    items?: UserData[];
  }

  interface UserDto {
    /** 用户Id */
    id?: string;
    /** 登录用户名（账号） */
    userName?: string;
    /** 名称 */
    name?: string;
    /** 用户手机号 */
    phoneNumber?: string;
    /** 账户是否锁住（是否禁用） */
    isLocked?: boolean;
    /** 角色信息 */
    roles?: RoleDto[];
    /** 备注 */
    remark?: string;
    /** 组织架构公司id */
    companyOrgId?: string;
    /** 组织架构部门id */
    departmentOrgId?: string;
  }

  interface UserDtoPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: UserDto[];
  }

  interface UserLifePayOrderOutput {
    id?: string;
    lifePayType?: LifePayTypeEnum;
    lifePayOrderType?: LifePayOrderTypeEnum;
    /** 订单号 */
    orderNo?: string;
    /** 充值金额 */
    rechargeAmount?: number;
    /** 优惠金额 */
    discountAmount?: number;
    /** 实付金额 */
    payAmount?: number;
    /** 支付时间 */
    payTime?: string;
    payStatus?: LifePayStatusEnum;
    lifePayOrderStatus?: LifePayOrderStatusEnum;
    /** 完成时间 */
    finishTime?: string;
    /** 订单详细数据 */
    orderParamDetailJsonStr?: string;
    /** 下单时间 */
    creationTime?: string;
    /** 退款时间 */
    refundTime?: string;
    /** 退款凭证 */
    refundCredentialsImgUrl?: string;
    refundApplyRemark?: string;
    refundCheckRemark?: string;
    /** 渠道流水号 */
    acoolyOrderNo?: string;
  }

  interface UserLifePayOrderOutputPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: UserLifePayOrderOutput[];
  }

  interface UserLifePayOrderRefundOutput {
    /** 订单编号 */
    id?: string;
    /** 订单号 */
    orderNo?: string;
    /** 退款原因 */
    refundApplyRemark?: string;
    /** 后台填写的驳回原因 */
    refundCheckRemark?: string;
    lifePayOrderStatus?: LifePayOrderStatusEnum;
  }

  interface UserListOutput {
    id?: string;
    /** 用户手机号 */
    phoneNumber?: string;
    lastLoginTime?: string;
    creationTime?: string;
  }

  interface UserListOutputPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: UserListOutput[];
  }

  interface VersionCache {
    name?: string;
    departmentCount?: number;
    apiCount?: number;
    remark?: string;
  }

  interface VersionCreate {
    name?: string;
    departmentCount?: number;
    apiCount?: number;
    sequence?: number;
    remark?: string;
  }

  interface VersionDto {
    id?: string;
    name?: string;
    departmentCount?: number;
    apiCount?: number;
    sequence?: number;
  }

  interface VersionDtoPageOutput {
    pageModel?: Pagination;
    objectData?: any;
    data?: VersionDto[];
  }

  interface VersionUpdateInput {
    id?: string;
    name?: string;
    departmentCount?: number;
    apiCount?: number;
    remark?: string;
    sequence?: number;
  }

  interface WindowsTimeZone {
    timeZoneId?: string;
  }

  interface WxMiniAppIndentityInfo {
    /** 会话密钥 */
    sessionKey?: string;
    /** 小程序OpenId */
    openId?: string;
    /** 用户名（该值为空则需手机授权登录，不为空则已有该小程序用户） */
    userName?: string;
    unionId?: string;
  }

  interface WxRechargeNotifyInput {
    id: string;
    createTime: string;
    eventType: string;
    resourceType: string;
    resource: Resource;
    summary: string;
  }

  interface WxRechargeNotifyResult {
    code?: string;
    message?: string;
  }
}
