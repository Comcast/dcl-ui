/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.model";

export interface MsgCreateModel {
  creator: string;
  vid: number;
  pid: number;
  deviceTypeId: number;
  productName: string;
  productLabel: string;
  partNumber: string;
  commissioningCustomFlow: number;
  commissioningCustomFlowUrl: string;
  commissioningModeInitialStepsHint: number;
  commissioningModeInitialStepsInstruction: string;
  commissioningModeSecondaryStepsHint: number;
  commissioningModeSecondaryStepsInstruction: string;
  userManualUrl: string;
  supportUrl: string;
  productUrl: string;
  lsfUrl: string;
  schemaVersion: number;
  managedAclExtensionRequestFlowUrl: string;
  enhancedSetupFlowOptions: number;
  enhancedSetupFlowTCUrl: string;
  enhancedSetupFlowTCRevision: number;
  enhancedSetupFlowTCDigest: string;
  enhancedSetupFlowTCFileSize: number;
  maintenanceUrl: string;
}

export interface MsgCreateModelResponse {
}

export interface MsgUpdateModel {
  creator: string;
  vid: number;
  pid: number;
  productName: string;
  productLabel: string;
  partNumber: string;
  commissioningCustomFlowUrl: string;
  commissioningModeInitialStepsInstruction: string;
  commissioningModeSecondaryStepsInstruction: string;
  userManualUrl: string;
  supportUrl: string;
  productUrl: string;
  lsfUrl: string;
  lsfRevision: number;
  schemaVersion: number;
  managedAclExtensionRequestFlowUrl: string;
  commissioningModeInitialStepsHint: number;
  enhancedSetupFlowOptions: number;
  enhancedSetupFlowTCUrl: string;
  enhancedSetupFlowTCRevision: number;
  enhancedSetupFlowTCDigest: string;
  enhancedSetupFlowTCFileSize: number;
  maintenanceUrl: string;
}

export interface MsgUpdateModelResponse {
}

export interface MsgDeleteModel {
  creator: string;
  vid: number;
  pid: number;
}

export interface MsgDeleteModelResponse {
}

export interface MsgCreateModelVersion {
  creator: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  softwareVersionString: string;
  cdVersionNumber: number;
  firmwareInformation: string;
  softwareVersionValid: boolean;
  otaUrl: string;
  otaFileSize: number;
  otaChecksum: string;
  otaChecksumType: number;
  minApplicableSoftwareVersion: number;
  maxApplicableSoftwareVersion: number;
  releaseNotesUrl: string;
  schemaVersion: number;
}

export interface MsgCreateModelVersionResponse {
}

export interface MsgUpdateModelVersion {
  creator: string;
  vid: number;
  pid: number;
  softwareVersion: number;
  softwareVersionValid: boolean;
  otaUrl: string;
  minApplicableSoftwareVersion: number;
  maxApplicableSoftwareVersion: number;
  releaseNotesUrl: string;
  otaFileSize: number;
  otaChecksum: string;
  schemaVersion: number;
}

export interface MsgUpdateModelVersionResponse {
}

export interface MsgDeleteModelVersion {
  creator: string;
  vid: number;
  pid: number;
  softwareVersion: number;
}

export interface MsgDeleteModelVersionResponse {
}

function createBaseMsgCreateModel(): MsgCreateModel {
  return {
    creator: "",
    vid: 0,
    pid: 0,
    deviceTypeId: 0,
    productName: "",
    productLabel: "",
    partNumber: "",
    commissioningCustomFlow: 0,
    commissioningCustomFlowUrl: "",
    commissioningModeInitialStepsHint: 0,
    commissioningModeInitialStepsInstruction: "",
    commissioningModeSecondaryStepsHint: 0,
    commissioningModeSecondaryStepsInstruction: "",
    userManualUrl: "",
    supportUrl: "",
    productUrl: "",
    lsfUrl: "",
    schemaVersion: 0,
    managedAclExtensionRequestFlowUrl: "",
    enhancedSetupFlowOptions: 0,
    enhancedSetupFlowTCUrl: "",
    enhancedSetupFlowTCRevision: 0,
    enhancedSetupFlowTCDigest: "",
    enhancedSetupFlowTCFileSize: 0,
    maintenanceUrl: "",
  };
}

export const MsgCreateModel = {
  encode(message: MsgCreateModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.deviceTypeId !== 0) {
      writer.uint32(32).int32(message.deviceTypeId);
    }
    if (message.productName !== "") {
      writer.uint32(42).string(message.productName);
    }
    if (message.productLabel !== "") {
      writer.uint32(50).string(message.productLabel);
    }
    if (message.partNumber !== "") {
      writer.uint32(58).string(message.partNumber);
    }
    if (message.commissioningCustomFlow !== 0) {
      writer.uint32(64).int32(message.commissioningCustomFlow);
    }
    if (message.commissioningCustomFlowUrl !== "") {
      writer.uint32(74).string(message.commissioningCustomFlowUrl);
    }
    if (message.commissioningModeInitialStepsHint !== 0) {
      writer.uint32(80).uint32(message.commissioningModeInitialStepsHint);
    }
    if (message.commissioningModeInitialStepsInstruction !== "") {
      writer.uint32(90).string(message.commissioningModeInitialStepsInstruction);
    }
    if (message.commissioningModeSecondaryStepsHint !== 0) {
      writer.uint32(96).uint32(message.commissioningModeSecondaryStepsHint);
    }
    if (message.commissioningModeSecondaryStepsInstruction !== "") {
      writer.uint32(106).string(message.commissioningModeSecondaryStepsInstruction);
    }
    if (message.userManualUrl !== "") {
      writer.uint32(114).string(message.userManualUrl);
    }
    if (message.supportUrl !== "") {
      writer.uint32(122).string(message.supportUrl);
    }
    if (message.productUrl !== "") {
      writer.uint32(130).string(message.productUrl);
    }
    if (message.lsfUrl !== "") {
      writer.uint32(138).string(message.lsfUrl);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(144).uint32(message.schemaVersion);
    }
    if (message.managedAclExtensionRequestFlowUrl !== "") {
      writer.uint32(154).string(message.managedAclExtensionRequestFlowUrl);
    }
    if (message.enhancedSetupFlowOptions !== 0) {
      writer.uint32(160).int32(message.enhancedSetupFlowOptions);
    }
    if (message.enhancedSetupFlowTCUrl !== "") {
      writer.uint32(170).string(message.enhancedSetupFlowTCUrl);
    }
    if (message.enhancedSetupFlowTCRevision !== 0) {
      writer.uint32(176).int32(message.enhancedSetupFlowTCRevision);
    }
    if (message.enhancedSetupFlowTCDigest !== "") {
      writer.uint32(186).string(message.enhancedSetupFlowTCDigest);
    }
    if (message.enhancedSetupFlowTCFileSize !== 0) {
      writer.uint32(192).uint32(message.enhancedSetupFlowTCFileSize);
    }
    if (message.maintenanceUrl !== "") {
      writer.uint32(202).string(message.maintenanceUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateModel();
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

          message.deviceTypeId = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.productName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.productLabel = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.partNumber = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.commissioningCustomFlow = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.commissioningCustomFlowUrl = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.commissioningModeInitialStepsHint = reader.uint32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.commissioningModeInitialStepsInstruction = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.commissioningModeSecondaryStepsHint = reader.uint32();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.commissioningModeSecondaryStepsInstruction = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.userManualUrl = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.supportUrl = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.productUrl = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.lsfUrl = reader.string();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.managedAclExtensionRequestFlowUrl = reader.string();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.enhancedSetupFlowOptions = reader.int32();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.enhancedSetupFlowTCUrl = reader.string();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.enhancedSetupFlowTCRevision = reader.int32();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.enhancedSetupFlowTCDigest = reader.string();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.enhancedSetupFlowTCFileSize = reader.uint32();
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.maintenanceUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateModel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      deviceTypeId: isSet(object.deviceTypeId) ? Number(object.deviceTypeId) : 0,
      productName: isSet(object.productName) ? String(object.productName) : "",
      productLabel: isSet(object.productLabel) ? String(object.productLabel) : "",
      partNumber: isSet(object.partNumber) ? String(object.partNumber) : "",
      commissioningCustomFlow: isSet(object.commissioningCustomFlow) ? Number(object.commissioningCustomFlow) : 0,
      commissioningCustomFlowUrl: isSet(object.commissioningCustomFlowUrl)
        ? String(object.commissioningCustomFlowUrl)
        : "",
      commissioningModeInitialStepsHint: isSet(object.commissioningModeInitialStepsHint)
        ? Number(object.commissioningModeInitialStepsHint)
        : 0,
      commissioningModeInitialStepsInstruction: isSet(object.commissioningModeInitialStepsInstruction)
        ? String(object.commissioningModeInitialStepsInstruction)
        : "",
      commissioningModeSecondaryStepsHint: isSet(object.commissioningModeSecondaryStepsHint)
        ? Number(object.commissioningModeSecondaryStepsHint)
        : 0,
      commissioningModeSecondaryStepsInstruction: isSet(object.commissioningModeSecondaryStepsInstruction)
        ? String(object.commissioningModeSecondaryStepsInstruction)
        : "",
      userManualUrl: isSet(object.userManualUrl) ? String(object.userManualUrl) : "",
      supportUrl: isSet(object.supportUrl) ? String(object.supportUrl) : "",
      productUrl: isSet(object.productUrl) ? String(object.productUrl) : "",
      lsfUrl: isSet(object.lsfUrl) ? String(object.lsfUrl) : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
      managedAclExtensionRequestFlowUrl: isSet(object.managedAclExtensionRequestFlowUrl)
        ? String(object.managedAclExtensionRequestFlowUrl)
        : "",
      enhancedSetupFlowOptions: isSet(object.enhancedSetupFlowOptions) ? Number(object.enhancedSetupFlowOptions) : 0,
      enhancedSetupFlowTCUrl: isSet(object.enhancedSetupFlowTCUrl) ? String(object.enhancedSetupFlowTCUrl) : "",
      enhancedSetupFlowTCRevision: isSet(object.enhancedSetupFlowTCRevision)
        ? Number(object.enhancedSetupFlowTCRevision)
        : 0,
      enhancedSetupFlowTCDigest: isSet(object.enhancedSetupFlowTCDigest)
        ? String(object.enhancedSetupFlowTCDigest)
        : "",
      enhancedSetupFlowTCFileSize: isSet(object.enhancedSetupFlowTCFileSize)
        ? Number(object.enhancedSetupFlowTCFileSize)
        : 0,
      maintenanceUrl: isSet(object.maintenanceUrl) ? String(object.maintenanceUrl) : "",
    };
  },

  toJSON(message: MsgCreateModel): unknown {
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
    if (message.deviceTypeId !== 0) {
      obj.deviceTypeId = Math.round(message.deviceTypeId);
    }
    if (message.productName !== "") {
      obj.productName = message.productName;
    }
    if (message.productLabel !== "") {
      obj.productLabel = message.productLabel;
    }
    if (message.partNumber !== "") {
      obj.partNumber = message.partNumber;
    }
    if (message.commissioningCustomFlow !== 0) {
      obj.commissioningCustomFlow = Math.round(message.commissioningCustomFlow);
    }
    if (message.commissioningCustomFlowUrl !== "") {
      obj.commissioningCustomFlowUrl = message.commissioningCustomFlowUrl;
    }
    if (message.commissioningModeInitialStepsHint !== 0) {
      obj.commissioningModeInitialStepsHint = Math.round(message.commissioningModeInitialStepsHint);
    }
    if (message.commissioningModeInitialStepsInstruction !== "") {
      obj.commissioningModeInitialStepsInstruction = message.commissioningModeInitialStepsInstruction;
    }
    if (message.commissioningModeSecondaryStepsHint !== 0) {
      obj.commissioningModeSecondaryStepsHint = Math.round(message.commissioningModeSecondaryStepsHint);
    }
    if (message.commissioningModeSecondaryStepsInstruction !== "") {
      obj.commissioningModeSecondaryStepsInstruction = message.commissioningModeSecondaryStepsInstruction;
    }
    if (message.userManualUrl !== "") {
      obj.userManualUrl = message.userManualUrl;
    }
    if (message.supportUrl !== "") {
      obj.supportUrl = message.supportUrl;
    }
    if (message.productUrl !== "") {
      obj.productUrl = message.productUrl;
    }
    if (message.lsfUrl !== "") {
      obj.lsfUrl = message.lsfUrl;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    if (message.managedAclExtensionRequestFlowUrl !== "") {
      obj.managedAclExtensionRequestFlowUrl = message.managedAclExtensionRequestFlowUrl;
    }
    if (message.enhancedSetupFlowOptions !== 0) {
      obj.enhancedSetupFlowOptions = Math.round(message.enhancedSetupFlowOptions);
    }
    if (message.enhancedSetupFlowTCUrl !== "") {
      obj.enhancedSetupFlowTCUrl = message.enhancedSetupFlowTCUrl;
    }
    if (message.enhancedSetupFlowTCRevision !== 0) {
      obj.enhancedSetupFlowTCRevision = Math.round(message.enhancedSetupFlowTCRevision);
    }
    if (message.enhancedSetupFlowTCDigest !== "") {
      obj.enhancedSetupFlowTCDigest = message.enhancedSetupFlowTCDigest;
    }
    if (message.enhancedSetupFlowTCFileSize !== 0) {
      obj.enhancedSetupFlowTCFileSize = Math.round(message.enhancedSetupFlowTCFileSize);
    }
    if (message.maintenanceUrl !== "") {
      obj.maintenanceUrl = message.maintenanceUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateModel>, I>>(base?: I): MsgCreateModel {
    return MsgCreateModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateModel>, I>>(object: I): MsgCreateModel {
    const message = createBaseMsgCreateModel();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.deviceTypeId = object.deviceTypeId ?? 0;
    message.productName = object.productName ?? "";
    message.productLabel = object.productLabel ?? "";
    message.partNumber = object.partNumber ?? "";
    message.commissioningCustomFlow = object.commissioningCustomFlow ?? 0;
    message.commissioningCustomFlowUrl = object.commissioningCustomFlowUrl ?? "";
    message.commissioningModeInitialStepsHint = object.commissioningModeInitialStepsHint ?? 0;
    message.commissioningModeInitialStepsInstruction = object.commissioningModeInitialStepsInstruction ?? "";
    message.commissioningModeSecondaryStepsHint = object.commissioningModeSecondaryStepsHint ?? 0;
    message.commissioningModeSecondaryStepsInstruction = object.commissioningModeSecondaryStepsInstruction ?? "";
    message.userManualUrl = object.userManualUrl ?? "";
    message.supportUrl = object.supportUrl ?? "";
    message.productUrl = object.productUrl ?? "";
    message.lsfUrl = object.lsfUrl ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    message.managedAclExtensionRequestFlowUrl = object.managedAclExtensionRequestFlowUrl ?? "";
    message.enhancedSetupFlowOptions = object.enhancedSetupFlowOptions ?? 0;
    message.enhancedSetupFlowTCUrl = object.enhancedSetupFlowTCUrl ?? "";
    message.enhancedSetupFlowTCRevision = object.enhancedSetupFlowTCRevision ?? 0;
    message.enhancedSetupFlowTCDigest = object.enhancedSetupFlowTCDigest ?? "";
    message.enhancedSetupFlowTCFileSize = object.enhancedSetupFlowTCFileSize ?? 0;
    message.maintenanceUrl = object.maintenanceUrl ?? "";
    return message;
  },
};

function createBaseMsgCreateModelResponse(): MsgCreateModelResponse {
  return {};
}

export const MsgCreateModelResponse = {
  encode(_: MsgCreateModelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateModelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateModelResponse();
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

  fromJSON(_: any): MsgCreateModelResponse {
    return {};
  },

  toJSON(_: MsgCreateModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateModelResponse>, I>>(base?: I): MsgCreateModelResponse {
    return MsgCreateModelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateModelResponse>, I>>(_: I): MsgCreateModelResponse {
    const message = createBaseMsgCreateModelResponse();
    return message;
  },
};

function createBaseMsgUpdateModel(): MsgUpdateModel {
  return {
    creator: "",
    vid: 0,
    pid: 0,
    productName: "",
    productLabel: "",
    partNumber: "",
    commissioningCustomFlowUrl: "",
    commissioningModeInitialStepsInstruction: "",
    commissioningModeSecondaryStepsInstruction: "",
    userManualUrl: "",
    supportUrl: "",
    productUrl: "",
    lsfUrl: "",
    lsfRevision: 0,
    schemaVersion: 0,
    managedAclExtensionRequestFlowUrl: "",
    commissioningModeInitialStepsHint: 0,
    enhancedSetupFlowOptions: 0,
    enhancedSetupFlowTCUrl: "",
    enhancedSetupFlowTCRevision: 0,
    enhancedSetupFlowTCDigest: "",
    enhancedSetupFlowTCFileSize: 0,
    maintenanceUrl: "",
  };
}

export const MsgUpdateModel = {
  encode(message: MsgUpdateModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.productName !== "") {
      writer.uint32(34).string(message.productName);
    }
    if (message.productLabel !== "") {
      writer.uint32(42).string(message.productLabel);
    }
    if (message.partNumber !== "") {
      writer.uint32(50).string(message.partNumber);
    }
    if (message.commissioningCustomFlowUrl !== "") {
      writer.uint32(58).string(message.commissioningCustomFlowUrl);
    }
    if (message.commissioningModeInitialStepsInstruction !== "") {
      writer.uint32(66).string(message.commissioningModeInitialStepsInstruction);
    }
    if (message.commissioningModeSecondaryStepsInstruction !== "") {
      writer.uint32(74).string(message.commissioningModeSecondaryStepsInstruction);
    }
    if (message.userManualUrl !== "") {
      writer.uint32(82).string(message.userManualUrl);
    }
    if (message.supportUrl !== "") {
      writer.uint32(90).string(message.supportUrl);
    }
    if (message.productUrl !== "") {
      writer.uint32(98).string(message.productUrl);
    }
    if (message.lsfUrl !== "") {
      writer.uint32(106).string(message.lsfUrl);
    }
    if (message.lsfRevision !== 0) {
      writer.uint32(112).int32(message.lsfRevision);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(120).uint32(message.schemaVersion);
    }
    if (message.managedAclExtensionRequestFlowUrl !== "") {
      writer.uint32(130).string(message.managedAclExtensionRequestFlowUrl);
    }
    if (message.commissioningModeInitialStepsHint !== 0) {
      writer.uint32(136).uint32(message.commissioningModeInitialStepsHint);
    }
    if (message.enhancedSetupFlowOptions !== 0) {
      writer.uint32(144).int32(message.enhancedSetupFlowOptions);
    }
    if (message.enhancedSetupFlowTCUrl !== "") {
      writer.uint32(154).string(message.enhancedSetupFlowTCUrl);
    }
    if (message.enhancedSetupFlowTCRevision !== 0) {
      writer.uint32(160).int32(message.enhancedSetupFlowTCRevision);
    }
    if (message.enhancedSetupFlowTCDigest !== "") {
      writer.uint32(170).string(message.enhancedSetupFlowTCDigest);
    }
    if (message.enhancedSetupFlowTCFileSize !== 0) {
      writer.uint32(176).uint32(message.enhancedSetupFlowTCFileSize);
    }
    if (message.maintenanceUrl !== "") {
      writer.uint32(186).string(message.maintenanceUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateModel();
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
          if (tag !== 34) {
            break;
          }

          message.productName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.productLabel = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.partNumber = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.commissioningCustomFlowUrl = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.commissioningModeInitialStepsInstruction = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.commissioningModeSecondaryStepsInstruction = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.userManualUrl = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.supportUrl = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.productUrl = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.lsfUrl = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.lsfRevision = reader.int32();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.managedAclExtensionRequestFlowUrl = reader.string();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.commissioningModeInitialStepsHint = reader.uint32();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.enhancedSetupFlowOptions = reader.int32();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.enhancedSetupFlowTCUrl = reader.string();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.enhancedSetupFlowTCRevision = reader.int32();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.enhancedSetupFlowTCDigest = reader.string();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.enhancedSetupFlowTCFileSize = reader.uint32();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.maintenanceUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateModel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      productName: isSet(object.productName) ? String(object.productName) : "",
      productLabel: isSet(object.productLabel) ? String(object.productLabel) : "",
      partNumber: isSet(object.partNumber) ? String(object.partNumber) : "",
      commissioningCustomFlowUrl: isSet(object.commissioningCustomFlowUrl)
        ? String(object.commissioningCustomFlowUrl)
        : "",
      commissioningModeInitialStepsInstruction: isSet(object.commissioningModeInitialStepsInstruction)
        ? String(object.commissioningModeInitialStepsInstruction)
        : "",
      commissioningModeSecondaryStepsInstruction: isSet(object.commissioningModeSecondaryStepsInstruction)
        ? String(object.commissioningModeSecondaryStepsInstruction)
        : "",
      userManualUrl: isSet(object.userManualUrl) ? String(object.userManualUrl) : "",
      supportUrl: isSet(object.supportUrl) ? String(object.supportUrl) : "",
      productUrl: isSet(object.productUrl) ? String(object.productUrl) : "",
      lsfUrl: isSet(object.lsfUrl) ? String(object.lsfUrl) : "",
      lsfRevision: isSet(object.lsfRevision) ? Number(object.lsfRevision) : 0,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
      managedAclExtensionRequestFlowUrl: isSet(object.managedAclExtensionRequestFlowUrl)
        ? String(object.managedAclExtensionRequestFlowUrl)
        : "",
      commissioningModeInitialStepsHint: isSet(object.commissioningModeInitialStepsHint)
        ? Number(object.commissioningModeInitialStepsHint)
        : 0,
      enhancedSetupFlowOptions: isSet(object.enhancedSetupFlowOptions) ? Number(object.enhancedSetupFlowOptions) : 0,
      enhancedSetupFlowTCUrl: isSet(object.enhancedSetupFlowTCUrl) ? String(object.enhancedSetupFlowTCUrl) : "",
      enhancedSetupFlowTCRevision: isSet(object.enhancedSetupFlowTCRevision)
        ? Number(object.enhancedSetupFlowTCRevision)
        : 0,
      enhancedSetupFlowTCDigest: isSet(object.enhancedSetupFlowTCDigest)
        ? String(object.enhancedSetupFlowTCDigest)
        : "",
      enhancedSetupFlowTCFileSize: isSet(object.enhancedSetupFlowTCFileSize)
        ? Number(object.enhancedSetupFlowTCFileSize)
        : 0,
      maintenanceUrl: isSet(object.maintenanceUrl) ? String(object.maintenanceUrl) : "",
    };
  },

  toJSON(message: MsgUpdateModel): unknown {
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
    if (message.productName !== "") {
      obj.productName = message.productName;
    }
    if (message.productLabel !== "") {
      obj.productLabel = message.productLabel;
    }
    if (message.partNumber !== "") {
      obj.partNumber = message.partNumber;
    }
    if (message.commissioningCustomFlowUrl !== "") {
      obj.commissioningCustomFlowUrl = message.commissioningCustomFlowUrl;
    }
    if (message.commissioningModeInitialStepsInstruction !== "") {
      obj.commissioningModeInitialStepsInstruction = message.commissioningModeInitialStepsInstruction;
    }
    if (message.commissioningModeSecondaryStepsInstruction !== "") {
      obj.commissioningModeSecondaryStepsInstruction = message.commissioningModeSecondaryStepsInstruction;
    }
    if (message.userManualUrl !== "") {
      obj.userManualUrl = message.userManualUrl;
    }
    if (message.supportUrl !== "") {
      obj.supportUrl = message.supportUrl;
    }
    if (message.productUrl !== "") {
      obj.productUrl = message.productUrl;
    }
    if (message.lsfUrl !== "") {
      obj.lsfUrl = message.lsfUrl;
    }
    if (message.lsfRevision !== 0) {
      obj.lsfRevision = Math.round(message.lsfRevision);
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    if (message.managedAclExtensionRequestFlowUrl !== "") {
      obj.managedAclExtensionRequestFlowUrl = message.managedAclExtensionRequestFlowUrl;
    }
    if (message.commissioningModeInitialStepsHint !== 0) {
      obj.commissioningModeInitialStepsHint = Math.round(message.commissioningModeInitialStepsHint);
    }
    if (message.enhancedSetupFlowOptions !== 0) {
      obj.enhancedSetupFlowOptions = Math.round(message.enhancedSetupFlowOptions);
    }
    if (message.enhancedSetupFlowTCUrl !== "") {
      obj.enhancedSetupFlowTCUrl = message.enhancedSetupFlowTCUrl;
    }
    if (message.enhancedSetupFlowTCRevision !== 0) {
      obj.enhancedSetupFlowTCRevision = Math.round(message.enhancedSetupFlowTCRevision);
    }
    if (message.enhancedSetupFlowTCDigest !== "") {
      obj.enhancedSetupFlowTCDigest = message.enhancedSetupFlowTCDigest;
    }
    if (message.enhancedSetupFlowTCFileSize !== 0) {
      obj.enhancedSetupFlowTCFileSize = Math.round(message.enhancedSetupFlowTCFileSize);
    }
    if (message.maintenanceUrl !== "") {
      obj.maintenanceUrl = message.maintenanceUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateModel>, I>>(base?: I): MsgUpdateModel {
    return MsgUpdateModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateModel>, I>>(object: I): MsgUpdateModel {
    const message = createBaseMsgUpdateModel();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.productName = object.productName ?? "";
    message.productLabel = object.productLabel ?? "";
    message.partNumber = object.partNumber ?? "";
    message.commissioningCustomFlowUrl = object.commissioningCustomFlowUrl ?? "";
    message.commissioningModeInitialStepsInstruction = object.commissioningModeInitialStepsInstruction ?? "";
    message.commissioningModeSecondaryStepsInstruction = object.commissioningModeSecondaryStepsInstruction ?? "";
    message.userManualUrl = object.userManualUrl ?? "";
    message.supportUrl = object.supportUrl ?? "";
    message.productUrl = object.productUrl ?? "";
    message.lsfUrl = object.lsfUrl ?? "";
    message.lsfRevision = object.lsfRevision ?? 0;
    message.schemaVersion = object.schemaVersion ?? 0;
    message.managedAclExtensionRequestFlowUrl = object.managedAclExtensionRequestFlowUrl ?? "";
    message.commissioningModeInitialStepsHint = object.commissioningModeInitialStepsHint ?? 0;
    message.enhancedSetupFlowOptions = object.enhancedSetupFlowOptions ?? 0;
    message.enhancedSetupFlowTCUrl = object.enhancedSetupFlowTCUrl ?? "";
    message.enhancedSetupFlowTCRevision = object.enhancedSetupFlowTCRevision ?? 0;
    message.enhancedSetupFlowTCDigest = object.enhancedSetupFlowTCDigest ?? "";
    message.enhancedSetupFlowTCFileSize = object.enhancedSetupFlowTCFileSize ?? 0;
    message.maintenanceUrl = object.maintenanceUrl ?? "";
    return message;
  },
};

function createBaseMsgUpdateModelResponse(): MsgUpdateModelResponse {
  return {};
}

export const MsgUpdateModelResponse = {
  encode(_: MsgUpdateModelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateModelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateModelResponse();
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

  fromJSON(_: any): MsgUpdateModelResponse {
    return {};
  },

  toJSON(_: MsgUpdateModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateModelResponse>, I>>(base?: I): MsgUpdateModelResponse {
    return MsgUpdateModelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateModelResponse>, I>>(_: I): MsgUpdateModelResponse {
    const message = createBaseMsgUpdateModelResponse();
    return message;
  },
};

function createBaseMsgDeleteModel(): MsgDeleteModel {
  return { creator: "", vid: 0, pid: 0 };
}

export const MsgDeleteModel = {
  encode(message: MsgDeleteModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteModel();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteModel {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
    };
  },

  toJSON(message: MsgDeleteModel): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteModel>, I>>(base?: I): MsgDeleteModel {
    return MsgDeleteModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteModel>, I>>(object: I): MsgDeleteModel {
    const message = createBaseMsgDeleteModel();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    return message;
  },
};

function createBaseMsgDeleteModelResponse(): MsgDeleteModelResponse {
  return {};
}

export const MsgDeleteModelResponse = {
  encode(_: MsgDeleteModelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteModelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteModelResponse();
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

  fromJSON(_: any): MsgDeleteModelResponse {
    return {};
  },

  toJSON(_: MsgDeleteModelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteModelResponse>, I>>(base?: I): MsgDeleteModelResponse {
    return MsgDeleteModelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteModelResponse>, I>>(_: I): MsgDeleteModelResponse {
    const message = createBaseMsgDeleteModelResponse();
    return message;
  },
};

function createBaseMsgCreateModelVersion(): MsgCreateModelVersion {
  return {
    creator: "",
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    softwareVersionString: "",
    cdVersionNumber: 0,
    firmwareInformation: "",
    softwareVersionValid: false,
    otaUrl: "",
    otaFileSize: 0,
    otaChecksum: "",
    otaChecksumType: 0,
    minApplicableSoftwareVersion: 0,
    maxApplicableSoftwareVersion: 0,
    releaseNotesUrl: "",
    schemaVersion: 0,
  };
}

export const MsgCreateModelVersion = {
  encode(message: MsgCreateModelVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.softwareVersionString !== "") {
      writer.uint32(42).string(message.softwareVersionString);
    }
    if (message.cdVersionNumber !== 0) {
      writer.uint32(48).int32(message.cdVersionNumber);
    }
    if (message.firmwareInformation !== "") {
      writer.uint32(58).string(message.firmwareInformation);
    }
    if (message.softwareVersionValid === true) {
      writer.uint32(64).bool(message.softwareVersionValid);
    }
    if (message.otaUrl !== "") {
      writer.uint32(74).string(message.otaUrl);
    }
    if (message.otaFileSize !== 0) {
      writer.uint32(80).uint64(message.otaFileSize);
    }
    if (message.otaChecksum !== "") {
      writer.uint32(90).string(message.otaChecksum);
    }
    if (message.otaChecksumType !== 0) {
      writer.uint32(96).int32(message.otaChecksumType);
    }
    if (message.minApplicableSoftwareVersion !== 0) {
      writer.uint32(104).uint32(message.minApplicableSoftwareVersion);
    }
    if (message.maxApplicableSoftwareVersion !== 0) {
      writer.uint32(112).uint32(message.maxApplicableSoftwareVersion);
    }
    if (message.releaseNotesUrl !== "") {
      writer.uint32(122).string(message.releaseNotesUrl);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(128).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateModelVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateModelVersion();
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

          message.softwareVersionString = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.cdVersionNumber = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.firmwareInformation = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.softwareVersionValid = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.otaUrl = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.otaFileSize = longToNumber(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.otaChecksum = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.otaChecksumType = reader.int32();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.minApplicableSoftwareVersion = reader.uint32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.maxApplicableSoftwareVersion = reader.uint32();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.releaseNotesUrl = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
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

  fromJSON(object: any): MsgCreateModelVersion {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      softwareVersionString: isSet(object.softwareVersionString) ? String(object.softwareVersionString) : "",
      cdVersionNumber: isSet(object.cdVersionNumber) ? Number(object.cdVersionNumber) : 0,
      firmwareInformation: isSet(object.firmwareInformation) ? String(object.firmwareInformation) : "",
      softwareVersionValid: isSet(object.softwareVersionValid) ? Boolean(object.softwareVersionValid) : false,
      otaUrl: isSet(object.otaUrl) ? String(object.otaUrl) : "",
      otaFileSize: isSet(object.otaFileSize) ? Number(object.otaFileSize) : 0,
      otaChecksum: isSet(object.otaChecksum) ? String(object.otaChecksum) : "",
      otaChecksumType: isSet(object.otaChecksumType) ? Number(object.otaChecksumType) : 0,
      minApplicableSoftwareVersion: isSet(object.minApplicableSoftwareVersion)
        ? Number(object.minApplicableSoftwareVersion)
        : 0,
      maxApplicableSoftwareVersion: isSet(object.maxApplicableSoftwareVersion)
        ? Number(object.maxApplicableSoftwareVersion)
        : 0,
      releaseNotesUrl: isSet(object.releaseNotesUrl) ? String(object.releaseNotesUrl) : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: MsgCreateModelVersion): unknown {
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
    if (message.softwareVersionString !== "") {
      obj.softwareVersionString = message.softwareVersionString;
    }
    if (message.cdVersionNumber !== 0) {
      obj.cdVersionNumber = Math.round(message.cdVersionNumber);
    }
    if (message.firmwareInformation !== "") {
      obj.firmwareInformation = message.firmwareInformation;
    }
    if (message.softwareVersionValid === true) {
      obj.softwareVersionValid = message.softwareVersionValid;
    }
    if (message.otaUrl !== "") {
      obj.otaUrl = message.otaUrl;
    }
    if (message.otaFileSize !== 0) {
      obj.otaFileSize = Math.round(message.otaFileSize);
    }
    if (message.otaChecksum !== "") {
      obj.otaChecksum = message.otaChecksum;
    }
    if (message.otaChecksumType !== 0) {
      obj.otaChecksumType = Math.round(message.otaChecksumType);
    }
    if (message.minApplicableSoftwareVersion !== 0) {
      obj.minApplicableSoftwareVersion = Math.round(message.minApplicableSoftwareVersion);
    }
    if (message.maxApplicableSoftwareVersion !== 0) {
      obj.maxApplicableSoftwareVersion = Math.round(message.maxApplicableSoftwareVersion);
    }
    if (message.releaseNotesUrl !== "") {
      obj.releaseNotesUrl = message.releaseNotesUrl;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateModelVersion>, I>>(base?: I): MsgCreateModelVersion {
    return MsgCreateModelVersion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateModelVersion>, I>>(object: I): MsgCreateModelVersion {
    const message = createBaseMsgCreateModelVersion();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.softwareVersionString = object.softwareVersionString ?? "";
    message.cdVersionNumber = object.cdVersionNumber ?? 0;
    message.firmwareInformation = object.firmwareInformation ?? "";
    message.softwareVersionValid = object.softwareVersionValid ?? false;
    message.otaUrl = object.otaUrl ?? "";
    message.otaFileSize = object.otaFileSize ?? 0;
    message.otaChecksum = object.otaChecksum ?? "";
    message.otaChecksumType = object.otaChecksumType ?? 0;
    message.minApplicableSoftwareVersion = object.minApplicableSoftwareVersion ?? 0;
    message.maxApplicableSoftwareVersion = object.maxApplicableSoftwareVersion ?? 0;
    message.releaseNotesUrl = object.releaseNotesUrl ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgCreateModelVersionResponse(): MsgCreateModelVersionResponse {
  return {};
}

export const MsgCreateModelVersionResponse = {
  encode(_: MsgCreateModelVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateModelVersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateModelVersionResponse();
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

  fromJSON(_: any): MsgCreateModelVersionResponse {
    return {};
  },

  toJSON(_: MsgCreateModelVersionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateModelVersionResponse>, I>>(base?: I): MsgCreateModelVersionResponse {
    return MsgCreateModelVersionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateModelVersionResponse>, I>>(_: I): MsgCreateModelVersionResponse {
    const message = createBaseMsgCreateModelVersionResponse();
    return message;
  },
};

function createBaseMsgUpdateModelVersion(): MsgUpdateModelVersion {
  return {
    creator: "",
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    softwareVersionValid: false,
    otaUrl: "",
    minApplicableSoftwareVersion: 0,
    maxApplicableSoftwareVersion: 0,
    releaseNotesUrl: "",
    otaFileSize: 0,
    otaChecksum: "",
    schemaVersion: 0,
  };
}

export const MsgUpdateModelVersion = {
  encode(message: MsgUpdateModelVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.softwareVersionValid === true) {
      writer.uint32(40).bool(message.softwareVersionValid);
    }
    if (message.otaUrl !== "") {
      writer.uint32(50).string(message.otaUrl);
    }
    if (message.minApplicableSoftwareVersion !== 0) {
      writer.uint32(56).uint32(message.minApplicableSoftwareVersion);
    }
    if (message.maxApplicableSoftwareVersion !== 0) {
      writer.uint32(64).uint32(message.maxApplicableSoftwareVersion);
    }
    if (message.releaseNotesUrl !== "") {
      writer.uint32(74).string(message.releaseNotesUrl);
    }
    if (message.otaFileSize !== 0) {
      writer.uint32(80).uint64(message.otaFileSize);
    }
    if (message.otaChecksum !== "") {
      writer.uint32(90).string(message.otaChecksum);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(96).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateModelVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateModelVersion();
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
          if (tag !== 40) {
            break;
          }

          message.softwareVersionValid = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.otaUrl = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.minApplicableSoftwareVersion = reader.uint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.maxApplicableSoftwareVersion = reader.uint32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.releaseNotesUrl = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.otaFileSize = longToNumber(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.otaChecksum = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
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

  fromJSON(object: any): MsgUpdateModelVersion {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      softwareVersionValid: isSet(object.softwareVersionValid) ? Boolean(object.softwareVersionValid) : false,
      otaUrl: isSet(object.otaUrl) ? String(object.otaUrl) : "",
      minApplicableSoftwareVersion: isSet(object.minApplicableSoftwareVersion)
        ? Number(object.minApplicableSoftwareVersion)
        : 0,
      maxApplicableSoftwareVersion: isSet(object.maxApplicableSoftwareVersion)
        ? Number(object.maxApplicableSoftwareVersion)
        : 0,
      releaseNotesUrl: isSet(object.releaseNotesUrl) ? String(object.releaseNotesUrl) : "",
      otaFileSize: isSet(object.otaFileSize) ? Number(object.otaFileSize) : 0,
      otaChecksum: isSet(object.otaChecksum) ? String(object.otaChecksum) : "",
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: MsgUpdateModelVersion): unknown {
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
    if (message.softwareVersionValid === true) {
      obj.softwareVersionValid = message.softwareVersionValid;
    }
    if (message.otaUrl !== "") {
      obj.otaUrl = message.otaUrl;
    }
    if (message.minApplicableSoftwareVersion !== 0) {
      obj.minApplicableSoftwareVersion = Math.round(message.minApplicableSoftwareVersion);
    }
    if (message.maxApplicableSoftwareVersion !== 0) {
      obj.maxApplicableSoftwareVersion = Math.round(message.maxApplicableSoftwareVersion);
    }
    if (message.releaseNotesUrl !== "") {
      obj.releaseNotesUrl = message.releaseNotesUrl;
    }
    if (message.otaFileSize !== 0) {
      obj.otaFileSize = Math.round(message.otaFileSize);
    }
    if (message.otaChecksum !== "") {
      obj.otaChecksum = message.otaChecksum;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateModelVersion>, I>>(base?: I): MsgUpdateModelVersion {
    return MsgUpdateModelVersion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateModelVersion>, I>>(object: I): MsgUpdateModelVersion {
    const message = createBaseMsgUpdateModelVersion();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.softwareVersionValid = object.softwareVersionValid ?? false;
    message.otaUrl = object.otaUrl ?? "";
    message.minApplicableSoftwareVersion = object.minApplicableSoftwareVersion ?? 0;
    message.maxApplicableSoftwareVersion = object.maxApplicableSoftwareVersion ?? 0;
    message.releaseNotesUrl = object.releaseNotesUrl ?? "";
    message.otaFileSize = object.otaFileSize ?? 0;
    message.otaChecksum = object.otaChecksum ?? "";
    message.schemaVersion = object.schemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgUpdateModelVersionResponse(): MsgUpdateModelVersionResponse {
  return {};
}

export const MsgUpdateModelVersionResponse = {
  encode(_: MsgUpdateModelVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateModelVersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateModelVersionResponse();
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

  fromJSON(_: any): MsgUpdateModelVersionResponse {
    return {};
  },

  toJSON(_: MsgUpdateModelVersionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateModelVersionResponse>, I>>(base?: I): MsgUpdateModelVersionResponse {
    return MsgUpdateModelVersionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateModelVersionResponse>, I>>(_: I): MsgUpdateModelVersionResponse {
    const message = createBaseMsgUpdateModelVersionResponse();
    return message;
  },
};

function createBaseMsgDeleteModelVersion(): MsgDeleteModelVersion {
  return { creator: "", vid: 0, pid: 0, softwareVersion: 0 };
}

export const MsgDeleteModelVersion = {
  encode(message: MsgDeleteModelVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteModelVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteModelVersion();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteModelVersion {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
    };
  },

  toJSON(message: MsgDeleteModelVersion): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteModelVersion>, I>>(base?: I): MsgDeleteModelVersion {
    return MsgDeleteModelVersion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteModelVersion>, I>>(object: I): MsgDeleteModelVersion {
    const message = createBaseMsgDeleteModelVersion();
    message.creator = object.creator ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    return message;
  },
};

function createBaseMsgDeleteModelVersionResponse(): MsgDeleteModelVersionResponse {
  return {};
}

export const MsgDeleteModelVersionResponse = {
  encode(_: MsgDeleteModelVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteModelVersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteModelVersionResponse();
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

  fromJSON(_: any): MsgDeleteModelVersionResponse {
    return {};
  },

  toJSON(_: MsgDeleteModelVersionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteModelVersionResponse>, I>>(base?: I): MsgDeleteModelVersionResponse {
    return MsgDeleteModelVersionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteModelVersionResponse>, I>>(_: I): MsgDeleteModelVersionResponse {
    const message = createBaseMsgDeleteModelVersionResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateModel(request: MsgCreateModel): Promise<MsgCreateModelResponse>;
  UpdateModel(request: MsgUpdateModel): Promise<MsgUpdateModelResponse>;
  DeleteModel(request: MsgDeleteModel): Promise<MsgDeleteModelResponse>;
  CreateModelVersion(request: MsgCreateModelVersion): Promise<MsgCreateModelVersionResponse>;
  UpdateModelVersion(request: MsgUpdateModelVersion): Promise<MsgUpdateModelVersionResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteModelVersion(request: MsgDeleteModelVersion): Promise<MsgDeleteModelVersionResponse>;
}

export const MsgServiceName = "zigbeealliance.distributedcomplianceledger.model.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateModel = this.CreateModel.bind(this);
    this.UpdateModel = this.UpdateModel.bind(this);
    this.DeleteModel = this.DeleteModel.bind(this);
    this.CreateModelVersion = this.CreateModelVersion.bind(this);
    this.UpdateModelVersion = this.UpdateModelVersion.bind(this);
    this.DeleteModelVersion = this.DeleteModelVersion.bind(this);
  }
  CreateModel(request: MsgCreateModel): Promise<MsgCreateModelResponse> {
    const data = MsgCreateModel.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateModel", data);
    return promise.then((data) => MsgCreateModelResponse.decode(_m0.Reader.create(data)));
  }

  UpdateModel(request: MsgUpdateModel): Promise<MsgUpdateModelResponse> {
    const data = MsgUpdateModel.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateModel", data);
    return promise.then((data) => MsgUpdateModelResponse.decode(_m0.Reader.create(data)));
  }

  DeleteModel(request: MsgDeleteModel): Promise<MsgDeleteModelResponse> {
    const data = MsgDeleteModel.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteModel", data);
    return promise.then((data) => MsgDeleteModelResponse.decode(_m0.Reader.create(data)));
  }

  CreateModelVersion(request: MsgCreateModelVersion): Promise<MsgCreateModelVersionResponse> {
    const data = MsgCreateModelVersion.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateModelVersion", data);
    return promise.then((data) => MsgCreateModelVersionResponse.decode(_m0.Reader.create(data)));
  }

  UpdateModelVersion(request: MsgUpdateModelVersion): Promise<MsgUpdateModelVersionResponse> {
    const data = MsgUpdateModelVersion.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateModelVersion", data);
    return promise.then((data) => MsgUpdateModelVersionResponse.decode(_m0.Reader.create(data)));
  }

  DeleteModelVersion(request: MsgDeleteModelVersion): Promise<MsgDeleteModelVersionResponse> {
    const data = MsgDeleteModelVersion.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteModelVersion", data);
    return promise.then((data) => MsgDeleteModelVersionResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
