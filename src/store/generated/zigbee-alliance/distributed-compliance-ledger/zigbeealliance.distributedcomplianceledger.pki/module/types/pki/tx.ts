/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "zigbeealliance.distributedcomplianceledger.pki";

export interface MsgProposeAddX509RootCert {
  signer: string;
  cert: string;
  info: string;
  time: number;
  vid: number;
  certSchemaVersion: number;
}

export interface MsgProposeAddX509RootCertResponse {
}

export interface MsgApproveAddX509RootCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  info: string;
  time: number;
}

export interface MsgApproveAddX509RootCertResponse {
}

export interface MsgAddX509Cert {
  signer: string;
  cert: string;
  info: string;
  time: number;
  certSchemaVersion: number;
}

export interface MsgAddX509CertResponse {
}

export interface MsgProposeRevokeX509RootCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  info: string;
  time: number;
  serialNumber: string;
  revokeChild: boolean;
}

export interface MsgProposeRevokeX509RootCertResponse {
}

export interface MsgApproveRevokeX509RootCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  info: string;
  time: number;
  serialNumber: string;
}

export interface MsgApproveRevokeX509RootCertResponse {
}

export interface MsgRevokeX509Cert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  info: string;
  time: number;
  serialNumber: string;
  revokeChild: boolean;
}

export interface MsgRevokeX509CertResponse {
}

export interface MsgRejectAddX509RootCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  info: string;
  time: number;
}

export interface MsgRejectAddX509RootCertResponse {
}

export interface MsgAddPkiRevocationDistributionPoint {
  signer: string;
  vid: number;
  pid: number;
  isPAA: boolean;
  label: string;
  crlSignerCertificate: string;
  issuerSubjectKeyID: string;
  dataURL: string;
  dataFileSize: number;
  dataDigest: string;
  dataDigestType: number;
  revocationType: number;
  schemaVersion: number;
  crlSignerDelegator: string;
}

export interface MsgAddPkiRevocationDistributionPointResponse {
}

export interface MsgUpdatePkiRevocationDistributionPoint {
  signer: string;
  vid: number;
  label: string;
  crlSignerCertificate: string;
  issuerSubjectKeyID: string;
  dataURL: string;
  dataFileSize: number;
  dataDigest: string;
  dataDigestType: number;
  schemaVersion: number;
  crlSignerDelegator: string;
}

export interface MsgUpdatePkiRevocationDistributionPointResponse {
}

export interface MsgDeletePkiRevocationDistributionPoint {
  signer: string;
  vid: number;
  label: string;
  issuerSubjectKeyID: string;
}

export interface MsgDeletePkiRevocationDistributionPointResponse {
}

export interface MsgAssignVid {
  signer: string;
  subject: string;
  subjectKeyId: string;
  vid: number;
}

export interface MsgAssignVidResponse {
}

export interface MsgAddNocX509RootCert {
  signer: string;
  cert: string;
  certSchemaVersion: number;
}

export interface MsgAddNocX509RootCertResponse {
}

export interface MsgRemoveX509Cert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  serialNumber: string;
}

export interface MsgRemoveX509CertResponse {
}

export interface MsgAddNocX509IcaCert {
  signer: string;
  cert: string;
  certSchemaVersion: number;
}

export interface MsgAddNocX509IcaCertResponse {
}

export interface MsgRevokeNocX509RootCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  serialNumber: string;
  info: string;
  time: number;
  revokeChild: boolean;
}

export interface MsgRevokeNocX509RootCertResponse {
}

export interface MsgRevokeNocX509IcaCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  serialNumber: string;
  info: string;
  time: number;
  revokeChild: boolean;
}

export interface MsgRevokeNocX509IcaCertResponse {
}

export interface MsgRemoveNocX509IcaCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  serialNumber: string;
}

export interface MsgRemoveNocX509IcaCertResponse {
}

export interface MsgRemoveNocX509RootCert {
  signer: string;
  subject: string;
  subjectKeyId: string;
  serialNumber: string;
}

export interface MsgRemoveNocX509RootCertResponse {
}

function createBaseMsgProposeAddX509RootCert(): MsgProposeAddX509RootCert {
  return { signer: "", cert: "", info: "", time: 0, vid: 0, certSchemaVersion: 0 };
}

export const MsgProposeAddX509RootCert = {
  encode(message: MsgProposeAddX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.cert !== "") {
      writer.uint32(18).string(message.cert);
    }
    if (message.info !== "") {
      writer.uint32(26).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    if (message.vid !== 0) {
      writer.uint32(40).int32(message.vid);
    }
    if (message.certSchemaVersion !== 0) {
      writer.uint32(48).uint32(message.certSchemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeAddX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeAddX509RootCert();
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

          message.cert = reader.string();
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
        case 5:
          if (tag !== 40) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.certSchemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgProposeAddX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      cert: isSet(object.cert) ? String(object.cert) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      certSchemaVersion: isSet(object.certSchemaVersion) ? Number(object.certSchemaVersion) : 0,
    };
  },

  toJSON(message: MsgProposeAddX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.cert !== "") {
      obj.cert = message.cert;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.certSchemaVersion !== 0) {
      obj.certSchemaVersion = Math.round(message.certSchemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeAddX509RootCert>, I>>(base?: I): MsgProposeAddX509RootCert {
    return MsgProposeAddX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeAddX509RootCert>, I>>(object: I): MsgProposeAddX509RootCert {
    const message = createBaseMsgProposeAddX509RootCert();
    message.signer = object.signer ?? "";
    message.cert = object.cert ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.vid = object.vid ?? 0;
    message.certSchemaVersion = object.certSchemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgProposeAddX509RootCertResponse(): MsgProposeAddX509RootCertResponse {
  return {};
}

export const MsgProposeAddX509RootCertResponse = {
  encode(_: MsgProposeAddX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeAddX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeAddX509RootCertResponse();
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

  fromJSON(_: any): MsgProposeAddX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgProposeAddX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeAddX509RootCertResponse>, I>>(
    base?: I,
  ): MsgProposeAddX509RootCertResponse {
    return MsgProposeAddX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeAddX509RootCertResponse>, I>>(
    _: I,
  ): MsgProposeAddX509RootCertResponse {
    const message = createBaseMsgProposeAddX509RootCertResponse();
    return message;
  },
};

function createBaseMsgApproveAddX509RootCert(): MsgApproveAddX509RootCert {
  return { signer: "", subject: "", subjectKeyId: "", info: "", time: 0 };
}

export const MsgApproveAddX509RootCert = {
  encode(message: MsgApproveAddX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAddX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAddX509RootCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
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

  fromJSON(object: any): MsgApproveAddX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: MsgApproveAddX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveAddX509RootCert>, I>>(base?: I): MsgApproveAddX509RootCert {
    return MsgApproveAddX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveAddX509RootCert>, I>>(object: I): MsgApproveAddX509RootCert {
    const message = createBaseMsgApproveAddX509RootCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseMsgApproveAddX509RootCertResponse(): MsgApproveAddX509RootCertResponse {
  return {};
}

export const MsgApproveAddX509RootCertResponse = {
  encode(_: MsgApproveAddX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAddX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAddX509RootCertResponse();
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

  fromJSON(_: any): MsgApproveAddX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgApproveAddX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveAddX509RootCertResponse>, I>>(
    base?: I,
  ): MsgApproveAddX509RootCertResponse {
    return MsgApproveAddX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveAddX509RootCertResponse>, I>>(
    _: I,
  ): MsgApproveAddX509RootCertResponse {
    const message = createBaseMsgApproveAddX509RootCertResponse();
    return message;
  },
};

function createBaseMsgAddX509Cert(): MsgAddX509Cert {
  return { signer: "", cert: "", info: "", time: 0, certSchemaVersion: 0 };
}

export const MsgAddX509Cert = {
  encode(message: MsgAddX509Cert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.cert !== "") {
      writer.uint32(18).string(message.cert);
    }
    if (message.info !== "") {
      writer.uint32(26).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    if (message.certSchemaVersion !== 0) {
      writer.uint32(40).uint32(message.certSchemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddX509Cert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddX509Cert();
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

          message.cert = reader.string();
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
        case 5:
          if (tag !== 40) {
            break;
          }

          message.certSchemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddX509Cert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      cert: isSet(object.cert) ? String(object.cert) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      certSchemaVersion: isSet(object.certSchemaVersion) ? Number(object.certSchemaVersion) : 0,
    };
  },

  toJSON(message: MsgAddX509Cert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.cert !== "") {
      obj.cert = message.cert;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.certSchemaVersion !== 0) {
      obj.certSchemaVersion = Math.round(message.certSchemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddX509Cert>, I>>(base?: I): MsgAddX509Cert {
    return MsgAddX509Cert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddX509Cert>, I>>(object: I): MsgAddX509Cert {
    const message = createBaseMsgAddX509Cert();
    message.signer = object.signer ?? "";
    message.cert = object.cert ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.certSchemaVersion = object.certSchemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgAddX509CertResponse(): MsgAddX509CertResponse {
  return {};
}

export const MsgAddX509CertResponse = {
  encode(_: MsgAddX509CertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddX509CertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddX509CertResponse();
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

  fromJSON(_: any): MsgAddX509CertResponse {
    return {};
  },

  toJSON(_: MsgAddX509CertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddX509CertResponse>, I>>(base?: I): MsgAddX509CertResponse {
    return MsgAddX509CertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddX509CertResponse>, I>>(_: I): MsgAddX509CertResponse {
    const message = createBaseMsgAddX509CertResponse();
    return message;
  },
};

function createBaseMsgProposeRevokeX509RootCert(): MsgProposeRevokeX509RootCert {
  return { signer: "", subject: "", subjectKeyId: "", info: "", time: 0, serialNumber: "", revokeChild: false };
}

export const MsgProposeRevokeX509RootCert = {
  encode(message: MsgProposeRevokeX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time);
    }
    if (message.serialNumber !== "") {
      writer.uint32(50).string(message.serialNumber);
    }
    if (message.revokeChild === true) {
      writer.uint32(56).bool(message.revokeChild);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRevokeX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRevokeX509RootCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.revokeChild = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgProposeRevokeX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      revokeChild: isSet(object.revokeChild) ? Boolean(object.revokeChild) : false,
    };
  },

  toJSON(message: MsgProposeRevokeX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.revokeChild === true) {
      obj.revokeChild = message.revokeChild;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeRevokeX509RootCert>, I>>(base?: I): MsgProposeRevokeX509RootCert {
    return MsgProposeRevokeX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeRevokeX509RootCert>, I>>(object: I): MsgProposeRevokeX509RootCert {
    const message = createBaseMsgProposeRevokeX509RootCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.serialNumber = object.serialNumber ?? "";
    message.revokeChild = object.revokeChild ?? false;
    return message;
  },
};

function createBaseMsgProposeRevokeX509RootCertResponse(): MsgProposeRevokeX509RootCertResponse {
  return {};
}

export const MsgProposeRevokeX509RootCertResponse = {
  encode(_: MsgProposeRevokeX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRevokeX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRevokeX509RootCertResponse();
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

  fromJSON(_: any): MsgProposeRevokeX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgProposeRevokeX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgProposeRevokeX509RootCertResponse>, I>>(
    base?: I,
  ): MsgProposeRevokeX509RootCertResponse {
    return MsgProposeRevokeX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeRevokeX509RootCertResponse>, I>>(
    _: I,
  ): MsgProposeRevokeX509RootCertResponse {
    const message = createBaseMsgProposeRevokeX509RootCertResponse();
    return message;
  },
};

function createBaseMsgApproveRevokeX509RootCert(): MsgApproveRevokeX509RootCert {
  return { signer: "", subject: "", subjectKeyId: "", info: "", time: 0, serialNumber: "" };
}

export const MsgApproveRevokeX509RootCert = {
  encode(message: MsgApproveRevokeX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.info !== "") {
      writer.uint32(42).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(48).int64(message.time);
    }
    if (message.serialNumber !== "") {
      writer.uint32(58).string(message.serialNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveRevokeX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveRevokeX509RootCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.info = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgApproveRevokeX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
    };
  },

  toJSON(message: MsgApproveRevokeX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveRevokeX509RootCert>, I>>(base?: I): MsgApproveRevokeX509RootCert {
    return MsgApproveRevokeX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveRevokeX509RootCert>, I>>(object: I): MsgApproveRevokeX509RootCert {
    const message = createBaseMsgApproveRevokeX509RootCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.serialNumber = object.serialNumber ?? "";
    return message;
  },
};

function createBaseMsgApproveRevokeX509RootCertResponse(): MsgApproveRevokeX509RootCertResponse {
  return {};
}

export const MsgApproveRevokeX509RootCertResponse = {
  encode(_: MsgApproveRevokeX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveRevokeX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveRevokeX509RootCertResponse();
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

  fromJSON(_: any): MsgApproveRevokeX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgApproveRevokeX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgApproveRevokeX509RootCertResponse>, I>>(
    base?: I,
  ): MsgApproveRevokeX509RootCertResponse {
    return MsgApproveRevokeX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgApproveRevokeX509RootCertResponse>, I>>(
    _: I,
  ): MsgApproveRevokeX509RootCertResponse {
    const message = createBaseMsgApproveRevokeX509RootCertResponse();
    return message;
  },
};

function createBaseMsgRevokeX509Cert(): MsgRevokeX509Cert {
  return { signer: "", subject: "", subjectKeyId: "", info: "", time: 0, serialNumber: "", revokeChild: false };
}

export const MsgRevokeX509Cert = {
  encode(message: MsgRevokeX509Cert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time);
    }
    if (message.serialNumber !== "") {
      writer.uint32(50).string(message.serialNumber);
    }
    if (message.revokeChild === true) {
      writer.uint32(56).bool(message.revokeChild);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeX509Cert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeX509Cert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.revokeChild = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeX509Cert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      revokeChild: isSet(object.revokeChild) ? Boolean(object.revokeChild) : false,
    };
  },

  toJSON(message: MsgRevokeX509Cert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.revokeChild === true) {
      obj.revokeChild = message.revokeChild;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeX509Cert>, I>>(base?: I): MsgRevokeX509Cert {
    return MsgRevokeX509Cert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeX509Cert>, I>>(object: I): MsgRevokeX509Cert {
    const message = createBaseMsgRevokeX509Cert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.serialNumber = object.serialNumber ?? "";
    message.revokeChild = object.revokeChild ?? false;
    return message;
  },
};

function createBaseMsgRevokeX509CertResponse(): MsgRevokeX509CertResponse {
  return {};
}

export const MsgRevokeX509CertResponse = {
  encode(_: MsgRevokeX509CertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeX509CertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeX509CertResponse();
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

  fromJSON(_: any): MsgRevokeX509CertResponse {
    return {};
  },

  toJSON(_: MsgRevokeX509CertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeX509CertResponse>, I>>(base?: I): MsgRevokeX509CertResponse {
    return MsgRevokeX509CertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeX509CertResponse>, I>>(_: I): MsgRevokeX509CertResponse {
    const message = createBaseMsgRevokeX509CertResponse();
    return message;
  },
};

function createBaseMsgRejectAddX509RootCert(): MsgRejectAddX509RootCert {
  return { signer: "", subject: "", subjectKeyId: "", info: "", time: 0 };
}

export const MsgRejectAddX509RootCert = {
  encode(message: MsgRejectAddX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRejectAddX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectAddX509RootCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
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

  fromJSON(object: any): MsgRejectAddX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: MsgRejectAddX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRejectAddX509RootCert>, I>>(base?: I): MsgRejectAddX509RootCert {
    return MsgRejectAddX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRejectAddX509RootCert>, I>>(object: I): MsgRejectAddX509RootCert {
    const message = createBaseMsgRejectAddX509RootCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseMsgRejectAddX509RootCertResponse(): MsgRejectAddX509RootCertResponse {
  return {};
}

export const MsgRejectAddX509RootCertResponse = {
  encode(_: MsgRejectAddX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRejectAddX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectAddX509RootCertResponse();
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

  fromJSON(_: any): MsgRejectAddX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgRejectAddX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRejectAddX509RootCertResponse>, I>>(
    base?: I,
  ): MsgRejectAddX509RootCertResponse {
    return MsgRejectAddX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRejectAddX509RootCertResponse>, I>>(
    _: I,
  ): MsgRejectAddX509RootCertResponse {
    const message = createBaseMsgRejectAddX509RootCertResponse();
    return message;
  },
};

function createBaseMsgAddPkiRevocationDistributionPoint(): MsgAddPkiRevocationDistributionPoint {
  return {
    signer: "",
    vid: 0,
    pid: 0,
    isPAA: false,
    label: "",
    crlSignerCertificate: "",
    issuerSubjectKeyID: "",
    dataURL: "",
    dataFileSize: 0,
    dataDigest: "",
    dataDigestType: 0,
    revocationType: 0,
    schemaVersion: 0,
    crlSignerDelegator: "",
  };
}

export const MsgAddPkiRevocationDistributionPoint = {
  encode(message: MsgAddPkiRevocationDistributionPoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.pid !== 0) {
      writer.uint32(24).int32(message.pid);
    }
    if (message.isPAA === true) {
      writer.uint32(32).bool(message.isPAA);
    }
    if (message.label !== "") {
      writer.uint32(42).string(message.label);
    }
    if (message.crlSignerCertificate !== "") {
      writer.uint32(50).string(message.crlSignerCertificate);
    }
    if (message.issuerSubjectKeyID !== "") {
      writer.uint32(58).string(message.issuerSubjectKeyID);
    }
    if (message.dataURL !== "") {
      writer.uint32(66).string(message.dataURL);
    }
    if (message.dataFileSize !== 0) {
      writer.uint32(72).uint64(message.dataFileSize);
    }
    if (message.dataDigest !== "") {
      writer.uint32(82).string(message.dataDigest);
    }
    if (message.dataDigestType !== 0) {
      writer.uint32(88).uint32(message.dataDigestType);
    }
    if (message.revocationType !== 0) {
      writer.uint32(96).uint32(message.revocationType);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(104).uint32(message.schemaVersion);
    }
    if (message.crlSignerDelegator !== "") {
      writer.uint32(114).string(message.crlSignerDelegator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPkiRevocationDistributionPoint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPkiRevocationDistributionPoint();
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
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isPAA = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.label = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.crlSignerCertificate = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.issuerSubjectKeyID = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.dataURL = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.dataFileSize = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.dataDigest = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.dataDigestType = reader.uint32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.revocationType = reader.uint32();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.crlSignerDelegator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddPkiRevocationDistributionPoint {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      isPAA: isSet(object.isPAA) ? Boolean(object.isPAA) : false,
      label: isSet(object.label) ? String(object.label) : "",
      crlSignerCertificate: isSet(object.crlSignerCertificate) ? String(object.crlSignerCertificate) : "",
      issuerSubjectKeyID: isSet(object.issuerSubjectKeyID) ? String(object.issuerSubjectKeyID) : "",
      dataURL: isSet(object.dataURL) ? String(object.dataURL) : "",
      dataFileSize: isSet(object.dataFileSize) ? Number(object.dataFileSize) : 0,
      dataDigest: isSet(object.dataDigest) ? String(object.dataDigest) : "",
      dataDigestType: isSet(object.dataDigestType) ? Number(object.dataDigestType) : 0,
      revocationType: isSet(object.revocationType) ? Number(object.revocationType) : 0,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
      crlSignerDelegator: isSet(object.crlSignerDelegator) ? String(object.crlSignerDelegator) : "",
    };
  },

  toJSON(message: MsgAddPkiRevocationDistributionPoint): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.isPAA === true) {
      obj.isPAA = message.isPAA;
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.crlSignerCertificate !== "") {
      obj.crlSignerCertificate = message.crlSignerCertificate;
    }
    if (message.issuerSubjectKeyID !== "") {
      obj.issuerSubjectKeyID = message.issuerSubjectKeyID;
    }
    if (message.dataURL !== "") {
      obj.dataURL = message.dataURL;
    }
    if (message.dataFileSize !== 0) {
      obj.dataFileSize = Math.round(message.dataFileSize);
    }
    if (message.dataDigest !== "") {
      obj.dataDigest = message.dataDigest;
    }
    if (message.dataDigestType !== 0) {
      obj.dataDigestType = Math.round(message.dataDigestType);
    }
    if (message.revocationType !== 0) {
      obj.revocationType = Math.round(message.revocationType);
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    if (message.crlSignerDelegator !== "") {
      obj.crlSignerDelegator = message.crlSignerDelegator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddPkiRevocationDistributionPoint>, I>>(
    base?: I,
  ): MsgAddPkiRevocationDistributionPoint {
    return MsgAddPkiRevocationDistributionPoint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddPkiRevocationDistributionPoint>, I>>(
    object: I,
  ): MsgAddPkiRevocationDistributionPoint {
    const message = createBaseMsgAddPkiRevocationDistributionPoint();
    message.signer = object.signer ?? "";
    message.vid = object.vid ?? 0;
    message.pid = object.pid ?? 0;
    message.isPAA = object.isPAA ?? false;
    message.label = object.label ?? "";
    message.crlSignerCertificate = object.crlSignerCertificate ?? "";
    message.issuerSubjectKeyID = object.issuerSubjectKeyID ?? "";
    message.dataURL = object.dataURL ?? "";
    message.dataFileSize = object.dataFileSize ?? 0;
    message.dataDigest = object.dataDigest ?? "";
    message.dataDigestType = object.dataDigestType ?? 0;
    message.revocationType = object.revocationType ?? 0;
    message.schemaVersion = object.schemaVersion ?? 0;
    message.crlSignerDelegator = object.crlSignerDelegator ?? "";
    return message;
  },
};

function createBaseMsgAddPkiRevocationDistributionPointResponse(): MsgAddPkiRevocationDistributionPointResponse {
  return {};
}

export const MsgAddPkiRevocationDistributionPointResponse = {
  encode(_: MsgAddPkiRevocationDistributionPointResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPkiRevocationDistributionPointResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPkiRevocationDistributionPointResponse();
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

  fromJSON(_: any): MsgAddPkiRevocationDistributionPointResponse {
    return {};
  },

  toJSON(_: MsgAddPkiRevocationDistributionPointResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddPkiRevocationDistributionPointResponse>, I>>(
    base?: I,
  ): MsgAddPkiRevocationDistributionPointResponse {
    return MsgAddPkiRevocationDistributionPointResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddPkiRevocationDistributionPointResponse>, I>>(
    _: I,
  ): MsgAddPkiRevocationDistributionPointResponse {
    const message = createBaseMsgAddPkiRevocationDistributionPointResponse();
    return message;
  },
};

function createBaseMsgUpdatePkiRevocationDistributionPoint(): MsgUpdatePkiRevocationDistributionPoint {
  return {
    signer: "",
    vid: 0,
    label: "",
    crlSignerCertificate: "",
    issuerSubjectKeyID: "",
    dataURL: "",
    dataFileSize: 0,
    dataDigest: "",
    dataDigestType: 0,
    schemaVersion: 0,
    crlSignerDelegator: "",
  };
}

export const MsgUpdatePkiRevocationDistributionPoint = {
  encode(message: MsgUpdatePkiRevocationDistributionPoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.label !== "") {
      writer.uint32(26).string(message.label);
    }
    if (message.crlSignerCertificate !== "") {
      writer.uint32(34).string(message.crlSignerCertificate);
    }
    if (message.issuerSubjectKeyID !== "") {
      writer.uint32(42).string(message.issuerSubjectKeyID);
    }
    if (message.dataURL !== "") {
      writer.uint32(50).string(message.dataURL);
    }
    if (message.dataFileSize !== 0) {
      writer.uint32(56).uint64(message.dataFileSize);
    }
    if (message.dataDigest !== "") {
      writer.uint32(66).string(message.dataDigest);
    }
    if (message.dataDigestType !== 0) {
      writer.uint32(72).uint32(message.dataDigestType);
    }
    if (message.schemaVersion !== 0) {
      writer.uint32(80).uint32(message.schemaVersion);
    }
    if (message.crlSignerDelegator !== "") {
      writer.uint32(90).string(message.crlSignerDelegator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePkiRevocationDistributionPoint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePkiRevocationDistributionPoint();
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
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.label = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.crlSignerCertificate = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.issuerSubjectKeyID = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.dataURL = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.dataFileSize = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.dataDigest = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.dataDigestType = reader.uint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.schemaVersion = reader.uint32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.crlSignerDelegator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePkiRevocationDistributionPoint {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      label: isSet(object.label) ? String(object.label) : "",
      crlSignerCertificate: isSet(object.crlSignerCertificate) ? String(object.crlSignerCertificate) : "",
      issuerSubjectKeyID: isSet(object.issuerSubjectKeyID) ? String(object.issuerSubjectKeyID) : "",
      dataURL: isSet(object.dataURL) ? String(object.dataURL) : "",
      dataFileSize: isSet(object.dataFileSize) ? Number(object.dataFileSize) : 0,
      dataDigest: isSet(object.dataDigest) ? String(object.dataDigest) : "",
      dataDigestType: isSet(object.dataDigestType) ? Number(object.dataDigestType) : 0,
      schemaVersion: isSet(object.schemaVersion) ? Number(object.schemaVersion) : 0,
      crlSignerDelegator: isSet(object.crlSignerDelegator) ? String(object.crlSignerDelegator) : "",
    };
  },

  toJSON(message: MsgUpdatePkiRevocationDistributionPoint): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.crlSignerCertificate !== "") {
      obj.crlSignerCertificate = message.crlSignerCertificate;
    }
    if (message.issuerSubjectKeyID !== "") {
      obj.issuerSubjectKeyID = message.issuerSubjectKeyID;
    }
    if (message.dataURL !== "") {
      obj.dataURL = message.dataURL;
    }
    if (message.dataFileSize !== 0) {
      obj.dataFileSize = Math.round(message.dataFileSize);
    }
    if (message.dataDigest !== "") {
      obj.dataDigest = message.dataDigest;
    }
    if (message.dataDigestType !== 0) {
      obj.dataDigestType = Math.round(message.dataDigestType);
    }
    if (message.schemaVersion !== 0) {
      obj.schemaVersion = Math.round(message.schemaVersion);
    }
    if (message.crlSignerDelegator !== "") {
      obj.crlSignerDelegator = message.crlSignerDelegator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdatePkiRevocationDistributionPoint>, I>>(
    base?: I,
  ): MsgUpdatePkiRevocationDistributionPoint {
    return MsgUpdatePkiRevocationDistributionPoint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdatePkiRevocationDistributionPoint>, I>>(
    object: I,
  ): MsgUpdatePkiRevocationDistributionPoint {
    const message = createBaseMsgUpdatePkiRevocationDistributionPoint();
    message.signer = object.signer ?? "";
    message.vid = object.vid ?? 0;
    message.label = object.label ?? "";
    message.crlSignerCertificate = object.crlSignerCertificate ?? "";
    message.issuerSubjectKeyID = object.issuerSubjectKeyID ?? "";
    message.dataURL = object.dataURL ?? "";
    message.dataFileSize = object.dataFileSize ?? 0;
    message.dataDigest = object.dataDigest ?? "";
    message.dataDigestType = object.dataDigestType ?? 0;
    message.schemaVersion = object.schemaVersion ?? 0;
    message.crlSignerDelegator = object.crlSignerDelegator ?? "";
    return message;
  },
};

function createBaseMsgUpdatePkiRevocationDistributionPointResponse(): MsgUpdatePkiRevocationDistributionPointResponse {
  return {};
}

export const MsgUpdatePkiRevocationDistributionPointResponse = {
  encode(_: MsgUpdatePkiRevocationDistributionPointResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePkiRevocationDistributionPointResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePkiRevocationDistributionPointResponse();
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

  fromJSON(_: any): MsgUpdatePkiRevocationDistributionPointResponse {
    return {};
  },

  toJSON(_: MsgUpdatePkiRevocationDistributionPointResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdatePkiRevocationDistributionPointResponse>, I>>(
    base?: I,
  ): MsgUpdatePkiRevocationDistributionPointResponse {
    return MsgUpdatePkiRevocationDistributionPointResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdatePkiRevocationDistributionPointResponse>, I>>(
    _: I,
  ): MsgUpdatePkiRevocationDistributionPointResponse {
    const message = createBaseMsgUpdatePkiRevocationDistributionPointResponse();
    return message;
  },
};

function createBaseMsgDeletePkiRevocationDistributionPoint(): MsgDeletePkiRevocationDistributionPoint {
  return { signer: "", vid: 0, label: "", issuerSubjectKeyID: "" };
}

export const MsgDeletePkiRevocationDistributionPoint = {
  encode(message: MsgDeletePkiRevocationDistributionPoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.vid !== 0) {
      writer.uint32(16).int32(message.vid);
    }
    if (message.label !== "") {
      writer.uint32(26).string(message.label);
    }
    if (message.issuerSubjectKeyID !== "") {
      writer.uint32(34).string(message.issuerSubjectKeyID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeletePkiRevocationDistributionPoint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeletePkiRevocationDistributionPoint();
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
          if (tag !== 16) {
            break;
          }

          message.vid = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.label = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.issuerSubjectKeyID = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeletePkiRevocationDistributionPoint {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
      label: isSet(object.label) ? String(object.label) : "",
      issuerSubjectKeyID: isSet(object.issuerSubjectKeyID) ? String(object.issuerSubjectKeyID) : "",
    };
  },

  toJSON(message: MsgDeletePkiRevocationDistributionPoint): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.issuerSubjectKeyID !== "") {
      obj.issuerSubjectKeyID = message.issuerSubjectKeyID;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeletePkiRevocationDistributionPoint>, I>>(
    base?: I,
  ): MsgDeletePkiRevocationDistributionPoint {
    return MsgDeletePkiRevocationDistributionPoint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeletePkiRevocationDistributionPoint>, I>>(
    object: I,
  ): MsgDeletePkiRevocationDistributionPoint {
    const message = createBaseMsgDeletePkiRevocationDistributionPoint();
    message.signer = object.signer ?? "";
    message.vid = object.vid ?? 0;
    message.label = object.label ?? "";
    message.issuerSubjectKeyID = object.issuerSubjectKeyID ?? "";
    return message;
  },
};

function createBaseMsgDeletePkiRevocationDistributionPointResponse(): MsgDeletePkiRevocationDistributionPointResponse {
  return {};
}

export const MsgDeletePkiRevocationDistributionPointResponse = {
  encode(_: MsgDeletePkiRevocationDistributionPointResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeletePkiRevocationDistributionPointResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeletePkiRevocationDistributionPointResponse();
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

  fromJSON(_: any): MsgDeletePkiRevocationDistributionPointResponse {
    return {};
  },

  toJSON(_: MsgDeletePkiRevocationDistributionPointResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeletePkiRevocationDistributionPointResponse>, I>>(
    base?: I,
  ): MsgDeletePkiRevocationDistributionPointResponse {
    return MsgDeletePkiRevocationDistributionPointResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeletePkiRevocationDistributionPointResponse>, I>>(
    _: I,
  ): MsgDeletePkiRevocationDistributionPointResponse {
    const message = createBaseMsgDeletePkiRevocationDistributionPointResponse();
    return message;
  },
};

function createBaseMsgAssignVid(): MsgAssignVid {
  return { signer: "", subject: "", subjectKeyId: "", vid: 0 };
}

export const MsgAssignVid = {
  encode(message: MsgAssignVid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.vid !== 0) {
      writer.uint32(32).int32(message.vid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAssignVid {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignVid();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.vid = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAssignVid {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      vid: isSet(object.vid) ? Number(object.vid) : 0,
    };
  },

  toJSON(message: MsgAssignVid): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.vid !== 0) {
      obj.vid = Math.round(message.vid);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAssignVid>, I>>(base?: I): MsgAssignVid {
    return MsgAssignVid.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAssignVid>, I>>(object: I): MsgAssignVid {
    const message = createBaseMsgAssignVid();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.vid = object.vid ?? 0;
    return message;
  },
};

function createBaseMsgAssignVidResponse(): MsgAssignVidResponse {
  return {};
}

export const MsgAssignVidResponse = {
  encode(_: MsgAssignVidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAssignVidResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignVidResponse();
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

  fromJSON(_: any): MsgAssignVidResponse {
    return {};
  },

  toJSON(_: MsgAssignVidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAssignVidResponse>, I>>(base?: I): MsgAssignVidResponse {
    return MsgAssignVidResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAssignVidResponse>, I>>(_: I): MsgAssignVidResponse {
    const message = createBaseMsgAssignVidResponse();
    return message;
  },
};

function createBaseMsgAddNocX509RootCert(): MsgAddNocX509RootCert {
  return { signer: "", cert: "", certSchemaVersion: 0 };
}

export const MsgAddNocX509RootCert = {
  encode(message: MsgAddNocX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.cert !== "") {
      writer.uint32(18).string(message.cert);
    }
    if (message.certSchemaVersion !== 0) {
      writer.uint32(32).uint32(message.certSchemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddNocX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddNocX509RootCert();
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

          message.cert = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.certSchemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddNocX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      cert: isSet(object.cert) ? String(object.cert) : "",
      certSchemaVersion: isSet(object.certSchemaVersion) ? Number(object.certSchemaVersion) : 0,
    };
  },

  toJSON(message: MsgAddNocX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.cert !== "") {
      obj.cert = message.cert;
    }
    if (message.certSchemaVersion !== 0) {
      obj.certSchemaVersion = Math.round(message.certSchemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddNocX509RootCert>, I>>(base?: I): MsgAddNocX509RootCert {
    return MsgAddNocX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddNocX509RootCert>, I>>(object: I): MsgAddNocX509RootCert {
    const message = createBaseMsgAddNocX509RootCert();
    message.signer = object.signer ?? "";
    message.cert = object.cert ?? "";
    message.certSchemaVersion = object.certSchemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgAddNocX509RootCertResponse(): MsgAddNocX509RootCertResponse {
  return {};
}

export const MsgAddNocX509RootCertResponse = {
  encode(_: MsgAddNocX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddNocX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddNocX509RootCertResponse();
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

  fromJSON(_: any): MsgAddNocX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgAddNocX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddNocX509RootCertResponse>, I>>(base?: I): MsgAddNocX509RootCertResponse {
    return MsgAddNocX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddNocX509RootCertResponse>, I>>(_: I): MsgAddNocX509RootCertResponse {
    const message = createBaseMsgAddNocX509RootCertResponse();
    return message;
  },
};

function createBaseMsgRemoveX509Cert(): MsgRemoveX509Cert {
  return { signer: "", subject: "", subjectKeyId: "", serialNumber: "" };
}

export const MsgRemoveX509Cert = {
  encode(message: MsgRemoveX509Cert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.serialNumber !== "") {
      writer.uint32(34).string(message.serialNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveX509Cert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveX509Cert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveX509Cert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
    };
  },

  toJSON(message: MsgRemoveX509Cert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveX509Cert>, I>>(base?: I): MsgRemoveX509Cert {
    return MsgRemoveX509Cert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveX509Cert>, I>>(object: I): MsgRemoveX509Cert {
    const message = createBaseMsgRemoveX509Cert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.serialNumber = object.serialNumber ?? "";
    return message;
  },
};

function createBaseMsgRemoveX509CertResponse(): MsgRemoveX509CertResponse {
  return {};
}

export const MsgRemoveX509CertResponse = {
  encode(_: MsgRemoveX509CertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveX509CertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveX509CertResponse();
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

  fromJSON(_: any): MsgRemoveX509CertResponse {
    return {};
  },

  toJSON(_: MsgRemoveX509CertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveX509CertResponse>, I>>(base?: I): MsgRemoveX509CertResponse {
    return MsgRemoveX509CertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveX509CertResponse>, I>>(_: I): MsgRemoveX509CertResponse {
    const message = createBaseMsgRemoveX509CertResponse();
    return message;
  },
};

function createBaseMsgAddNocX509IcaCert(): MsgAddNocX509IcaCert {
  return { signer: "", cert: "", certSchemaVersion: 0 };
}

export const MsgAddNocX509IcaCert = {
  encode(message: MsgAddNocX509IcaCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.cert !== "") {
      writer.uint32(18).string(message.cert);
    }
    if (message.certSchemaVersion !== 0) {
      writer.uint32(24).uint32(message.certSchemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddNocX509IcaCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddNocX509IcaCert();
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

          message.cert = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.certSchemaVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddNocX509IcaCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      cert: isSet(object.cert) ? String(object.cert) : "",
      certSchemaVersion: isSet(object.certSchemaVersion) ? Number(object.certSchemaVersion) : 0,
    };
  },

  toJSON(message: MsgAddNocX509IcaCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.cert !== "") {
      obj.cert = message.cert;
    }
    if (message.certSchemaVersion !== 0) {
      obj.certSchemaVersion = Math.round(message.certSchemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddNocX509IcaCert>, I>>(base?: I): MsgAddNocX509IcaCert {
    return MsgAddNocX509IcaCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddNocX509IcaCert>, I>>(object: I): MsgAddNocX509IcaCert {
    const message = createBaseMsgAddNocX509IcaCert();
    message.signer = object.signer ?? "";
    message.cert = object.cert ?? "";
    message.certSchemaVersion = object.certSchemaVersion ?? 0;
    return message;
  },
};

function createBaseMsgAddNocX509IcaCertResponse(): MsgAddNocX509IcaCertResponse {
  return {};
}

export const MsgAddNocX509IcaCertResponse = {
  encode(_: MsgAddNocX509IcaCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddNocX509IcaCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddNocX509IcaCertResponse();
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

  fromJSON(_: any): MsgAddNocX509IcaCertResponse {
    return {};
  },

  toJSON(_: MsgAddNocX509IcaCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddNocX509IcaCertResponse>, I>>(base?: I): MsgAddNocX509IcaCertResponse {
    return MsgAddNocX509IcaCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddNocX509IcaCertResponse>, I>>(_: I): MsgAddNocX509IcaCertResponse {
    const message = createBaseMsgAddNocX509IcaCertResponse();
    return message;
  },
};

function createBaseMsgRevokeNocX509RootCert(): MsgRevokeNocX509RootCert {
  return { signer: "", subject: "", subjectKeyId: "", serialNumber: "", info: "", time: 0, revokeChild: false };
}

export const MsgRevokeNocX509RootCert = {
  encode(message: MsgRevokeNocX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.serialNumber !== "") {
      writer.uint32(34).string(message.serialNumber);
    }
    if (message.info !== "") {
      writer.uint32(42).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(48).int64(message.time);
    }
    if (message.revokeChild === true) {
      writer.uint32(56).bool(message.revokeChild);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeNocX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeNocX509RootCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.info = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.revokeChild = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeNocX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      revokeChild: isSet(object.revokeChild) ? Boolean(object.revokeChild) : false,
    };
  },

  toJSON(message: MsgRevokeNocX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.revokeChild === true) {
      obj.revokeChild = message.revokeChild;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeNocX509RootCert>, I>>(base?: I): MsgRevokeNocX509RootCert {
    return MsgRevokeNocX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeNocX509RootCert>, I>>(object: I): MsgRevokeNocX509RootCert {
    const message = createBaseMsgRevokeNocX509RootCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.serialNumber = object.serialNumber ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.revokeChild = object.revokeChild ?? false;
    return message;
  },
};

function createBaseMsgRevokeNocX509RootCertResponse(): MsgRevokeNocX509RootCertResponse {
  return {};
}

export const MsgRevokeNocX509RootCertResponse = {
  encode(_: MsgRevokeNocX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeNocX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeNocX509RootCertResponse();
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

  fromJSON(_: any): MsgRevokeNocX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgRevokeNocX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeNocX509RootCertResponse>, I>>(
    base?: I,
  ): MsgRevokeNocX509RootCertResponse {
    return MsgRevokeNocX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeNocX509RootCertResponse>, I>>(
    _: I,
  ): MsgRevokeNocX509RootCertResponse {
    const message = createBaseMsgRevokeNocX509RootCertResponse();
    return message;
  },
};

function createBaseMsgRevokeNocX509IcaCert(): MsgRevokeNocX509IcaCert {
  return { signer: "", subject: "", subjectKeyId: "", serialNumber: "", info: "", time: 0, revokeChild: false };
}

export const MsgRevokeNocX509IcaCert = {
  encode(message: MsgRevokeNocX509IcaCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.serialNumber !== "") {
      writer.uint32(34).string(message.serialNumber);
    }
    if (message.info !== "") {
      writer.uint32(42).string(message.info);
    }
    if (message.time !== 0) {
      writer.uint32(48).int64(message.time);
    }
    if (message.revokeChild === true) {
      writer.uint32(56).bool(message.revokeChild);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeNocX509IcaCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeNocX509IcaCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.info = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.revokeChild = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeNocX509IcaCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
      info: isSet(object.info) ? String(object.info) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
      revokeChild: isSet(object.revokeChild) ? Boolean(object.revokeChild) : false,
    };
  },

  toJSON(message: MsgRevokeNocX509IcaCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.revokeChild === true) {
      obj.revokeChild = message.revokeChild;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeNocX509IcaCert>, I>>(base?: I): MsgRevokeNocX509IcaCert {
    return MsgRevokeNocX509IcaCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeNocX509IcaCert>, I>>(object: I): MsgRevokeNocX509IcaCert {
    const message = createBaseMsgRevokeNocX509IcaCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.serialNumber = object.serialNumber ?? "";
    message.info = object.info ?? "";
    message.time = object.time ?? 0;
    message.revokeChild = object.revokeChild ?? false;
    return message;
  },
};

function createBaseMsgRevokeNocX509IcaCertResponse(): MsgRevokeNocX509IcaCertResponse {
  return {};
}

export const MsgRevokeNocX509IcaCertResponse = {
  encode(_: MsgRevokeNocX509IcaCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeNocX509IcaCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeNocX509IcaCertResponse();
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

  fromJSON(_: any): MsgRevokeNocX509IcaCertResponse {
    return {};
  },

  toJSON(_: MsgRevokeNocX509IcaCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeNocX509IcaCertResponse>, I>>(base?: I): MsgRevokeNocX509IcaCertResponse {
    return MsgRevokeNocX509IcaCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeNocX509IcaCertResponse>, I>>(_: I): MsgRevokeNocX509IcaCertResponse {
    const message = createBaseMsgRevokeNocX509IcaCertResponse();
    return message;
  },
};

function createBaseMsgRemoveNocX509IcaCert(): MsgRemoveNocX509IcaCert {
  return { signer: "", subject: "", subjectKeyId: "", serialNumber: "" };
}

export const MsgRemoveNocX509IcaCert = {
  encode(message: MsgRemoveNocX509IcaCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.serialNumber !== "") {
      writer.uint32(34).string(message.serialNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveNocX509IcaCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNocX509IcaCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveNocX509IcaCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
    };
  },

  toJSON(message: MsgRemoveNocX509IcaCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveNocX509IcaCert>, I>>(base?: I): MsgRemoveNocX509IcaCert {
    return MsgRemoveNocX509IcaCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveNocX509IcaCert>, I>>(object: I): MsgRemoveNocX509IcaCert {
    const message = createBaseMsgRemoveNocX509IcaCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.serialNumber = object.serialNumber ?? "";
    return message;
  },
};

function createBaseMsgRemoveNocX509IcaCertResponse(): MsgRemoveNocX509IcaCertResponse {
  return {};
}

export const MsgRemoveNocX509IcaCertResponse = {
  encode(_: MsgRemoveNocX509IcaCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveNocX509IcaCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNocX509IcaCertResponse();
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

  fromJSON(_: any): MsgRemoveNocX509IcaCertResponse {
    return {};
  },

  toJSON(_: MsgRemoveNocX509IcaCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveNocX509IcaCertResponse>, I>>(base?: I): MsgRemoveNocX509IcaCertResponse {
    return MsgRemoveNocX509IcaCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveNocX509IcaCertResponse>, I>>(_: I): MsgRemoveNocX509IcaCertResponse {
    const message = createBaseMsgRemoveNocX509IcaCertResponse();
    return message;
  },
};

function createBaseMsgRemoveNocX509RootCert(): MsgRemoveNocX509RootCert {
  return { signer: "", subject: "", subjectKeyId: "", serialNumber: "" };
}

export const MsgRemoveNocX509RootCert = {
  encode(message: MsgRemoveNocX509RootCert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.subjectKeyId !== "") {
      writer.uint32(26).string(message.subjectKeyId);
    }
    if (message.serialNumber !== "") {
      writer.uint32(34).string(message.serialNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveNocX509RootCert {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNocX509RootCert();
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

          message.subject = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectKeyId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serialNumber = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveNocX509RootCert {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      subject: isSet(object.subject) ? String(object.subject) : "",
      subjectKeyId: isSet(object.subjectKeyId) ? String(object.subjectKeyId) : "",
      serialNumber: isSet(object.serialNumber) ? String(object.serialNumber) : "",
    };
  },

  toJSON(message: MsgRemoveNocX509RootCert): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.subject !== "") {
      obj.subject = message.subject;
    }
    if (message.subjectKeyId !== "") {
      obj.subjectKeyId = message.subjectKeyId;
    }
    if (message.serialNumber !== "") {
      obj.serialNumber = message.serialNumber;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveNocX509RootCert>, I>>(base?: I): MsgRemoveNocX509RootCert {
    return MsgRemoveNocX509RootCert.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveNocX509RootCert>, I>>(object: I): MsgRemoveNocX509RootCert {
    const message = createBaseMsgRemoveNocX509RootCert();
    message.signer = object.signer ?? "";
    message.subject = object.subject ?? "";
    message.subjectKeyId = object.subjectKeyId ?? "";
    message.serialNumber = object.serialNumber ?? "";
    return message;
  },
};

function createBaseMsgRemoveNocX509RootCertResponse(): MsgRemoveNocX509RootCertResponse {
  return {};
}

export const MsgRemoveNocX509RootCertResponse = {
  encode(_: MsgRemoveNocX509RootCertResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveNocX509RootCertResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNocX509RootCertResponse();
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

  fromJSON(_: any): MsgRemoveNocX509RootCertResponse {
    return {};
  },

  toJSON(_: MsgRemoveNocX509RootCertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRemoveNocX509RootCertResponse>, I>>(
    base?: I,
  ): MsgRemoveNocX509RootCertResponse {
    return MsgRemoveNocX509RootCertResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRemoveNocX509RootCertResponse>, I>>(
    _: I,
  ): MsgRemoveNocX509RootCertResponse {
    const message = createBaseMsgRemoveNocX509RootCertResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  ProposeAddX509RootCert(request: MsgProposeAddX509RootCert): Promise<MsgProposeAddX509RootCertResponse>;
  ApproveAddX509RootCert(request: MsgApproveAddX509RootCert): Promise<MsgApproveAddX509RootCertResponse>;
  AddX509Cert(request: MsgAddX509Cert): Promise<MsgAddX509CertResponse>;
  ProposeRevokeX509RootCert(request: MsgProposeRevokeX509RootCert): Promise<MsgProposeRevokeX509RootCertResponse>;
  ApproveRevokeX509RootCert(request: MsgApproveRevokeX509RootCert): Promise<MsgApproveRevokeX509RootCertResponse>;
  RevokeX509Cert(request: MsgRevokeX509Cert): Promise<MsgRevokeX509CertResponse>;
  RejectAddX509RootCert(request: MsgRejectAddX509RootCert): Promise<MsgRejectAddX509RootCertResponse>;
  AddPkiRevocationDistributionPoint(
    request: MsgAddPkiRevocationDistributionPoint,
  ): Promise<MsgAddPkiRevocationDistributionPointResponse>;
  UpdatePkiRevocationDistributionPoint(
    request: MsgUpdatePkiRevocationDistributionPoint,
  ): Promise<MsgUpdatePkiRevocationDistributionPointResponse>;
  DeletePkiRevocationDistributionPoint(
    request: MsgDeletePkiRevocationDistributionPoint,
  ): Promise<MsgDeletePkiRevocationDistributionPointResponse>;
  AssignVid(request: MsgAssignVid): Promise<MsgAssignVidResponse>;
  AddNocX509RootCert(request: MsgAddNocX509RootCert): Promise<MsgAddNocX509RootCertResponse>;
  RemoveX509Cert(request: MsgRemoveX509Cert): Promise<MsgRemoveX509CertResponse>;
  AddNocX509IcaCert(request: MsgAddNocX509IcaCert): Promise<MsgAddNocX509IcaCertResponse>;
  RevokeNocX509RootCert(request: MsgRevokeNocX509RootCert): Promise<MsgRevokeNocX509RootCertResponse>;
  RevokeNocX509IcaCert(request: MsgRevokeNocX509IcaCert): Promise<MsgRevokeNocX509IcaCertResponse>;
  RemoveNocX509IcaCert(request: MsgRemoveNocX509IcaCert): Promise<MsgRemoveNocX509IcaCertResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RemoveNocX509RootCert(request: MsgRemoveNocX509RootCert): Promise<MsgRemoveNocX509RootCertResponse>;
}

export const MsgServiceName = "zigbeealliance.distributedcomplianceledger.pki.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.ProposeAddX509RootCert = this.ProposeAddX509RootCert.bind(this);
    this.ApproveAddX509RootCert = this.ApproveAddX509RootCert.bind(this);
    this.AddX509Cert = this.AddX509Cert.bind(this);
    this.ProposeRevokeX509RootCert = this.ProposeRevokeX509RootCert.bind(this);
    this.ApproveRevokeX509RootCert = this.ApproveRevokeX509RootCert.bind(this);
    this.RevokeX509Cert = this.RevokeX509Cert.bind(this);
    this.RejectAddX509RootCert = this.RejectAddX509RootCert.bind(this);
    this.AddPkiRevocationDistributionPoint = this.AddPkiRevocationDistributionPoint.bind(this);
    this.UpdatePkiRevocationDistributionPoint = this.UpdatePkiRevocationDistributionPoint.bind(this);
    this.DeletePkiRevocationDistributionPoint = this.DeletePkiRevocationDistributionPoint.bind(this);
    this.AssignVid = this.AssignVid.bind(this);
    this.AddNocX509RootCert = this.AddNocX509RootCert.bind(this);
    this.RemoveX509Cert = this.RemoveX509Cert.bind(this);
    this.AddNocX509IcaCert = this.AddNocX509IcaCert.bind(this);
    this.RevokeNocX509RootCert = this.RevokeNocX509RootCert.bind(this);
    this.RevokeNocX509IcaCert = this.RevokeNocX509IcaCert.bind(this);
    this.RemoveNocX509IcaCert = this.RemoveNocX509IcaCert.bind(this);
    this.RemoveNocX509RootCert = this.RemoveNocX509RootCert.bind(this);
  }
  ProposeAddX509RootCert(request: MsgProposeAddX509RootCert): Promise<MsgProposeAddX509RootCertResponse> {
    const data = MsgProposeAddX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProposeAddX509RootCert", data);
    return promise.then((data) => MsgProposeAddX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  ApproveAddX509RootCert(request: MsgApproveAddX509RootCert): Promise<MsgApproveAddX509RootCertResponse> {
    const data = MsgApproveAddX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "ApproveAddX509RootCert", data);
    return promise.then((data) => MsgApproveAddX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  AddX509Cert(request: MsgAddX509Cert): Promise<MsgAddX509CertResponse> {
    const data = MsgAddX509Cert.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddX509Cert", data);
    return promise.then((data) => MsgAddX509CertResponse.decode(_m0.Reader.create(data)));
  }

  ProposeRevokeX509RootCert(request: MsgProposeRevokeX509RootCert): Promise<MsgProposeRevokeX509RootCertResponse> {
    const data = MsgProposeRevokeX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProposeRevokeX509RootCert", data);
    return promise.then((data) => MsgProposeRevokeX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  ApproveRevokeX509RootCert(request: MsgApproveRevokeX509RootCert): Promise<MsgApproveRevokeX509RootCertResponse> {
    const data = MsgApproveRevokeX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "ApproveRevokeX509RootCert", data);
    return promise.then((data) => MsgApproveRevokeX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  RevokeX509Cert(request: MsgRevokeX509Cert): Promise<MsgRevokeX509CertResponse> {
    const data = MsgRevokeX509Cert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeX509Cert", data);
    return promise.then((data) => MsgRevokeX509CertResponse.decode(_m0.Reader.create(data)));
  }

  RejectAddX509RootCert(request: MsgRejectAddX509RootCert): Promise<MsgRejectAddX509RootCertResponse> {
    const data = MsgRejectAddX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RejectAddX509RootCert", data);
    return promise.then((data) => MsgRejectAddX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  AddPkiRevocationDistributionPoint(
    request: MsgAddPkiRevocationDistributionPoint,
  ): Promise<MsgAddPkiRevocationDistributionPointResponse> {
    const data = MsgAddPkiRevocationDistributionPoint.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddPkiRevocationDistributionPoint", data);
    return promise.then((data) => MsgAddPkiRevocationDistributionPointResponse.decode(_m0.Reader.create(data)));
  }

  UpdatePkiRevocationDistributionPoint(
    request: MsgUpdatePkiRevocationDistributionPoint,
  ): Promise<MsgUpdatePkiRevocationDistributionPointResponse> {
    const data = MsgUpdatePkiRevocationDistributionPoint.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdatePkiRevocationDistributionPoint", data);
    return promise.then((data) => MsgUpdatePkiRevocationDistributionPointResponse.decode(_m0.Reader.create(data)));
  }

  DeletePkiRevocationDistributionPoint(
    request: MsgDeletePkiRevocationDistributionPoint,
  ): Promise<MsgDeletePkiRevocationDistributionPointResponse> {
    const data = MsgDeletePkiRevocationDistributionPoint.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeletePkiRevocationDistributionPoint", data);
    return promise.then((data) => MsgDeletePkiRevocationDistributionPointResponse.decode(_m0.Reader.create(data)));
  }

  AssignVid(request: MsgAssignVid): Promise<MsgAssignVidResponse> {
    const data = MsgAssignVid.encode(request).finish();
    const promise = this.rpc.request(this.service, "AssignVid", data);
    return promise.then((data) => MsgAssignVidResponse.decode(_m0.Reader.create(data)));
  }

  AddNocX509RootCert(request: MsgAddNocX509RootCert): Promise<MsgAddNocX509RootCertResponse> {
    const data = MsgAddNocX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddNocX509RootCert", data);
    return promise.then((data) => MsgAddNocX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  RemoveX509Cert(request: MsgRemoveX509Cert): Promise<MsgRemoveX509CertResponse> {
    const data = MsgRemoveX509Cert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveX509Cert", data);
    return promise.then((data) => MsgRemoveX509CertResponse.decode(_m0.Reader.create(data)));
  }

  AddNocX509IcaCert(request: MsgAddNocX509IcaCert): Promise<MsgAddNocX509IcaCertResponse> {
    const data = MsgAddNocX509IcaCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddNocX509IcaCert", data);
    return promise.then((data) => MsgAddNocX509IcaCertResponse.decode(_m0.Reader.create(data)));
  }

  RevokeNocX509RootCert(request: MsgRevokeNocX509RootCert): Promise<MsgRevokeNocX509RootCertResponse> {
    const data = MsgRevokeNocX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeNocX509RootCert", data);
    return promise.then((data) => MsgRevokeNocX509RootCertResponse.decode(_m0.Reader.create(data)));
  }

  RevokeNocX509IcaCert(request: MsgRevokeNocX509IcaCert): Promise<MsgRevokeNocX509IcaCertResponse> {
    const data = MsgRevokeNocX509IcaCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RevokeNocX509IcaCert", data);
    return promise.then((data) => MsgRevokeNocX509IcaCertResponse.decode(_m0.Reader.create(data)));
  }

  RemoveNocX509IcaCert(request: MsgRemoveNocX509IcaCert): Promise<MsgRemoveNocX509IcaCertResponse> {
    const data = MsgRemoveNocX509IcaCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveNocX509IcaCert", data);
    return promise.then((data) => MsgRemoveNocX509IcaCertResponse.decode(_m0.Reader.create(data)));
  }

  RemoveNocX509RootCert(request: MsgRemoveNocX509RootCert): Promise<MsgRemoveNocX509RootCertResponse> {
    const data = MsgRemoveNocX509RootCert.encode(request).finish();
    const promise = this.rpc.request(this.service, "RemoveNocX509RootCert", data);
    return promise.then((data) => MsgRemoveNocX509RootCertResponse.decode(_m0.Reader.create(data)));
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
