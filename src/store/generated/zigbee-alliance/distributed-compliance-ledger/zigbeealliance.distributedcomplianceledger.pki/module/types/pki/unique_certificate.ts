/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface UniqueCertificate {
  issuer: string;
  serialNumber: string;
  present: boolean;
  schemaVersion: number;
}

function createBaseUniqueCertificate(): UniqueCertificate {
  return { issuer: "", serialNumber: "", present: false, schemaVersion: 0 };
}

export const UniqueCertificate = {
  encode(message: UniqueCertificate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.serialNumber !== "") {
      writer.uint32(18).string(message.serialNumber);
    }
    if (message.present === true) {
      writer.uint32(24).bool(message.present);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(32).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UniqueCertificate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUniqueCertificate();
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

          message.serialNumber = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.present = reader.bool();
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

  fromJSON(object: any): UniqueCertificate {
    return {
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      present: isSet(object.present) ? Boolean(object.present) : false,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: UniqueCertificate): unknown {
    const obj: any = {};
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.present === true) {
      obj.present = message.present;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UniqueCertificate>, I>>(base?: I): UniqueCertificate {
    return UniqueCertificate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UniqueCertificate>, I>>(object: I): UniqueCertificate {
    const message = createBaseUniqueCertificate();
    message.issuer = object.issuer ?? "";
    message.serialNumber = object.serialNumber ?? "";
    message.present = object.present ?? false;
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
