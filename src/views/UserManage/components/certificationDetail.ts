import { UploadUserFile } from '@bole-core/components';
import {
  UserCertificationModeEnumV2,
  UserCertificationChannelEnum,
  UserCertificationElementEnum,
  EnterpriseType,
  UserCertificationStatus,
} from '@/constants';

export type DetailForm = {
  societyCreditCode: string;
  licenseUrl: UploadUserFile[];
  legalPersonName: string;
  legalPersonIdNumber: string;
  legalPersonIdImgUrl: UploadUserFile[];
  certificationMode: UserCertificationModeEnumV2;
  proxyPersonName: string;
  proxyPersonIdNumber: string;
  proxyPersonIdImgUrl: UploadUserFile[];
  proxyPowerAttorneyUrl: UploadUserFile[];
  certificationChannel: UserCertificationChannelEnum;
  certificationElement: UserCertificationElementEnum;
  bankCardNumber: string;
  legalPersonIdBackImgUrl: UploadUserFile[];
  proxyPersonIdBackImgUrl: UploadUserFile[];
  id: string;
  enterpriseType: EnterpriseType;
  enterpriseName: string;
  certificationTime: string;
  status: UserCertificationStatus;
  contact: string;
  contactPhone: string;
  registTime: string;
  legalPersonBankCardImgUrl: UploadUserFile[];
  proxyPersonBankCardImgUrl: UploadUserFile[];
};
