/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Account } from "./account";
import { AccountStat } from "./account_stat";
import { PendingAccount } from "./pending_account";
import { PendingAccountRevocation } from "./pending_account_revocation";
import { RejectedAccount } from "./rejected_account";
import { RevokedAccount } from "./revoked_account";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.dclauth";

/** GenesisState defines the dclauth module's genesis state. */
export interface GenesisState {
  accountList: Account[];
  pendingAccountList: PendingAccount[];
  pendingAccountRevocationList: PendingAccountRevocation[];
  accountStat: AccountStat | undefined;
  revokedAccountList: RevokedAccount[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  rejectedAccountList: RejectedAccount[];
}

function createBaseGenesisState(): GenesisState {
  return {
    accountList: [],
    pendingAccountList: [],
    pendingAccountRevocationList: [],
    accountStat: undefined,
    revokedAccountList: [],
    rejectedAccountList: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.accountList) {
      Account.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.pendingAccountList) {
      PendingAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.pendingAccountRevocationList) {
      PendingAccountRevocation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.accountStat !== undefined) {
      AccountStat.encode(message.accountStat, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.revokedAccountList) {
      RevokedAccount.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.rejectedAccountList) {
      RejectedAccount.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountList.push(Account.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pendingAccountList.push(PendingAccount.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pendingAccountRevocationList.push(PendingAccountRevocation.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.accountStat = AccountStat.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.revokedAccountList.push(RevokedAccount.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rejectedAccountList.push(RejectedAccount.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      accountList: Array.isArray(object?.accountList) ? object.accountList.map((e: any) => Account.fromJSON(e)) : [],
      pendingAccountList: Array.isArray(object?.pendingAccountList)
        ? object.pendingAccountList.map((e: any) => PendingAccount.fromJSON(e))
        : [],
      pendingAccountRevocationList: Array.isArray(object?.pendingAccountRevocationList)
        ? object.pendingAccountRevocationList.map((e: any) => PendingAccountRevocation.fromJSON(e))
        : [],
      accountStat: isSet(object.accountStat) ? AccountStat.fromJSON(object.accountStat) : undefined,
      revokedAccountList: Array.isArray(object?.revokedAccountList)
        ? object.revokedAccountList.map((e: any) => RevokedAccount.fromJSON(e))
        : [],
      rejectedAccountList: Array.isArray(object?.rejectedAccountList)
        ? object.rejectedAccountList.map((e: any) => RejectedAccount.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.accountList?.length) {
      obj.accountList = message.accountList.map((e) => Account.toJSON(e));
    }
    if (message.pendingAccountList?.length) {
      obj.pendingAccountList = message.pendingAccountList.map((e) => PendingAccount.toJSON(e));
    }
    if (message.pendingAccountRevocationList?.length) {
      obj.pendingAccountRevocationList = message.pendingAccountRevocationList.map((e) =>
        PendingAccountRevocation.toJSON(e)
      );
    }
    if (message.accountStat !== undefined) {
      obj.accountStat = AccountStat.toJSON(message.accountStat);
    }
    if (message.revokedAccountList?.length) {
      obj.revokedAccountList = message.revokedAccountList.map((e) => RevokedAccount.toJSON(e));
    }
    if (message.rejectedAccountList?.length) {
      obj.rejectedAccountList = message.rejectedAccountList.map((e) => RejectedAccount.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.accountList = object.accountList?.map((e) => Account.fromPartial(e)) || [];
    message.pendingAccountList = object.pendingAccountList?.map((e) => PendingAccount.fromPartial(e)) || [];
    message.pendingAccountRevocationList =
      object.pendingAccountRevocationList?.map((e) => PendingAccountRevocation.fromPartial(e)) || [];
    message.accountStat = (object.accountStat !== undefined && object.accountStat !== null)
      ? AccountStat.fromPartial(object.accountStat)
      : undefined;
    message.revokedAccountList = object.revokedAccountList?.map((e) => RevokedAccount.fromPartial(e)) || [];
    message.rejectedAccountList = object.rejectedAccountList?.map((e) => RejectedAccount.fromPartial(e)) || [];
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
