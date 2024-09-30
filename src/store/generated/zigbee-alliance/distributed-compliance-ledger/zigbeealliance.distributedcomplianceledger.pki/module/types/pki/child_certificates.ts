/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CertificateIdentifier } from "./certificate_identifier";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface ChildCertificates {
  issuer: string;
  authorityKeyId: string;
  certIds: CertificateIdentifier[];
  schemaVersion: number;
}

function createBaseChildCertificates(): ChildCertificates {
  return { issuer: "", authorityKeyId: "", certIds: [], schemaVersion: 0 };
}

export const ChildCertificates = {
  encode(message: ChildCertificates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.authorityKeyId !== "") {
      writer.uint32(18).string(message.authorityKeyId);
    }
    for (const v of message.certIds) {
      CertificateIdentifier.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(32).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChildCertificates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChildCertificates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authorityKeyId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.certIds.push(CertificateIdentifier.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
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

  fromJSON(object: any): ChildCertificates {
    return {
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      authorityKeyId: isSet(object.authorityKeyId) ? String(object.authorityKeyId) : "",
      certIds: Array.isArray(object?.certIds) ? object.certIds.map((e: any) => CertificateIdentifier.fromJSON(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ChildCertificates): unknown {
    const obj: any = {};
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.authorityKeyId !== "") {
      obj.authorityKeyId = message.authorityKeyId;
    }
    if (message.certIds?.length) {
      obj.certIds = message.certIds.map((e) => CertificateIdentifier.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChildCertificates>, I>>(base?: I): ChildCertificates {
    return ChildCertificates.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChildCertificates>, I>>(object: I): ChildCertificates {
    const message = createBaseChildCertificates();
    message.issuer = object.issuer ?? "";
    message.authorityKeyId = object.authorityKeyId ?? "";
    message.certIds = object.certIds?.map((e) => CertificateIdentifier.fromPartial(e)) || [];
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
