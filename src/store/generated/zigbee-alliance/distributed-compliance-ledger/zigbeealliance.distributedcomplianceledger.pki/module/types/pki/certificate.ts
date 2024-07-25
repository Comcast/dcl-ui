/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Grant } from "./grant";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface Certificate {
  pemCert: string;
  serialNumber: string;
  issuer: string;
  authorityKeyId: string;
  rootSubject: string;
  rootSubjectKeyId: string;
  isRoot: boolean;
  owner: string;
  subject: string;
  subjectKeyId: string;
  approvals: Grant[];
  subjectAsText: string;
  rejects: Grant[];
  vid: number;
  isNoc: boolean;
  schemaVersion: number;
}

function createBaseCertificate(): Certificate {
  return {
    pemCert: "",
    serialNumber: "",
    issuer: "",
    authorityKeyId: "",
    rootSubject: "",
    rootSubjectKeyId: "",
    isRoot: false,
    owner: "",
    subject: "",
    subjectKeyId: "",
    approvals: [],
    subjectAsText: "",
    rejects: [],
    vid: 0,
    isNoc: false,
    schemaVersion: 0,
  };
}

export const Certificate = {
  encode(message: Certificate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pemCert !== "") {
      writer.uint32(10).string(message.pemCert);
    }
    if (message.serialNumber !== "") {
      writer.uint32(18).string(message.serialNumber);
    }
    if (message.issuer !== "") {
      writer.uint32(26).string(message.issuer);
    }
    if (message.authorityKeyId !== "") {
      writer.uint32(34).string(message.authorityKeyId);
    }
    if (message.rootSubject !== "") {
      writer.uint32(42).string(message.rootSubject);
    }
    if (message.rootSubjectKeyId !== "") {
      writer.uint32(50).string(message.rootSubjectKeyId);
    }
    if (message.isRoot === true) {
      writer.uint32(56).bool(message.isRoot);
    }
    if (message.owner !== "") {
      writer.uint32(66).string(message.owner);
    }
    if (message.subject !== "") {
      writer.uint32(74).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(82).string(message.subjectKeyId);
    }
    for (const v of message.approvals) {
      Grant.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.subjectAsText !== "") {
      writer.uint32(98).string(message.subjectAsText);
    }
    for (const v of message.rejects) {
      Grant.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.vid !== 0) {
      writer.uint32(112).int32(message.vid);
    }
    if (message.isNoc === true) {
      writer.uint32(120).bool(message.isNoc);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(128).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Certificate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pemCert = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authorityKeyId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.rootSubject = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rootSubjectKeyId = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isRoot = reader.bool();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.approvals.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.subjectAsText = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.rejects.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.isNoc = reader.bool();
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

  fromJSON(object: any): Certificate {
    return {
      pemCert: isSet(object.pemCert) ? String(object.pemCert) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      authorityKeyId: isSet(object.authorityKeyId) ? String(object.authorityKeyId) : "",
      rootSubject: isSet(object.rootSubject) ? String(object.rootSubject) : "",
      rootSubjectKeyId: isSet(object.rootSubjectKeyId) ? String(object.rootSubjectKeyId) : "",
      isRoot: isSet(object.isRoot) ? Boolean(object.isRoot) : false,
      owner: isSet(object.owner) ? String(object.owner) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      approvals: Array.isArray(object?.approvals) ? object.approvals.map((e: any) => Grant.fromJSON(e)) : [],
      subjectAsText: isSet(object.subjectAsText) ? String(object.subjectAsText) : "",
      rejects: Array.isArray(object?.rejects) ? object.rejects.map((e: any) => Grant.fromJSON(e)) : [],
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      isNoc: isSet(object.isNoc) ? Boolean(object.isNoc) : false,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: Certificate): unknown {
    const obj: any = {};
    if (message.pemCert !== "") {
      obj.pemCert = message.pemCert;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.authorityKeyId !== "") {
      obj.authorityKeyId = message.authorityKeyId;
    }
    if (message.rootSubject !== "") {
      obj.rootSubject = message.rootSubject;
    }
    if (message.rootSubjectKeyId !== "") {
      obj.rootSubjectKeyId = message.rootSubjectKeyId;
    }
    if (message.isRoot === true) {
      obj.isRoot = message.isRoot;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.approvals?.length) {
      obj.approvals = message.approvals.map((e) => Grant.toJSON(e));
    }
    if (message.subjectAsText !== "") {
      obj.subjectAsText = message.subjectAsText;
    }
    if (message.rejects?.length) {
      obj.rejects = message.rejects.map((e) => Grant.toJSON(e));
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.isNoc === true) {
      obj.isNoc = message.isNoc;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Certificate>, I>>(base?: I): Certificate {
    return Certificate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Certificate>, I>>(object: I): Certificate {
    const message = createBaseCertificate();
    message.pemCert = object.pemCert ?? "";
    message.serialNumber = object.serialNumber ?? "";
    message.issuer = object.issuer ?? "";
    message.authorityKeyId = object.authorityKeyId ?? "";
    message.rootSubject = object.rootSubject ?? "";
    message.rootSubjectKeyId = object.rootSubjectKeyId ?? "";
    message.isRoot = object.isRoot ?? false;
    message.owner = object.owner ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.approvals = object.approvals?.map((e) => Grant.fromPartial(e)) || [];
    message.subjectAsText = object.subjectAsText ?? "";
    message.rejects = object.rejects?.map((e) => Grant.fromPartial(e)) || [];
    message.vid = object.vid ?? 0;
    message.isNoc = object.isNoc ?? false;
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
