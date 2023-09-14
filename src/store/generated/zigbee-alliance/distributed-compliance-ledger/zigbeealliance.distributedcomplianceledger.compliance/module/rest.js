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
    baseUrl = "";
    securityData = null;
    securityWorker = null;
    abortControllers = new Map();
    baseApiParams = {
        credentials: "same-origin",
        headers: {},
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };
    constructor(apiConfig = {}) {
        Object.assign(this, apiConfig);
    }
    setSecurityData = (data) => {
        this.securityData = data;
    };
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
    contentFormatters = {
        [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
            data.append(key, input[key]);
            return data;
        }, new FormData()),
        [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
    };
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
    createAbortSignal = (cancelToken) => {
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
    abortRequest = (cancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);
        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };
    request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
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
}
/**
 * @title compliance/certified_model.proto
 * @version version not set
 */
export class Api extends HttpClient {
    /**
     * No description
     *
     * @tags Query
     * @name QueryCertifiedModelAll
     * @summary Queries a list of CertifiedModel items.
     * @request GET:/dcl/compliance/certified-models
     */
    queryCertifiedModelAll = (query, params = {}) => this.request({
        path: `/dcl/compliance/certified-models`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryCertifiedModel
     * @summary Queries a CertifiedModel by index.
     * @request GET:/dcl/compliance/certified-models/{vid}/{pid}/{softwareVersion}/{certificationType}
     */
    queryCertifiedModel = (vid, pid, softwareVersion, certificationType, params = {}) => this.request({
        path: `/dcl/compliance/certified-models/${vid}/${pid}/${softwareVersion}/${certificationType}`,
        method: "GET",
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryComplianceInfoAll
     * @summary Queries a list of ComplianceInfo items.
     * @request GET:/dcl/compliance/compliance-info
     */
    queryComplianceInfoAll = (query, params = {}) => this.request({
        path: `/dcl/compliance/compliance-info`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryComplianceInfo
     * @summary Queries a ComplianceInfo by index.
     * @request GET:/dcl/compliance/compliance-info/{vid}/{pid}/{softwareVersion}/{certificationType}
     */
    queryComplianceInfo = (vid, pid, softwareVersion, certificationType, params = {}) => this.request({
        path: `/dcl/compliance/compliance-info/${vid}/${pid}/${softwareVersion}/${certificationType}`,
        method: "GET",
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryDeviceSoftwareComplianceAll
     * @summary Queries a list of DeviceSoftwareCompliance items.
     * @request GET:/dcl/compliance/device-software-compliance
     */
    queryDeviceSoftwareComplianceAll = (query, params = {}) => this.request({
        path: `/dcl/compliance/device-software-compliance`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryDeviceSoftwareCompliance
     * @summary Queries a DeviceSoftwareCompliance by index.
     * @request GET:/dcl/compliance/device-software-compliance/{cDCertificateId}
     */
    queryDeviceSoftwareCompliance = (cDCertificateId, params = {}) => this.request({
        path: `/dcl/compliance/device-software-compliance/${cDCertificateId}`,
        method: "GET",
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryProvisionalModelAll
     * @summary Queries a list of ProvisionalModel items.
     * @request GET:/dcl/compliance/provisional-models
     */
    queryProvisionalModelAll = (query, params = {}) => this.request({
        path: `/dcl/compliance/provisional-models`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryProvisionalModel
     * @summary Queries a ProvisionalModel by index.
     * @request GET:/dcl/compliance/provisional-models/{vid}/{pid}/{softwareVersion}/{certificationType}
     */
    queryProvisionalModel = (vid, pid, softwareVersion, certificationType, params = {}) => this.request({
        path: `/dcl/compliance/provisional-models/${vid}/${pid}/${softwareVersion}/${certificationType}`,
        method: "GET",
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryRevokedModelAll
     * @summary Queries a list of RevokedModel items.
     * @request GET:/dcl/compliance/revoked-models
     */
    queryRevokedModelAll = (query, params = {}) => this.request({
        path: `/dcl/compliance/revoked-models`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
    });
    /**
     * No description
     *
     * @tags Query
     * @name QueryRevokedModel
     * @summary Queries a RevokedModel by index.
     * @request GET:/dcl/compliance/revoked-models/{vid}/{pid}/{softwareVersion}/{certificationType}
     */
    queryRevokedModel = (vid, pid, softwareVersion, certificationType, params = {}) => this.request({
        path: `/dcl/compliance/revoked-models/${vid}/${pid}/${softwareVersion}/${certificationType}`,
        method: "GET",
        format: "json",
        ...params,
    });
}
