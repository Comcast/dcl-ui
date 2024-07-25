/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Plan } from "../cosmos/upgrade/v1beta1/upgrade";
import { Grant } from "./grant";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.dclupgrade";

export interface ApprovedUpgrade {
  plan: Plan | undefined;
  creator: string;
  approvals: Grant[];
  rejects: Grant[];
  schemaVersion: number;
}

function createBaseApprovedUpgrade(): ApprovedUpgrade {
  return { plan: undefined, creator: "", approvals: [], rejects: [], schemaVersion: 0 };
}

export const ApprovedUpgrade = {
  encode(message: ApprovedUpgrade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    for (const v of message.approvals) {
      Grant.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.rejects) {
      Grant.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(40).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedUpgrade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plan = Plan.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.approvals.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rejects.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
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

  fromJSON(object: any): ApprovedUpgrade {
    return {
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
      creator: isSet(object.creator) ? String(object.creator) : "",
      approvals: Array.isArray(object?.approvals) ? object.approvals.map((e: any) => Grant.fromJSON(e)) : [],
      rejects: Array.isArray(object?.rejects) ? object.rejects.map((e: any) => Grant.fromJSON(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ApprovedUpgrade): unknown {
    const obj: any = {};
    if (message.plan !== undefined) {
      obj.plan = Plan.toJSON(message.plan);
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.approvals?.length) {
      obj.approvals = message.approvals.map((e) => Grant.toJSON(e));
    }
    if (message.rejects?.length) {
      obj.rejects = message.rejects.map((e) => Grant.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApprovedUpgrade>, I>>(base?: I): ApprovedUpgrade {
    return ApprovedUpgrade.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApprovedUpgrade>, I>>(object: I): ApprovedUpgrade {
    const message = createBaseApprovedUpgrade();
    message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
    message.creator = object.creator ?? "";
    message.approvals = object.approvals?.map((e) => Grant.fromPartial(e)) || [];
    message.rejects = object.rejects?.map((e) => Grant.fromPartial(e)) || [];
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
