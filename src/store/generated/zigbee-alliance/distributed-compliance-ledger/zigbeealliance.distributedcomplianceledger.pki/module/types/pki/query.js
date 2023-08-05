/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { ApprovedCertificates } from '../pki/approved_certificates';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { ProposedCertificate } from '../pki/proposed_certificate';
import { ChildCertificates } from '../pki/child_certificates';
import { ProposedCertificateRevocation } from '../pki/proposed_certificate_revocation';
import { RevokedCertificates } from '../pki/revoked_certificates';
import { ApprovedRootCertificates } from '../pki/approved_root_certificates';
import { RevokedRootCertificates } from '../pki/revoked_root_certificates';
import { ApprovedCertificatesBySubject } from '../pki/approved_certificates_by_subject';
import { RejectedCertificate } from '../pki/rejected_certificate';
import { PkiRevocationDistributionPoint } from '../pki/pki_revocation_distribution_point';
export const protobufPackage = 'zigbeealliance.distributedcomplianceledger.pki';
const baseQueryGetApprovedCertificatesRequest = { subject: '', subjectKeyId: '' };
export const QueryGetApprovedCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.subject !== '') {
            writer.uint32(10).string(message.subject);
        }
        if (message.subjectKeyId !== '') {
            writer.uint32(18).string(message.subjectKeyId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetApprovedCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subject = reader.string();
                    break;
                case 2:
                    message.subjectKeyId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetApprovedCertificatesRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = String(object.subject);
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = String(object.subjectKeyId);
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.subject !== undefined && (obj.subject = message.subject);
        message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetApprovedCertificatesRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = object.subject;
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = object.subjectKeyId;
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    }
};
const baseQueryGetApprovedCertificatesResponse = {};
export const QueryGetApprovedCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.approvedCertificates !== undefined) {
            ApprovedCertificates.encode(message.approvedCertificates, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetApprovedCertificatesResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.approvedCertificates = ApprovedCertificates.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetApprovedCertificatesResponse };
        if (object.approvedCertificates !== undefined && object.approvedCertificates !== null) {
            message.approvedCertificates = ApprovedCertificates.fromJSON(object.approvedCertificates);
        }
        else {
            message.approvedCertificates = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.approvedCertificates !== undefined &&
            (obj.approvedCertificates = message.approvedCertificates ? ApprovedCertificates.toJSON(message.approvedCertificates) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetApprovedCertificatesResponse };
        if (object.approvedCertificates !== undefined && object.approvedCertificates !== null) {
            message.approvedCertificates = ApprovedCertificates.fromPartial(object.approvedCertificates);
        }
        else {
            message.approvedCertificates = undefined;
        }
        return message;
    }
};
const baseQueryAllApprovedCertificatesRequest = {};
export const QueryAllApprovedCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllApprovedCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllApprovedCertificatesRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllApprovedCertificatesRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllApprovedCertificatesResponse = {};
export const QueryAllApprovedCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.approvedCertificates) {
            ApprovedCertificates.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllApprovedCertificatesResponse };
        message.approvedCertificates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.approvedCertificates.push(ApprovedCertificates.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllApprovedCertificatesResponse };
        message.approvedCertificates = [];
        if (object.approvedCertificates !== undefined && object.approvedCertificates !== null) {
            for (const e of object.approvedCertificates) {
                message.approvedCertificates.push(ApprovedCertificates.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.approvedCertificates) {
            obj.approvedCertificates = message.approvedCertificates.map((e) => (e ? ApprovedCertificates.toJSON(e) : undefined));
        }
        else {
            obj.approvedCertificates = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllApprovedCertificatesResponse };
        message.approvedCertificates = [];
        if (object.approvedCertificates !== undefined && object.approvedCertificates !== null) {
            for (const e of object.approvedCertificates) {
                message.approvedCertificates.push(ApprovedCertificates.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryGetProposedCertificateRequest = { subject: '', subjectKeyId: '' };
export const QueryGetProposedCertificateRequest = {
    encode(message, writer = Writer.create()) {
        if (message.subject !== '') {
            writer.uint32(10).string(message.subject);
        }
        if (message.subjectKeyId !== '') {
            writer.uint32(18).string(message.subjectKeyId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetProposedCertificateRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subject = reader.string();
                    break;
                case 2:
                    message.subjectKeyId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetProposedCertificateRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = String(object.subject);
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = String(object.subjectKeyId);
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.subject !== undefined && (obj.subject = message.subject);
        message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetProposedCertificateRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = object.subject;
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = object.subjectKeyId;
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    }
};
const baseQueryGetProposedCertificateResponse = {};
export const QueryGetProposedCertificateResponse = {
    encode(message, writer = Writer.create()) {
        if (message.proposedCertificate !== undefined) {
            ProposedCertificate.encode(message.proposedCertificate, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetProposedCertificateResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposedCertificate = ProposedCertificate.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetProposedCertificateResponse };
        if (object.proposedCertificate !== undefined && object.proposedCertificate !== null) {
            message.proposedCertificate = ProposedCertificate.fromJSON(object.proposedCertificate);
        }
        else {
            message.proposedCertificate = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposedCertificate !== undefined &&
            (obj.proposedCertificate = message.proposedCertificate ? ProposedCertificate.toJSON(message.proposedCertificate) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetProposedCertificateResponse };
        if (object.proposedCertificate !== undefined && object.proposedCertificate !== null) {
            message.proposedCertificate = ProposedCertificate.fromPartial(object.proposedCertificate);
        }
        else {
            message.proposedCertificate = undefined;
        }
        return message;
    }
};
const baseQueryAllProposedCertificateRequest = {};
export const QueryAllProposedCertificateRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllProposedCertificateRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllProposedCertificateRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllProposedCertificateRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllProposedCertificateResponse = {};
export const QueryAllProposedCertificateResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.proposedCertificate) {
            ProposedCertificate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllProposedCertificateResponse };
        message.proposedCertificate = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposedCertificate.push(ProposedCertificate.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllProposedCertificateResponse };
        message.proposedCertificate = [];
        if (object.proposedCertificate !== undefined && object.proposedCertificate !== null) {
            for (const e of object.proposedCertificate) {
                message.proposedCertificate.push(ProposedCertificate.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.proposedCertificate) {
            obj.proposedCertificate = message.proposedCertificate.map((e) => (e ? ProposedCertificate.toJSON(e) : undefined));
        }
        else {
            obj.proposedCertificate = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllProposedCertificateResponse };
        message.proposedCertificate = [];
        if (object.proposedCertificate !== undefined && object.proposedCertificate !== null) {
            for (const e of object.proposedCertificate) {
                message.proposedCertificate.push(ProposedCertificate.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryGetChildCertificatesRequest = { issuer: '', authorityKeyId: '' };
export const QueryGetChildCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.issuer !== '') {
            writer.uint32(10).string(message.issuer);
        }
        if (message.authorityKeyId !== '') {
            writer.uint32(18).string(message.authorityKeyId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetChildCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.issuer = reader.string();
                    break;
                case 2:
                    message.authorityKeyId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetChildCertificatesRequest };
        if (object.issuer !== undefined && object.issuer !== null) {
            message.issuer = String(object.issuer);
        }
        else {
            message.issuer = '';
        }
        if (object.authorityKeyId !== undefined && object.authorityKeyId !== null) {
            message.authorityKeyId = String(object.authorityKeyId);
        }
        else {
            message.authorityKeyId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.issuer !== undefined && (obj.issuer = message.issuer);
        message.authorityKeyId !== undefined && (obj.authorityKeyId = message.authorityKeyId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetChildCertificatesRequest };
        if (object.issuer !== undefined && object.issuer !== null) {
            message.issuer = object.issuer;
        }
        else {
            message.issuer = '';
        }
        if (object.authorityKeyId !== undefined && object.authorityKeyId !== null) {
            message.authorityKeyId = object.authorityKeyId;
        }
        else {
            message.authorityKeyId = '';
        }
        return message;
    }
};
const baseQueryGetChildCertificatesResponse = {};
export const QueryGetChildCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.childCertificates !== undefined) {
            ChildCertificates.encode(message.childCertificates, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetChildCertificatesResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.childCertificates = ChildCertificates.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetChildCertificatesResponse };
        if (object.childCertificates !== undefined && object.childCertificates !== null) {
            message.childCertificates = ChildCertificates.fromJSON(object.childCertificates);
        }
        else {
            message.childCertificates = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.childCertificates !== undefined &&
            (obj.childCertificates = message.childCertificates ? ChildCertificates.toJSON(message.childCertificates) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetChildCertificatesResponse };
        if (object.childCertificates !== undefined && object.childCertificates !== null) {
            message.childCertificates = ChildCertificates.fromPartial(object.childCertificates);
        }
        else {
            message.childCertificates = undefined;
        }
        return message;
    }
};
const baseQueryGetProposedCertificateRevocationRequest = { subject: '', subjectKeyId: '' };
export const QueryGetProposedCertificateRevocationRequest = {
    encode(message, writer = Writer.create()) {
        if (message.subject !== '') {
            writer.uint32(10).string(message.subject);
        }
        if (message.subjectKeyId !== '') {
            writer.uint32(18).string(message.subjectKeyId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetProposedCertificateRevocationRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subject = reader.string();
                    break;
                case 2:
                    message.subjectKeyId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetProposedCertificateRevocationRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = String(object.subject);
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = String(object.subjectKeyId);
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.subject !== undefined && (obj.subject = message.subject);
        message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetProposedCertificateRevocationRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = object.subject;
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = object.subjectKeyId;
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    }
};
const baseQueryGetProposedCertificateRevocationResponse = {};
export const QueryGetProposedCertificateRevocationResponse = {
    encode(message, writer = Writer.create()) {
        if (message.proposedCertificateRevocation !== undefined) {
            ProposedCertificateRevocation.encode(message.proposedCertificateRevocation, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetProposedCertificateRevocationResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposedCertificateRevocation = ProposedCertificateRevocation.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetProposedCertificateRevocationResponse };
        if (object.proposedCertificateRevocation !== undefined && object.proposedCertificateRevocation !== null) {
            message.proposedCertificateRevocation = ProposedCertificateRevocation.fromJSON(object.proposedCertificateRevocation);
        }
        else {
            message.proposedCertificateRevocation = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposedCertificateRevocation !== undefined &&
            (obj.proposedCertificateRevocation = message.proposedCertificateRevocation
                ? ProposedCertificateRevocation.toJSON(message.proposedCertificateRevocation)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetProposedCertificateRevocationResponse };
        if (object.proposedCertificateRevocation !== undefined && object.proposedCertificateRevocation !== null) {
            message.proposedCertificateRevocation = ProposedCertificateRevocation.fromPartial(object.proposedCertificateRevocation);
        }
        else {
            message.proposedCertificateRevocation = undefined;
        }
        return message;
    }
};
const baseQueryAllProposedCertificateRevocationRequest = {};
export const QueryAllProposedCertificateRevocationRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllProposedCertificateRevocationRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllProposedCertificateRevocationRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllProposedCertificateRevocationRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllProposedCertificateRevocationResponse = {};
export const QueryAllProposedCertificateRevocationResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.proposedCertificateRevocation) {
            ProposedCertificateRevocation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllProposedCertificateRevocationResponse };
        message.proposedCertificateRevocation = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposedCertificateRevocation.push(ProposedCertificateRevocation.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllProposedCertificateRevocationResponse };
        message.proposedCertificateRevocation = [];
        if (object.proposedCertificateRevocation !== undefined && object.proposedCertificateRevocation !== null) {
            for (const e of object.proposedCertificateRevocation) {
                message.proposedCertificateRevocation.push(ProposedCertificateRevocation.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.proposedCertificateRevocation) {
            obj.proposedCertificateRevocation = message.proposedCertificateRevocation.map((e) => (e ? ProposedCertificateRevocation.toJSON(e) : undefined));
        }
        else {
            obj.proposedCertificateRevocation = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllProposedCertificateRevocationResponse };
        message.proposedCertificateRevocation = [];
        if (object.proposedCertificateRevocation !== undefined && object.proposedCertificateRevocation !== null) {
            for (const e of object.proposedCertificateRevocation) {
                message.proposedCertificateRevocation.push(ProposedCertificateRevocation.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryGetRevokedCertificatesRequest = { subject: '', subjectKeyId: '' };
export const QueryGetRevokedCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.subject !== '') {
            writer.uint32(10).string(message.subject);
        }
        if (message.subjectKeyId !== '') {
            writer.uint32(18).string(message.subjectKeyId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetRevokedCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subject = reader.string();
                    break;
                case 2:
                    message.subjectKeyId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetRevokedCertificatesRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = String(object.subject);
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = String(object.subjectKeyId);
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.subject !== undefined && (obj.subject = message.subject);
        message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetRevokedCertificatesRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = object.subject;
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = object.subjectKeyId;
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    }
};
const baseQueryGetRevokedCertificatesResponse = {};
export const QueryGetRevokedCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.revokedCertificates !== undefined) {
            RevokedCertificates.encode(message.revokedCertificates, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetRevokedCertificatesResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.revokedCertificates = RevokedCertificates.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetRevokedCertificatesResponse };
        if (object.revokedCertificates !== undefined && object.revokedCertificates !== null) {
            message.revokedCertificates = RevokedCertificates.fromJSON(object.revokedCertificates);
        }
        else {
            message.revokedCertificates = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.revokedCertificates !== undefined &&
            (obj.revokedCertificates = message.revokedCertificates ? RevokedCertificates.toJSON(message.revokedCertificates) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetRevokedCertificatesResponse };
        if (object.revokedCertificates !== undefined && object.revokedCertificates !== null) {
            message.revokedCertificates = RevokedCertificates.fromPartial(object.revokedCertificates);
        }
        else {
            message.revokedCertificates = undefined;
        }
        return message;
    }
};
const baseQueryAllRevokedCertificatesRequest = {};
export const QueryAllRevokedCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllRevokedCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllRevokedCertificatesRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllRevokedCertificatesRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllRevokedCertificatesResponse = {};
export const QueryAllRevokedCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.revokedCertificates) {
            RevokedCertificates.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllRevokedCertificatesResponse };
        message.revokedCertificates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.revokedCertificates.push(RevokedCertificates.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllRevokedCertificatesResponse };
        message.revokedCertificates = [];
        if (object.revokedCertificates !== undefined && object.revokedCertificates !== null) {
            for (const e of object.revokedCertificates) {
                message.revokedCertificates.push(RevokedCertificates.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.revokedCertificates) {
            obj.revokedCertificates = message.revokedCertificates.map((e) => (e ? RevokedCertificates.toJSON(e) : undefined));
        }
        else {
            obj.revokedCertificates = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllRevokedCertificatesResponse };
        message.revokedCertificates = [];
        if (object.revokedCertificates !== undefined && object.revokedCertificates !== null) {
            for (const e of object.revokedCertificates) {
                message.revokedCertificates.push(RevokedCertificates.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryGetApprovedRootCertificatesRequest = {};
export const QueryGetApprovedRootCertificatesRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetApprovedRootCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseQueryGetApprovedRootCertificatesRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryGetApprovedRootCertificatesRequest };
        return message;
    }
};
const baseQueryGetApprovedRootCertificatesResponse = {};
export const QueryGetApprovedRootCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.approvedRootCertificates !== undefined) {
            ApprovedRootCertificates.encode(message.approvedRootCertificates, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetApprovedRootCertificatesResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.approvedRootCertificates = ApprovedRootCertificates.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetApprovedRootCertificatesResponse };
        if (object.approvedRootCertificates !== undefined && object.approvedRootCertificates !== null) {
            message.approvedRootCertificates = ApprovedRootCertificates.fromJSON(object.approvedRootCertificates);
        }
        else {
            message.approvedRootCertificates = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.approvedRootCertificates !== undefined &&
            (obj.approvedRootCertificates = message.approvedRootCertificates ? ApprovedRootCertificates.toJSON(message.approvedRootCertificates) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetApprovedRootCertificatesResponse };
        if (object.approvedRootCertificates !== undefined && object.approvedRootCertificates !== null) {
            message.approvedRootCertificates = ApprovedRootCertificates.fromPartial(object.approvedRootCertificates);
        }
        else {
            message.approvedRootCertificates = undefined;
        }
        return message;
    }
};
const baseQueryGetRevokedRootCertificatesRequest = {};
export const QueryGetRevokedRootCertificatesRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetRevokedRootCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseQueryGetRevokedRootCertificatesRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryGetRevokedRootCertificatesRequest };
        return message;
    }
};
const baseQueryGetRevokedRootCertificatesResponse = {};
export const QueryGetRevokedRootCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.revokedRootCertificates !== undefined) {
            RevokedRootCertificates.encode(message.revokedRootCertificates, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetRevokedRootCertificatesResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.revokedRootCertificates = RevokedRootCertificates.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetRevokedRootCertificatesResponse };
        if (object.revokedRootCertificates !== undefined && object.revokedRootCertificates !== null) {
            message.revokedRootCertificates = RevokedRootCertificates.fromJSON(object.revokedRootCertificates);
        }
        else {
            message.revokedRootCertificates = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.revokedRootCertificates !== undefined &&
            (obj.revokedRootCertificates = message.revokedRootCertificates ? RevokedRootCertificates.toJSON(message.revokedRootCertificates) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetRevokedRootCertificatesResponse };
        if (object.revokedRootCertificates !== undefined && object.revokedRootCertificates !== null) {
            message.revokedRootCertificates = RevokedRootCertificates.fromPartial(object.revokedRootCertificates);
        }
        else {
            message.revokedRootCertificates = undefined;
        }
        return message;
    }
};
const baseQueryGetApprovedCertificatesBySubjectRequest = { subject: '' };
export const QueryGetApprovedCertificatesBySubjectRequest = {
    encode(message, writer = Writer.create()) {
        if (message.subject !== '') {
            writer.uint32(10).string(message.subject);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetApprovedCertificatesBySubjectRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subject = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetApprovedCertificatesBySubjectRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = String(object.subject);
        }
        else {
            message.subject = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.subject !== undefined && (obj.subject = message.subject);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetApprovedCertificatesBySubjectRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = object.subject;
        }
        else {
            message.subject = '';
        }
        return message;
    }
};
const baseQueryGetApprovedCertificatesBySubjectResponse = {};
export const QueryGetApprovedCertificatesBySubjectResponse = {
    encode(message, writer = Writer.create()) {
        if (message.approvedCertificatesBySubject !== undefined) {
            ApprovedCertificatesBySubject.encode(message.approvedCertificatesBySubject, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetApprovedCertificatesBySubjectResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.approvedCertificatesBySubject = ApprovedCertificatesBySubject.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetApprovedCertificatesBySubjectResponse };
        if (object.approvedCertificatesBySubject !== undefined && object.approvedCertificatesBySubject !== null) {
            message.approvedCertificatesBySubject = ApprovedCertificatesBySubject.fromJSON(object.approvedCertificatesBySubject);
        }
        else {
            message.approvedCertificatesBySubject = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.approvedCertificatesBySubject !== undefined &&
            (obj.approvedCertificatesBySubject = message.approvedCertificatesBySubject
                ? ApprovedCertificatesBySubject.toJSON(message.approvedCertificatesBySubject)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetApprovedCertificatesBySubjectResponse };
        if (object.approvedCertificatesBySubject !== undefined && object.approvedCertificatesBySubject !== null) {
            message.approvedCertificatesBySubject = ApprovedCertificatesBySubject.fromPartial(object.approvedCertificatesBySubject);
        }
        else {
            message.approvedCertificatesBySubject = undefined;
        }
        return message;
    }
};
const baseQueryGetRejectedCertificatesRequest = { subject: '', subjectKeyId: '' };
export const QueryGetRejectedCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.subject !== '') {
            writer.uint32(10).string(message.subject);
        }
        if (message.subjectKeyId !== '') {
            writer.uint32(18).string(message.subjectKeyId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetRejectedCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subject = reader.string();
                    break;
                case 2:
                    message.subjectKeyId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetRejectedCertificatesRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = String(object.subject);
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = String(object.subjectKeyId);
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.subject !== undefined && (obj.subject = message.subject);
        message.subjectKeyId !== undefined && (obj.subjectKeyId = message.subjectKeyId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetRejectedCertificatesRequest };
        if (object.subject !== undefined && object.subject !== null) {
            message.subject = object.subject;
        }
        else {
            message.subject = '';
        }
        if (object.subjectKeyId !== undefined && object.subjectKeyId !== null) {
            message.subjectKeyId = object.subjectKeyId;
        }
        else {
            message.subjectKeyId = '';
        }
        return message;
    }
};
const baseQueryGetRejectedCertificatesResponse = {};
export const QueryGetRejectedCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        if (message.rejectedCertificate !== undefined) {
            RejectedCertificate.encode(message.rejectedCertificate, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetRejectedCertificatesResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rejectedCertificate = RejectedCertificate.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetRejectedCertificatesResponse };
        if (object.rejectedCertificate !== undefined && object.rejectedCertificate !== null) {
            message.rejectedCertificate = RejectedCertificate.fromJSON(object.rejectedCertificate);
        }
        else {
            message.rejectedCertificate = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.rejectedCertificate !== undefined &&
            (obj.rejectedCertificate = message.rejectedCertificate ? RejectedCertificate.toJSON(message.rejectedCertificate) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetRejectedCertificatesResponse };
        if (object.rejectedCertificate !== undefined && object.rejectedCertificate !== null) {
            message.rejectedCertificate = RejectedCertificate.fromPartial(object.rejectedCertificate);
        }
        else {
            message.rejectedCertificate = undefined;
        }
        return message;
    }
};
const baseQueryAllRejectedCertificatesRequest = {};
export const QueryAllRejectedCertificatesRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllRejectedCertificatesRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllRejectedCertificatesRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllRejectedCertificatesRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllRejectedCertificatesResponse = {};
export const QueryAllRejectedCertificatesResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.rejectedCertificate) {
            RejectedCertificate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllRejectedCertificatesResponse };
        message.rejectedCertificate = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rejectedCertificate.push(RejectedCertificate.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllRejectedCertificatesResponse };
        message.rejectedCertificate = [];
        if (object.rejectedCertificate !== undefined && object.rejectedCertificate !== null) {
            for (const e of object.rejectedCertificate) {
                message.rejectedCertificate.push(RejectedCertificate.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.rejectedCertificate) {
            obj.rejectedCertificate = message.rejectedCertificate.map((e) => (e ? RejectedCertificate.toJSON(e) : undefined));
        }
        else {
            obj.rejectedCertificate = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllRejectedCertificatesResponse };
        message.rejectedCertificate = [];
        if (object.rejectedCertificate !== undefined && object.rejectedCertificate !== null) {
            for (const e of object.rejectedCertificate) {
                message.rejectedCertificate.push(RejectedCertificate.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryGetPkiRevocationDistributionPointRequest = { vid: 0, label: '', issuerSubjectKeyID: '' };
export const QueryGetPkiRevocationDistributionPointRequest = {
    encode(message, writer = Writer.create()) {
        if (message.vid !== 0) {
            writer.uint32(8).uint64(message.vid);
        }
        if (message.label !== '') {
            writer.uint32(18).string(message.label);
        }
        if (message.issuerSubjectKeyID !== '') {
            writer.uint32(26).string(message.issuerSubjectKeyID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetPkiRevocationDistributionPointRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.vid = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.label = reader.string();
                    break;
                case 3:
                    message.issuerSubjectKeyID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetPkiRevocationDistributionPointRequest };
        if (object.vid !== undefined && object.vid !== null) {
            message.vid = Number(object.vid);
        }
        else {
            message.vid = 0;
        }
        if (object.label !== undefined && object.label !== null) {
            message.label = String(object.label);
        }
        else {
            message.label = '';
        }
        if (object.issuerSubjectKeyID !== undefined && object.issuerSubjectKeyID !== null) {
            message.issuerSubjectKeyID = String(object.issuerSubjectKeyID);
        }
        else {
            message.issuerSubjectKeyID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.vid !== undefined && (obj.vid = message.vid);
        message.label !== undefined && (obj.label = message.label);
        message.issuerSubjectKeyID !== undefined && (obj.issuerSubjectKeyID = message.issuerSubjectKeyID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetPkiRevocationDistributionPointRequest };
        if (object.vid !== undefined && object.vid !== null) {
            message.vid = object.vid;
        }
        else {
            message.vid = 0;
        }
        if (object.label !== undefined && object.label !== null) {
            message.label = object.label;
        }
        else {
            message.label = '';
        }
        if (object.issuerSubjectKeyID !== undefined && object.issuerSubjectKeyID !== null) {
            message.issuerSubjectKeyID = object.issuerSubjectKeyID;
        }
        else {
            message.issuerSubjectKeyID = '';
        }
        return message;
    }
};
const baseQueryGetPkiRevocationDistributionPointResponse = {};
export const QueryGetPkiRevocationDistributionPointResponse = {
    encode(message, writer = Writer.create()) {
        if (message.PkiRevocationDistributionPoint !== undefined) {
            PkiRevocationDistributionPoint.encode(message.PkiRevocationDistributionPoint, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetPkiRevocationDistributionPointResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PkiRevocationDistributionPoint = PkiRevocationDistributionPoint.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetPkiRevocationDistributionPointResponse };
        if (object.PkiRevocationDistributionPoint !== undefined && object.PkiRevocationDistributionPoint !== null) {
            message.PkiRevocationDistributionPoint = PkiRevocationDistributionPoint.fromJSON(object.PkiRevocationDistributionPoint);
        }
        else {
            message.PkiRevocationDistributionPoint = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.PkiRevocationDistributionPoint !== undefined &&
            (obj.PkiRevocationDistributionPoint = message.PkiRevocationDistributionPoint
                ? PkiRevocationDistributionPoint.toJSON(message.PkiRevocationDistributionPoint)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetPkiRevocationDistributionPointResponse };
        if (object.PkiRevocationDistributionPoint !== undefined && object.PkiRevocationDistributionPoint !== null) {
            message.PkiRevocationDistributionPoint = PkiRevocationDistributionPoint.fromPartial(object.PkiRevocationDistributionPoint);
        }
        else {
            message.PkiRevocationDistributionPoint = undefined;
        }
        return message;
    }
};
const baseQueryAllPkiRevocationDistributionPointRequest = {};
export const QueryAllPkiRevocationDistributionPointRequest = {
    encode(message, writer = Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllPkiRevocationDistributionPointRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllPkiRevocationDistributionPointRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllPkiRevocationDistributionPointRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
const baseQueryAllPkiRevocationDistributionPointResponse = {};
export const QueryAllPkiRevocationDistributionPointResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.PkiRevocationDistributionPoint) {
            PkiRevocationDistributionPoint.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllPkiRevocationDistributionPointResponse };
        message.PkiRevocationDistributionPoint = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.PkiRevocationDistributionPoint.push(PkiRevocationDistributionPoint.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryAllPkiRevocationDistributionPointResponse };
        message.PkiRevocationDistributionPoint = [];
        if (object.PkiRevocationDistributionPoint !== undefined && object.PkiRevocationDistributionPoint !== null) {
            for (const e of object.PkiRevocationDistributionPoint) {
                message.PkiRevocationDistributionPoint.push(PkiRevocationDistributionPoint.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.PkiRevocationDistributionPoint) {
            obj.PkiRevocationDistributionPoint = message.PkiRevocationDistributionPoint.map((e) => (e ? PkiRevocationDistributionPoint.toJSON(e) : undefined));
        }
        else {
            obj.PkiRevocationDistributionPoint = [];
        }
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllPkiRevocationDistributionPointResponse };
        message.PkiRevocationDistributionPoint = [];
        if (object.PkiRevocationDistributionPoint !== undefined && object.PkiRevocationDistributionPoint !== null) {
            for (const e of object.PkiRevocationDistributionPoint) {
                message.PkiRevocationDistributionPoint.push(PkiRevocationDistributionPoint.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    }
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    ApprovedCertificates(request) {
        const data = QueryGetApprovedCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ApprovedCertificates', data);
        return promise.then((data) => QueryGetApprovedCertificatesResponse.decode(new Reader(data)));
    }
    ApprovedCertificatesAll(request) {
        const data = QueryAllApprovedCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ApprovedCertificatesAll', data);
        return promise.then((data) => QueryAllApprovedCertificatesResponse.decode(new Reader(data)));
    }
    ProposedCertificate(request) {
        const data = QueryGetProposedCertificateRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ProposedCertificate', data);
        return promise.then((data) => QueryGetProposedCertificateResponse.decode(new Reader(data)));
    }
    ProposedCertificateAll(request) {
        const data = QueryAllProposedCertificateRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ProposedCertificateAll', data);
        return promise.then((data) => QueryAllProposedCertificateResponse.decode(new Reader(data)));
    }
    ChildCertificates(request) {
        const data = QueryGetChildCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ChildCertificates', data);
        return promise.then((data) => QueryGetChildCertificatesResponse.decode(new Reader(data)));
    }
    ProposedCertificateRevocation(request) {
        const data = QueryGetProposedCertificateRevocationRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ProposedCertificateRevocation', data);
        return promise.then((data) => QueryGetProposedCertificateRevocationResponse.decode(new Reader(data)));
    }
    ProposedCertificateRevocationAll(request) {
        const data = QueryAllProposedCertificateRevocationRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ProposedCertificateRevocationAll', data);
        return promise.then((data) => QueryAllProposedCertificateRevocationResponse.decode(new Reader(data)));
    }
    RevokedCertificates(request) {
        const data = QueryGetRevokedCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'RevokedCertificates', data);
        return promise.then((data) => QueryGetRevokedCertificatesResponse.decode(new Reader(data)));
    }
    RevokedCertificatesAll(request) {
        const data = QueryAllRevokedCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'RevokedCertificatesAll', data);
        return promise.then((data) => QueryAllRevokedCertificatesResponse.decode(new Reader(data)));
    }
    ApprovedRootCertificates(request) {
        const data = QueryGetApprovedRootCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ApprovedRootCertificates', data);
        return promise.then((data) => QueryGetApprovedRootCertificatesResponse.decode(new Reader(data)));
    }
    RevokedRootCertificates(request) {
        const data = QueryGetRevokedRootCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'RevokedRootCertificates', data);
        return promise.then((data) => QueryGetRevokedRootCertificatesResponse.decode(new Reader(data)));
    }
    ApprovedCertificatesBySubject(request) {
        const data = QueryGetApprovedCertificatesBySubjectRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'ApprovedCertificatesBySubject', data);
        return promise.then((data) => QueryGetApprovedCertificatesBySubjectResponse.decode(new Reader(data)));
    }
    RejectedCertificate(request) {
        const data = QueryGetRejectedCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'RejectedCertificate', data);
        return promise.then((data) => QueryGetRejectedCertificatesResponse.decode(new Reader(data)));
    }
    RejectedCertificateAll(request) {
        const data = QueryAllRejectedCertificatesRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'RejectedCertificateAll', data);
        return promise.then((data) => QueryAllRejectedCertificatesResponse.decode(new Reader(data)));
    }
    PkiRevocationDistributionPoint(request) {
        const data = QueryGetPkiRevocationDistributionPointRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'PkiRevocationDistributionPoint', data);
        return promise.then((data) => QueryGetPkiRevocationDistributionPointResponse.decode(new Reader(data)));
    }
    PkiRevocationDistributionPointAll(request) {
        const data = QueryAllPkiRevocationDistributionPointRequest.encode(request).finish();
        const promise = this.rpc.request('zigbeealliance.distributedcomplianceledger.pki.Query', 'PkiRevocationDistributionPointAll', data);
        return promise.then((data) => QueryAllPkiRevocationDistributionPointResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
