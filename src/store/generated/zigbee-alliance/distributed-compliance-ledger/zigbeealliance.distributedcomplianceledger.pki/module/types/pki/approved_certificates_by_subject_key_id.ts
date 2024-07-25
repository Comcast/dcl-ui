/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Certificate } from "./certificate";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface ApprovedCertificatesBySubjectKeyId {
  subjectKeyId: string;
  certs: Certificate[];
  schemaVersion: number;
}

function createBaseApprovedCertificatesBySubjectKeyId(): ApprovedCertificatesBySubjectKeyId {
  return { subjectKeyId: "", certs: [], schemaVersion: 0 };
}

export const ApprovedCertificatesBySubjectKeyId = {
  encode(message: ApprovedCertificatesBySubjectKeyId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subjectKeyId !== "") {
      writer.uint32(10).string(message.subjectKeyId);
    }
    for (const v of message.certs) {
      Certificate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(24).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedCertificatesBySubjectKeyId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedCertificatesBySubjectKeyId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.certs.push(Certificate.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): ApprovedCertificatesBySubjectKeyId {
    return {
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      certs: Array.isArray(object?.certs) ? object.certs.map((e: any) => Certificate.fromJSON(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ApprovedCertificatesBySubjectKeyId): unknown {
    const obj: any = {};
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.certs?.length) {
      obj.certs = message.certs.map((e) => Certificate.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApprovedCertificatesBySubjectKeyId>, I>>(
    base?: I,
  ): ApprovedCertificatesBySubjectKeyId {
    return ApprovedCertificatesBySubjectKeyId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApprovedCertificatesBySubjectKeyId>, I>>(
    object: I,
  ): ApprovedCertificatesBySubjectKeyId {
    const message = createBaseApprovedCertificatesBySubjectKeyId();
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.certs = object.certs?.map((e) => Certificate.fromPartial(e)) || [];
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
