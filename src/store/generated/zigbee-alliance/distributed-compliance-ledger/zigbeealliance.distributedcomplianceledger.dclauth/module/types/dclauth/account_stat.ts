/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.dclauth'

export interface AccountStat {
  number: number
}

const baseAccountStat: object = { number: 0 }

export const AccountStat = {
  encode(message: AccountStat, writer: Writer = Writer.create()): Writer {
    if (message.number !== 0) {
      writer.uint32(8).uint64(message.number)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AccountStat {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAccountStat } as AccountStat
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.number = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AccountStat {
    const message = { ...baseAccountStat } as AccountStat
    if (object.number !== undefined && object.number !== null) {
      message.number = Number(object.number)
    } else {
      message.number = 0
    }
    return message
  },

  toJSON(message: AccountStat): unknown {
    const obj: any = {}
    message.number !== undefined && (obj.number = message.number)
    return obj
  },

  fromPartial(object: DeepPartial<AccountStat>): AccountStat {
    const message = { ...baseAccountStat } as AccountStat
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number
    } else {
      message.number = 0
    }
    return message
  }
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
