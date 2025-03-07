/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CertifiedModel } from "./certified_model";
import { ComplianceInfo } from "./compliance_info";
import { DeviceSoftwareCompliance } from "./device_software_compliance";
import { ProvisionalModel } from "./provisional_model";
import { RevokedModel } from "./revoked_model";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.compliance";

/** GenesisState defines the compliance module's genesis state. */
export interface GenesisState {
  complianceInfoList: ComplianceInfo[];
  certifiedModelList: CertifiedModel[];
  revokedModelList: RevokedModel[];
  provisionalModelList: ProvisionalModel[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  deviceSoftwareComplianceList: DeviceSoftwareCompliance[];
}

function createBaseGenesisState(): GenesisState {
  return {
    complianceInfoList: [],
    certifiedModelList: [],
    revokedModelList: [],
    provisionalModelList: [],
    deviceSoftwareComplianceList: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.complianceInfoList) {
      ComplianceInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.certifiedModelList) {
      CertifiedModel.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.revokedModelList) {
      RevokedModel.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.provisionalModelList) {
      ProvisionalModel.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.deviceSoftwareComplianceList) {
      DeviceSoftwareCompliance.encode(v!, writer.uint32(42).fork()).ldelim();
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

          message.complianceInfoList.push(ComplianceInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.certifiedModelList.push(CertifiedModel.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.revokedModelList.push(RevokedModel.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.provisionalModelList.push(ProvisionalModel.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.deviceSoftwareComplianceList.push(DeviceSoftwareCompliance.decode(reader, reader.uint32()));
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
      complianceInfoList: Array.isArray(object?.complianceInfoList)
        ? object.complianceInfoList.map((e: any) => ComplianceInfo.fromJSON(e))
        : [],
      certifiedModelList: Array.isArray(object?.certifiedModelList)
        ? object.certifiedModelList.map((e: any) => CertifiedModel.fromJSON(e))
        : [],
      revokedModelList: Array.isArray(object?.revokedModelList)
        ? object.revokedModelList.map((e: any) => RevokedModel.fromJSON(e))
        : [],
      provisionalModelList: Array.isArray(object?.provisionalModelList)
        ? object.provisionalModelList.map((e: any) => ProvisionalModel.fromJSON(e))
        : [],
      deviceSoftwareComplianceList: Array.isArray(object?.deviceSoftwareComplianceList)
        ? object.deviceSoftwareComplianceList.map((e: any) => DeviceSoftwareCompliance.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.complianceInfoList?.length) {
      obj.complianceInfoList = message.complianceInfoList.map((e) => ComplianceInfo.toJSON(e));
    }
    if (message.certifiedModelList?.length) {
      obj.certifiedModelList = message.certifiedModelList.map((e) => CertifiedModel.toJSON(e));
    }
    if (message.revokedModelList?.length) {
      obj.revokedModelList = message.revokedModelList.map((e) => RevokedModel.toJSON(e));
    }
    if (message.provisionalModelList?.length) {
      obj.provisionalModelList = message.provisionalModelList.map((e) => ProvisionalModel.toJSON(e));
    }
    if (message.deviceSoftwareComplianceList?.length) {
      obj.deviceSoftwareComplianceList = message.deviceSoftwareComplianceList.map((e) =>
        DeviceSoftwareCompliance.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.complianceInfoList = object.complianceInfoList?.map((e) => ComplianceInfo.fromPartial(e)) || [];
    message.certifiedModelList = object.certifiedModelList?.map((e) => CertifiedModel.fromPartial(e)) || [];
    message.revokedModelList = object.revokedModelList?.map((e) => RevokedModel.fromPartial(e)) || [];
    message.provisionalModelList = object.provisionalModelList?.map((e) => ProvisionalModel.fromPartial(e)) || [];
    message.deviceSoftwareComplianceList =
      object.deviceSoftwareComplianceList?.map((e) => DeviceSoftwareCompliance.fromPartial(e)) || [];
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
