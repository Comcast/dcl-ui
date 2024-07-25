/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ComplianceHistoryItem } from "./compliance_history_item";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";

export interface ComplianceInfo {
  vid: number;
  pid: number;
  softwareVersion: number;
  certificationType: string;
  softwareVersionString: string;
  cDVersionNumber: number;
  softwareVersionCertificationStatus: number;
  date: string;
  reason: string;
  owner: string;
  history: ComplianceHistoryItem[];
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

function createBaseComplianceInfo(): ComplianceInfo {
  return {
    vid: 0,
    pid: 0,
    softwareVersion: 0,
    certificationType: "",
    softwareVersionString: "",
    cDVersionNumber: 0,
    softwareVersionCertificationStatus: 0,
    date: "",
    reason: "",
    owner: "",
    history: [],
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

export const ComplianceInfo = {
  encode(message: ComplianceInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vid !== 0) {
      writer.uint32(8).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(16).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(24).uint32(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      writer.uint32(34).string(message.certificationType);
    }
    if (message.softwareVersionString !== "") {
      writer.uint32(42).string(message.softwareVersionString);
    }
    if (message.cDVersionNumber !== 0) {
      writer.uint32(48).uint32(message.cDVersionNumber);
    }
    if (message.softwareVersionCertificationStatus !== 0) {
      writer.uint32(56).uint32(message.softwareVersionCertificationStatus);
    }
    if (message.date !== "") {
      writer.uint32(66).string(message.date);
    }
    if (message.reason !== "") {
      writer.uint32(74).string(message.reason);
    }
    if (message.owner !== "") {
      writer.uint32(82).string(message.owner);
    }
    for (const v of message.history) {
      ComplianceHistoryItem.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.cDCertificateId !== "") {
      writer.uint32(98).string(message.cDCertificateId);
    }
    if (message.certificationRoute !== "") {
      writer.uint32(106).string(message.certificationRoute);
    }
    if (message.programType !== "") {
      writer.uint32(114).string(message.programType);
    }
    if (message.programTypeVersion !== "") {
      writer.uint32(122).string(message.programTypeVersion);
    }
    if (message.compliantPlatformUsed !== "") {
      writer.uint32(130).string(message.compliantPlatformUsed);
    }
    if (message.compliantPlatformVersion !== "") {
      writer.uint32(138).string(message.compliantPlatformVersion);
    }
    if (message.transport !== "") {
      writer.uint32(146).string(message.transport);
    }
    if (message.familyId !== "") {
      writer.uint32(154).string(message.familyId);
    }
    if (message.supportedClusters !== "") {
      writer.uint32(162).string(message.supportedClusters);
    }
    if (message.OSVersion !== "") {
      writer.uint32(170).string(message.OSVersion);
    }
    if (message.parentChild !== "") {
      writer.uint32(178).string(message.parentChild);
    }
    if (message.certificationIdOfSoftwareComponent !== "") {
      writer.uint32(186).string(message.certificationIdOfSoftwareComponent);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(192).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComplianceInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComplianceInfo();
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

          message.softwareVersion = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.certificationType = reader.string();
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
          if (tag !== 56) {
            break;
          }

          message.softwareVersionCertificationStatus = reader.uint32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.date = reader.string();
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

          message.owner = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.history.push(ComplianceHistoryItem.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.cDCertificateId = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.certificationRoute = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.programType = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.programTypeVersion = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.compliantPlatformUsed = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.compliantPlatformVersion = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.transport = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.familyId = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.supportedClusters = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.OSVersion = reader.string();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.parentChild = reader.string();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.certificationIdOfSoftwareComponent = reader.string();
          continue;
        case 24:
          if (tag !== 192) {
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

  fromJSON(object: any): ComplianceInfo {
    return {
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
      softwareVersionString: isSet(object.softwareVersionString) ? String(object.softwareVersionString) : "",
      cDVersionNumber: isSet(object.cDVersionNumber) ? Number(object.cDVersionNumber) : 0,
      softwareVersionCertificationStatus: isSet(object.softwareVersionCertificationStatus)
        ? Number(object.softwareVersionCertificationStatus)
        : 0,
      date: isSet(object.date) ? String(object.date) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      history: Array.isArray(object?.history) ? object.history.map((e: any) => ComplianceHistoryItem.fromJSON(e)) : [],
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

  toJSON(message: ComplianceInfo): unknown {
    const obj: any = {};
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
    if (message.softwareVersionString !== "") {
      obj.softwareVersionString = message.softwareVersionString;
    }
    if (message.cDVersionNumber !== 0) {
      obj.cDVersionNumber = Math.round(message.cDVersionNumber);
    }
    if (message.softwareVersionCertificationStatus !== 0) {
      obj.softwareVersionCertificationStatus = Math.round(message.softwareVersionCertificationStatus);
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
    if (message.history?.length) {
      obj.history = message.history.map((e) => ComplianceHistoryItem.toJSON(e));
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

  create<I extends Exact<DeepPartial<ComplianceInfo>, I>>(base?: I): ComplianceInfo {
    return ComplianceInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComplianceInfo>, I>>(object: I): ComplianceInfo {
    const message = createBaseComplianceInfo();
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.certificationType = object.certificationType ?? "";
    message.softwareVersionString = object.softwareVersionString ?? "";
    message.cDVersionNumber = object.cDVersionNumber ?? 0;
    message.softwareVersionCertificationStatus = object.softwareVersionCertificationStatus ?? 0;
    message.date = object.date ?? "";
    message.reason = object.reason ?? "";
    message.owner = object.owner ?? "";
    message.history = object.history?.map((e) => ComplianceHistoryItem.fromPartial(e)) || [];
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
