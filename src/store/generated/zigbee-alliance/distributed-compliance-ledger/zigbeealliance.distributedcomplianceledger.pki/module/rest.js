/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "";
        this.securityData = null;
        this.securityWorker = null;
        this.abortControllers = new Map();
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
                data.append(key, input[key]);
                return data;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
            const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                    ...(requestParams.headers || {}),
                },
                signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
            }).then(async (response) => {
                const r = response;
                r.data = null;
                r.error = null;
                const data = await response[format]()
                    .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    }
                    else {
                        r.error = data;
                    }
                    return r;
                })
                    .catch((e) => {
                    r.error = e;
                    return r;
                });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data;
            });
        };
        Object.assign(this, apiConfig);
    }
    addQueryParam(query, key) {
        const value = query[key];
        return (encodeURIComponent(key) +
            "=" +
            encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`));
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => typeof query[key] === "object" && !Array.isArray(query[key])
            ? this.toQueryString(query[key])
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
}
/**
 * @title pki/approved_certificates.proto
 * @version version not set
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryApprovedCertificatesAll
         * @summary Queries a list of ApprovedCertificates items.
         * @request GET:/dcl/pki/certificates
         */
        this.queryApprovedCertificatesAll = (query, params = {}) => this.request({
            path: `/dcl/pki/certificates`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryApprovedCertificatesBySubject
         * @summary Queries a ApprovedCertificatesBySubject by index.
         * @request GET:/dcl/pki/certificates/{subject}
         */
        this.queryApprovedCertificatesBySubject = (subject, params = {}) => this.request({
            path: `/dcl/pki/certificates/${subject}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryApprovedCertificates
         * @summary Queries a ApprovedCertificates by index.
         * @request GET:/dcl/pki/certificates/{subject}/{subjectKeyId}
         */
        this.queryApprovedCertificates = (subject, subjectKeyId, params = {}) => this.request({
            path: `/dcl/pki/certificates/${subject}/${subjectKeyId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryChildCertificates
         * @summary Queries a ChildCertificates by index.
         * @request GET:/dcl/pki/child-certificates/{issuer}/{authorityKeyId}
         */
        this.queryChildCertificates = (issuer, authorityKeyId, params = {}) => this.request({
            path: `/dcl/pki/child-certificates/${issuer}/${authorityKeyId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposedCertificateAll
         * @summary Queries a list of ProposedCertificate items.
         * @request GET:/dcl/pki/proposed-certificates
         */
        this.queryProposedCertificateAll = (query, params = {}) => this.request({
            path: `/dcl/pki/proposed-certificates`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposedCertificate
         * @summary Queries a ProposedCertificate by index.
         * @request GET:/dcl/pki/proposed-certificates/{subject}/{subjectKeyId}
         */
        this.queryProposedCertificate = (subject, subjectKeyId, params = {}) => this.request({
            path: `/dcl/pki/proposed-certificates/${subject}/${subjectKeyId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposedCertificateRevocationAll
         * @summary Queries a list of ProposedCertificateRevocation items.
         * @request GET:/dcl/pki/proposed-revocation-certificates
         */
        this.queryProposedCertificateRevocationAll = (query, params = {}) => this.request({
            path: `/dcl/pki/proposed-revocation-certificates`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposedCertificateRevocation
         * @summary Queries a ProposedCertificateRevocation by index.
         * @request GET:/dcl/pki/proposed-revocation-certificates/{subject}/{subjectKeyId}
         */
        this.queryProposedCertificateRevocation = (subject, subjectKeyId, params = {}) => this.request({
            path: `/dcl/pki/proposed-revocation-certificates/${subject}/${subjectKeyId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRejectedCertificateAll
         * @summary Queries a list of RejectedCertificate items.
         * @request GET:/dcl/pki/rejected-certificates
         */
        this.queryRejectedCertificateAll = (query, params = {}) => this.request({
            path: `/dcl/pki/rejected-certificates`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRejectedCertificate
         * @summary Queries a RejectedCertificate by index.
         * @request GET:/dcl/pki/rejected-certificates/{subject}/{subjectKeyId}
         */
        this.queryRejectedCertificate = (subject, subjectKeyId, params = {}) => this.request({
            path: `/dcl/pki/rejected-certificates/${subject}/${subjectKeyId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRevokedCertificatesAll
         * @summary Queries a list of RevokedCertificates items.
         * @request GET:/dcl/pki/revoked-certificates
         */
        this.queryRevokedCertificatesAll = (query, params = {}) => this.request({
            path: `/dcl/pki/revoked-certificates`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRevokedCertificates
         * @summary Queries a RevokedCertificates by index.
         * @request GET:/dcl/pki/revoked-certificates/{subject}/{subjectKeyId}
         */
        this.queryRevokedCertificates = (subject, subjectKeyId, params = {}) => this.request({
            path: `/dcl/pki/revoked-certificates/${subject}/${subjectKeyId}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRevokedRootCertificates
         * @summary Queries a RevokedRootCertificates by index.
         * @request GET:/dcl/pki/revoked-root-certificates
         */
        this.queryRevokedRootCertificates = (params = {}) => this.request({
            path: `/dcl/pki/revoked-root-certificates`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryApprovedRootCertificates
         * @summary Queries a ApprovedRootCertificates by index.
         * @request GET:/dcl/pki/root-certificates
         */
        this.queryApprovedRootCertificates = (params = {}) => this.request({
            path: `/dcl/pki/root-certificates`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPkiRevocationDistributionPointAll
         * @summary Queries a list of PkiRevocationDistributionPoint items.
         * @request GET:/zigbee-alliance/distributedcomplianceledger/pki/pki-revocation-distribution-point
         */
        this.queryPkiRevocationDistributionPointAll = (query, params = {}) => this.request({
            path: `/zigbee-alliance/distributedcomplianceledger/pki/pki-revocation-distribution-point`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPkiRevocationDistributionPoint
         * @summary Queries a PkiRevocationDistributionPoint by index.
         * @request GET:/zigbee-alliance/distributedcomplianceledger/pki/pki-revocation-distribution-point/{vid}/{label}/{issuerSubjectKeyID}
         */
        this.queryPkiRevocationDistributionPoint = (vid, label, issuerSubjectKeyID, params = {}) => this.request({
            path: `/zigbee-alliance/distributedcomplianceledger/pki/pki-revocation-distribution-point/${vid}/${label}/${issuerSubjectKeyID}`,
            method: "GET",
            format: "json",
            ...params,
        });
    }
}
