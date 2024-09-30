/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";

export interface MsgCertifyModel {
  signer: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  softwareVersionString: string;
  cDVersionNumber: number;
  certificationDate: string;
  certificationType: string;
  reason: string;
  programTypeVersion: string;
  cDCertificateId: string;
  familyId: string;
  supportedClusters: string;
  compliantPlatformUsed: string;
  compliantPlatformVersion: string;
  OSVersion: string;
  certificationRoute: string;
  programType: string;
  transport: string;
  parentChild: string;
  certificationIdOfSoftwareComponent: string;
  schemaVersion: number;
}

export interface MsgCertifyModelResponse {
}

export interface MsgRevokeModel {
  signer: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  softwareVersionString: string;
  cDVersionNumber: number;
  revocationDate: string;
  certificationType: string;
  reason: string;
  schemaVersion: number;
}

export interface MsgRevokeModelResponse {
}

export interface MsgProvisionModel {
  signer: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  softwareVersionString: string;
  cDVersionNumber: number;
  provisionalDate: string;
  certificationType: string;
  reason: string;
  programTypeVersion: string;
  cDCertificateId: string;
  familyId: string;
  supportedClusters: string;
  compliantPlatformUsed: string;
  compliantPlatformVersion: string;
  OSVersion: string;
  certificationRoute: string;
  programType: string;
  transport: string;
  parentChild: string;
  certificationIdOfSoftwareComponent: string;
  schemaVersion: number;
}

export interface MsgProvisionModelResponse {
}

export interface MsgUpdateComplianceInfo {
  creator: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  certificationType: string;
  cDVersionNumber: string;
  date: string;
  reason: string;
  owner: string;
  cDCertificateId: string;
  certificationRoute: string;
  programType: string;
  programTypeVersion: string;
  compliantPlatformUsed: string;
  compliantPlatformVersion: string;
  transport: string;
  familyId: string;
  supportedClusters: string;
  OSVersion: string;
  parentChild: string;
  certificationIdOfSoftwareComponent: string;
  schemaVersion: number;
}

export interface MsgUpdateComplianceInfoResponse {
}

export interface MsgDeleteComplianceInfo {
  creator: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  certificationType: string;
}

export interface MsgDeleteComplianceInfoResponse {
}

function createBaseMsgCertifyModel(): MsgCertifyModel {
  return {
    signer: "",
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    softwareVersionString: "",
    cDVersionNumber: 0,
    certificationDate: "",
    certificationType: "",
    reason: "",
    programTypeVersion: "",
    cDCertificateId: "",
    familyId: "",
    supportedClusters: "",
    compliantPlatformUsed: "",
    compliantPlatformVersion: "",
    OSVersion: "",
    certificationRoute: "",
    programType: "",
    transport: "",
    parentChild: "",
    certificationIdOfSoftwareComponent: "",
    schemaVersion: 0,
  };
}

export const MsgCertifyModel = {
  encode(message: MsgCertifyModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion);
    }
    if (message.softwareVersionString !== "") {
      writer.uint32(42).string(message.softwareVersionString);
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber);
    }
    if (message.certificationDate !== "") {
      writer.uint32(58).string(message.certificationDate);
    }
    if (message.certificationType !== "") {
      writer.uint32(66).string(message.certificationType);
    }
    if (message.reason !== "") {
      writer.uint32(74).string(message.reason);
    }
    if (message.programTypeVersion !== "") {
      writer.uint32(82).string(message.programTypeVersion);
    }
    if (message.cDCertificateId !== "") {
      writer.uint32(90).string(message.cDCertificateId);
    }
    if (message.familyId !== "") {
      writer.uint32(98).string(message.familyId);
    }
    if (message.supportedClusters !== "") {
      writer.uint32(106).string(message.supportedClusters);
    }
    if (message.compliantPlatformUsed !== "") {
      writer.uint32(114).string(message.compliantPlatformUsed);
    }
    if (message.compliantPlatformVersion !== "") {
      writer.uint32(122).string(message.compliantPlatformVersion);
    }
    if (message.OSVersion !== "") {
      writer.uint32(130).string(message.OSVersion);
    }
    if (message.certificationRoute !== "") {
      writer.uint32(138).string(message.certificationRoute);
    }
    if (message.programType !== "") {
      writer.uint32(146).string(message.programType);
    }
    if (message.transport !== "") {
      writer.uint32(154).string(message.transport);
    }
    if (message.parentChild !== "") {
      writer.uint32(162).string(message.parentChild);
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      writer.uint32(170).string(message.certificationIdOfSoftwareComponent);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(176).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCertifyModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCertifyModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.softwareVersion = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.softwareVersionString = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.cDVersionNumber = reader.uint32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.certificationDate = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.certificationType = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reason = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.programTypeVersion = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.cDCertificateId = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.familyId = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.supportedClusters = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.compliantPlatformUsed = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.compliantPlatformVersion = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.OSVersion = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.certificationRoute = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.programType = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.transport = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.parentChild = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.certificationIdOfSoftwareComponent = reader.string();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCertifyModel {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      softwareVersionString: isSet(object.softwareVersionString) ? String(object.softwareVersionString) : "",
      cDVersionNumber: isSet(object.cDVersionNumber) ? Number(object.cDVersionNumber) : 0,
      certificationDate: isSet(object.certificationDate) ? String(object.certificationDate) : "",
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      programTypeVersion: isSet(object.programTypeVersion) ? String(object.programTypeVersion) : "",
      cDCertificateId: isSet(object.cDCertificateId) ? String(object.cDCertificateId) : "",
      familyId: isSet(object.familyId) ? String(object.familyId) : "",
      supportedClusters: isSet(object.supportedClusters) ? String(object.supportedClusters) : "",
      compliantPlatformUsed: isSet(object.compliantPlatformUsed) ? String(object.compliantPlatformUsed) : "",
      compliantPlatformVersion: isSet(object.compliantPlatformVersion) ? String(object.compliantPlatformVersion) : "",
      OSVersion: isSet(object.OSVersion) ? String(object.OSVersion) : "",
      certificationRoute: isSet(object.certificationRoute) ? String(object.certificationRoute) : "",
      programType: isSet(object.programType) ? String(object.programType) : "",
      transport: isSet(object.transport) ? String(object.transport) : "",
      parentChild: isSet(object.parentChild) ? String(object.parentChild) : "",
      certificationIdOfSoftwareComponent: isSet(object.certificationIdOfSoftwareComponent)
        ? String(object.certificationIdOfSoftwareComponent)
        : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: MsgCertifyModel): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.softwareVersion !== 0) {
      obj.softwareVersion = Math.round(message.softwareVersion);
    }
    if (message.softwareVersionString !== "") {
      obj.softwareVersionString = message.softwareVersionString;
    }
    if (message.cDVersionNumber !== 0) {
      obj.cDVersionNumber = Math.round(message.cDVersionNumber);
    }
    if (message.certificationDate !== "") {
      obj.certificationDate = message.certificationDate;
    }
    if (message.certificationType !== "") {
      obj.certificationType = message.certificationType;
    }
    if (message.reason !== "") {
      obj.reason = message.reason;
    }
    if (message.programTypeVersion !== "") {
      obj.programTypeVersion = message.programTypeVersion;
    }
    if (message.cDCertificateId !== "") {
      obj.cDCertificateId = message.cDCertificateId;
    }
    if (message.familyId !== "") {
      obj.familyId = message.familyId;
    }
    if (message.supportedClusters !== "") {
      obj.supportedClusters = message.supportedClusters;
    }
    if (message.compliantPlatformUsed !== "") {
      obj.compliantPlatformUsed = message.compliantPlatformUsed;
    }
    if (message.compliantPlatformVersion !== "") {
      obj.compliantPlatformVersion = message.compliantPlatformVersion;
    }
    if (message.OSVersion !== "") {
      obj.OSVersion = message.OSVersion;
    }
    if (message.certificationRoute !== "") {
      obj.certificationRoute = message.certificationRoute;
    }
    if (message.programType !== "") {
      obj.programType = message.programType;
    }
    if (message.transport !== "") {
      obj.transport = message.transport;
    }
    if (message.parentChild !== "") {
      obj.parentChild = message.parentChild;
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      obj.certificationIdOfSoftwareComponent = message.certificationIdOfSoftwareComponent;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCertifyModel>, I>>(base?: I): MsgCertifyModel {
    return MsgCertifyModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCertifyModel>, I>>(object: I): MsgCertifyModel {
    const message = createBaseMsgCertifyModel();
    message.signer = object.signer ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.softwareVersionString = object.softwareVersionString ?? "";
    message.cDVersionNumber = object.cDVersionNumber ?? 0;
    message.certificationDate = object.certificationDate ?? "";
    message.certificationType = object.certificationType ?? "";
    message.reason = object.reason ?? "";
    message.programTypeVersion = object.programTypeVersion ?? "";
    message.cDCertificateId = object.cDCertificateId ?? "";
    message.familyId = object.familyId ?? "";
    message.supportedClusters = object.supportedClusters ?? "";
    message.compliantPlatformUsed = object.compliantPlatformUsed ?? "";
    message.compliantPlatformVersion = object.compliantPlatformVersion ?? "";
    message.OSVersion = object.OSVersion ?? "";
    message.certificationRoute = object.certificationRoute ?? "";
    message.programType = object.programType ?? "";
    message.transport = object.transport ?? "";
    message.parentChild = object.parentChild ?? "";
    message.certificationIdOfSoftwareComponent = object.certificationIdOfSoftwareComponent ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgCertifyModelResponse(): MsgCertifyModelResponse {
  return {};
}

export const MsgCertifyModelResponse = {
  encode(_: MsgCertifyModelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCertifyModelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCertifyModelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgCertifyModelResponse {
    return {};
  },

  toJSON(_: MsgCertifyModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCertifyModelResponse>, I>>(base?: I): MsgCertifyModelResponse {
    return MsgCertifyModelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCertifyModelResponse>, I>>(_: I): MsgCertifyModelResponse {
    const message = createBaseMsgCertifyModelResponse();
    return message;
  },
};

function createBaseMsgRevokeModel(): MsgRevokeModel {
  return {
    signer: "",
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    softwareVersionString: "",
    cDVersionNumber: 0,
    revocationDate: "",
    certificationType: "",
    reason: "",
    schemaVersion: 0,
  };
}

export const MsgRevokeModel = {
  encode(message: MsgRevokeModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion);
    }
    if (message.softwareVersionString !== "") {
      writer.uint32(42).string(message.softwareVersionString);
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber);
    }
    if (message.revocationDate !== "") {
      writer.uint32(58).string(message.revocationDate);
    }
    if (message.certificationType !== "") {
      writer.uint32(66).string(message.certificationType);
    }
    if (message.reason !== "") {
      writer.uint32(74).string(message.reason);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(80).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.softwareVersion = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.softwareVersionString = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.cDVersionNumber = reader.uint32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.revocationDate = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.certificationType = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reason = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeModel {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      softwareVersionString: isSet(object.softwareVersionString) ? String(object.softwareVersionString) : "",
      cDVersionNumber: isSet(object.cDVersionNumber) ? Number(object.cDVersionNumber) : 0,
      revocationDate: isSet(object.revocationDate) ? String(object.revocationDate) : "",
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: MsgRevokeModel): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.softwareVersion !== 0) {
      obj.softwareVersion = Math.round(message.softwareVersion);
    }
    if (message.softwareVersionString !== "") {
      obj.softwareVersionString = message.softwareVersionString;
    }
    if (message.cDVersionNumber !== 0) {
      obj.cDVersionNumber = Math.round(message.cDVersionNumber);
    }
    if (message.revocationDate !== "") {
      obj.revocationDate = message.revocationDate;
    }
    if (message.certificationType !== "") {
      obj.certificationType = message.certificationType;
    }
    if (message.reason !== "") {
      obj.reason = message.reason;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeModel>, I>>(base?: I): MsgRevokeModel {
    return MsgRevokeModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeModel>, I>>(object: I): MsgRevokeModel {
    const message = createBaseMsgRevokeModel();
    message.signer = object.signer ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.softwareVersionString = object.softwareVersionString ?? "";
    message.cDVersionNumber = object.cDVersionNumber ?? 0;
    message.revocationDate = object.revocationDate ?? "";
    message.certificationType = object.certificationType ?? "";
    message.reason = object.reason ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgRevokeModelResponse(): MsgRevokeModelResponse {
  return {};
}

export const MsgRevokeModelResponse = {
  encode(_: MsgRevokeModelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeModelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeModelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgRevokeModelResponse {
    return {};
  },

  toJSON(_: MsgRevokeModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeModelResponse>, I>>(base?: I): MsgRevokeModelResponse {
    return MsgRevokeModelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeModelResponse>, I>>(_: I): MsgRevokeModelResponse {
    const message = createBaseMsgRevokeModelResponse();
    return message;
  },
};

function createBaseMsgProvisionModel(): MsgProvisionModel {
  return {
    signer: "",
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    softwareVersionString: "",
    cDVersionNumber: 0,
    provisionalDate: "",
    certificationType: "",
    reason: "",
    programTypeVersion: "",
    cDCertificateId: "",
    familyId: "",
    supportedClusters: "",
    compliantPlatformUsed: "",
    compliantPlatformVersion: "",
    OSVersion: "",
    certificationRoute: "",
    programType: "",
    transport: "",
    parentChild: "",
    certificationIdOfSoftwareComponent: "",
    schemaVersion: 0,
  };
}

export const MsgProvisionModel = {
  encode(message: MsgProvisionModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion);
    }
    if (message.softwareVersionString !== "") {
      writer.uint32(42).string(message.softwareVersionString);
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber);
    }
    if (message.provisionalDate !== "") {
      writer.uint32(58).string(message.provisionalDate);
    }
    if (message.certificationType !== "") {
      writer.uint32(66).string(message.certificationType);
    }
    if (message.reason !== "") {
      writer.uint32(74).string(message.reason);
    }
    if (message.programTypeVersion !== "") {
      writer.uint32(82).string(message.programTypeVersion);
    }
    if (message.cDCertificateId !== "") {
      writer.uint32(90).string(message.cDCertificateId);
    }
    if (message.familyId !== "") {
      writer.uint32(98).string(message.familyId);
    }
    if (message.supportedClusters !== "") {
      writer.uint32(106).string(message.supportedClusters);
    }
    if (message.compliantPlatformUsed !== "") {
      writer.uint32(114).string(message.compliantPlatformUsed);
    }
    if (message.compliantPlatformVersion !== "") {
      writer.uint32(122).string(message.compliantPlatformVersion);
    }
    if (message.OSVersion !== "") {
      writer.uint32(130).string(message.OSVersion);
    }
    if (message.certificationRoute !== "") {
      writer.uint32(138).string(message.certificationRoute);
    }
    if (message.programType !== "") {
      writer.uint32(146).string(message.programType);
    }
    if (message.transport !== "") {
      writer.uint32(154).string(message.transport);
    }
    if (message.parentChild !== "") {
      writer.uint32(162).string(message.parentChild);
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      writer.uint32(170).string(message.certificationIdOfSoftwareComponent);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(176).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProvisionModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProvisionModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.softwareVersion = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.softwareVersionString = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.cDVersionNumber = reader.uint32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.provisionalDate = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.certificationType = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reason = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.programTypeVersion = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.cDCertificateId = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.familyId = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.supportedClusters = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.compliantPlatformUsed = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.compliantPlatformVersion = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.OSVersion = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.certificationRoute = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.programType = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.transport = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.parentChild = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.certificationIdOfSoftwareComponent = reader.string();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgProvisionModel {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      softwareVersionString: isSet(object.softwareVersionString) ? String(object.softwareVersionString) : "",
      cDVersionNumber: isSet(object.cDVersionNumber) ? Number(object.cDVersionNumber) : 0,
      provisionalDate: isSet(object.provisionalDate) ? String(object.provisionalDate) : "",
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      programTypeVersion: isSet(object.programTypeVersion) ? String(object.programTypeVersion) : "",
      cDCertificateId: isSet(object.cDCertificateId) ? String(object.cDCertificateId) : "",
      familyId: isSet(object.familyId) ? String(object.familyId) : "",
      supportedClusters: isSet(object.supportedClusters) ? String(object.supportedClusters) : "",
      compliantPlatformUsed: isSet(object.compliantPlatformUsed) ? String(object.compliantPlatformUsed) : "",
      compliantPlatformVersion: isSet(object.compliantPlatformVersion) ? String(object.compliantPlatformVersion) : "",
      OSVersion: isSet(object.OSVersion) ? String(object.OSVersion) : "",
      certificationRoute: isSet(object.certificationRoute) ? String(object.certificationRoute) : "",
      programType: isSet(object.programType) ? String(object.programType) : "",
      transport: isSet(object.transport) ? String(object.transport) : "",
      parentChild: isSet(object.parentChild) ? String(object.parentChild) : "",
      certificationIdOfSoftwareComponent: isSet(object.certificationIdOfSoftwareComponent)
        ? String(object.certificationIdOfSoftwareComponent)
        : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: MsgProvisionModel): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.softwareVersion !== 0) {
      obj.softwareVersion = Math.round(message.softwareVersion);
    }
    if (message.softwareVersionString !== "") {
      obj.softwareVersionString = message.softwareVersionString;
    }
    if (message.cDVersionNumber !== 0) {
      obj.cDVersionNumber = Math.round(message.cDVersionNumber);
    }
    if (message.provisionalDate !== "") {
      obj.provisionalDate = message.provisionalDate;
    }
    if (message.certificationType !== "") {
      obj.certificationType = message.certificationType;
    }
    if (message.reason !== "") {
      obj.reason = message.reason;
    }
    if (message.programTypeVersion !== "") {
      obj.programTypeVersion = message.programTypeVersion;
    }
    if (message.cDCertificateId !== "") {
      obj.cDCertificateId = message.cDCertificateId;
    }
    if (message.familyId !== "") {
      obj.familyId = message.familyId;
    }
    if (message.supportedClusters !== "") {
      obj.supportedClusters = message.supportedClusters;
    }
    if (message.compliantPlatformUsed !== "") {
      obj.compliantPlatformUsed = message.compliantPlatformUsed;
    }
    if (message.compliantPlatformVersion !== "") {
      obj.compliantPlatformVersion = message.compliantPlatformVersion;
    }
    if (message.OSVersion !== "") {
      obj.OSVersion = message.OSVersion;
    }
    if (message.certificationRoute !== "") {
      obj.certificationRoute = message.certificationRoute;
    }
    if (message.programType !== "") {
      obj.programType = message.programType;
    }
    if (message.transport !== "") {
      obj.transport = message.transport;
    }
    if (message.parentChild !== "") {
      obj.parentChild = message.parentChild;
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      obj.certificationIdOfSoftwareComponent = message.certificationIdOfSoftwareComponent;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProvisionModel>, I>>(base?: I): MsgProvisionModel {
    return MsgProvisionModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProvisionModel>, I>>(object: I): MsgProvisionModel {
    const message = createBaseMsgProvisionModel();
    message.signer = object.signer ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.softwareVersionString = object.softwareVersionString ?? "";
    message.cDVersionNumber = object.cDVersionNumber ?? 0;
    message.provisionalDate = object.provisionalDate ?? "";
    message.certificationType = object.certificationType ?? "";
    message.reason = object.reason ?? "";
    message.programTypeVersion = object.programTypeVersion ?? "";
    message.cDCertificateId = object.cDCertificateId ?? "";
    message.familyId = object.familyId ?? "";
    message.supportedClusters = object.supportedClusters ?? "";
    message.compliantPlatformUsed = object.compliantPlatformUsed ?? "";
    message.compliantPlatformVersion = object.compliantPlatformVersion ?? "";
    message.OSVersion = object.OSVersion ?? "";
    message.certificationRoute = object.certificationRoute ?? "";
    message.programType = object.programType ?? "";
    message.transport = object.transport ?? "";
    message.parentChild = object.parentChild ?? "";
    message.certificationIdOfSoftwareComponent = object.certificationIdOfSoftwareComponent ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgProvisionModelResponse(): MsgProvisionModelResponse {
  return {};
}

export const MsgProvisionModelResponse = {
  encode(_: MsgProvisionModelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProvisionModelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProvisionModelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgProvisionModelResponse {
    return {};
  },

  toJSON(_: MsgProvisionModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProvisionModelResponse>, I>>(base?: I): MsgProvisionModelResponse {
    return MsgProvisionModelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProvisionModelResponse>, I>>(_: I): MsgProvisionModelResponse {
    const message = createBaseMsgProvisionModelResponse();
    return message;
  },
};

function createBaseMsgUpdateComplianceInfo(): MsgUpdateComplianceInfo {
  return {
    creator: "",
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    certificationType: "",
    cDVersionNumber: "",
    date: "",
    reason: "",
    owner: "",
    cDCertificateId: "",
    certificationRoute: "",
    programType: "",
    programTypeVersion: "",
    compliantPlatformUsed: "",
    compliantPlatformVersion: "",
    transport: "",
    familyId: "",
    supportedClusters: "",
    OSVersion: "",
    parentChild: "",
    certificationIdOfSoftwareComponent: "",
    schemaVersion: 0,
  };
}

export const MsgUpdateComplianceInfo = {
  encode(message: MsgUpdateComplianceInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      writer.uint32(42).string(message.certificationType);
    }
    if (message.cDVersionNumber !== "") {
      writer.uint32(50).string(message.cDVersionNumber);
    }
    if (message.date !== "") {
      writer.uint32(58).string(message.date);
    }
    if (message.reason !== "") {
      writer.uint32(66).string(message.reason);
    }
    if (message.owner !== "") {
      writer.uint32(74).string(message.owner);
    }
    if (message.cDCertificateId !== "") {
      writer.uint32(82).string(message.cDCertificateId);
    }
    if (message.certificationRoute !== "") {
      writer.uint32(90).string(message.certificationRoute);
    }
    if (message.programType !== "") {
      writer.uint32(98).string(message.programType);
    }
    if (message.programTypeVersion !== "") {
      writer.uint32(106).string(message.programTypeVersion);
    }
    if (message.compliantPlatformUsed !== "") {
      writer.uint32(114).string(message.compliantPlatformUsed);
    }
    if (message.compliantPlatformVersion !== "") {
      writer.uint32(122).string(message.compliantPlatformVersion);
    }
    if (message.transport !== "") {
      writer.uint32(130).string(message.transport);
    }
    if (message.familyId !== "") {
      writer.uint32(138).string(message.familyId);
    }
    if (message.supportedClusters !== "") {
      writer.uint32(146).string(message.supportedClusters);
    }
    if (message.OSVersion !== "") {
      writer.uint32(154).string(message.OSVersion);
    }
    if (message.parentChild !== "") {
      writer.uint32(162).string(message.parentChild);
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      writer.uint32(170).string(message.certificationIdOfSoftwareComponent);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(176).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateComplianceInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateComplianceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.softwareVersion = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.certificationType = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.cDVersionNumber = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.date = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.reason = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.cDCertificateId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.certificationRoute = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.programType = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.programTypeVersion = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.compliantPlatformUsed = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.compliantPlatformVersion = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.transport = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.familyId = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.supportedClusters = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.OSVersion = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.parentChild = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.certificationIdOfSoftwareComponent = reader.string();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateComplianceInfo {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
      cDVersionNumber: isSet(object.cDVersionNumber) ? String(object.cDVersionNumber) : "",
      date: isSet(object.date) ? String(object.date) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      cDCertificateId: isSet(object.cDCertificateId) ? String(object.cDCertificateId) : "",
      certificationRoute: isSet(object.certificationRoute) ? String(object.certificationRoute) : "",
      programType: isSet(object.programType) ? String(object.programType) : "",
      programTypeVersion: isSet(object.programTypeVersion) ? String(object.programTypeVersion) : "",
      compliantPlatformUsed: isSet(object.compliantPlatformUsed) ? String(object.compliantPlatformUsed) : "",
      compliantPlatformVersion: isSet(object.compliantPlatformVersion) ? String(object.compliantPlatformVersion) : "",
      transport: isSet(object.transport) ? String(object.transport) : "",
      familyId: isSet(object.familyId) ? String(object.familyId) : "",
      supportedClusters: isSet(object.supportedClusters) ? String(object.supportedClusters) : "",
      OSVersion: isSet(object.OSVersion) ? String(object.OSVersion) : "",
      parentChild: isSet(object.parentChild) ? String(object.parentChild) : "",
      certificationIdOfSoftwareComponent: isSet(object.certificationIdOfSoftwareComponent)
        ? String(object.certificationIdOfSoftwareComponent)
        : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: MsgUpdateComplianceInfo): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.softwareVersion !== 0) {
      obj.softwareVersion = Math.round(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      obj.certificationType = message.certificationType;
    }
    if (message.cDVersionNumber !== "") {
      obj.cDVersionNumber = message.cDVersionNumber;
    }
    if (message.date !== "") {
      obj.date = message.date;
    }
    if (message.reason !== "") {
      obj.reason = message.reason;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.cDCertificateId !== "") {
      obj.cDCertificateId = message.cDCertificateId;
    }
    if (message.certificationRoute !== "") {
      obj.certificationRoute = message.certificationRoute;
    }
    if (message.programType !== "") {
      obj.programType = message.programType;
    }
    if (message.programTypeVersion !== "") {
      obj.programTypeVersion = message.programTypeVersion;
    }
    if (message.compliantPlatformUsed !== "") {
      obj.compliantPlatformUsed = message.compliantPlatformUsed;
    }
    if (message.compliantPlatformVersion !== "") {
      obj.compliantPlatformVersion = message.compliantPlatformVersion;
    }
    if (message.transport !== "") {
      obj.transport = message.transport;
    }
    if (message.familyId !== "") {
      obj.familyId = message.familyId;
    }
    if (message.supportedClusters !== "") {
      obj.supportedClusters = message.supportedClusters;
    }
    if (message.OSVersion !== "") {
      obj.OSVersion = message.OSVersion;
    }
    if (message.parentChild !== "") {
      obj.parentChild = message.parentChild;
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      obj.certificationIdOfSoftwareComponent = message.certificationIdOfSoftwareComponent;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateComplianceInfo>, I>>(base?: I): MsgUpdateComplianceInfo {
    return MsgUpdateComplianceInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateComplianceInfo>, I>>(object: I): MsgUpdateComplianceInfo {
    const message = createBaseMsgUpdateComplianceInfo();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.certificationType = object.certificationType ?? "";
    message.cDVersionNumber = object.cDVersionNumber ?? "";
    message.date = object.date ?? "";
    message.reason = object.reason ?? "";
    message.owner = object.owner ?? "";
    message.cDCertificateId = object.cDCertificateId ?? "";
    message.certificationRoute = object.certificationRoute ?? "";
    message.programType = object.programType ?? "";
    message.programTypeVersion = object.programTypeVersion ?? "";
    message.compliantPlatformUsed = object.compliantPlatformUsed ?? "";
    message.compliantPlatformVersion = object.compliantPlatformVersion ?? "";
    message.transport = object.transport ?? "";
    message.familyId = object.familyId ?? "";
    message.supportedClusters = object.supportedClusters ?? "";
    message.OSVersion = object.OSVersion ?? "";
    message.parentChild = object.parentChild ?? "";
    message.certificationIdOfSoftwareComponent = object.certificationIdOfSoftwareComponent ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgUpdateComplianceInfoResponse(): MsgUpdateComplianceInfoResponse {
  return {};
}

export const MsgUpdateComplianceInfoResponse = {
  encode(_: MsgUpdateComplianceInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateComplianceInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateComplianceInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateComplianceInfoResponse {
    return {};
  },

  toJSON(_: MsgUpdateComplianceInfoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateComplianceInfoResponse>, I>>(base?: I): MsgUpdateComplianceInfoResponse {
    return MsgUpdateComplianceInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateComplianceInfoResponse>, I>>(_: I): MsgUpdateComplianceInfoResponse {
    const message = createBaseMsgUpdateComplianceInfoResponse();
    return message;
  },
};

function createBaseMsgDeleteComplianceInfo(): MsgDeleteComplianceInfo {
  return { creator: "", vid: 0, pid: 0, softwareVersion: 0, certificationType: "" };
}

export const MsgDeleteComplianceInfo = {
  encode(message: MsgDeleteComplianceInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(32).uint32(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      writer.uint32(42).string(message.certificationType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteComplianceInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteComplianceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.softwareVersion = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.certificationType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteComplianceInfo {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
    };
  },

  toJSON(message: MsgDeleteComplianceInfo): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.softwareVersion !== 0) {
      obj.softwareVersion = Math.round(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      obj.certificationType = message.certificationType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteComplianceInfo>, I>>(base?: I): MsgDeleteComplianceInfo {
    return MsgDeleteComplianceInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteComplianceInfo>, I>>(object: I): MsgDeleteComplianceInfo {
    const message = createBaseMsgDeleteComplianceInfo();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.certificationType = object.certificationType ?? "";
    return message;
  },
};

function createBaseMsgDeleteComplianceInfoResponse(): MsgDeleteComplianceInfoResponse {
  return {};
}

export const MsgDeleteComplianceInfoResponse = {
  encode(_: MsgDeleteComplianceInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteComplianceInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteComplianceInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteComplianceInfoResponse {
    return {};
  },

  toJSON(_: MsgDeleteComplianceInfoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteComplianceInfoResponse>, I>>(base?: I): MsgDeleteComplianceInfoResponse {
    return MsgDeleteComplianceInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteComplianceInfoResponse>, I>>(_: I): MsgDeleteComplianceInfoResponse {
    const message = createBaseMsgDeleteComplianceInfoResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CertifyModel(request: MsgCertifyModel): Promise<MsgCertifyModelResponse>;
  RevokeModel(request: MsgRevokeModel): Promise<MsgRevokeModelResponse>;
  ProvisionModel(request: MsgProvisionModel): Promise<MsgProvisionModelResponse>;
  UpdateComplianceInfo(request: MsgUpdateComplianceInfo): Promise<MsgUpdateComplianceInfoResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteComplianceInfo(request: MsgDeleteComplianceInfo): Promise<MsgDeleteComplianceInfoResponse>;
}

export const MsgServiceName = "zigbeealliance.distributedcomplianceledger.compliance.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CertifyModel = this.CertifyModel.bind(this);
    this.RevokeModel = this.RevokeModel.bind(this);
    this.ProvisionModel = this.ProvisionModel.bind(this);
    this.UpdateComplianceInfo = this.UpdateComplianceInfo.bind(this);
    this.DeleteComplianceInfo = this.DeleteComplianceInfo.bind(this);
  }
  CertifyModel(request: MsgCertifyModel): Promise<MsgCertifyModelResponse> {
    const data = MsgCertifyModel.encode(request).finish();
    const promise = this.rpc.request(this.service, "CertifyModel", data);
    return promise.then((data) => MsgCertifyModelResponse.decode(_m0.Reader.create(data)));
  }

  RevokeModel(request: MsgRevokeModel): Promise<MsgRevokeModelResponse> {
    const data = MsgRevokeModel.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeModel", data);
    return promise.then((data) => MsgRevokeModelResponse.decode(_m0.Reader.create(data)));
  }

  ProvisionModel(request: MsgProvisionModel): Promise<MsgProvisionModelResponse> {
    const data = MsgProvisionModel.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProvisionModel", data);
    return promise.then((data) => MsgProvisionModelResponse.decode(_m0.Reader.create(data)));
  }

  UpdateComplianceInfo(request: MsgUpdateComplianceInfo): Promise<MsgUpdateComplianceInfoResponse> {
    const data = MsgUpdateComplianceInfo.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateComplianceInfo", data);
    return promise.then((data) => MsgUpdateComplianceInfoResponse.decode(_m0.Reader.create(data)));
  }

  DeleteComplianceInfo(request: MsgDeleteComplianceInfo): Promise<MsgDeleteComplianceInfoResponse> {
    const data = MsgDeleteComplianceInfo.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteComplianceInfo", data);
    return promise.then((data) => MsgDeleteComplianceInfoResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
