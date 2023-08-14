/* eslint-disable */
import { PkiRevocationDistributionPoint } from '../pki/pki_revocation_distribution_point';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.pki';
const basePkiRevocationDistributionPointsByIssuerSubjectKeyID = { issuerSubjectKeyID: '' };
export const PkiRevocationDistributionPointsByIssuerSubjectKeyID = {
    encode(message, writer = Writer.create()) {
        if (message.issuerSubjectKeyID !== '') {
            writer.uint32(10).string(message.issuerSubjectKeyID);
        }
        for (const v of message.points) {
            PkiRevocationDistributionPoint.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePkiRevocationDistributionPointsByIssuerSubjectKeyID };
        message.points = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.issuerSubjectKeyID = reader.string();
                    break;
                case 2:
                    message.points.push(PkiRevocationDistributionPoint.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePkiRevocationDistributionPointsByIssuerSubjectKeyID };
        message.points = [];
        if (object.issuerSubjectKeyID !== undefined && object.issuerSubjectKeyID !== null) {
            message.issuerSubjectKeyID = String(object.issuerSubjectKeyID);
        }
        else {
            message.issuerSubjectKeyID = '';
        }
        if (object.points !== undefined && object.points !== null) {
            for (const e of object.points) {
                message.points.push(PkiRevocationDistributionPoint.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.issuerSubjectKeyID !== undefined && (obj.issuerSubjectKeyID = message.issuerSubjectKeyID);
        if (message.points) {
            obj.points = message.points.map((e) => (e ? PkiRevocationDistributionPoint.toJSON(e) : undefined));
        }
        else {
            obj.points = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePkiRevocationDistributionPointsByIssuerSubjectKeyID };
        message.points = [];
        if (object.issuerSubjectKeyID !== undefined && object.issuerSubjectKeyID !== null) {
            message.issuerSubjectKeyID = object.issuerSubjectKeyID;
        }
        else {
            message.issuerSubjectKeyID = '';
        }
        if (object.points !== undefined && object.points !== null) {
            for (const e of object.points) {
                message.points.push(PkiRevocationDistributionPoint.fromPartial(e));
            }
        }
        return message;
    }
};
