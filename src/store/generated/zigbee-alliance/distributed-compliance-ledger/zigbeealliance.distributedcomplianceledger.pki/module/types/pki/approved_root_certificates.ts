/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CertificateIdentifier } from "./certificate_identifier";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface ApprovedRootCertificates {
  certs: CertificateIdentifier[];
  schemaVersion: number;
}

function createBaseApprovedRootCertificates(): ApprovedRootCertificates {
  return { certs: [], schemaVersion: 0 };
}

export const ApprovedRootCertificates = {
  encode(message: ApprovedRootCertificates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.certs) {
      CertificateIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(16).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedRootCertificates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedRootCertificates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.certs.push(CertificateIdentifier.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): ApprovedRootCertificates {
    return {
      certs: Array.isArray(object?.certs) ? object.certs.map((e: any) => CertificateIdentifier.fromJSON(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ApprovedRootCertificates): unknown {
    const obj: any = {};
    if (message.certs?.length) {
      obj.certs = message.certs.map((e) => CertificateIdentifier.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApprovedRootCertificates>, I>>(base?: I): ApprovedRootCertificates {
    return ApprovedRootCertificates.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApprovedRootCertificates>, I>>(object: I): ApprovedRootCertificates {
    const message = createBaseApprovedRootCertificates();
    message.certs = object.certs?.map((e) => CertificateIdentifier.fromPartial(e)) || [];
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
