/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PkiRevocationDistributionPoint } from "./pki_revocation_distribution_point";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface PkiRevocationDistributionPointsByIssuerSubjectKeyID {
  issuerSubjectKeyID: string;
  points: PkiRevocationDistributionPoint[];
  schemaVersion: number;
}

function createBasePkiRevocationDistributionPointsByIssuerSubjectKeyID(): PkiRevocationDistributionPointsByIssuerSubjectKeyID {
  return { issuerSubjectKeyID: "", points: [], schemaVersion: 0 };
}

export const PkiRevocationDistributionPointsByIssuerSubjectKeyID = {
  encode(
    message: PkiRevocationDistributionPointsByIssuerSubjectKeyID,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.issuerSubjectKeyID !== "") {
      writer.uint32(10).string(message.issuerSubjectKeyID);
    }
    for (const v of message.points) {
      PkiRevocationDistributionPoint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(24).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PkiRevocationDistributionPointsByIssuerSubjectKeyID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePkiRevocationDistributionPointsByIssuerSubjectKeyID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issuerSubjectKeyID = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.points.push(PkiRevocationDistributionPoint.decode(reader, reader.uint32()));
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

  fromJSON(object: any): PkiRevocationDistributionPointsByIssuerSubjectKeyID {
    return {
      issuerSubjectKeyID: isSet(object.issuerSubjectKeyID) ? String(object.issuerSubjectKeyID) : "",
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => PkiRevocationDistributionPoint.fromJSON(e))
        : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: PkiRevocationDistributionPointsByIssuerSubjectKeyID): unknown {
    const obj: any = {};
    if (message.issuerSubjectKeyID !== "") {
      obj.issuerSubjectKeyID = message.issuerSubjectKeyID;
    }
    if (message.points?.length) {
      obj.points = message.points.map((e) => PkiRevocationDistributionPoint.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PkiRevocationDistributionPointsByIssuerSubjectKeyID>, I>>(
    base?: I,
  ): PkiRevocationDistributionPointsByIssuerSubjectKeyID {
    return PkiRevocationDistributionPointsByIssuerSubjectKeyID.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PkiRevocationDistributionPointsByIssuerSubjectKeyID>, I>>(
    object: I,
  ): PkiRevocationDistributionPointsByIssuerSubjectKeyID {
    const message = createBasePkiRevocationDistributionPointsByIssuerSubjectKeyID();
    message.issuerSubjectKeyID = object.issuerSubjectKeyID ?? "";
    message.points = object.points?.map((e) => PkiRevocationDistributionPoint.fromPartial(e)) || [];
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
