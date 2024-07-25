/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface PkiRevocationDistributionPoint {
  vid: number;
  label: string;
  issuerSubjectKeyID: string;
  pid: number;
  isPAA: boolean;
  crlSignerCertificate: string;
  dataURL: string;
  dataFileSize: number;
  dataDigest: string;
  dataDigestType: number;
  revocationType: number;
  schemaVersion: number;
  crlSignerDelegator: string;
}

function createBasePkiRevocationDistributionPoint(): PkiRevocationDistributionPoint {
  return {
    vid: 0,
    label: "",
    issuerSubjectKeyID: "",
    pid: 0,
    isPAA: false,
    crlSignerCertificate: "",
    dataURL: "",
    dataFileSize: 0,
    dataDigest: "",
    dataDigestType: 0,
    revocationType: 0,
    schemaVersion: 0,
    crlSignerDelegator: "",
  };
}

export const PkiRevocationDistributionPoint = {
  encode(message: PkiRevocationDistributionPoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vid !== 0) {
      writer.uint32(8).int32(message.vid);
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    if (message.issuerSubjectKeyID !== "") {
      writer.uint32(26).string(message.issuerSubjectKeyID);
    }
    if (message.pid !== 0) {
      writer.uint32(32).int32(message.pid);
    }
    if (message.isPAA === true) {
      writer.uint32(40).bool(message.isPAA);
    }
    if (message.crlSignerCertificate !== "") {
      writer.uint32(50).string(message.crlSignerCertificate);
    }
    if (message.dataURL !== "") {
      writer.uint32(58).string(message.dataURL);
    }
    if (message.dataFileSize !== 0) {
      writer.uint32(64).uint64(message.dataFileSize);
    }
    if (message.dataDigest !== "") {
      writer.uint32(74).string(message.dataDigest);
    }
    if (message.dataDigestType !== 0) {
      writer.uint32(80).uint32(message.dataDigestType);
    }
    if (message.revocationType !== 0) {
      writer.uint32(88).uint32(message.revocationType);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(96).uint32(message.schemaVersion);
    }
    if (message.crlSignerDelegator !== "") {
      writer.uint32(106).string(message.crlSignerDelegator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PkiRevocationDistributionPoint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePkiRevocationDistributionPoint();
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
          if (tag !== 18) {
            break;
          }

          message.label = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.issuerSubjectKeyID = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isPAA = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.crlSignerCertificate = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.dataURL = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.dataFileSize = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.dataDigest = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.dataDigestType = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.revocationType = reader.uint32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.crlSignerDelegator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PkiRevocationDistributionPoint {
    return {
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      label: isSet(object.label) ? String(object.label) : "",
      issuerSubjectKeyID: isSet(object.issuerSubjectKeyID) ? String(object.issuerSubjectKeyID) : "",
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      isPAA: isSet(object.isPAA) ? Boolean(object.isPAA) : false,
      crlSignerCertificate: isSet(object.crlSignerCertificate) ? String(object.crlSignerCertificate) : "",
      dataURL: isSet(object.dataURL) ? String(object.dataURL) : "",
      dataFileSize: isSet(object.dataFileSize) ? Number(object.dataFileSize) : 0,
      dataDigest: isSet(object.dataDigest) ? String(object.dataDigest) : "",
      dataDigestType: isSet(object.dataDigestType) ? Number(object.dataDigestType) : 0,
      revocationType: isSet(object.revocationType) ? Number(object.revocationType) : 0,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
      crlSignerDelegator: isSet(object.crlSignerDelegator) ? String(object.crlSignerDelegator) : "",
    };
  },

  toJSON(message: PkiRevocationDistributionPoint): unknown {
    const obj: any = {};
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.issuerSubjectKeyID !== "") {
      obj.issuerSubjectKeyID = message.issuerSubjectKeyID;
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.isPAA === true) {
      obj.isPAA = message.isPAA;
    }
    if (message.crlSignerCertificate !== "") {
      obj.crlSignerCertificate = message.crlSignerCertificate;
    }
    if (message.dataURL !== "") {
      obj.dataURL = message.dataURL;
    }
    if (message.dataFileSize !== 0) {
      obj.dataFileSize = Math.round(message.dataFileSize);
    }
    if (message.dataDigest !== "") {
      obj.dataDigest = message.dataDigest;
    }
    if (message.dataDigestType !== 0) {
      obj.dataDigestType = Math.round(message.dataDigestType);
    }
    if (message.revocationType !== 0) {
      obj.revocationType = Math.round(message.revocationType);
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    if (message.crlSignerDelegator !== "") {
      obj.crlSignerDelegator = message.crlSignerDelegator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PkiRevocationDistributionPoint>, I>>(base?: I): PkiRevocationDistributionPoint {
    return PkiRevocationDistributionPoint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PkiRevocationDistributionPoint>, I>>(
    object: I,
  ): PkiRevocationDistributionPoint {
    const message = createBasePkiRevocationDistributionPoint();
    message.vid = object.vid ?? 0;
    message.label = object.label ?? "";
    message.issuerSubjectKeyID = object.issuerSubjectKeyID ?? "";
    message.pid = object.pid ?? 0;
    message.isPAA = object.isPAA ?? false;
    message.crlSignerCertificate = object.crlSignerCertificate ?? "";
    message.dataURL = object.dataURL ?? "";
    message.dataFileSize = object.dataFileSize ?? 0;
    message.dataDigest = object.dataDigest ?? "";
    message.dataDigestType = object.dataDigestType ?? 0;
    message.revocationType = object.revocationType ?? 0;
    message.schemaVersion = object.schemaVersion ?? 0;
    message.crlSignerDelegator = object.crlSignerDelegator ?? "";
    return message;
  },
};

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
