/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../google/protobuf/any";
import { Uint16Range } from "../common/uint16_range";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.dclauth";

export interface MsgProposeAddAccount {
  signer: string;
  address: string;
  pubKey: Any | undefined;
  roles: string[];
  vendorID: number;
  info: string;
  time: number;
  productIDs: Uint16Range[];
}

export interface MsgProposeAddAccountResponse {
}

export interface MsgApproveAddAccount {
  signer: string;
  address: string;
  info: string;
  time: number;
}

export interface MsgApproveAddAccountResponse {
}

export interface MsgProposeRevokeAccount {
  signer: string;
  address: string;
  info: string;
  time: number;
}

export interface MsgProposeRevokeAccountResponse {
}

export interface MsgApproveRevokeAccount {
  signer: string;
  address: string;
  info: string;
  time: number;
}

export interface MsgApproveRevokeAccountResponse {
}

export interface MsgRejectAddAccount {
  signer: string;
  address: string;
  info: string;
  time: number;
}

export interface MsgRejectAddAccountResponse {
}

function createBaseMsgProposeAddAccount(): MsgProposeAddAccount {
  return { signer: "", address: "", pubKey: undefined, roles: [], vendorID: 0, info: "", time: 0, productIDs: [] };
}

export const MsgProposeAddAccount = {
  encode(message: MsgProposeAddAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.pubKey !== undefined) {
      Any.encode(message.pubKey, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.roles) {
      writer.uint32(34).string(v!);
    }
    if (message.vendorID !== 0) {
      writer.uint32(40).int32(message.vendorID);
    }
    if (message.info !== "") {
      writer.uint32(50).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(56).int64(message.time);
    }
    for (const v of message.productIDs) {
      Uint16Range.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeAddAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeAddAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pubKey = Any.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.roles.push(reader.string());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.vendorID = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.info = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.productIDs.push(Uint16Range.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgProposeAddAccount {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      address: isSet(object.address) ? String(object.address) : "",
      pubKey: isSet(object.pubKey) ? Any.fromJSON(object.pubKey) : undefined,
      roles: Array.isArray(object?.roles) ? object.roles.map((e: any) => String(e)) : [],
      vendorID: isSet(object.vendorID) ? Number(object.vendorID) : 0,
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      productIDs: Array.isArray(object?.productIDs) ? object.productIDs.map((e: any) => Uint16Range.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgProposeAddAccount): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pubKey !== undefined) {
      obj.pubKey = Any.toJSON(message.pubKey);
    }
    if (message.roles?.length) {
      obj.roles = message.roles;
    }
    if (message.vendorID !== 0) {
      obj.vendorID = Math.round(message.vendorID);
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.productIDs?.length) {
      obj.productIDs = message.productIDs.map((e) => Uint16Range.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeAddAccount>, I>>(base?: I): MsgProposeAddAccount {
    return MsgProposeAddAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeAddAccount>, I>>(object: I): MsgProposeAddAccount {
    const message = createBaseMsgProposeAddAccount();
    message.signer = object.signer ?? "";
    message.address = object.address ?? "";
    message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
      ? Any.fromPartial(object.pubKey)
      : undefined;
    message.roles = object.roles?.map((e) => e) || [];
    message.vendorID = object.vendorID ?? 0;
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.productIDs = object.productIDs?.map((e) => Uint16Range.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgProposeAddAccountResponse(): MsgProposeAddAccountResponse {
  return {};
}

export const MsgProposeAddAccountResponse = {
  encode(_: MsgProposeAddAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeAddAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeAddAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgProposeAddAccountResponse {
    return {};
  },

  toJSON(_: MsgProposeAddAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeAddAccountResponse>, I>>(base?: I): MsgProposeAddAccountResponse {
    return MsgProposeAddAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeAddAccountResponse>, I>>(_: I): MsgProposeAddAccountResponse {
    const message = createBaseMsgProposeAddAccountResponse();
    return message;
  },
};

function createBaseMsgApproveAddAccount(): MsgApproveAddAccount {
  return { signer: "", address: "", info: "", time: 0 };
}

export const MsgApproveAddAccount = {
  encode(message: MsgApproveAddAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.info !== "") {
      writer.uint32(26).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAddAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAddAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgApproveAddAccount {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      address: isSet(object.address) ? String(object.address) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: MsgApproveAddAccount): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveAddAccount>, I>>(base?: I): MsgApproveAddAccount {
    return MsgApproveAddAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveAddAccount>, I>>(object: I): MsgApproveAddAccount {
    const message = createBaseMsgApproveAddAccount();
    message.signer = object.signer ?? "";
    message.address = object.address ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseMsgApproveAddAccountResponse(): MsgApproveAddAccountResponse {
  return {};
}

export const MsgApproveAddAccountResponse = {
  encode(_: MsgApproveAddAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAddAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAddAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgApproveAddAccountResponse {
    return {};
  },

  toJSON(_: MsgApproveAddAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveAddAccountResponse>, I>>(base?: I): MsgApproveAddAccountResponse {
    return MsgApproveAddAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveAddAccountResponse>, I>>(_: I): MsgApproveAddAccountResponse {
    const message = createBaseMsgApproveAddAccountResponse();
    return message;
  },
};

function createBaseMsgProposeRevokeAccount(): MsgProposeRevokeAccount {
  return { signer: "", address: "", info: "", time: 0 };
}

export const MsgProposeRevokeAccount = {
  encode(message: MsgProposeRevokeAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.info !== "") {
      writer.uint32(26).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRevokeAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRevokeAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgProposeRevokeAccount {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      address: isSet(object.address) ? String(object.address) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: MsgProposeRevokeAccount): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeRevokeAccount>, I>>(base?: I): MsgProposeRevokeAccount {
    return MsgProposeRevokeAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeRevokeAccount>, I>>(object: I): MsgProposeRevokeAccount {
    const message = createBaseMsgProposeRevokeAccount();
    message.signer = object.signer ?? "";
    message.address = object.address ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseMsgProposeRevokeAccountResponse(): MsgProposeRevokeAccountResponse {
  return {};
}

export const MsgProposeRevokeAccountResponse = {
  encode(_: MsgProposeRevokeAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRevokeAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRevokeAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgProposeRevokeAccountResponse {
    return {};
  },

  toJSON(_: MsgProposeRevokeAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeRevokeAccountResponse>, I>>(base?: I): MsgProposeRevokeAccountResponse {
    return MsgProposeRevokeAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeRevokeAccountResponse>, I>>(_: I): MsgProposeRevokeAccountResponse {
    const message = createBaseMsgProposeRevokeAccountResponse();
    return message;
  },
};

function createBaseMsgApproveRevokeAccount(): MsgApproveRevokeAccount {
  return { signer: "", address: "", info: "", time: 0 };
}

export const MsgApproveRevokeAccount = {
  encode(message: MsgApproveRevokeAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.info !== "") {
      writer.uint32(26).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveRevokeAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveRevokeAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgApproveRevokeAccount {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      address: isSet(object.address) ? String(object.address) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: MsgApproveRevokeAccount): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveRevokeAccount>, I>>(base?: I): MsgApproveRevokeAccount {
    return MsgApproveRevokeAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveRevokeAccount>, I>>(object: I): MsgApproveRevokeAccount {
    const message = createBaseMsgApproveRevokeAccount();
    message.signer = object.signer ?? "";
    message.address = object.address ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseMsgApproveRevokeAccountResponse(): MsgApproveRevokeAccountResponse {
  return {};
}

export const MsgApproveRevokeAccountResponse = {
  encode(_: MsgApproveRevokeAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveRevokeAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveRevokeAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgApproveRevokeAccountResponse {
    return {};
  },

  toJSON(_: MsgApproveRevokeAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveRevokeAccountResponse>, I>>(base?: I): MsgApproveRevokeAccountResponse {
    return MsgApproveRevokeAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveRevokeAccountResponse>, I>>(_: I): MsgApproveRevokeAccountResponse {
    const message = createBaseMsgApproveRevokeAccountResponse();
    return message;
  },
};

function createBaseMsgRejectAddAccount(): MsgRejectAddAccount {
  return { signer: "", address: "", info: "", time: 0 };
}

export const MsgRejectAddAccount = {
  encode(message: MsgRejectAddAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.info !== "") {
      writer.uint32(26).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRejectAddAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectAddAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRejectAddAccount {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      address: isSet(object.address) ? String(object.address) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: MsgRejectAddAccount): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRejectAddAccount>, I>>(base?: I): MsgRejectAddAccount {
    return MsgRejectAddAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRejectAddAccount>, I>>(object: I): MsgRejectAddAccount {
    const message = createBaseMsgRejectAddAccount();
    message.signer = object.signer ?? "";
    message.address = object.address ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseMsgRejectAddAccountResponse(): MsgRejectAddAccountResponse {
  return {};
}

export const MsgRejectAddAccountResponse = {
  encode(_: MsgRejectAddAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRejectAddAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectAddAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgRejectAddAccountResponse {
    return {};
  },

  toJSON(_: MsgRejectAddAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRejectAddAccountResponse>, I>>(base?: I): MsgRejectAddAccountResponse {
    return MsgRejectAddAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRejectAddAccountResponse>, I>>(_: I): MsgRejectAddAccountResponse {
    const message = createBaseMsgRejectAddAccountResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  ProposeAddAccount(request: MsgProposeAddAccount): Promise<MsgProposeAddAccountResponse>;
  ApproveAddAccount(request: MsgApproveAddAccount): Promise<MsgApproveAddAccountResponse>;
  ProposeRevokeAccount(request: MsgProposeRevokeAccount): Promise<MsgProposeRevokeAccountResponse>;
  ApproveRevokeAccount(request: MsgApproveRevokeAccount): Promise<MsgApproveRevokeAccountResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RejectAddAccount(request: MsgRejectAddAccount): Promise<MsgRejectAddAccountResponse>;
}

export const MsgServiceName = "zigbeealliance.distributedcomplianceledger.dclauth.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.ProposeAddAccount = this.ProposeAddAccount.bind(this);
    this.ApproveAddAccount = this.ApproveAddAccount.bind(this);
    this.ProposeRevokeAccount = this.ProposeRevokeAccount.bind(this);
    this.ApproveRevokeAccount = this.ApproveRevokeAccount.bind(this);
    this.RejectAddAccount = this.RejectAddAccount.bind(this);
  }
  ProposeAddAccount(request: MsgProposeAddAccount): Promise<MsgProposeAddAccountResponse> {
    const data = MsgProposeAddAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProposeAddAccount", data);
    return promise.then((data) => MsgProposeAddAccountResponse.decode(_m0.Reader.create(data)));
  }

  ApproveAddAccount(request: MsgApproveAddAccount): Promise<MsgApproveAddAccountResponse> {
    const data = MsgApproveAddAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "ApproveAddAccount", data);
    return promise.then((data) => MsgApproveAddAccountResponse.decode(_m0.Reader.create(data)));
  }

  ProposeRevokeAccount(request: MsgProposeRevokeAccount): Promise<MsgProposeRevokeAccountResponse> {
    const data = MsgProposeRevokeAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProposeRevokeAccount", data);
    return promise.then((data) => MsgProposeRevokeAccountResponse.decode(_m0.Reader.create(data)));
  }

  ApproveRevokeAccount(request: MsgApproveRevokeAccount): Promise<MsgApproveRevokeAccountResponse> {
    const data = MsgApproveRevokeAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "ApproveRevokeAccount", data);
    return promise.then((data) => MsgApproveRevokeAccountResponse.decode(_m0.Reader.create(data)));
  }

  RejectAddAccount(request: MsgRejectAddAccount): Promise<MsgRejectAddAccountResponse> {
    const data = MsgRejectAddAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "RejectAddAccount", data);
    return promise.then((data) => MsgRejectAddAccountResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
