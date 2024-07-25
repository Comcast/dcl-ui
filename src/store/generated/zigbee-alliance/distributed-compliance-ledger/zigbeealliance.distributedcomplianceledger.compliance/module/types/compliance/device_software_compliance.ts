/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ComplianceInfo } from "./compliance_info";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";

export interface DeviceSoftwareCompliance {
  cDCertificateId: string;
  complianceInfo: ComplianceInfo[];
  schemaVersion: number;
}

function createBaseDeviceSoftwareCompliance(): DeviceSoftwareCompliance {
  return { cDCertificateId: "", complianceInfo: [], schemaVersion: 0 };
}

export const DeviceSoftwareCompliance = {
  encode(message: DeviceSoftwareCompliance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cDCertificateId !== "") {
      writer.uint32(10).string(message.cDCertificateId);
    }
    for (const v of message.complianceInfo) {
      ComplianceInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(24).uint32(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceSoftwareCompliance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceSoftwareCompliance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cDCertificateId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.complianceInfo.push(ComplianceInfo.decode(reader, reader.uint32()));
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

  fromJSON(object: any): DeviceSoftwareCompliance {
    return {
      cDCertificateId: isSet(object.cDCertificateId) ? String(object.cDCertificateId) : "",
      complianceInfo: Array.isArray(object?.complianceInfo)
        ? object.complianceInfo.map((e: any) => ComplianceInfo.fromJSON(e))
        : [],
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
    };
  },

  toJSON(message: DeviceSoftwareCompliance): unknown {
    const obj: any = {};
    if (message.cDCertificateId !== "") {
      obj.cDCertificateId = message.cDCertificateId;
    }
    if (message.complianceInfo?.length) {
      obj.complianceInfo = message.complianceInfo.map((e) => ComplianceInfo.toJSON(e));
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceSoftwareCompliance>, I>>(base?: I): DeviceSoftwareCompliance {
    return DeviceSoftwareCompliance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceSoftwareCompliance>, I>>(object: I): DeviceSoftwareCompliance {
    const message = createBaseDeviceSoftwareCompliance();
    message.cDCertificateId = object.cDCertificateId ?? "";
    message.complianceInfo = object.complianceInfo?.map((e) => ComplianceInfo.fromPartial(e)) || [];
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
