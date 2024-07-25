/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface ApprovedCertificatesBySubject {
  subject: string;
  subjectKeyIds: string[];
  schemaVersion: number;
}

function createBaseApprovedCertificatesBySubject(): ApprovedCertificatesBySubject {
  return { subject: "", subjectKeyIds: [], schemaVersion: 0 };
}

export const ApprovedCertificatesBySubject = {
  encode(message: ApprovedCertificatesBySubject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subject !== "") {
      writer.uint32(10).string(message.subject);
    }
    for (const v of message.subjectKeyIds) {
      writer.uint32(18).string(v!);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(24).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedCertificatesBySubject {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedCertificatesBySubject();
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

          message.subjectKeyIds.push(reader.string());
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

  fromJSON(object: any): ApprovedCertificatesBySubject {
    return {
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyIds: Array.isArray(object?.subjectKeyIds) ? object.subjectKeyIds.map((e: any) => String(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ApprovedCertificatesBySubject): unknown {
    const obj: any = {};
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyIds?.length) {
      obj.subjectKeyIds = message.subjectKeyIds;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApprovedCertificatesBySubject>, I>>(base?: I): ApprovedCertificatesBySubject {
    return ApprovedCertificatesBySubject.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApprovedCertificatesBySubject>, I>>(
    object: I,
  ): ApprovedCertificatesBySubject {
    const message = createBaseApprovedCertificatesBySubject();
    message.subject = object.subject ?? "";
    message.subjectKeyIds = object.subjectKeyIds?.map((e) => e) || [];
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
