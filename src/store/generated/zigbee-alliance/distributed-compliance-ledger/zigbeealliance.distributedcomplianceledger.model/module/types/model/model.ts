/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.model";

export interface Model {
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
  lsfRevision: number;
  creator: string;
  schemaVersion: number;
  managedAclExtensionRequestFlowUrl: string;
  enhancedSetupFlowOptions: number;
  enhancedSetupFlowTCUrl: string;
  enhancedSetupFlowTCRevision: number;
  enhancedSetupFlowTCDigest: string;
  enhancedSetupFlowTCFileSize: number;
  maintenanceUrl: string;
}

function createBaseModel(): Model {
  return {
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
    lsfRevision: 0,
    creator: "",
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

export const Model = {
  encode(message: Model, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vid !== 0) {
      writer.uint32(8).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(16).int32(message.pid);
    }
    if (message.deviceTypeId !== 0) {
      writer.uint32(24).int32(message.deviceTypeId);
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
    if (message.commissioningCustomFlow !== 0) {
      writer.uint32(56).int32(message.commissioningCustomFlow);
    }
    if (message.commissioningCustomFlowUrl !== "") {
      writer.uint32(66).string(message.commissioningCustomFlowUrl);
    }
    if (message.commissioningModeInitialStepsHint !== 0) {
      writer.uint32(72).uint32(message.commissioningModeInitialStepsHint);
    }
    if (message.commissioningModeInitialStepsInstruction !== "") {
      writer.uint32(82).string(message.commissioningModeInitialStepsInstruction);
    }
    if (message.commissioningModeSecondaryStepsHint !== 0) {
      writer.uint32(88).uint32(message.commissioningModeSecondaryStepsHint);
    }
    if (message.commissioningModeSecondaryStepsInstruction !== "") {
      writer.uint32(98).string(message.commissioningModeSecondaryStepsInstruction);
    }
    if (message.userManualUrl !== "") {
      writer.uint32(106).string(message.userManualUrl);
    }
    if (message.supportUrl !== "") {
      writer.uint32(114).string(message.supportUrl);
    }
    if (message.productUrl !== "") {
      writer.uint32(122).string(message.productUrl);
    }
    if (message.lsfUrl !== "") {
      writer.uint32(130).string(message.lsfUrl);
    }
    if (message.lsfRevision !== 0) {
      writer.uint32(136).int32(message.lsfRevision);
    }
    if (message.creator !== "") {
      writer.uint32(146).string(message.creator);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(152).uint32(message.schemaVersion);
    }
    if (message.managedAclExtensionRequestFlowUrl !== "") {
      writer.uint32(162).string(message.managedAclExtensionRequestFlowUrl);
    }
    if (message.enhancedSetupFlowOptions !== 0) {
      writer.uint32(168).int32(message.enhancedSetupFlowOptions);
    }
    if (message.enhancedSetupFlowTCUrl !== "") {
      writer.uint32(178).string(message.enhancedSetupFlowTCUrl);
    }
    if (message.enhancedSetupFlowTCRevision !== 0) {
      writer.uint32(184).int32(message.enhancedSetupFlowTCRevision);
    }
    if (message.enhancedSetupFlowTCDigest !== "") {
      writer.uint32(194).string(message.enhancedSetupFlowTCDigest);
    }
    if (message.enhancedSetupFlowTCFileSize !== 0) {
      writer.uint32(200).uint32(message.enhancedSetupFlowTCFileSize);
    }
    if (message.maintenanceUrl !== "") {
      writer.uint32(210).string(message.maintenanceUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Model {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.deviceTypeId = reader.int32();
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
          if (tag !== 56) {
            break;
          }

          message.commissioningCustomFlow = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.commissioningCustomFlowUrl = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.commissioningModeInitialStepsHint = reader.uint32();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.commissioningModeInitialStepsInstruction = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.commissioningModeSecondaryStepsHint = reader.uint32();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.commissioningModeSecondaryStepsInstruction = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.userManualUrl = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.supportUrl = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.productUrl = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.lsfUrl = reader.string();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.lsfRevision = reader.int32();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.managedAclExtensionRequestFlowUrl = reader.string();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.enhancedSetupFlowOptions = reader.int32();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.enhancedSetupFlowTCUrl = reader.string();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.enhancedSetupFlowTCRevision = reader.int32();
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.enhancedSetupFlowTCDigest = reader.string();
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.enhancedSetupFlowTCFileSize = reader.uint32();
          continue;
        case 26:
          if (tag !== 210) {
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

  fromJSON(object: any): Model {
    return {
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
      lsfRevision: isSet(object.lsfRevision) ? Number(object.lsfRevision) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
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

  toJSON(message: Model): unknown {
    const obj: any = {};
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
    if (message.lsfRevision !== 0) {
      obj.lsfRevision = Math.round(message.lsfRevision);
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
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

  create<I extends Exact<DeepPartial<Model>, I>>(base?: I): Model {
    return Model.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Model>, I>>(object: I): Model {
    const message = createBaseModel();
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
    message.lsfRevision = object.lsfRevision ?? 0;
    message.creator = object.creator ?? "";
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
