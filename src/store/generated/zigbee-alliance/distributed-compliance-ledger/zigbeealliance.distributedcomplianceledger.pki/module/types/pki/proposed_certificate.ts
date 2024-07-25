/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Grant } from "./grant";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface ProposedCertificate {
  subject: string;
  subjectKeyId: string;
  pemCert: string;
  serialNumber: string;
  owner: string;
  approvals: Grant[];
  subjectAsText: string;
  rejects: Grant[];
  vid: number;
  certSchemaVersion: number;
  schemaVersion: number;
}

function createBaseProposedCertificate(): ProposedCertificate {
  return {
    subject: "",
    subjectKeyId: "",
    pemCert: "",
    serialNumber: "",
    owner: "",
    approvals: [],
    subjectAsText: "",
    rejects: [],
    vid: 0,
    certSchemaVersion: 0,
    schemaVersion: 0,
  };
}

export const ProposedCertificate = {
  encode(message: ProposedCertificate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subject !== "") {
      writer.uint32(10).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(18).string(message.subjectKeyId);
    }
    if (message.pemCert !== "") {
      writer.uint32(26).string(message.pemCert);
    }
    if (message.serialNumber !== "") {
      writer.uint32(34).string(message.serialNumber);
    }
    if (message.owner !== "") {
      writer.uint32(42).string(message.owner);
    }
    for (const v of message.approvals) {
      Grant.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.subjectAsText !== "") {
      writer.uint32(58).string(message.subjectAsText);
    }
    for (const v of message.rejects) {
      Grant.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.vid !== 0) {
      writer.uint32(72).int32(message.vid);
    }
    if (message.certSchemaVersion !== 0) {
      writer.uint32(80).uint32(message.certSchemaVersion);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(88).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProposedCertificate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposedCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subject = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pemCert = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.approvals.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.subjectAsText = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.rejects.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.certSchemaVersion = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
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

  fromJSON(object: any): ProposedCertificate {
    return {
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      pemCert: isSet(object.pemCert) ? String(object.pemCert) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      approvals: Array.isArray(object?.approvals) ? object.approvals.map((e: any) => Grant.fromJSON(e)) : [],
      subjectAsText: isSet(object.subjectAsText) ? String(object.subjectAsText) : "",
      rejects: Array.isArray(object?.rejects) ? object.rejects.map((e: any) => Grant.fromJSON(e)) : [],
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      certSchemaVersion: isSet(object.certSchemaVersion) ? Number(object.certSchemaVersion) : 0,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ProposedCertificate): unknown {
    const obj: any = {};
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.pemCert !== "") {
      obj.pemCert = message.pemCert;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
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
    if (message.certSchemaVersion !== 0) {
      obj.certSchemaVersion = Math.round(message.certSchemaVersion);
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProposedCertificate>, I>>(base?: I): ProposedCertificate {
    return ProposedCertificate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProposedCertificate>, I>>(object: I): ProposedCertificate {
    const message = createBaseProposedCertificate();
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.pemCert = object.pemCert ?? "";
    message.serialNumber = object.serialNumber ?? "";
    message.owner = object.owner ?? "";
    message.approvals = object.approvals?.map((e) => Grant.fromPartial(e)) || [];
    message.subjectAsText = object.subjectAsText ?? "";
    message.rejects = object.rejects?.map((e) => Grant.fromPartial(e)) || [];
    message.vid = object.vid ?? 0;
    message.certSchemaVersion = object.certSchemaVersion ?? 0;
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
