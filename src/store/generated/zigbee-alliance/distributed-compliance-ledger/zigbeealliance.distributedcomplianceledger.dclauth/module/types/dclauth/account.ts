/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { BaseAccount } from "../cosmos/auth/v1beta1/auth";
import { Uint16Range } from "../common/uint16_range";
import { Grant } from "./grant";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.dclauth";

export interface Account {
  baseAccount:
  | BaseAccount
  | undefined;
  /**
   * NOTE. we do not user AccountRoles casting here to preserve repeated form
   *       so protobuf takes care about repeated items in generated code,
   *       (but that might be not the final solution)
   */
  roles: string[];
  approvals: Grant[];
  vendorID: number;
  rejects: Grant[];
  productIDs: Uint16Range[];
  schemaVersion: number;
}

function createBaseAccount(): Account {
  return {
    baseAccount: undefined,
    roles: [],
    approvals: [],
    vendorID: 0,
    rejects: [],
    productIDs: [],
    schemaVersion: 0,
  };
}

export const Account = {
  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.roles) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.approvals) {
      Grant.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.vendorID !== 0) {
      writer.uint32(32).int32(message.vendorID);
    }
    for (const v of message.rejects) {
      Grant.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.productIDs) {
      Uint16Range.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(56).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.roles.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.approvals.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.vendorID = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.rejects.push(Grant.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.productIDs.push(Uint16Range.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
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

  fromJSON(object: any): Account {
    return {
      baseAccount: isSet(object.baseAccount) ? BaseAccount.fromJSON(object.baseAccount) : undefined,
      roles: Array.isArray(object?.roles) ? object.roles.map((e: any) => String(e)) : [],
      approvals: Array.isArray(object?.approvals) ? object.approvals.map((e: any) => Grant.fromJSON(e)) : [],
      vendorID: isSet(object.vendorID) ? Number(object.vendorID) : 0,
      rejects: Array.isArray(object?.rejects) ? object.rejects.map((e: any) => Grant.fromJSON(e)) : [],
      productIDs: Array.isArray(object?.productIDs) ? object.productIDs.map((e: any) => Uint16Range.fromJSON(e)) : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.baseAccount !== undefined) {
      obj.baseAccount = BaseAccount.toJSON(message.baseAccount);
    }
    if (message.roles?.length) {
      obj.roles = message.roles;
    }
    if (message.approvals?.length) {
      obj.approvals = message.approvals.map((e) => Grant.toJSON(e));
    }
    if (message.vendorID !== 0) {
      obj.vendorID = Math.round(message.vendorID);
    }
    if (message.rejects?.length) {
      obj.rejects = message.rejects.map((e) => Grant.toJSON(e));
    }
    if (message.productIDs?.length) {
      obj.productIDs = message.productIDs.map((e) => Uint16Range.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Account>, I>>(base?: I): Account {
    return Account.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
    const message = createBaseAccount();
    message.baseAccount = (object.baseAccount !== undefined && object.baseAccount !== null)
      ? BaseAccount.fromPartial(object.baseAccount)
      : undefined;
    message.roles = object.roles?.map((e) => e) || [];
    message.approvals = object.approvals?.map((e) => Grant.fromPartial(e)) || [];
    message.vendorID = object.vendorID ?? 0;
    message.rejects = object.rejects?.map((e) => Grant.fromPartial(e)) || [];
    message.productIDs = object.productIDs?.map((e) => Uint16Range.fromPartial(e)) || [];
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
