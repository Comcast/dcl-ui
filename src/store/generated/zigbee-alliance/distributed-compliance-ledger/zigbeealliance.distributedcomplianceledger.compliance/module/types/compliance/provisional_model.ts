/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";

export interface ProvisionalModel {
  vid: number;
  pid: number;
  softwareVersion: number;
  certificationType: string;
  value: boolean;
  schemaVersion: number;
}

function createBaseProvisionalModel(): ProvisionalModel {
  return { vid: 0, pid: 0, softwareVersion: 0, certificationType: "", value: false, schemaVersion: 0 };
}

export const ProvisionalModel = {
  encode(message: ProvisionalModel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vid !== 0) {
      writer.uint32(8).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(16).int32(message.pid);
    }
    if (message.softwareVersion !== 0) {
      writer.uint32(24).uint32(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      writer.uint32(34).string(message.certificationType);
    }
    if (message.value === true) {
      writer.uint32(40).bool(message.value);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(48).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProvisionalModel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProvisionalModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.softwareVersion = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.certificationType = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.value = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
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

  fromJSON(object: any): ProvisionalModel {
    return {
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      softwareVersion: isSet(object.softwareVersion) ? Number(object.softwareVersion) : 0,
      certificationType: isSet(object.certificationType) ? String(object.certificationType) : "",
      value: isSet(object.value) ? Boolean(object.value) : false,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: ProvisionalModel): unknown {
    const obj: any = {};
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.softwareVersion !== 0) {
      obj.softwareVersion = Math.round(message.softwareVersion);
    }
    if (message.certificationType !== "") {
      obj.certificationType = message.certificationType;
    }
    if (message.value === true) {
      obj.value = message.value;
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProvisionalModel>, I>>(base?: I): ProvisionalModel {
    return ProvisionalModel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProvisionalModel>, I>>(object: I): ProvisionalModel {
    const message = createBaseProvisionalModel();
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.softwareVersion = object.softwareVersion ?? 0;
    message.certificationType = object.certificationType ?? "";
    message.value = object.value ?? false;
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
