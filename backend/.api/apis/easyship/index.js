"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'easyship/v2023-01 (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Activate specific uploaded asset and define other assets of the same type as inactive.
     *
     * Required authorization scope: `Asset`
     *
     *
     * @summary Activate Assets
     */
    SDK.prototype.asset_activate_create = function (metadata) {
        return this.core.fetch('/2023-01/account/assets/{id}/activate', 'post', metadata);
    };
    /**
     * Deactivate specific uploaded asset.
     *
     * Required authorization scope: `Asset`
     *
     *
     * @summary Deactivate Assets
     */
    SDK.prototype.asset_deactivate_create = function (metadata) {
        return this.core.fetch('/2023-01/account/assets/{id}/deactivate', 'post', metadata);
    };
    /**
     * Retrieve a list of assets.
     *
     * Required authorization scope: `Asset`
     *
     *
     * @summary List all Assets
     */
    SDK.prototype.assets_index = function (metadata) {
        return this.core.fetch('/2023-01/account/assets', 'get', metadata);
    };
    /**
     * Create an asset.
     *
     * > You can store up to five assets for each type.
     * > Allowed file types: png or jpeg.
     *
     * Required authorization scope: `Asset`
     *
     *
     * @summary Create an Asset
     * @throws FetchError<400, types.AssetsCreateResponse400> uploaded assets count exceeds limitation
     */
    SDK.prototype.assets_create = function (body) {
        return this.core.fetch('/2023-01/account/assets', 'post', body);
    };
    SDK.prototype.assets_update = function (body, metadata) {
        return this.core.fetch('/2023-01/account/assets/{id}', 'patch', body, metadata);
    };
    /**
     * Delete an asset.
     *
     * Required authorization scope: `Asset`
     *
     *
     * @summary Delete an Asset
     * @throws FetchError<404, types.AssetsDeleteResponse404> no record found
     */
    SDK.prototype.assets_delete = function (metadata) {
        return this.core.fetch('/2023-01/account/assets/{id}', 'delete', metadata);
    };
    /**
     * Easyship integrate with Stripe Payment Intent to collect credit card payments.
     * Ref: https://stripe.com/docs/payments/payment-intents
     *
     * The confirmation process includes the collection of payment and creation of a
     * transaction record (credit) in your account.
     *
     * Should the payment intent not have undergone 3D Secure, you'll receive a status code
     * 202, indicating the need to process 3D Secure.
     *
     * Required authorization scope: `Payment`
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Confirm Credit Top-up
     * @throws FetchError<422, types.CreditConfrim3DsCreateResponse422> payment intent has been confirmed
     */
    SDK.prototype.credit_confrim_3ds_create = function (body) {
        return this.core.fetch('/2023-01/account/credit/confirm_3ds', 'post', body);
    };
    /**
     * Refund your credit.
     *
     * Required authorization scope: `Payment`
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Refund a Credit
     * @throws FetchError<422, types.CreditRefundCreateResponse422> insufficient balance
     */
    SDK.prototype.credit_refund_create = function (body) {
        return this.core.fetch('/2023-01/account/credit/refund', 'post', body);
    };
    /**
     * Retrieve your credit balance.
     *
     * Required authorization scope: `Credit`
     *
     *
     * @summary Get credit
     */
    SDK.prototype.credits_show = function () {
        return this.core.fetch('/2023-01/account/credit', 'get');
    };
    /**
     * Top up your credit.
     *
     * In case your payment source (credit card) requires 3D validation use the Stripe SDK.
     *
     * To detect any fraudulent activities and initiate Radar and 3D Secure, integrate
     * `handleCardAction` from Stripe.js.
     * Reference: https://stripe.com/docs/js/payment_intents/handle_card_action
     *
     * Example:
     * ```html
     * <script src="https://js.stripe.com/v3/"></script>
     * <script>
     *    // Retrieve Easyship stripe publishable api key through `GET /2023-01/account/stripe`
     *    var stripe = Stripe('stripe_publishable_api_key');
     *
     *    // When `POST /2023-01/account/credit` returns status code 202, retrieve the secret
     * in the response.
     *    var secret = response.action.client_secret
     *
     *    // 3D validation
     *    stripe.handleCardAction(secret).then(function (result) {
     *      if (result.error) {
     *        // error handling
     *      } else {
     *        // You would receive stripe payment_intent object
     *        // `POST /2023-01/account/credit/confirm_3ds` with payment_intent.id to confirm
     * credit top-up
     *      }
     *    });
     *  </script>
     * ```
     * Required authorization scope: `Payment`
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Add credit
     * @throws FetchError<404, types.CreditsCreateResponse404> record not found
     */
    SDK.prototype.credits_create = function (body) {
        return this.core.fetch('/2023-01/account/credit', 'post', body);
    };
    /**
     * Retrieve account settings.
     *
     * Required authorization scope: `Settings`
     *
     *
     * @summary List Account Settings
     */
    SDK.prototype.settings_index = function () {
        return this.core.fetch('/2023-01/account/settings', 'get');
    };
    /**
     * Update multiple account settings.
     *
     * Required authorization scope: `Settings`
     *
     *
     * @summary Update Multiple Account Settings
     */
    SDK.prototype.settings_update = function (body) {
        return this.core.fetch('/2023-01/account/settings', 'post', body);
    };
    /**
     * Retrieve a stripe public key according to your registration country.
     *
     * Required authorization scope: `Payment Sources`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Get a Stripe Public Key
     */
    SDK.prototype.stripes_show = function () {
        return this.core.fetch('/2023-01/account/stripe', 'get');
    };
    /**
     * Retrieve information about current account
     *
     * Properties below would display only when the access token includes the corresponding
     * scopes.
     *
     * | Property | Required API Scope |
     * | -------- | ------------------ |
     * | `billing_address` | `address` |
     * | `credit` | `credit` |
     * | `payment_sources` | `payment_source` |
     *
     *
     * @summary Information about the Account
     */
    SDK.prototype.account_show = function () {
        return this.core.fetch('/2023-01/account', 'get');
    };
    /**
     * Create an address validation.
     *
     * Required authorization scope: `Address Validation`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Validate a single address
     */
    SDK.prototype.addresses_validation = function (body) {
        return this.core.fetch('/2023-01/addresses/validations', 'post', body);
    };
    /**
     * Retrieve a list of all addresses ordered by date of creation.
     *
     * Required authorization scope: `Address`
     *
     *
     * @summary List all Addresses
     */
    SDK.prototype.addresses_index = function (metadata) {
        return this.core.fetch('/2023-01/addresses', 'get', metadata);
    };
    /**
     * Create a new address.
     *
     * Required authorization scope: `Address`
     *
     *
     * @summary Create an Address
     * @throws FetchError<422, types.AddressesCreateResponse422> failed validations
     */
    SDK.prototype.addresses_create = function (body) {
        return this.core.fetch('/2023-01/addresses', 'post', body);
    };
    /**
     * Update an address in your account.
     *
     * Required authorization scope: `Address`
     *
     *
     * @summary Update an Address
     * @throws FetchError<404, types.AddressesUpdateResponse404> record not found
     * @throws FetchError<422, types.AddressesUpdateResponse422> failed validations
     */
    SDK.prototype.addresses_update = function (body, metadata) {
        return this.core.fetch('/2023-01/addresses/{address_id}', 'patch', body, metadata);
    };
    /**
     * Delete an address from your account.
     *
     * Required authorization scope: `Address`
     *
     *
     * @summary Delete an Address
     * @throws FetchError<404, types.AddressesDeleteResponse404> record not found
     */
    SDK.prototype.addresses_delete = function (metadata) {
        return this.core.fetch('/2023-01/addresses/{address_id}', 'delete', metadata);
    };
    /**
     * Retrieve sales analytics.
     *
     * Required authorization scope: `Analytics`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List Analytics Sale Channels Data
     * @throws FetchError<400, types.AnalyticsSaleChannelsIndexResponse400> failed validations
     */
    SDK.prototype.analytics_sale_channels_index = function (metadata) {
        return this.core.fetch('/2023-01/analytics/sale_channels', 'get', metadata);
    };
    /**
     * Retrieve shipment status. Possible statuses:
     * - Label Pending
     * - Label Rejected
     * - Label Ready
     * - Pickup/Drop-off in Progress
     * - In Transit to Customer
     * - Failed Delivery Attempt
     * - Exception
     *
     * Required authorization scope: `Analytics`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List Analytics Shipment Status Data
     * @throws FetchError<400, types.AnalyticsShipmentStatusIndexResponse400> failed validations
     */
    SDK.prototype.analytics_shipment_status_index = function (metadata) {
        return this.core.fetch('/2023-01/analytics/shipment_status', 'get', metadata);
    };
    /**
     * Retrieve data on whether the company has made any shipments within specified period.
     *
     * Required authorization scope: `Analytics`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List Shipment Analytics within a Date Range
     * @throws FetchError<400, types.AnalyticsShipmentShippedIndexResponse400> failed validations
     */
    SDK.prototype.analytics_shipment_shipped_index = function (metadata) {
        return this.core.fetch('/2023-01/analytics/shipments_shipped', 'get', metadata);
    };
    /**
     * Retrieve analytics shipments data.
     *
     * Required authorization scope: `Analytics`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List Analytics Shipments Data
     * @throws FetchError<400, types.AnalyticsShipmentsIndexResponse400> failed validations
     */
    SDK.prototype.analytics_shipments_index = function (metadata) {
        return this.core.fetch('/2023-01/analytics/shipments', 'get', metadata);
    };
    /**
     * Retrieve analytics top couriers data.
     *
     * Required authorization scope: `Analytics`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List Analytics Top Couriers Data
     * @throws FetchError<400, types.AnalyticsTopCouriersIndexResponse400> failed validations
     */
    SDK.prototype.analytics_top_couriers_index = function (metadata) {
        return this.core.fetch('/2023-01/analytics/top_couriers', 'get', metadata);
    };
    /**
     * Retrieve a company top shipments destinations country.
     *
     * Required authorization scope: `Analytics`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List Analytics Top Shipments Destinationss
     * @throws FetchError<400, types.AnalyticsTopShipmentsDestinationsIndexResponse400> failed validations
     */
    SDK.prototype.analytics_top_shipments_destinations_index = function (metadata) {
        return this.core.fetch('/2023-01/analytics/top_shipments_destinations', 'get', metadata);
    };
    /**
     * Create a batch of addresses.
     *
     * Required authorization scope: `Batch`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Create a batch of addresses
     * @throws FetchError<400, types.BatchAddressesCreateResponse400> missing params
     */
    SDK.prototype.batch_addresses_create = function (body) {
        return this.core.fetch('/2023-01/batches/addresses', 'post', body);
    };
    /**
     * Retrieve a list of all batches ordered by date of creation.
     *
     * Required authorization scope: `Batch`
     *
     * > The `Batch` scope may be unavailable in the list of scopes. Get in touch with your
     * account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Batch Items
     * @throws FetchError<404, types.BatchItemsIndexResponse404> record not found
     */
    SDK.prototype.batch_items_index = function (metadata) {
        return this.core.fetch('/2023-01/batches/{batch_id}/items', 'get', metadata);
    };
    /**
     * Create a batch of shipments and schedule it for processing.
     *
     * Required authorization scope: `Batch`
     *
     * > The `Batch` scope may be unavailable in the list of scopes. Get in touch with your
     * account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Create a Batch of Shipments
     * @throws FetchError<400, types.BatchShipmentsCreateResponse400> missing params
     */
    SDK.prototype.batch_shipments_create = function (body) {
        return this.core.fetch('/2023-01/batches/shipments', 'post', body);
    };
    /**
     * Retrieve a list of all batches ordered by date of creation.
     *
     * Required authorization scope: `Batch`
     *
     * > The `Batch` scope may be unavailable in the list of scopes. Get in touch with your
     * account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Batches
     */
    SDK.prototype.batches_index = function (metadata) {
        return this.core.fetch('/2023-01/batches', 'get', metadata);
    };
    /**
     * Retrieve a batch by its ID.
     *
     * Required authorization scope: `Batch`
     *
     * > The `Batch` scope may be unavailable in the list of scopes. Get in touch with your
     * account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Get a Batch
     * @throws FetchError<404, types.BatchesShowResponse404> record not found
     */
    SDK.prototype.batches_show = function (metadata) {
        return this.core.fetch('/2023-01/batches/{batch_id}', 'get', metadata);
    };
    /**
     * Download the Billing Document in PDF format.
     *
     * Required authorization scope: `Billing Document`
     *
     *
     * @summary Download Billing Document
     * @throws FetchError<404, types.BillingDocumentsDownloadResponse404> record not found
     */
    SDK.prototype.billing_documents_download = function (metadata) {
        return this.core.fetch('/2023-01/billing_documents/{id}/download', 'get', metadata);
    };
    /**
     * Retrieve a list of all billing documents within range.
     * Pagination of this endpoint is not indexed.
     * `count` on the response body will always be `null`.
     *
     * Required authorization scope: `Billing Document`
     *
     *
     * @summary List all Billing Documents
     * @throws FetchError<422, types.BillingDocumentsIndexResponse422> failed validations
     */
    SDK.prototype.billing_documents_index = function (metadata) {
        return this.core.fetch('/2023-01/billing_documents', 'get', metadata);
    };
    /**
     * Retrieve a list of available courier boxes and your custom boxes.
     *
     * Required authorization scope: `Box`
     *
     * This request returns box types specified with a `slug` when creating a shipment via the
     * API or dashboard.
     *
     * > In Easyship API terms, `slug` is a string field used by the `box` object. Slugs
     * contain dimensions of corresponding box types: when you create a shipment, we will get
     * dimensions based on the `slug` provided.
     *
     *
     * @summary List all Boxes
     */
    SDK.prototype.boxes_index = function (metadata) {
        return this.core.fetch('/2023-01/boxes', 'get', metadata);
    };
    /**
     * Create a box.
     *
     * Required authorization scope: `Box`
     *
     *
     * @summary Create a Box
     * @throws FetchError<422, types.BoxesCreateResponse422> failed validations
     */
    SDK.prototype.boxes_create = function (body) {
        return this.core.fetch('/2023-01/boxes', 'post', body);
    };
    SDK.prototype.boxes_update = function (body, metadata) {
        return this.core.fetch('/2023-01/boxes/{box_id}', 'patch', body, metadata);
    };
    /**
     * Delete a box from your account.
     *
     * Required authorization scope: `Box`
     *
     *
     * @summary Delete a Box
     * @throws FetchError<404, types.BoxesDeleteResponse404> record not found
     */
    SDK.prototype.boxes_delete = function (metadata) {
        return this.core.fetch('/2023-01/boxes/{box_id}', 'delete', metadata);
    };
    /**
     * Retrieve a list of countries.
     *
     * Required authorization scope: `Reference`
     *
     * Available filtering parameters: by Alpha-2 country code or continent.
     *
     *
     * @summary List all Countries
     */
    SDK.prototype.countries_index = function (metadata) {
        return this.core.fetch('/2023-01/countries', 'get', metadata);
    };
    /**
     * Retrieve a list of couriers for selected courier account.
     *
     * Required authorization scope: `Courier`
     *
     *
     * @summary List all Couriers in Couriers Accounts
     */
    SDK.prototype.courier_accounts_couriers_index = function (metadata) {
        return this.core.fetch('/2023-01/courier_accounts/{courier_account_id}/couriers', 'get', metadata);
    };
    /**
     * Deactivates a courier account.
     *
     * Required authorization scope: `Courier Account`
     *
     *
     * @summary Deactivate a Courier Account
     * @throws FetchError<404, types.CourierAccountsDeactivateResponse404> record not found
     * @throws FetchError<422, types.CourierAccountsDeactivateResponse422> failed validations
     */
    SDK.prototype.courier_accounts_deactivate = function (metadata) {
        return this.core.fetch('/2023-01/courier_accounts/{courier_account_id}/deactivate', 'post', metadata);
    };
    /**
     * Retrieve a list of courier accounts.
     *
     * Required authorization scope: `Courier Account`
     *
     *
     * @summary List all Courier Accounts
     */
    SDK.prototype.courier_accounts_index = function (metadata) {
        return this.core.fetch('/2023-01/courier_accounts', 'get', metadata);
    };
    /**
     * Creates a new courier account.
     *
     * Required authorization scope: `Courier Account`
     *
     *
     * @summary Create a Courier Account
     * @throws FetchError<402, types.CourierAccountsCreateResponse402> over limit
     * @throws FetchError<422, types.CourierAccountsCreateResponse422> failed validations
     */
    SDK.prototype.courier_accounts_create = function (body) {
        return this.core.fetch('/2023-01/courier_accounts', 'post', body);
    };
    /**
     * Retrieve details of a courier accounts.
     *
     * Required authorization scope: `Courier Account`
     *
     *
     * @summary Get a Courier Account
     * @throws FetchError<404, types.CourierAccountsShowResponse404> record not found
     */
    SDK.prototype.courier_accounts_show = function (metadata) {
        return this.core.fetch('/2023-01/courier_accounts/{courier_account_id}', 'get', metadata);
    };
    SDK.prototype.courier_accounts_update = function (body, metadata) {
        return this.core.fetch('/2023-01/courier_accounts/{courier_account_id}', 'patch', body, metadata);
    };
    SDK.prototype.courier_accounts_couriers_bulk_update = function (body, metadata) {
        return this.core.fetch('/2023-01/courier_accounts/{courier_account_id}/couriers/bulk_update', 'post', body, metadata);
    };
    /**
     * Retrieve a list of estimated delivery dates for a specific courier.
     *
     * Required authorization scope: `Courier`
     *
     * Easyship builds estimation model based on shipments delivered within last 12 months. If
     * you use Link Your Own Rates (LYOC) scheme, LYOC couriers are excluded from the
     * calculation.
     *
     *
     * @summary List all Estimated Delivery Dates for a Courier
     * @throws FetchError<404, types.CourierEstimatedDeliveryDatesIndexResponse404> courier not found
     */
    SDK.prototype.courier_estimated_delivery_dates_index = function (metadata) {
        return this.core.fetch('/2023-01/couriers/{courier_id}/estimated_delivery_dates', 'get', metadata);
    };
    /**
     * Retrieve a list of pickup slots in local time for the coming seven days.
     *
     * Required authorization scope: `Pickup`
     *
     *
     * @summary List Available Pickup Slots
     * @throws FetchError<400, types.CouriersPickupSlotsIndexResponse400> failed validations
     * @throws FetchError<404, types.CouriersPickupSlotsIndexResponse404> pickup not supported by courier
     */
    SDK.prototype.couriers_pickup_slots_index = function (metadata) {
        return this.core.fetch('/2023-01/couriers/{courier_id}/pickup_slots', 'get', metadata);
    };
    /**
     * Retrieve a list of couriers available with your account.
     *
     * Required authorization scope: `Courier`
     *
     *
     * @summary List all Couriers
     */
    SDK.prototype.couriers_index = function (metadata) {
        return this.core.fetch('/2023-01/couriers', 'get', metadata);
    };
    /**
     * Retrieve a list of HS codes.
     *
     * Required authorization scope: `HS code`
     *
     * **Rate limit**: This endpoint is rate-limited by 100 requests per second, 1,000 requests
     * per minute, 1,000 requests per hour, 1,000 requests per day, and 30,000 requests per
     * month.
     * Exceeding this limit returns a `429 Too Many Requests` response for subsequent requests.
     * If you need a higher rate limit, get in touch with us.
     *
     *
     * @summary List HS Codes
     */
    SDK.prototype.hs_code_index = function (metadata) {
        return this.core.fetch('/2023-01/hs_codes', 'get', metadata);
    };
    /**
     * Retrieve a list of item categories.
     *
     * Required authorization scope: `Reference`
     *
     *
     * @summary List all Item Categories
     */
    SDK.prototype.item_categories_index = function (metadata) {
        return this.core.fetch('/2023-01/item_categories', 'get', metadata);
    };
    /**
     * Create a new label.
     *
     * Required authorization scope: `Label`
     *
     * Labels confirm a shipment created with the Shipment API. Calling **Create Labels** will
     * confirm a shipment with selected courier and begin generating the label and shipping
     * documents if your account balance is sufficient.
     *
     * > You can enter a `courier_id` to assign a specific courier in case your shipment has no
     * assigned courier yet, or you need to overwrite the one suggested by default. Your
     * shipment will be confirmed. If there is no assigned courier and you leave the
     * `courier_id` field blank, we will automatically assign the best value for money courier
     * to your shipment.
     *
     * ## Asynchronous response
     *
     * The label and shipping documents will be generated asynchronously. If you specified a
     * `Callback URL` through the Easyship dashboard, this URL will be called when the
     * documents are ready.
     * Whilst these documents are being generated, the `label_state` will be set to `pending`.
     * The possible states are `not_created`, `pending`, `failed` and `generated`.
     *
     *
     * @summary Create Labels
     * @throws FetchError<402, types.LabelsCreateResponse402> reached a balance limit
     * @throws FetchError<422, types.LabelsCreateResponse422> failed validations
     */
    SDK.prototype.labels_create = function (body) {
        return this.core.fetch('/2023-01/labels', 'post', body);
    };
    /**
     * Retrieve USPS locations.
     *
     * Required authorization scope: `Location`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List USPS Locations
     * @throws FetchError<422, types.LocationsUspsIndexResponse422> location service not found for provided courier
     * @throws FetchError<500, types.LocationsUspsIndexResponse500> forward request failed
     */
    SDK.prototype.locations_usps_index = function (metadata) {
        return this.core.fetch('/2023-01/locations/usps', 'get', metadata);
    };
    /**
     * Retrieve a list of
     * [manifests](https://support.easyship.com/hc/en-us/articles/4414489808525-What-Is-a-Manifest-in-Shipping).
     *
     * Required authorization scope: `Manifest`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Manifests
     */
    SDK.prototype.manifests_index = function (metadata) {
        return this.core.fetch('/2023-01/manifests', 'get', metadata);
    };
    /**
     * Create a
     * [manifest](https://support.easyship.com/hc/en-us/articles/4414489808525-What-Is-a-Manifest-in-Shipping).
     *
     * Required authorization scope: `Manifest`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Create a Manifest
     * @throws FetchError<404, types.ManifestsCreateResponse404> courier account was not found
     */
    SDK.prototype.manifests_create = function (body) {
        return this.core.fetch('/2023-01/manifests', 'post', body);
    };
    /**
     * Retrieve details of a specific manifest.
     *
     * Required authorization scope: `Manifest`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Get a Manifest
     * @throws FetchError<404, types.ManifestsShowResponse404> manifest was not found
     */
    SDK.prototype.manifests_show = function (metadata) {
        return this.core.fetch('/2023-01/manifests/{manifest_id}', 'get', metadata);
    };
    /**
     * Easyship integrate with Stripe Setup Intent to collect credit card information.
     * Ref: https://docs.stripe.com/payments/save-and-reuse-cards-only
     *
     * Here's a example of how you can process 3DS on the client side. Once the validation is
     * completed, you can use the `setup_intent.id` to finalize the payment source in Easyship.
     * ```html
     *   <html>
     *     <body>
     *       <form id="form">
     *         <label>
     *           <span>Intent Secret</span>
     *           <input id="secret" class="field" placeholder="" />
     *         </label>
     *         <div class="button-row">
     *           <button>Submit</button>
     *         </div>
     *       </form>
     *
     *       <script src="https://js.stripe.com/v3/"></script>
     *       <script>
     *         // Retrieve Easyship stripe publishable api key through `GET
     * /2023-01/account/stripe`
     *         var stripe = Stripe('Easyship_stripe_publishable_api_key');
     *
     *         // Handle form submission and trigger 3DS
     *         var form = document.getElementById('form');
     *         form.addEventListener('submit', function (event) {
     *           event.preventDefault();
     *
     *           var secret = document.getElementById('secret').value;
     *           console.log(secret)
     *
     *           stripe.confirmCardSetup(secret).then(function (result) {
     *             if (result.error) {
     *               // error handling
     *             } else {
     *               // You would receive the `setup intent id` with prefix `seti_`.
     *               // `POST /2023-01/payment_sources/confirm_3ds` here to finalize the
     * payment source in Easyship
     *             }
     *           });
     *         });
     *       </script>
     *     </body>
     *   </html>
     * ```
     *
     * Should the setup intent not have undergone 3D Secure, you'll receive a status code 202,
     * indicating the need to process 3D Secure.
     *
     * Required authorization scope: `Payment Source`
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Confirm Payment Source
     * @throws FetchError<422, types.PaymentSourcesConfrim3DsCreateResponse422> payment source already existed
     */
    SDK.prototype.payment_sources_confrim_3ds_create = function (body) {
        return this.core.fetch('/2023-01/payment_sources/confirm_3ds', 'post', body);
    };
    /**
     * Retrieve a list of payment sources.
     *
     * Required authorization scope: `Payment Source`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Payment Sources
     */
    SDK.prototype.payment_sources_index = function (metadata) {
        return this.core.fetch('/2023-01/payment_sources', 'get', metadata);
    };
    /**
     * Create a payment sources.
     *
     * Easyship won't hold the details of your credit card. We use `stripe token` to attach the
     * credit card to your easyship account on Stripe.
     * Please upload your credit card to stripe via Stripe Token JS.
     *
     * Example:
     * ```html
     * <script src="https://js.stripe.com/v3/"></script>
     * <script>
     *    // Retrieve Easyship stripe publishable api key through `GET /2023-01/account/stripe`
     *    var stripe = Stripe('stripe_publishable_api_key');
     *
     *    // Create an instance of Elements.
     *    // https://stripe.com/docs/js/elements_object/create_element?type=card
     *    var elements = stripe.elements();
     *
     *    // Create a CardElement
     *    var card = elements.create('card')
     *
     *    // Create your token from the CardElement data
     *    // https://stripe.com/docs/js/tokens/create_token?type=cardElement
     *    stripe.createToken(card).then(function (result) {
     *      if (result.error) {
     *        // error handling
     *      } else {
     *        // You would receive the `stripe token` with prefix `tok_`.
     *        // `POST /2023-01/payment_sources` here to attach your card to Easyship
     *        var token = result.token;
     *      }
     *    });
     *  </script>
     * ```
     *
     * When the credit card needs 3DS (with response status code 202), proceed with the next
     * step found in `POST /2023-01/payment_sources/confirm_3ds`.
     *
     * Required authorization scope: `Payment Source`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Create a Payment Source
     * @throws FetchError<422, types.PaymentSourcesCreateResponse422> credit card has expired
     */
    SDK.prototype.payment_sources_create = function (body) {
        return this.core.fetch('/2023-01/payment_sources', 'post', body);
    };
    /**
     * Update a payment source.
     *
     * Required authorization scope: `Payment Source`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Update a Payment Source
     * @throws FetchError<404, types.PaymentSourcesUpdateResponse404> No record found
     */
    SDK.prototype.payment_sources_update = function (body, metadata) {
        return this.core.fetch('/2023-01/payment_sources/{payment_source_id}', 'patch', body, metadata);
    };
    /**
     * Delete a Payment Source
     *
     * Required authorization scope: `Payment Source`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Delete a Payment Source
     * @throws FetchError<422, types.PaymentSourcesDeleteResponse422> Unable to delete last credit card
     */
    SDK.prototype.payment_sources_delete = function (metadata) {
        return this.core.fetch('/2023-01/payment_sources/{payment_source_id}', 'delete', metadata);
    };
    /**
     * Cancel a pickup.
     *
     * Required authorization scope: `Pickup`
     *
     *
     * @summary Cancel a Pickup
     * @throws FetchError<404, types.PickupsCancelResponse404> pickup not found
     * @throws FetchError<422, types.PickupsCancelResponse422> failed validations
     */
    SDK.prototype.pickups_cancel = function (metadata) {
        return this.core.fetch('/2023-01/pickups/{easyship_pickup_id}/cancel', 'post', metadata);
    };
    /**
     * Retrieve a list of pickups.
     *
     * Required authorization scope: `Pickup`
     *
     *
     * @summary List all Pickups
     */
    SDK.prototype.pickups_index = function (metadata) {
        return this.core.fetch('/2023-01/pickups', 'get', metadata);
    };
    /**
     * Schedule a pickup.
     *
     * Required authorization scope: `Pickup`
     *
     * > Only available if your courier provides pickup options.
     *
     * ## Select a pickup time
     *
     * After retrieving a courier's pickup slots, you can specify a pickup time in
     * `time_slot_id` or in `selected_from_time` and `selected_to_time`.
     *
     *
     * @summary Create a Pickup
     * @throws FetchError<422, types.PickupsCreateResponse422> slots not found for provided courier
     */
    SDK.prototype.pickups_create = function (body) {
        return this.core.fetch('/2023-01/pickups', 'post', body);
    };
    /**
     * Retrieve details of a specific pickup.
     *
     * Required authorization scope: `Pickup`
     *
     *
     * @summary Get a Pickup
     * @throws FetchError<404, types.PickupsShowResponse404> record not found
     */
    SDK.prototype.pickups_show = function (metadata) {
        return this.core.fetch('/2023-01/pickups/{easyship_pickup_id}', 'get', metadata);
    };
    /**
     * Retrieve a list of products available with your account.
     *
     * Required authorization scope: `Product`
     *
     *
     * @summary List all Products
     */
    SDK.prototype.products_index = function (metadata) {
        return this.core.fetch('/2023-01/products', 'get', metadata);
    };
    /**
     * Create a single product in your account.
     *
     * Required authorization scope: `Product`
     *
     *
     * @summary Create a Product
     * @throws FetchError<422, types.ProductsCreateResponse422> failed validations
     */
    SDK.prototype.products_create = function (body) {
        return this.core.fetch('/2023-01/products', 'post', body);
    };
    /**
     * Delete a single product from your account.
     *
     * Required authorization scope: `Product`
     *
     *
     * @summary Delete a Product
     * @throws FetchError<404, types.ProductsDeleteResponse404> record not found
     */
    SDK.prototype.products_delete = function (metadata) {
        return this.core.fetch('/2023-01/products/{product_id}', 'delete', metadata);
    };
    SDK.prototype.products_update = function (body, metadata) {
        return this.core.fetch('/2023-01/products/{product_id}', 'patch', body, metadata);
    };
    /**
     * Request a list of shipping quotes for a prospective shipment.
     *
     * Required authorization scope: `Rate`
     *
     * > Compare couriers to see the cheapest, fastest and best value for money, or a
     * combination of speed, price and reliability.
     *
     * ## Input city and state
     *
     * If you are shipping to or within the United States, Canada, Mexico or Australia, we
     * recommend that you always input the origin and destination `city` and `state`. This
     * information is required by certain couriers to return accurate rates.
     *
     * ## Calculate dimensions and total weight
     *
     * You can calculate dimensions and total weight of your shipment in three ways:
     *
     * * Provide `total_actual_weight` and `box` objects for the shipment.
     * * Specify `actual_weight` and `dimensions` for each item of the `items` object: in this
     * case, total weight and box size will be calculated automatically.
     * * Specify `sku` for each item of the `items` object: in this case, actual weight and
     * dimensions for calculations will be taken as set for the product.
     *
     *
     * @summary Request Rates
     * @throws FetchError<402, types.RatesRequestResponse402> insufficient subscription tier for a specific feature
     * @throws FetchError<422, types.RatesRequestResponse422> failed validations
     */
    SDK.prototype.rates_request = function (body) {
        return this.core.fetch('/2023-01/rates', 'post', body);
    };
    /**
     * Cancel a shipment that has been shipped.
     *
     * Required authorization scope: `Shipment`
     *
     * > You can cancel your shipment after it has been shipped only if its label failed to be
     * generated or if the label is already generated, but the shipment is not yet in transit.
     *
     *
     * @summary Cancel a Shipment
     * @throws FetchError<404, types.ShipmentsCancelResponse404> record not found
     * @throws FetchError<422, types.ShipmentsCancelResponse422> failed validations
     */
    SDK.prototype.shipments_cancel = function (metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}/cancel', 'post', metadata);
    };
    /**
     * Retrieve shipping documents of specific shipment.
     *
     * Required authorization scope: `Shipment Document`
     *
     *
     * @summary List All Documents
     * @throws FetchError<400, types.ShipmentsDocumentsIndexResponse400> shipment has been cancelled
     * @throws FetchError<404, types.ShipmentsDocumentsIndexResponse404> record not found
     * @throws FetchError<422, types.ShipmentsDocumentsIndexResponse422> invalid document type
     */
    SDK.prototype.shipments_documents_index = function (metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}/documents', 'get', metadata);
    };
    SDK.prototype.return_shipments_create = function (body, metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}/return', 'post', body, metadata);
    };
    /**
     * Update the shipment tracking number and create tracking events.
     *
     * Required authorization scope: `Shipment`
     *
     * > This endpoint is only available to eFulfillment clients with shipments fulfilled at
     * one of Easyship's integrated warehouses.
     *
     * > You will need to specify `tracking_number` for initial request for a shipment. Further
     * updates of a shipment with the same `easyship_shipment_id` don't need to have the
     * `tracking number` unless you change it.
     *
     * For `events`, specify the `primary_status` field from the list:
     * * `InTransit`
     * * `OutForDelivery`
     * * `AttemptFail`
     * * `Delivered`
     * * `Exception`
     *
     * #### Example request for an initial setup of a shipment
     *
     * ```json
     * {
     *   "easyship_shipment_id": "ESHK10017799",
     *   "tracking_number": "ABCD1234",
     *   "events": [
     *     {
     *       "primary_status": "InTransit"
     *     }
     *   ]
     * }
     * ````
     *
     * #### Example request for a shipment status update
     *
     * This example has optional `event_time` and `event_time_zone`.
     *
     * ```json
     * {
     *   "easyship_shipment_id": "ESHK10017799",
     *   "events": [
     *     {
     *       "primary_status": "OutForDelivery",
     *       "event_time": "2020-04-29T03:38:00",
     *       "event_time_zone": "-04:00"
     *     }
     *   ]
     * }
     * ````
     *
     * #### Example request for a complete update
     *
     *
     * ```json
     * {
     *   "easyship_shipment_id": "ESHK10017799",
     *   "events": [
     *     {
     *       "primary_status": "OutForDelivery",
     *       "location": "Brooklyn, NY",
     *       "city": "Brooklyn",
     *       "country_alpha2": "US",
     *       "state": "NY",
     *       "zip": "11201",
     *       "handler": "UPS",
     *       "message": "On UPS vehicle for delivery",
     *       "event_time": "2020-04-29T03:38:00",
     *       "event_time_zone": "-04:00"
     *     }
     *   ]
     * }
     * ````
     *
     *
     * @summary Tracking Updates
     * @throws FetchError<404, types.EfulfillmentTrackingUpdateResponse404> shipment not found
     * @throws FetchError<422, types.EfulfillmentTrackingUpdateResponse422> failed validations
     */
    SDK.prototype.efulfillment_tracking_update = function (body) {
        return this.core.fetch('/2023-01/shipments/tracking_updates', 'post', body);
    };
    /**
     * Retrieve the most recent status for a shipment and a history of all previous
     * checkpoints.
     *
     * Required authorization scope: `Track`
     *
     *
     * @summary List all Trackings
     */
    SDK.prototype.shipments_trackings_index = function (metadata) {
        return this.core.fetch('/2023-01/shipments/trackings', 'get', metadata);
    };
    /**
     * List transaction records for a shipment.
     *
     * Required authorization scope: `Transaction_record`
     *
     *
     * @summary List Transaction Records for a Shipment
     * @throws FetchError<404, types.ShipmentsTransactionRecordsIndexResponse404> shipment not found
     */
    SDK.prototype.shipments_transaction_records_index = function (metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}/transaction_records', 'get', metadata);
    };
    /**
     * List unavailable couriers for a shipment.
     *
     * Required authorization scopes: `Shipment` and `Rate`
     *
     *
     * @summary List Unavailable Couriers for a Shipment
     * @throws FetchError<404, types.ShipmentUnavailableCouriersIndexResponse404> shipment not found
     */
    SDK.prototype.shipment_unavailable_couriers_index = function (metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}/unavailable_couriers', 'get', metadata);
    };
    /**
     * Update the warehouse state of one or multiple shipments.
     *
     * Required authorization scope: `Shipment`
     *
     * > This endpoint is only available to eFulfillment clients with shipments fulfilled at
     * one of Easyship's integrated warehouses.
     *
     * > If a shipment contains the `metadata` object, it will persist unless you change
     * existing keys or create new ones: in this case, corresponding keys will be updated or
     * added.
     *
     * The `warehouse_state` field has the following possible statuses:
     * <table>
     *   <tr>
     *     <th>warehouse_state</th>
     *     <th>Description</th>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>created</code>
     *     </td>
     *     <td>
     *       An order has been created in the warehouse management system and is ready to be
     * fulfilled.<br><br><i>Note:</i> This update is not needed if a success response is sent
     * when Easyship sends the label callback.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>failed</code>
     *     </td>
     *     <td>
     *       The order creation was rejected for an internal reason by the WMS. This can happen
     * if the order information doesn't meet the WMS' requirements, or a product SKU is not
     * defined in your WMS.<br><br>A message can be added using the message parameter. This
     * will allow the client and Easyship to understand the reason for rejection.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>packed</code>
     *     </td>
     *     <td>
     *       The order has been processed and packed and is waiting to be handed over to the
     * courier
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>shipped</code>
     *     </td>
     *     <td>
     *       The order has been handed over to the courier and has left the
     * warehouse.<br><br><i>Note:</i> This status update will trigger the following:
     *       <ul>
     *         <li>If the shipment was created through a store integration, Easyship will mark
     * the order as "shipped" on the store</li>
     *         <li>If the company has the email notification option turned on, Easyship will
     * send an email notification to the receiver, with the tracking number and the tracking
     * page URL</li>
     *         <li>Easyship will start tracking the shipment, and update its status based on
     * the courier's tracking events</li>
     *       </ul>
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>cancellation_requested</code>
     *     </td>
     *     <td>
     *       A cancellation request has been sent to the warehouse management system. It is
     * awaiting confirmation by the warehouse.<br><br><i>Note:</i> This status is set by
     * clients requesting a cancellation through the dashboard. It should not be set by a
     * warehouse.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>cancelled</code>
     *     </td>
     *     <td>
     *       The order has been cancelled in the warehouse management
     * system.<br><br><i>Note:</i> This status update will trigger Easyship to cancel the
     * shipment.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>cancelled_no_stock</code>
     *     </td>
     *     <td>
     *      The order has been cancelled in the warehouse management system because the
     * products are out of stock.<br><br><i>Note:</i> This status update will trigger Easyship
     * to cancel the shipment.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>backorder_no_stock</code>
     *     </td>
     *     <td>
     *       The order is set as backorder because of the products are out of stock. It may be
     * packed and shipped at a later date.
     *     </td>
     *   </tr>
     *   <tr>
     *     <td>
     *       <code>returned</code>
     *     </td>
     *     <td>
     *       The package was returned by the courier or by the receiver, and received at the
     * warehouse.
     *     </td>
     *   </tr>
     * </table>
     *
     *
     * @summary Warehouse State Updates
     * @throws FetchError<422, types.EfulfillmentWarehouseStateUpdateResponse422> failure
     */
    SDK.prototype.efulfillment_warehouse_state_update = function (body) {
        return this.core.fetch('/2023-01/shipments/warehouse_state_updates', 'post', body);
    };
    /**
     * Retrieve a list of shipments.
     *
     * Required authorization scope: `Shipment`
     *
     *
     * @summary List all Shipments
     * @throws FetchError<422, types.ShipmentsIndexResponse422> invalid filter param
     */
    SDK.prototype.shipments_index = function (metadata) {
        return this.core.fetch('/2023-01/shipments', 'get', metadata);
    };
    /**
     * Create a new shipment.
     *
     * Required authorization scope: `Shipment`
     *
     * ## Select a courier
     *
     * If you use our Rates API, you can define a courier ID to assign a courier to the
     * shipment using `selected_courier_id`. If you skip courier ID, we will return a list of
     * all possible rates to your new shipment and assign the best value for money courier.
     *
     * ## Calculate dimensions and total weight
     *
     * You can calculate dimensions and total weight of your shipment in three ways:
     *
     * * Provide `total_actual_weight` and `box` objects for the shipment.
     * * Specify `actual_weight` and `dimensions` for each item of the `items` object: in this
     * case, total weight and box size will be calculated automatically.
     * * Specify `sku` for each item of the `items` object: in this case, actual weight and
     * dimensions for calculations will be taken as set for the product.
     *
     *
     * @summary Create a Shipment
     * @throws FetchError<402, types.ShipmentsCreateResponse402> insufficient subscription tier for a specific feature
     * @throws FetchError<422, types.ShipmentsCreateResponse422> failed validations
     */
    SDK.prototype.shipments_create = function (body) {
        return this.core.fetch('/2023-01/shipments', 'post', body);
    };
    /**
     * Retrieve details of a specific shipment.
     *
     * Required authorization scope: `Shipment`
     *
     * > All shipment documents are customisable. You can set:
     * >
     * > - Document format: URL, PDF or PNG
     * > - Label page size: A4, A5 or 4x6
     * > - Commercial invoice page size: A4 or 4x6
     * > - Packing slip page size: A4 or 4x6
     *
     *
     * @summary Get a Shipment
     * @throws FetchError<404, types.ShipmentsShowResponse404> record not found
     */
    SDK.prototype.shipments_show = function (metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}', 'get', metadata);
    };
    SDK.prototype.shipments_update = function (body, metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}', 'patch', body, metadata);
    };
    /**
     * Delete a shipment that has not yet been shipped.
     *
     * Required authorization scope: `Shipment`
     *
     *
     * @summary Delete a Shipment
     * @throws FetchError<422, types.ShipmentsDeleteResponse422> failed validations
     */
    SDK.prototype.shipments_delete = function (metadata) {
        return this.core.fetch('/2023-01/shipments/{easyship_shipment_id}', 'delete', metadata);
    };
    /**
     * Retrieve a list of pickup's shipments.
     *
     * Required authorization scope: `Shipment`
     *
     *
     * @summary List All Shipments of Specific Pickup
     */
    SDK.prototype.pickups_shipments_index = function (metadata) {
        return this.core.fetch('/2023-01/pickups/{pickup_id}/shipments', 'get', metadata);
    };
    SDK.prototype.shipping_rule_action_create = function (body, metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/actions', 'post', body, metadata);
    };
    /**
     * List actions for a shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Actions for a Shipping Rule
     */
    SDK.prototype.shipping_rule_action_index = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/actions', 'get', metadata);
    };
    SDK.prototype.shipping_rule_action_update = function (body, metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/actions/{action_id}', 'patch', body, metadata);
    };
    /**
     * Delete shipping rule action.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and available is available upon request. Get in
     * touch with your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Delete Action of a Shipping Rule
     * @throws FetchError<403, types.ShippingRuleActionDeleteResponse403> unauthorized
     * @throws FetchError<404, types.ShippingRuleActionDeleteResponse404> record not found
     */
    SDK.prototype.shipping_rule_action_delete = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/actions/{action_id}', 'delete', metadata);
    };
    /**
     * Activate specific shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Activate a Shipping Rule
     * @throws FetchError<403, types.ShippingRuleActivateResponse403> unauthorized
     * @throws FetchError<404, types.ShippingRuleActivateResponse404> record not found
     */
    SDK.prototype.shipping_rule_activate = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{id}/activate', 'post', metadata);
    };
    SDK.prototype.shipping_rule_condition_create = function (body, metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/conditions', 'post', body, metadata);
    };
    /**
     * List conditions of a shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Conditions for a Shipping Rule
     */
    SDK.prototype.shipping_rule_condition_index = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/conditions', 'get', metadata);
    };
    SDK.prototype.shipping_rule_condition_update = function (body, metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/conditions/{condition_id}', 'patch', body, metadata);
    };
    /**
     * Delete shipping rule condition.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Delete Condition of a Shipping Rule
     * @throws FetchError<403, types.ShippingRuleConditionDeleteResponse403> unauthorized
     */
    SDK.prototype.shipping_rule_condition_delete = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}/conditions/{condition_id}', 'delete', metadata);
    };
    /**
     * Deactivate specific shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Deactivate a Shipping Rule
     * @throws FetchError<403, types.ShippingRuleDeactivateResponse403> unauthorized
     */
    SDK.prototype.shipping_rule_deactivate = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{id}/deactivate', 'post', metadata);
    };
    /**
     * Retrieve a list of available platform names for shipping rules.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Platform Names
     */
    SDK.prototype.shipping_rule_platforms_index = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/platforms', 'get', metadata);
    };
    /**
     * Retrieve a list of shipping rules.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Get all Shipping Rules
     */
    SDK.prototype.shipping_rules_index = function () {
        return this.core.fetch('/2023-01/shipping_rules', 'get');
    };
    /**
     * Create a shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     *
     * @summary Create a Shipping Rule
     * @throws FetchError<422, types.ShippingRulesCreateResponse422> invalid content
     */
    SDK.prototype.shipping_rules_create = function (body) {
        return this.core.fetch('/2023-01/shipping_rules', 'post', body);
    };
    /**
     * Retrieve a shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Get a Shipping Rule
     * @throws FetchError<403, types.ShippingRulesShowResponse403> unauthorized
     * @throws FetchError<404, types.ShippingRulesShowResponse404> record not found
     */
    SDK.prototype.shipping_rules_show = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}', 'get', metadata);
    };
    SDK.prototype.shipping_rules_update = function (body, metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}', 'patch', body, metadata);
    };
    /**
     * Delete a shipping rule.
     *
     * Required authorization scope: `Shipping Rule`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Delete a Shipping Rule
     * @throws FetchError<403, types.ShippingRulesDeleteResponse403> unauthorized
     */
    SDK.prototype.shipping_rules_delete = function (metadata) {
        return this.core.fetch('/2023-01/shipping_rules/{shipping_rule_id}', 'delete', metadata);
    };
    /**
     * Retrieve a list of states.
     *
     * Required authorization scope: `Reference`
     *
     * This endpoint in only used for the United States, Canada, Australia and Mexico.
     *
     *
     * @summary List all States
     */
    SDK.prototype.states_index = function (metadata) {
        return this.core.fetch('/2023-01/states', 'get', metadata);
    };
    /**
     * Retrieve a list of stores available with your account.
     *
     * Required authorization scope: `Store`
     *
     *
     * @summary List all Stores
     */
    SDK.prototype.stores_index = function (metadata) {
        return this.core.fetch('/2023-01/stores', 'get', metadata);
    };
    /**
     * Retrieve a list of tags.
     *
     * Required authorization scope: `Tag`
     *
     * > You can filter your tags by keywords.
     *
     *
     * @summary List all Tags
     */
    SDK.prototype.tags_index = function (metadata) {
        return this.core.fetch('/2023-01/tags', 'get', metadata);
    };
    /**
     * Create a new tag.
     *
     * Required authorization scope: `Tag`
     *
     *
     * @summary Create a Tag
     * @throws FetchError<422, types.TagsCreateResponse422> invalid content
     */
    SDK.prototype.tags_create = function (body, metadata) {
        return this.core.fetch('/2023-01/tags', 'post', body, metadata);
    };
    /**
     * Retrieve tax and duty costs information.
     *
     * Required authorization scope: `Tax and Duty`
     *
     *
     * @summary Calculate Tax and Duty
     * @throws FetchError<402, types.TaxesAndDutiesCalculateResponse402> when insufficient subscription tier for specific feature
     * @throws FetchError<422, types.TaxesAndDutiesCalculateResponse422> could not calculate tax and duty
     */
    SDK.prototype.taxes_and_duties_calculate = function (body) {
        return this.core.fetch('/2023-01/taxes_and_duties', 'post', body);
    };
    /**
     * List supported couriers.
     *
     * Required authorization scope: `Track 3P`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List of Supported Couriers
     */
    SDK.prototype.trackings_list_supported_couriers = function (metadata) {
        return this.core.fetch('/2023-01/trackings/supported_couriers', 'get', metadata);
    };
    /**
     * Retrieve a list of trackings available with your account.
     *
     * Required authorization scope: `Track 3P`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary List all Trackings
     */
    SDK.prototype.trackings_index = function (metadata) {
        return this.core.fetch('/2023-01/trackings', 'get', metadata);
    };
    /**
     * Create a single tracking in your account.
     *
     * Required authorization scope: `Track 3P`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Create a Tracking
     * @throws FetchError<422, types.TrackingsCreateResponse422> failed validations
     */
    SDK.prototype.trackings_create = function (body) {
        return this.core.fetch('/2023-01/trackings', 'post', body);
    };
    /**
     * Delete a single tracking from your account.
     *
     * Required authorization scope: `Track 3P`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Delete a Tracking
     * @throws FetchError<404, types.TrackingsDeleteResponse404> record not found
     */
    SDK.prototype.trackings_delete = function (metadata) {
        return this.core.fetch('/2023-01/trackings/{tracking_id}', 'delete', metadata);
    };
    /**
     * Show a single tracking in your account.
     *
     * Required authorization scope: `Track 3P`
     *
     * > This API is currently in **beta** and is available upon request. Get in touch with
     * your account manager or Easyship Support Team to enable it.
     *
     *
     * @summary Show a Tracking
     * @throws FetchError<404, types.TrackingsShowResponse404> record not found
     */
    SDK.prototype.trackings_show = function (metadata) {
        return this.core.fetch('/2023-01/trackings/{tracking_id}', 'get', metadata);
    };
    /**
     * Retrieve a list of all transactions within range.
     * Pagination of this endpoint is not indexed.
     * `count` on the response body will always be `null`.
     *
     * Required authorization scope: `Transaction Record`
     *
     *
     * @summary List all Transactions
     * @throws FetchError<422, types.TransactionsIndexResponse422> failed validations
     */
    SDK.prototype.transactions_index = function (metadata) {
        return this.core.fetch('/2023-01/transaction_records', 'get', metadata);
    };
    /**
     * Retrieve a list of all billing document's transactions.
     * Pagination of this endpoint is not indexed.
     * `count` on the response body will always be `null`.
     *
     * Required authorization scope: `Transaction Record`
     *
     *
     * @summary List all Billing Document's Transaction Records
     */
    SDK.prototype.billing_documents_transactions_index = function (metadata) {
        return this.core.fetch('/2023-01/billing_documents/{id}/transaction_records', 'get', metadata);
    };
    /**
     * Activates a single webhook for your account.
     *
     * Required authorization scope: `Webhook`
     *
     *
     * @summary Activate a Webhook
     * @throws FetchError<400, types.WebhooksActivateResponse400> failed to activate webhook
     */
    SDK.prototype.webhooks_activate = function (metadata) {
        return this.core.fetch('/2023-01/webhooks/{webhook_id}/activate', 'post', metadata);
    };
    /**
     * Deactivates a single webhook for your account.
     *
     * Required authorization scope: `Webhook`
     *
     *
     * @summary Deactivate a Webhook
     * @throws FetchError<400, types.WebhooksDeactivateResponse400> failed to deactivate webhook
     */
    SDK.prototype.webhooks_deactivate = function (metadata) {
        return this.core.fetch('/2023-01/webhooks/{webhook_id}/deactivate', 'post', metadata);
    };
    /**
     * Test a single webhook in your account.
     *
     * Required authorization scope: `Webhook`
     *
     *
     * @summary Test a Webhook
     * @throws FetchError<400, types.WebhooksTestResponse400> failed to test webhook
     * @throws FetchError<422, types.WebhooksTestResponse422> event_type is invalid
     * @throws FetchError<429, types.WebhooksTestResponse429> too many requests
     */
    SDK.prototype.webhooks_test = function (body, metadata) {
        return this.core.fetch('/2023-01/webhooks/{webhook_id}/test', 'post', body, metadata);
    };
    /**
     * Retrieve a list of webhooks available within your account.
     *
     * Required authorization scope: `Webhook`
     *
     *
     * @summary List all Webhooks
     */
    SDK.prototype.webhooks_index = function (metadata) {
        return this.core.fetch('/2023-01/webhooks', 'get', metadata);
    };
    /**
     * Create a single webhook in your account.
     *
     * Required authorization scope:  `Webhook`
     *
     *
     * @summary Create a Webhook
     * @throws FetchError<422, types.WebhooksCreateResponse422> failed validations
     */
    SDK.prototype.webhooks_create = function (body) {
        return this.core.fetch('/2023-01/webhooks', 'post', body);
    };
    /**
     * Show a single webhook in your account.
     *
     * Required authorization scope:  `Webhook`
     *
     *
     * @summary Show a Webhook
     */
    SDK.prototype.webhooks_show = function (metadata) {
        return this.core.fetch('/2023-01/webhooks/{webhook_id}', 'get', metadata);
    };
    /**
     * Delete a single webhook from your account.
     *
     * Required authorization scope:  `Webhook`
     *
     *
     * @summary Delete a Webhook
     * @throws FetchError<400, types.WebhooksDeleteResponse400> failed to destroy webhook
     */
    SDK.prototype.webhooks_delete = function (metadata) {
        return this.core.fetch('/2023-01/webhooks/{webhook_id}', 'delete', metadata);
    };
    /**
     * Update a single webhook in your account.
     *
     * Required authorization scope:  `Webhook`
     *
     *
     * @summary Update a Webhook
     * @throws FetchError<422, types.WebhooksUpdateResponse422> failed validations
     */
    SDK.prototype.webhooks_update = function (body, metadata) {
        return this.core.fetch('/2023-01/webhooks/{webhook_id}', 'patch', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
