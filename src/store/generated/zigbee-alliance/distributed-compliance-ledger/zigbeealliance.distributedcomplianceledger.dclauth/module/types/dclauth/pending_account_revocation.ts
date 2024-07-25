/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Grant } from "./grant";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.dclauth";

export interface PendingAccountRevocation {
  address: string;
  approvals: Grant[];
  schemaVersion: number;
}

function createBasePendingAccountRevocation(): PendingAccountRevocation {
  return { address: "", approvals: [], schemaVersion: 0 };
}

export const PendingAccountRevocation = {
  encode(message: PendingAccountRevocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.approvals) {
      Grant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(24).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PendingAccountRevocation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingAccountRevocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.approvals.push(Grant.decode(reader, reader.uint32()));
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

  fromJSON(object: any): PendingAccountRevocation {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      approvals: Array.isArray(object?.approvals) ? object.approvals.map((e: any) => Grant.fromJSON(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: PendingAccountRevocation): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.approvals?.length) {
      obj.approvals = message.approvals.map((e) => Grant.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PendingAccountRevocation>, I>>(base?: I): PendingAccountRevocation {
    return PendingAccountRevocation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PendingAccountRevocation>, I>>(object: I): PendingAccountRevocation {
    const message = createBasePendingAccountRevocation();
    message.address = object.address ?? "";
    message.approvals = object.approvals?.map((e) => Grant.fromPartial(e)) || [];
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
