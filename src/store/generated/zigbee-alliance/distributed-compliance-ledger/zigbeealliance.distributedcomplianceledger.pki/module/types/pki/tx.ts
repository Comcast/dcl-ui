/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.pki'

export interface MsgProposeAddX509RootCert {
  signer: string
  cert: string
  info: string
  time: number
}

export interface MsgProposeAddX509RootCertResponse {}

export interface MsgApproveAddX509RootCert {
  signer: string
  subject: string
  subjectKeyId: string
  info: string
  time: number
}

export interface MsgApproveAddX509RootCertResponse {}

export interface MsgAddX509Cert {
  signer: string
  cert: string
  info: string
  time: number
}

export interface MsgAddX509CertResponse {}

export interface MsgProposeRevokeX509RootCert {
  signer: string
  subject: string
  subjectKeyId: string
  info: string
  time: number
}

export interface MsgProposeRevokeX509RootCertResponse {}

export interface MsgApproveRevokeX509RootCert {
  signer: string
  subject: string
  subjectKeyId: string
  info: string
  time: number
}

export interface MsgApproveRevokeX509RootCertResponse {}

export interface MsgRevokeX509Cert {
  signer: string
  subject: string
  subjectKeyId: string
  info: string
  time: number
}

export interface MsgRevokeX509CertResponse {}

export interface MsgRejectAddX509RootCert {
  signer: string
  subject: string
  subjectKeyId: string
  info: string
  time: number
}

export interface MsgRejectAddX509RootCertResponse {}

const baseMsgProposeAddX509RootCert: object = { signer: '', cert: '', info: '', time: 0 }

export const MsgProposeAddX509RootCert = {
  encode(message: MsgProposeAddX509RootCert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.cert !== '') {
      writer.uint32(18).string(message.cert)
    }
    if (message.info !== '') {
      writer.uint32(26).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgProposeAddX509RootCert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgProposeAddX509RootCert } as MsgProposeAddX509RootCert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.cert = reader.string()
          break
        case 3:
          message.info = reader.string()
          break
        case 4:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgProposeAddX509RootCert {
    const message = { ...baseMsgProposeAddX509RootCert } as MsgProposeAddX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.cert !== undefined && object.cert !== null) {
      message.cert = String(object.cert)
    } else {
      message.cert = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgProposeAddX509RootCert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.cert !== undefined && (obj.cert = message.cert)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgProposeAddX509RootCert>): MsgProposeAddX509RootCert {
    const message = { ...baseMsgProposeAddX509RootCert } as MsgProposeAddX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.cert !== undefined && object.cert !== null) {
      message.cert = object.cert
    } else {
      message.cert = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgProposeAddX509RootCertResponse: object = {}

export const MsgProposeAddX509RootCertResponse = {
  encode(_: MsgProposeAddX509RootCertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgProposeAddX509RootCertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgProposeAddX509RootCertResponse } as MsgProposeAddX509RootCertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgProposeAddX509RootCertResponse {
    const message = { ...baseMsgProposeAddX509RootCertResponse } as MsgProposeAddX509RootCertResponse
    return message
  },

  toJSON(_: MsgProposeAddX509RootCertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgProposeAddX509RootCertResponse>): MsgProposeAddX509RootCertResponse {
    const message = { ...baseMsgProposeAddX509RootCertResponse } as MsgProposeAddX509RootCertResponse
    return message
  }
}

const baseMsgApproveAddX509RootCert: object = { signer: '', subject: '', subjectKeyId: '', info: '', time: 0 }

export const MsgApproveAddX509RootCert = {
  encode(message: MsgApproveAddX509RootCert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.subject !== '') {
      writer.uint32(18).string(message.subject)
    }
    if (message.subjectKeyId !== '') {
      writer.uint32(26).string(message.subjectKeyId)
    }
    if (message.info !== '') {
      writer.uint32(34).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgApproveAddX509RootCert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgApproveAddX509RootCert } as MsgApproveAddX509RootCert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.subject = reader.string()
          break
        case 3:
          message.subjectKeyId = reader.string()
          break
        case 4:
          message.info = reader.string()
          break
        case 5:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgApproveAddX509RootCert {
    const message = { ...baseMsgApproveAddX509RootCert } as MsgApproveAddX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject)
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = String(object.subjectKeyId)
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgApproveAddX509RootCert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.subject !== undefined && (obj.subject = message.subject)
    message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgApproveAddX509RootCert>): MsgApproveAddX509RootCert {
    const message = { ...baseMsgApproveAddX509RootCert } as MsgApproveAddX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = object.subjectKeyId
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgApproveAddX509RootCertResponse: object = {}

export const MsgApproveAddX509RootCertResponse = {
  encode(_: MsgApproveAddX509RootCertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgApproveAddX509RootCertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgApproveAddX509RootCertResponse } as MsgApproveAddX509RootCertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgApproveAddX509RootCertResponse {
    const message = { ...baseMsgApproveAddX509RootCertResponse } as MsgApproveAddX509RootCertResponse
    return message
  },

  toJSON(_: MsgApproveAddX509RootCertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgApproveAddX509RootCertResponse>): MsgApproveAddX509RootCertResponse {
    const message = { ...baseMsgApproveAddX509RootCertResponse } as MsgApproveAddX509RootCertResponse
    return message
  }
}

const baseMsgAddX509Cert: object = { signer: '', cert: '', info: '', time: 0 }

export const MsgAddX509Cert = {
  encode(message: MsgAddX509Cert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.cert !== '') {
      writer.uint32(18).string(message.cert)
    }
    if (message.info !== '') {
      writer.uint32(26).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddX509Cert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddX509Cert } as MsgAddX509Cert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.cert = reader.string()
          break
        case 3:
          message.info = reader.string()
          break
        case 4:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddX509Cert {
    const message = { ...baseMsgAddX509Cert } as MsgAddX509Cert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.cert !== undefined && object.cert !== null) {
      message.cert = String(object.cert)
    } else {
      message.cert = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgAddX509Cert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.cert !== undefined && (obj.cert = message.cert)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddX509Cert>): MsgAddX509Cert {
    const message = { ...baseMsgAddX509Cert } as MsgAddX509Cert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.cert !== undefined && object.cert !== null) {
      message.cert = object.cert
    } else {
      message.cert = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgAddX509CertResponse: object = {}

export const MsgAddX509CertResponse = {
  encode(_: MsgAddX509CertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddX509CertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddX509CertResponse } as MsgAddX509CertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgAddX509CertResponse {
    const message = { ...baseMsgAddX509CertResponse } as MsgAddX509CertResponse
    return message
  },

  toJSON(_: MsgAddX509CertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgAddX509CertResponse>): MsgAddX509CertResponse {
    const message = { ...baseMsgAddX509CertResponse } as MsgAddX509CertResponse
    return message
  }
}

const baseMsgProposeRevokeX509RootCert: object = { signer: '', subject: '', subjectKeyId: '', info: '', time: 0 }

export const MsgProposeRevokeX509RootCert = {
  encode(message: MsgProposeRevokeX509RootCert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.subject !== '') {
      writer.uint32(18).string(message.subject)
    }
    if (message.subjectKeyId !== '') {
      writer.uint32(26).string(message.subjectKeyId)
    }
    if (message.info !== '') {
      writer.uint32(34).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgProposeRevokeX509RootCert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgProposeRevokeX509RootCert } as MsgProposeRevokeX509RootCert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.subject = reader.string()
          break
        case 3:
          message.subjectKeyId = reader.string()
          break
        case 4:
          message.info = reader.string()
          break
        case 5:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgProposeRevokeX509RootCert {
    const message = { ...baseMsgProposeRevokeX509RootCert } as MsgProposeRevokeX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject)
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = String(object.subjectKeyId)
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgProposeRevokeX509RootCert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.subject !== undefined && (obj.subject = message.subject)
    message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgProposeRevokeX509RootCert>): MsgProposeRevokeX509RootCert {
    const message = { ...baseMsgProposeRevokeX509RootCert } as MsgProposeRevokeX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = object.subjectKeyId
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgProposeRevokeX509RootCertResponse: object = {}

export const MsgProposeRevokeX509RootCertResponse = {
  encode(_: MsgProposeRevokeX509RootCertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgProposeRevokeX509RootCertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgProposeRevokeX509RootCertResponse } as MsgProposeRevokeX509RootCertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgProposeRevokeX509RootCertResponse {
    const message = { ...baseMsgProposeRevokeX509RootCertResponse } as MsgProposeRevokeX509RootCertResponse
    return message
  },

  toJSON(_: MsgProposeRevokeX509RootCertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgProposeRevokeX509RootCertResponse>): MsgProposeRevokeX509RootCertResponse {
    const message = { ...baseMsgProposeRevokeX509RootCertResponse } as MsgProposeRevokeX509RootCertResponse
    return message
  }
}

const baseMsgApproveRevokeX509RootCert: object = { signer: '', subject: '', subjectKeyId: '', info: '', time: 0 }

export const MsgApproveRevokeX509RootCert = {
  encode(message: MsgApproveRevokeX509RootCert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.subject !== '') {
      writer.uint32(18).string(message.subject)
    }
    if (message.subjectKeyId !== '') {
      writer.uint32(26).string(message.subjectKeyId)
    }
    if (message.info !== '') {
      writer.uint32(42).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(48).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgApproveRevokeX509RootCert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgApproveRevokeX509RootCert } as MsgApproveRevokeX509RootCert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.subject = reader.string()
          break
        case 3:
          message.subjectKeyId = reader.string()
          break
        case 5:
          message.info = reader.string()
          break
        case 6:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgApproveRevokeX509RootCert {
    const message = { ...baseMsgApproveRevokeX509RootCert } as MsgApproveRevokeX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject)
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = String(object.subjectKeyId)
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgApproveRevokeX509RootCert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.subject !== undefined && (obj.subject = message.subject)
    message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgApproveRevokeX509RootCert>): MsgApproveRevokeX509RootCert {
    const message = { ...baseMsgApproveRevokeX509RootCert } as MsgApproveRevokeX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = object.subjectKeyId
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgApproveRevokeX509RootCertResponse: object = {}

export const MsgApproveRevokeX509RootCertResponse = {
  encode(_: MsgApproveRevokeX509RootCertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgApproveRevokeX509RootCertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgApproveRevokeX509RootCertResponse } as MsgApproveRevokeX509RootCertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgApproveRevokeX509RootCertResponse {
    const message = { ...baseMsgApproveRevokeX509RootCertResponse } as MsgApproveRevokeX509RootCertResponse
    return message
  },

  toJSON(_: MsgApproveRevokeX509RootCertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgApproveRevokeX509RootCertResponse>): MsgApproveRevokeX509RootCertResponse {
    const message = { ...baseMsgApproveRevokeX509RootCertResponse } as MsgApproveRevokeX509RootCertResponse
    return message
  }
}

const baseMsgRevokeX509Cert: object = { signer: '', subject: '', subjectKeyId: '', info: '', time: 0 }

export const MsgRevokeX509Cert = {
  encode(message: MsgRevokeX509Cert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.subject !== '') {
      writer.uint32(18).string(message.subject)
    }
    if (message.subjectKeyId !== '') {
      writer.uint32(26).string(message.subjectKeyId)
    }
    if (message.info !== '') {
      writer.uint32(34).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeX509Cert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeX509Cert } as MsgRevokeX509Cert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.subject = reader.string()
          break
        case 3:
          message.subjectKeyId = reader.string()
          break
        case 4:
          message.info = reader.string()
          break
        case 5:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRevokeX509Cert {
    const message = { ...baseMsgRevokeX509Cert } as MsgRevokeX509Cert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject)
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = String(object.subjectKeyId)
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgRevokeX509Cert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.subject !== undefined && (obj.subject = message.subject)
    message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeX509Cert>): MsgRevokeX509Cert {
    const message = { ...baseMsgRevokeX509Cert } as MsgRevokeX509Cert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = object.subjectKeyId
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgRevokeX509CertResponse: object = {}

export const MsgRevokeX509CertResponse = {
  encode(_: MsgRevokeX509CertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeX509CertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeX509CertResponse } as MsgRevokeX509CertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgRevokeX509CertResponse {
    const message = { ...baseMsgRevokeX509CertResponse } as MsgRevokeX509CertResponse
    return message
  },

  toJSON(_: MsgRevokeX509CertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgRevokeX509CertResponse>): MsgRevokeX509CertResponse {
    const message = { ...baseMsgRevokeX509CertResponse } as MsgRevokeX509CertResponse
    return message
  }
}

const baseMsgRejectAddX509RootCert: object = { signer: '', subject: '', subjectKeyId: '', info: '', time: 0 }

export const MsgRejectAddX509RootCert = {
  encode(message: MsgRejectAddX509RootCert, writer: Writer = Writer.create()): Writer {
    if (message.signer !== '') {
      writer.uint32(10).string(message.signer)
    }
    if (message.subject !== '') {
      writer.uint32(18).string(message.subject)
    }
    if (message.subjectKeyId !== '') {
      writer.uint32(26).string(message.subjectKeyId)
    }
    if (message.info !== '') {
      writer.uint32(34).string(message.info)
    }
    if (message.time !== 0) {
      writer.uint32(40).int64(message.time)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRejectAddX509RootCert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRejectAddX509RootCert } as MsgRejectAddX509RootCert
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string()
          break
        case 2:
          message.subject = reader.string()
          break
        case 3:
          message.subjectKeyId = reader.string()
          break
        case 4:
          message.info = reader.string()
          break
        case 5:
          message.time = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRejectAddX509RootCert {
    const message = { ...baseMsgRejectAddX509RootCert } as MsgRejectAddX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = String(object.signer)
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject)
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = String(object.subjectKeyId)
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = String(object.info)
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    return message
  },

  toJSON(message: MsgRejectAddX509RootCert): unknown {
    const obj: any = {}
    message.signer !== undefined && (obj.signer = message.signer)
    message.subject !== undefined && (obj.subject = message.subject)
    message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId)
    message.info !== undefined && (obj.info = message.info)
    message.time !== undefined && (obj.time = message.time)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRejectAddX509RootCert>): MsgRejectAddX509RootCert {
    const message = { ...baseMsgRejectAddX509RootCert } as MsgRejectAddX509RootCert
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer
    } else {
      message.signer = ''
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject
    } else {
      message.subject = ''
    }
    if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
      message.subjectKeyId = object.subjectKeyId
    } else {
      message.subjectKeyId = ''
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = object.info
    } else {
      message.info = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    return message
  }
}

const baseMsgRejectAddX509RootCertResponse: object = {}

export const MsgRejectAddX509RootCertResponse = {
  encode(_: MsgRejectAddX509RootCertResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRejectAddX509RootCertResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRejectAddX509RootCertResponse } as MsgRejectAddX509RootCertResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgRejectAddX509RootCertResponse {
    const message = { ...baseMsgRejectAddX509RootCertResponse } as MsgRejectAddX509RootCertResponse
    return message
  },

  toJSON(_: MsgRejectAddX509RootCertResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgRejectAddX509RootCertResponse>): MsgRejectAddX509RootCertResponse {
    const message = { ...baseMsgRejectAddX509RootCertResponse } as MsgRejectAddX509RootCertResponse
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  ProposeAddX509RootCert(request: MsgProposeAddX509RootCert): Promise<MsgProposeAddX509RootCertResponse>
  ApproveAddX509RootCert(request: MsgApproveAddX509RootCert): Promise<MsgApproveAddX509RootCertResponse>
  AddX509Cert(request: MsgAddX509Cert): Promise<MsgAddX509CertResponse>
  ProposeRevokeX509RootCert(request: MsgProposeRevokeX509RootCert): Promise<MsgProposeRevokeX509RootCertResponse>
  ApproveRevokeX509RootCert(request: MsgApproveRevokeX509RootCert): Promise<MsgApproveRevokeX509RootCertResponse>
  RevokeX509Cert(request: MsgRevokeX509Cert): Promise<MsgRevokeX509CertResponse>
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RejectAddX509RootCert(request: MsgRejectAddX509RootCert): Promise<MsgRejectAddX509RootCertResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  ProposeAddX509RootCert(request: MsgProposeAddX509RootCert): Promise<MsgProposeAddX509RootCertResponse> {
    const data = MsgProposeAddX509RootCert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'ProposeAddX509RootCert', data)
    return promise.then((data) => MsgProposeAddX509RootCertResponse.decode(new Reader(data)))
  }

  ApproveAddX509RootCert(request: MsgApproveAddX509RootCert): Promise<MsgApproveAddX509RootCertResponse> {
    const data = MsgApproveAddX509RootCert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'ApproveAddX509RootCert', data)
    return promise.then((data) => MsgApproveAddX509RootCertResponse.decode(new Reader(data)))
  }

  AddX509Cert(request: MsgAddX509Cert): Promise<MsgAddX509CertResponse> {
    const data = MsgAddX509Cert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'AddX509Cert', data)
    return promise.then((data) => MsgAddX509CertResponse.decode(new Reader(data)))
  }

  ProposeRevokeX509RootCert(request: MsgProposeRevokeX509RootCert): Promise<MsgProposeRevokeX509RootCertResponse> {
    const data = MsgProposeRevokeX509RootCert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'ProposeRevokeX509RootCert', data)
    return promise.then((data) => MsgProposeRevokeX509RootCertResponse.decode(new Reader(data)))
  }

  ApproveRevokeX509RootCert(request: MsgApproveRevokeX509RootCert): Promise<MsgApproveRevokeX509RootCertResponse> {
    const data = MsgApproveRevokeX509RootCert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'ApproveRevokeX509RootCert', data)
    return promise.then((data) => MsgApproveRevokeX509RootCertResponse.decode(new Reader(data)))
  }

  RevokeX509Cert(request: MsgRevokeX509Cert): Promise<MsgRevokeX509CertResponse> {
    const data = MsgRevokeX509Cert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'RevokeX509Cert', data)
    return promise.then((data) => MsgRevokeX509CertResponse.decode(new Reader(data)))
  }

  RejectAddX509RootCert(request: MsgRejectAddX509RootCert): Promise<MsgRejectAddX509RootCertResponse> {
    const data = MsgRejectAddX509RootCert.encode(request).finish()
    const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Msg', 'RejectAddX509RootCert', data)
    return promise.then((data) => MsgRejectAddX509RootCertResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if ((util.Long as any) !== Long) {
  util.Long = Long as any
  configure()
}
