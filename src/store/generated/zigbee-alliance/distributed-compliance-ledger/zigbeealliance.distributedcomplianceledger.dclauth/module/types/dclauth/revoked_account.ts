/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Account } from "./account";
import { Grant } from "./grant";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.dclauth";

export interface RevokedAccount {
  account: Account | undefined;
  revokeApprovals: Grant[];
  reason: RevokedAccount_Reason;
  revokedAccountSchemaVersion: number;
}

export enum RevokedAccount_Reason {
  TrusteeVoting = 0,
  MaliciousValidator = 1,
  UNRECOGNIZED = -1,
}

export function revokedAccount_ReasonFromJSON(object: any): RevokedAccount_Reason {
  switch (object) {
    case 0:
    case "TrusteeVoting":
      return RevokedAccount_Reason.TrusteeVoting;
    case 1:
    case "MaliciousValidator":
      return RevokedAccount_Reason.MaliciousValidator;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RevokedAccount_Reason.UNRECOGNIZED;
  }
}

export function revokedAccount_ReasonToJSON(object: RevokedAccount_Reason): string {
  switch (object) {
    case RevokedAccount_Reason.TrusteeVoting:
      return "TrusteeVoting";
    case RevokedAccount_Reason.MaliciousValidator:
      return "MaliciousValidator";
    case RevokedAccount_Reason.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseRevokedAccount(): RevokedAccount {
  return { account: undefined, revokeApprovals: [], reason: 0, revokedAccountSchemaVersion: 0 };
}

export const RevokedAccount = {
  encode(message: RevokedAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.revokeApprovals) {
      Grant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.reason !== 0) {
      writer.uint32(24).int32(message.reason);
    }
    if (message.revokedAccountSchemaVersion !== 0) {
      writer.uint32(32).uint32(message.revokedAccountSchemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokedAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokedAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = Account.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.revokeApprovals.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.reason = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.revokedAccountSchemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokedAccount {
    return {
      account: isSet(object.account) ? Account.fromJSON(object.account) : undefined,
      revokeApprovals: Array.isArray(object?.revokeApprovals)
        ? object.revokeApprovals.map((e: any) => Grant.fromJSON(e))
        : [],
      reason: isSet(object.reason) ? revokedAccount_ReasonFromJSON(object.reason) : 0,
      revokedAccountSchemaVersion: isSet(object.revokedAccountSchemaVersion)
        ? Number(object.revokedAccountSchemaVersion)
        : 0,
    };
  },

  toJSON(message: RevokedAccount): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = Account.toJSON(message.account);
    }
    if (message.revokeApprovals?.length) {
      obj.revokeApprovals = message.revokeApprovals.map((e) => Grant.toJSON(e));
    }
    if (message.reason !== 0) {
      obj.reason = revokedAccount_ReasonToJSON(message.reason);
    }
    if (message.revokedAccountSchemaVersion !== 0) {
      obj.revokedAccountSchemaVersion = Math.round(message.revokedAccountSchemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokedAccount>, I>>(base?: I): RevokedAccount {
    return RevokedAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokedAccount>, I>>(object: I): RevokedAccount {
    const message = createBaseRevokedAccount();
    message.account = (object.account !== undefined && object.account !== null)
      ? Account.fromPartial(object.account)
      : undefined;
    message.revokeApprovals = object.revokeApprovals?.map((e) => Grant.fromPartial(e)) || [];
    message.reason = object.reason ?? 0;
    message.revokedAccountSchemaVersion = object.revokedAccountSchemaVersion ?? 0;
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
