import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type AccountShowResponse200 = FromSchema<typeof schemas.AccountShow.response['200']>;
export type AddressesCreateBodyParam = FromSchema<typeof schemas.AddressesCreate.body>;
export type AddressesCreateResponse201 = FromSchema<typeof schemas.AddressesCreate.response['201']>;
export type AddressesCreateResponse422 = FromSchema<typeof schemas.AddressesCreate.response['422']>;
export type AddressesDeleteMetadataParam = FromSchema<typeof schemas.AddressesDelete.metadata>;
export type AddressesDeleteResponse200 = FromSchema<typeof schemas.AddressesDelete.response['200']>;
export type AddressesDeleteResponse404 = FromSchema<typeof schemas.AddressesDelete.response['404']>;
export type AddressesIndexMetadataParam = FromSchema<typeof schemas.AddressesIndex.metadata>;
export type AddressesIndexResponse200 = FromSchema<typeof schemas.AddressesIndex.response['200']>;
export type AddressesUpdateBodyParam = FromSchema<typeof schemas.AddressesUpdate.body>;
export type AddressesUpdateMetadataParam = FromSchema<typeof schemas.AddressesUpdate.metadata>;
export type AddressesUpdateResponse200 = FromSchema<typeof schemas.AddressesUpdate.response['200']>;
export type AddressesUpdateResponse404 = FromSchema<typeof schemas.AddressesUpdate.response['404']>;
export type AddressesUpdateResponse422 = FromSchema<typeof schemas.AddressesUpdate.response['422']>;
export type AddressesValidationBodyParam = FromSchema<typeof schemas.AddressesValidation.body>;
export type AddressesValidationResponse200 = FromSchema<typeof schemas.AddressesValidation.response['200']>;
export type AnalyticsSaleChannelsIndexMetadataParam = FromSchema<typeof schemas.AnalyticsSaleChannelsIndex.metadata>;
export type AnalyticsSaleChannelsIndexResponse200 = FromSchema<typeof schemas.AnalyticsSaleChannelsIndex.response['200']>;
export type AnalyticsSaleChannelsIndexResponse400 = FromSchema<typeof schemas.AnalyticsSaleChannelsIndex.response['400']>;
export type AnalyticsShipmentShippedIndexMetadataParam = FromSchema<typeof schemas.AnalyticsShipmentShippedIndex.metadata>;
export type AnalyticsShipmentShippedIndexResponse200 = FromSchema<typeof schemas.AnalyticsShipmentShippedIndex.response['200']>;
export type AnalyticsShipmentShippedIndexResponse400 = FromSchema<typeof schemas.AnalyticsShipmentShippedIndex.response['400']>;
export type AnalyticsShipmentStatusIndexMetadataParam = FromSchema<typeof schemas.AnalyticsShipmentStatusIndex.metadata>;
export type AnalyticsShipmentStatusIndexResponse200 = FromSchema<typeof schemas.AnalyticsShipmentStatusIndex.response['200']>;
export type AnalyticsShipmentStatusIndexResponse400 = FromSchema<typeof schemas.AnalyticsShipmentStatusIndex.response['400']>;
export type AnalyticsShipmentsIndexMetadataParam = FromSchema<typeof schemas.AnalyticsShipmentsIndex.metadata>;
export type AnalyticsShipmentsIndexResponse200 = FromSchema<typeof schemas.AnalyticsShipmentsIndex.response['200']>;
export type AnalyticsShipmentsIndexResponse400 = FromSchema<typeof schemas.AnalyticsShipmentsIndex.response['400']>;
export type AnalyticsTopCouriersIndexMetadataParam = FromSchema<typeof schemas.AnalyticsTopCouriersIndex.metadata>;
export type AnalyticsTopCouriersIndexResponse200 = FromSchema<typeof schemas.AnalyticsTopCouriersIndex.response['200']>;
export type AnalyticsTopCouriersIndexResponse400 = FromSchema<typeof schemas.AnalyticsTopCouriersIndex.response['400']>;
export type AnalyticsTopShipmentsDestinationsIndexMetadataParam = FromSchema<typeof schemas.AnalyticsTopShipmentsDestinationsIndex.metadata>;
export type AnalyticsTopShipmentsDestinationsIndexResponse200 = FromSchema<typeof schemas.AnalyticsTopShipmentsDestinationsIndex.response['200']>;
export type AnalyticsTopShipmentsDestinationsIndexResponse400 = FromSchema<typeof schemas.AnalyticsTopShipmentsDestinationsIndex.response['400']>;
export type AssetActivateCreateMetadataParam = FromSchema<typeof schemas.AssetActivateCreate.metadata>;
export type AssetActivateCreateResponse200 = FromSchema<typeof schemas.AssetActivateCreate.response['200']>;
export type AssetDeactivateCreateMetadataParam = FromSchema<typeof schemas.AssetDeactivateCreate.metadata>;
export type AssetDeactivateCreateResponse200 = FromSchema<typeof schemas.AssetDeactivateCreate.response['200']>;
export type AssetsCreateBodyParam = FromSchema<typeof schemas.AssetsCreate.body>;
export type AssetsCreateResponse200 = FromSchema<typeof schemas.AssetsCreate.response['200']>;
export type AssetsCreateResponse400 = FromSchema<typeof schemas.AssetsCreate.response['400']>;
export type AssetsDeleteMetadataParam = FromSchema<typeof schemas.AssetsDelete.metadata>;
export type AssetsDeleteResponse200 = FromSchema<typeof schemas.AssetsDelete.response['200']>;
export type AssetsDeleteResponse404 = FromSchema<typeof schemas.AssetsDelete.response['404']>;
export type AssetsIndexMetadataParam = FromSchema<typeof schemas.AssetsIndex.metadata>;
export type AssetsIndexResponse200 = FromSchema<typeof schemas.AssetsIndex.response['200']>;
export type AssetsUpdateBodyParam = FromSchema<typeof schemas.AssetsUpdate.body>;
export type AssetsUpdateMetadataParam = FromSchema<typeof schemas.AssetsUpdate.metadata>;
export type AssetsUpdateResponse200 = FromSchema<typeof schemas.AssetsUpdate.response['200']>;
export type AssetsUpdateResponse404 = FromSchema<typeof schemas.AssetsUpdate.response['404']>;
export type BatchAddressesCreateBodyParam = FromSchema<typeof schemas.BatchAddressesCreate.body>;
export type BatchAddressesCreateResponse202 = FromSchema<typeof schemas.BatchAddressesCreate.response['202']>;
export type BatchAddressesCreateResponse400 = FromSchema<typeof schemas.BatchAddressesCreate.response['400']>;
export type BatchItemsIndexMetadataParam = FromSchema<typeof schemas.BatchItemsIndex.metadata>;
export type BatchItemsIndexResponse200 = FromSchema<typeof schemas.BatchItemsIndex.response['200']>;
export type BatchItemsIndexResponse404 = FromSchema<typeof schemas.BatchItemsIndex.response['404']>;
export type BatchShipmentsCreateBodyParam = FromSchema<typeof schemas.BatchShipmentsCreate.body>;
export type BatchShipmentsCreateResponse202 = FromSchema<typeof schemas.BatchShipmentsCreate.response['202']>;
export type BatchShipmentsCreateResponse400 = FromSchema<typeof schemas.BatchShipmentsCreate.response['400']>;
export type BatchesIndexMetadataParam = FromSchema<typeof schemas.BatchesIndex.metadata>;
export type BatchesIndexResponse200 = FromSchema<typeof schemas.BatchesIndex.response['200']>;
export type BatchesShowMetadataParam = FromSchema<typeof schemas.BatchesShow.metadata>;
export type BatchesShowResponse200 = FromSchema<typeof schemas.BatchesShow.response['200']>;
export type BatchesShowResponse404 = FromSchema<typeof schemas.BatchesShow.response['404']>;
export type BillingDocumentsDownloadMetadataParam = FromSchema<typeof schemas.BillingDocumentsDownload.metadata>;
export type BillingDocumentsDownloadResponse404 = FromSchema<typeof schemas.BillingDocumentsDownload.response['404']>;
export type BillingDocumentsIndexMetadataParam = FromSchema<typeof schemas.BillingDocumentsIndex.metadata>;
export type BillingDocumentsIndexResponse200 = FromSchema<typeof schemas.BillingDocumentsIndex.response['200']>;
export type BillingDocumentsIndexResponse422 = FromSchema<typeof schemas.BillingDocumentsIndex.response['422']>;
export type BillingDocumentsTransactionsIndexMetadataParam = FromSchema<typeof schemas.BillingDocumentsTransactionsIndex.metadata>;
export type BillingDocumentsTransactionsIndexResponse200 = FromSchema<typeof schemas.BillingDocumentsTransactionsIndex.response['200']>;
export type BoxesCreateBodyParam = FromSchema<typeof schemas.BoxesCreate.body>;
export type BoxesCreateResponse201 = FromSchema<typeof schemas.BoxesCreate.response['201']>;
export type BoxesCreateResponse422 = FromSchema<typeof schemas.BoxesCreate.response['422']>;
export type BoxesDeleteMetadataParam = FromSchema<typeof schemas.BoxesDelete.metadata>;
export type BoxesDeleteResponse200 = FromSchema<typeof schemas.BoxesDelete.response['200']>;
export type BoxesDeleteResponse404 = FromSchema<typeof schemas.BoxesDelete.response['404']>;
export type BoxesIndexMetadataParam = FromSchema<typeof schemas.BoxesIndex.metadata>;
export type BoxesIndexResponse200 = FromSchema<typeof schemas.BoxesIndex.response['200']>;
export type BoxesUpdateBodyParam = FromSchema<typeof schemas.BoxesUpdate.body>;
export type BoxesUpdateMetadataParam = FromSchema<typeof schemas.BoxesUpdate.metadata>;
export type BoxesUpdateResponse200 = FromSchema<typeof schemas.BoxesUpdate.response['200']>;
export type BoxesUpdateResponse404 = FromSchema<typeof schemas.BoxesUpdate.response['404']>;
export type CountriesIndexMetadataParam = FromSchema<typeof schemas.CountriesIndex.metadata>;
export type CountriesIndexResponse200 = FromSchema<typeof schemas.CountriesIndex.response['200']>;
export type CourierAccountsCouriersBulkUpdateBodyParam = FromSchema<typeof schemas.CourierAccountsCouriersBulkUpdate.body>;
export type CourierAccountsCouriersBulkUpdateMetadataParam = FromSchema<typeof schemas.CourierAccountsCouriersBulkUpdate.metadata>;
export type CourierAccountsCouriersBulkUpdateResponse200 = FromSchema<typeof schemas.CourierAccountsCouriersBulkUpdate.response['200']>;
export type CourierAccountsCouriersBulkUpdateResponse404 = FromSchema<typeof schemas.CourierAccountsCouriersBulkUpdate.response['404']>;
export type CourierAccountsCouriersBulkUpdateResponse422 = FromSchema<typeof schemas.CourierAccountsCouriersBulkUpdate.response['422']>;
export type CourierAccountsCouriersIndexMetadataParam = FromSchema<typeof schemas.CourierAccountsCouriersIndex.metadata>;
export type CourierAccountsCouriersIndexResponse200 = FromSchema<typeof schemas.CourierAccountsCouriersIndex.response['200']>;
export type CourierAccountsCreateBodyParam = FromSchema<typeof schemas.CourierAccountsCreate.body>;
export type CourierAccountsCreateResponse201 = FromSchema<typeof schemas.CourierAccountsCreate.response['201']>;
export type CourierAccountsCreateResponse202 = FromSchema<typeof schemas.CourierAccountsCreate.response['202']>;
export type CourierAccountsCreateResponse402 = FromSchema<typeof schemas.CourierAccountsCreate.response['402']>;
export type CourierAccountsCreateResponse422 = FromSchema<typeof schemas.CourierAccountsCreate.response['422']>;
export type CourierAccountsDeactivateMetadataParam = FromSchema<typeof schemas.CourierAccountsDeactivate.metadata>;
export type CourierAccountsDeactivateResponse200 = FromSchema<typeof schemas.CourierAccountsDeactivate.response['200']>;
export type CourierAccountsDeactivateResponse404 = FromSchema<typeof schemas.CourierAccountsDeactivate.response['404']>;
export type CourierAccountsDeactivateResponse422 = FromSchema<typeof schemas.CourierAccountsDeactivate.response['422']>;
export type CourierAccountsIndexMetadataParam = FromSchema<typeof schemas.CourierAccountsIndex.metadata>;
export type CourierAccountsIndexResponse200 = FromSchema<typeof schemas.CourierAccountsIndex.response['200']>;
export type CourierAccountsShowMetadataParam = FromSchema<typeof schemas.CourierAccountsShow.metadata>;
export type CourierAccountsShowResponse200 = FromSchema<typeof schemas.CourierAccountsShow.response['200']>;
export type CourierAccountsShowResponse404 = FromSchema<typeof schemas.CourierAccountsShow.response['404']>;
export type CourierAccountsUpdateBodyParam = FromSchema<typeof schemas.CourierAccountsUpdate.body>;
export type CourierAccountsUpdateMetadataParam = FromSchema<typeof schemas.CourierAccountsUpdate.metadata>;
export type CourierAccountsUpdateResponse200 = FromSchema<typeof schemas.CourierAccountsUpdate.response['200']>;
export type CourierAccountsUpdateResponse404 = FromSchema<typeof schemas.CourierAccountsUpdate.response['404']>;
export type CourierAccountsUpdateResponse422 = FromSchema<typeof schemas.CourierAccountsUpdate.response['422']>;
export type CourierEstimatedDeliveryDatesIndexMetadataParam = FromSchema<typeof schemas.CourierEstimatedDeliveryDatesIndex.metadata>;
export type CourierEstimatedDeliveryDatesIndexResponse200 = FromSchema<typeof schemas.CourierEstimatedDeliveryDatesIndex.response['200']>;
export type CourierEstimatedDeliveryDatesIndexResponse404 = FromSchema<typeof schemas.CourierEstimatedDeliveryDatesIndex.response['404']>;
export type CouriersIndexMetadataParam = FromSchema<typeof schemas.CouriersIndex.metadata>;
export type CouriersIndexResponse200 = FromSchema<typeof schemas.CouriersIndex.response['200']>;
export type CouriersPickupSlotsIndexMetadataParam = FromSchema<typeof schemas.CouriersPickupSlotsIndex.metadata>;
export type CouriersPickupSlotsIndexResponse200 = FromSchema<typeof schemas.CouriersPickupSlotsIndex.response['200']>;
export type CouriersPickupSlotsIndexResponse400 = FromSchema<typeof schemas.CouriersPickupSlotsIndex.response['400']>;
export type CouriersPickupSlotsIndexResponse404 = FromSchema<typeof schemas.CouriersPickupSlotsIndex.response['404']>;
export type CreditConfrim3DsCreateBodyParam = FromSchema<typeof schemas.CreditConfrim3DsCreate.body>;
export type CreditConfrim3DsCreateResponse201 = FromSchema<typeof schemas.CreditConfrim3DsCreate.response['201']>;
export type CreditConfrim3DsCreateResponse202 = FromSchema<typeof schemas.CreditConfrim3DsCreate.response['202']>;
export type CreditConfrim3DsCreateResponse422 = FromSchema<typeof schemas.CreditConfrim3DsCreate.response['422']>;
export type CreditRefundCreateBodyParam = FromSchema<typeof schemas.CreditRefundCreate.body>;
export type CreditRefundCreateResponse201 = FromSchema<typeof schemas.CreditRefundCreate.response['201']>;
export type CreditRefundCreateResponse422 = FromSchema<typeof schemas.CreditRefundCreate.response['422']>;
export type CreditsCreateBodyParam = FromSchema<typeof schemas.CreditsCreate.body>;
export type CreditsCreateResponse201 = FromSchema<typeof schemas.CreditsCreate.response['201']>;
export type CreditsCreateResponse202 = FromSchema<typeof schemas.CreditsCreate.response['202']>;
export type CreditsCreateResponse404 = FromSchema<typeof schemas.CreditsCreate.response['404']>;
export type CreditsShowResponse200 = FromSchema<typeof schemas.CreditsShow.response['200']>;
export type EfulfillmentTrackingUpdateBodyParam = FromSchema<typeof schemas.EfulfillmentTrackingUpdate.body>;
export type EfulfillmentTrackingUpdateResponse201 = FromSchema<typeof schemas.EfulfillmentTrackingUpdate.response['201']>;
export type EfulfillmentTrackingUpdateResponse404 = FromSchema<typeof schemas.EfulfillmentTrackingUpdate.response['404']>;
export type EfulfillmentTrackingUpdateResponse422 = FromSchema<typeof schemas.EfulfillmentTrackingUpdate.response['422']>;
export type EfulfillmentWarehouseStateUpdateBodyParam = FromSchema<typeof schemas.EfulfillmentWarehouseStateUpdate.body>;
export type EfulfillmentWarehouseStateUpdateResponse200 = FromSchema<typeof schemas.EfulfillmentWarehouseStateUpdate.response['200']>;
export type EfulfillmentWarehouseStateUpdateResponse202 = FromSchema<typeof schemas.EfulfillmentWarehouseStateUpdate.response['202']>;
export type EfulfillmentWarehouseStateUpdateResponse422 = FromSchema<typeof schemas.EfulfillmentWarehouseStateUpdate.response['422']>;
export type HsCodeIndexMetadataParam = FromSchema<typeof schemas.HsCodeIndex.metadata>;
export type HsCodeIndexResponse200 = FromSchema<typeof schemas.HsCodeIndex.response['200']>;
export type ItemCategoriesIndexMetadataParam = FromSchema<typeof schemas.ItemCategoriesIndex.metadata>;
export type ItemCategoriesIndexResponse200 = FromSchema<typeof schemas.ItemCategoriesIndex.response['200']>;
export type LabelsCreateBodyParam = FromSchema<typeof schemas.LabelsCreate.body>;
export type LabelsCreateResponse201 = FromSchema<typeof schemas.LabelsCreate.response['201']>;
export type LabelsCreateResponse402 = FromSchema<typeof schemas.LabelsCreate.response['402']>;
export type LabelsCreateResponse422 = FromSchema<typeof schemas.LabelsCreate.response['422']>;
export type LocationsUspsIndexMetadataParam = FromSchema<typeof schemas.LocationsUspsIndex.metadata>;
export type LocationsUspsIndexResponse200 = FromSchema<typeof schemas.LocationsUspsIndex.response['200']>;
export type LocationsUspsIndexResponse422 = FromSchema<typeof schemas.LocationsUspsIndex.response['422']>;
export type LocationsUspsIndexResponse500 = FromSchema<typeof schemas.LocationsUspsIndex.response['500']>;
export type ManifestsCreateBodyParam = FromSchema<typeof schemas.ManifestsCreate.body>;
export type ManifestsCreateResponse201 = FromSchema<typeof schemas.ManifestsCreate.response['201']>;
export type ManifestsCreateResponse404 = FromSchema<typeof schemas.ManifestsCreate.response['404']>;
export type ManifestsIndexMetadataParam = FromSchema<typeof schemas.ManifestsIndex.metadata>;
export type ManifestsIndexResponse200 = FromSchema<typeof schemas.ManifestsIndex.response['200']>;
export type ManifestsShowMetadataParam = FromSchema<typeof schemas.ManifestsShow.metadata>;
export type ManifestsShowResponse200 = FromSchema<typeof schemas.ManifestsShow.response['200']>;
export type ManifestsShowResponse404 = FromSchema<typeof schemas.ManifestsShow.response['404']>;
export type PaymentSourcesConfrim3DsCreateBodyParam = FromSchema<typeof schemas.PaymentSourcesConfrim3DsCreate.body>;
export type PaymentSourcesConfrim3DsCreateResponse201 = FromSchema<typeof schemas.PaymentSourcesConfrim3DsCreate.response['201']>;
export type PaymentSourcesConfrim3DsCreateResponse202 = FromSchema<typeof schemas.PaymentSourcesConfrim3DsCreate.response['202']>;
export type PaymentSourcesConfrim3DsCreateResponse422 = FromSchema<typeof schemas.PaymentSourcesConfrim3DsCreate.response['422']>;
export type PaymentSourcesCreateBodyParam = FromSchema<typeof schemas.PaymentSourcesCreate.body>;
export type PaymentSourcesCreateResponse201 = FromSchema<typeof schemas.PaymentSourcesCreate.response['201']>;
export type PaymentSourcesCreateResponse202 = FromSchema<typeof schemas.PaymentSourcesCreate.response['202']>;
export type PaymentSourcesCreateResponse422 = FromSchema<typeof schemas.PaymentSourcesCreate.response['422']>;
export type PaymentSourcesDeleteMetadataParam = FromSchema<typeof schemas.PaymentSourcesDelete.metadata>;
export type PaymentSourcesDeleteResponse200 = FromSchema<typeof schemas.PaymentSourcesDelete.response['200']>;
export type PaymentSourcesDeleteResponse422 = FromSchema<typeof schemas.PaymentSourcesDelete.response['422']>;
export type PaymentSourcesIndexMetadataParam = FromSchema<typeof schemas.PaymentSourcesIndex.metadata>;
export type PaymentSourcesIndexResponse200 = FromSchema<typeof schemas.PaymentSourcesIndex.response['200']>;
export type PaymentSourcesUpdateBodyParam = FromSchema<typeof schemas.PaymentSourcesUpdate.body>;
export type PaymentSourcesUpdateMetadataParam = FromSchema<typeof schemas.PaymentSourcesUpdate.metadata>;
export type PaymentSourcesUpdateResponse200 = FromSchema<typeof schemas.PaymentSourcesUpdate.response['200']>;
export type PaymentSourcesUpdateResponse404 = FromSchema<typeof schemas.PaymentSourcesUpdate.response['404']>;
export type PickupsCancelMetadataParam = FromSchema<typeof schemas.PickupsCancel.metadata>;
export type PickupsCancelResponse200 = FromSchema<typeof schemas.PickupsCancel.response['200']>;
export type PickupsCancelResponse404 = FromSchema<typeof schemas.PickupsCancel.response['404']>;
export type PickupsCancelResponse422 = FromSchema<typeof schemas.PickupsCancel.response['422']>;
export type PickupsCreateBodyParam = FromSchema<typeof schemas.PickupsCreate.body>;
export type PickupsCreateResponse201 = FromSchema<typeof schemas.PickupsCreate.response['201']>;
export type PickupsCreateResponse422 = FromSchema<typeof schemas.PickupsCreate.response['422']>;
export type PickupsIndexMetadataParam = FromSchema<typeof schemas.PickupsIndex.metadata>;
export type PickupsIndexResponse200 = FromSchema<typeof schemas.PickupsIndex.response['200']>;
export type PickupsShipmentsIndexMetadataParam = FromSchema<typeof schemas.PickupsShipmentsIndex.metadata>;
export type PickupsShipmentsIndexResponse200 = FromSchema<typeof schemas.PickupsShipmentsIndex.response['200']>;
export type PickupsShowMetadataParam = FromSchema<typeof schemas.PickupsShow.metadata>;
export type PickupsShowResponse200 = FromSchema<typeof schemas.PickupsShow.response['200']>;
export type PickupsShowResponse404 = FromSchema<typeof schemas.PickupsShow.response['404']>;
export type ProductsCreateBodyParam = FromSchema<typeof schemas.ProductsCreate.body>;
export type ProductsCreateResponse201 = FromSchema<typeof schemas.ProductsCreate.response['201']>;
export type ProductsCreateResponse422 = FromSchema<typeof schemas.ProductsCreate.response['422']>;
export type ProductsDeleteMetadataParam = FromSchema<typeof schemas.ProductsDelete.metadata>;
export type ProductsDeleteResponse200 = FromSchema<typeof schemas.ProductsDelete.response['200']>;
export type ProductsDeleteResponse404 = FromSchema<typeof schemas.ProductsDelete.response['404']>;
export type ProductsIndexMetadataParam = FromSchema<typeof schemas.ProductsIndex.metadata>;
export type ProductsIndexResponse200 = FromSchema<typeof schemas.ProductsIndex.response['200']>;
export type ProductsUpdateBodyParam = FromSchema<typeof schemas.ProductsUpdate.body>;
export type ProductsUpdateMetadataParam = FromSchema<typeof schemas.ProductsUpdate.metadata>;
export type ProductsUpdateResponse200 = FromSchema<typeof schemas.ProductsUpdate.response['200']>;
export type ProductsUpdateResponse404 = FromSchema<typeof schemas.ProductsUpdate.response['404']>;
export type ProductsUpdateResponse422 = FromSchema<typeof schemas.ProductsUpdate.response['422']>;
export type RatesRequestBodyParam = FromSchema<typeof schemas.RatesRequest.body>;
export type RatesRequestResponse200 = FromSchema<typeof schemas.RatesRequest.response['200']>;
export type RatesRequestResponse402 = FromSchema<typeof schemas.RatesRequest.response['402']>;
export type RatesRequestResponse422 = FromSchema<typeof schemas.RatesRequest.response['422']>;
export type ReturnShipmentsCreateBodyParam = FromSchema<typeof schemas.ReturnShipmentsCreate.body>;
export type ReturnShipmentsCreateMetadataParam = FromSchema<typeof schemas.ReturnShipmentsCreate.metadata>;
export type ReturnShipmentsCreateResponse201 = FromSchema<typeof schemas.ReturnShipmentsCreate.response['201']>;
export type ReturnShipmentsCreateResponse404 = FromSchema<typeof schemas.ReturnShipmentsCreate.response['404']>;
export type SettingsIndexResponse200 = FromSchema<typeof schemas.SettingsIndex.response['200']>;
export type SettingsUpdateBodyParam = FromSchema<typeof schemas.SettingsUpdate.body>;
export type SettingsUpdateResponse200 = FromSchema<typeof schemas.SettingsUpdate.response['200']>;
export type ShipmentUnavailableCouriersIndexMetadataParam = FromSchema<typeof schemas.ShipmentUnavailableCouriersIndex.metadata>;
export type ShipmentUnavailableCouriersIndexResponse200 = FromSchema<typeof schemas.ShipmentUnavailableCouriersIndex.response['200']>;
export type ShipmentUnavailableCouriersIndexResponse404 = FromSchema<typeof schemas.ShipmentUnavailableCouriersIndex.response['404']>;
export type ShipmentsCancelMetadataParam = FromSchema<typeof schemas.ShipmentsCancel.metadata>;
export type ShipmentsCancelResponse200 = FromSchema<typeof schemas.ShipmentsCancel.response['200']>;
export type ShipmentsCancelResponse404 = FromSchema<typeof schemas.ShipmentsCancel.response['404']>;
export type ShipmentsCancelResponse422 = FromSchema<typeof schemas.ShipmentsCancel.response['422']>;
export type ShipmentsCreateBodyParam = FromSchema<typeof schemas.ShipmentsCreate.body>;
export type ShipmentsCreateResponse201 = FromSchema<typeof schemas.ShipmentsCreate.response['201']>;
export type ShipmentsCreateResponse202 = FromSchema<typeof schemas.ShipmentsCreate.response['202']>;
export type ShipmentsCreateResponse402 = FromSchema<typeof schemas.ShipmentsCreate.response['402']>;
export type ShipmentsCreateResponse422 = FromSchema<typeof schemas.ShipmentsCreate.response['422']>;
export type ShipmentsDeleteMetadataParam = FromSchema<typeof schemas.ShipmentsDelete.metadata>;
export type ShipmentsDeleteResponse200 = FromSchema<typeof schemas.ShipmentsDelete.response['200']>;
export type ShipmentsDeleteResponse422 = FromSchema<typeof schemas.ShipmentsDelete.response['422']>;
export type ShipmentsDocumentsIndexMetadataParam = FromSchema<typeof schemas.ShipmentsDocumentsIndex.metadata>;
export type ShipmentsDocumentsIndexResponse200 = FromSchema<typeof schemas.ShipmentsDocumentsIndex.response['200']>;
export type ShipmentsDocumentsIndexResponse400 = FromSchema<typeof schemas.ShipmentsDocumentsIndex.response['400']>;
export type ShipmentsDocumentsIndexResponse404 = FromSchema<typeof schemas.ShipmentsDocumentsIndex.response['404']>;
export type ShipmentsDocumentsIndexResponse422 = FromSchema<typeof schemas.ShipmentsDocumentsIndex.response['422']>;
export type ShipmentsIndexMetadataParam = FromSchema<typeof schemas.ShipmentsIndex.metadata>;
export type ShipmentsIndexResponse200 = FromSchema<typeof schemas.ShipmentsIndex.response['200']>;
export type ShipmentsIndexResponse422 = FromSchema<typeof schemas.ShipmentsIndex.response['422']>;
export type ShipmentsShowMetadataParam = FromSchema<typeof schemas.ShipmentsShow.metadata>;
export type ShipmentsShowResponse200 = FromSchema<typeof schemas.ShipmentsShow.response['200']>;
export type ShipmentsShowResponse404 = FromSchema<typeof schemas.ShipmentsShow.response['404']>;
export type ShipmentsTrackingsIndexMetadataParam = FromSchema<typeof schemas.ShipmentsTrackingsIndex.metadata>;
export type ShipmentsTrackingsIndexResponse200 = FromSchema<typeof schemas.ShipmentsTrackingsIndex.response['200']>;
export type ShipmentsTransactionRecordsIndexMetadataParam = FromSchema<typeof schemas.ShipmentsTransactionRecordsIndex.metadata>;
export type ShipmentsTransactionRecordsIndexResponse200 = FromSchema<typeof schemas.ShipmentsTransactionRecordsIndex.response['200']>;
export type ShipmentsTransactionRecordsIndexResponse404 = FromSchema<typeof schemas.ShipmentsTransactionRecordsIndex.response['404']>;
export type ShipmentsUpdateBodyParam = FromSchema<typeof schemas.ShipmentsUpdate.body>;
export type ShipmentsUpdateMetadataParam = FromSchema<typeof schemas.ShipmentsUpdate.metadata>;
export type ShipmentsUpdateResponse200 = FromSchema<typeof schemas.ShipmentsUpdate.response['200']>;
export type ShipmentsUpdateResponse402 = FromSchema<typeof schemas.ShipmentsUpdate.response['402']>;
export type ShipmentsUpdateResponse422 = FromSchema<typeof schemas.ShipmentsUpdate.response['422']>;
export type ShippingRuleActionCreateBodyParam = FromSchema<typeof schemas.ShippingRuleActionCreate.body>;
export type ShippingRuleActionCreateMetadataParam = FromSchema<typeof schemas.ShippingRuleActionCreate.metadata>;
export type ShippingRuleActionCreateResponse201 = FromSchema<typeof schemas.ShippingRuleActionCreate.response['201']>;
export type ShippingRuleActionCreateResponse422 = FromSchema<typeof schemas.ShippingRuleActionCreate.response['422']>;
export type ShippingRuleActionDeleteMetadataParam = FromSchema<typeof schemas.ShippingRuleActionDelete.metadata>;
export type ShippingRuleActionDeleteResponse200 = FromSchema<typeof schemas.ShippingRuleActionDelete.response['200']>;
export type ShippingRuleActionDeleteResponse403 = FromSchema<typeof schemas.ShippingRuleActionDelete.response['403']>;
export type ShippingRuleActionDeleteResponse404 = FromSchema<typeof schemas.ShippingRuleActionDelete.response['404']>;
export type ShippingRuleActionIndexMetadataParam = FromSchema<typeof schemas.ShippingRuleActionIndex.metadata>;
export type ShippingRuleActionIndexResponse200 = FromSchema<typeof schemas.ShippingRuleActionIndex.response['200']>;
export type ShippingRuleActionUpdateBodyParam = FromSchema<typeof schemas.ShippingRuleActionUpdate.body>;
export type ShippingRuleActionUpdateMetadataParam = FromSchema<typeof schemas.ShippingRuleActionUpdate.metadata>;
export type ShippingRuleActionUpdateResponse200 = FromSchema<typeof schemas.ShippingRuleActionUpdate.response['200']>;
export type ShippingRuleActionUpdateResponse403 = FromSchema<typeof schemas.ShippingRuleActionUpdate.response['403']>;
export type ShippingRuleActionUpdateResponse404 = FromSchema<typeof schemas.ShippingRuleActionUpdate.response['404']>;
export type ShippingRuleActionUpdateResponse422 = FromSchema<typeof schemas.ShippingRuleActionUpdate.response['422']>;
export type ShippingRuleActivateMetadataParam = FromSchema<typeof schemas.ShippingRuleActivate.metadata>;
export type ShippingRuleActivateResponse200 = FromSchema<typeof schemas.ShippingRuleActivate.response['200']>;
export type ShippingRuleActivateResponse403 = FromSchema<typeof schemas.ShippingRuleActivate.response['403']>;
export type ShippingRuleActivateResponse404 = FromSchema<typeof schemas.ShippingRuleActivate.response['404']>;
export type ShippingRuleConditionCreateBodyParam = FromSchema<typeof schemas.ShippingRuleConditionCreate.body>;
export type ShippingRuleConditionCreateMetadataParam = FromSchema<typeof schemas.ShippingRuleConditionCreate.metadata>;
export type ShippingRuleConditionCreateResponse201 = FromSchema<typeof schemas.ShippingRuleConditionCreate.response['201']>;
export type ShippingRuleConditionCreateResponse422 = FromSchema<typeof schemas.ShippingRuleConditionCreate.response['422']>;
export type ShippingRuleConditionDeleteMetadataParam = FromSchema<typeof schemas.ShippingRuleConditionDelete.metadata>;
export type ShippingRuleConditionDeleteResponse200 = FromSchema<typeof schemas.ShippingRuleConditionDelete.response['200']>;
export type ShippingRuleConditionDeleteResponse403 = FromSchema<typeof schemas.ShippingRuleConditionDelete.response['403']>;
export type ShippingRuleConditionIndexMetadataParam = FromSchema<typeof schemas.ShippingRuleConditionIndex.metadata>;
export type ShippingRuleConditionIndexResponse200 = FromSchema<typeof schemas.ShippingRuleConditionIndex.response['200']>;
export type ShippingRuleConditionUpdateBodyParam = FromSchema<typeof schemas.ShippingRuleConditionUpdate.body>;
export type ShippingRuleConditionUpdateMetadataParam = FromSchema<typeof schemas.ShippingRuleConditionUpdate.metadata>;
export type ShippingRuleConditionUpdateResponse200 = FromSchema<typeof schemas.ShippingRuleConditionUpdate.response['200']>;
export type ShippingRuleConditionUpdateResponse403 = FromSchema<typeof schemas.ShippingRuleConditionUpdate.response['403']>;
export type ShippingRuleConditionUpdateResponse404 = FromSchema<typeof schemas.ShippingRuleConditionUpdate.response['404']>;
export type ShippingRuleConditionUpdateResponse422 = FromSchema<typeof schemas.ShippingRuleConditionUpdate.response['422']>;
export type ShippingRuleDeactivateMetadataParam = FromSchema<typeof schemas.ShippingRuleDeactivate.metadata>;
export type ShippingRuleDeactivateResponse200 = FromSchema<typeof schemas.ShippingRuleDeactivate.response['200']>;
export type ShippingRuleDeactivateResponse403 = FromSchema<typeof schemas.ShippingRuleDeactivate.response['403']>;
export type ShippingRulePlatformsIndexMetadataParam = FromSchema<typeof schemas.ShippingRulePlatformsIndex.metadata>;
export type ShippingRulePlatformsIndexResponse200 = FromSchema<typeof schemas.ShippingRulePlatformsIndex.response['200']>;
export type ShippingRulesCreateBodyParam = FromSchema<typeof schemas.ShippingRulesCreate.body>;
export type ShippingRulesCreateResponse201 = FromSchema<typeof schemas.ShippingRulesCreate.response['201']>;
export type ShippingRulesCreateResponse422 = FromSchema<typeof schemas.ShippingRulesCreate.response['422']>;
export type ShippingRulesDeleteMetadataParam = FromSchema<typeof schemas.ShippingRulesDelete.metadata>;
export type ShippingRulesDeleteResponse200 = FromSchema<typeof schemas.ShippingRulesDelete.response['200']>;
export type ShippingRulesDeleteResponse403 = FromSchema<typeof schemas.ShippingRulesDelete.response['403']>;
export type ShippingRulesIndexResponse200 = FromSchema<typeof schemas.ShippingRulesIndex.response['200']>;
export type ShippingRulesShowMetadataParam = FromSchema<typeof schemas.ShippingRulesShow.metadata>;
export type ShippingRulesShowResponse200 = FromSchema<typeof schemas.ShippingRulesShow.response['200']>;
export type ShippingRulesShowResponse403 = FromSchema<typeof schemas.ShippingRulesShow.response['403']>;
export type ShippingRulesShowResponse404 = FromSchema<typeof schemas.ShippingRulesShow.response['404']>;
export type ShippingRulesUpdateBodyParam = FromSchema<typeof schemas.ShippingRulesUpdate.body>;
export type ShippingRulesUpdateMetadataParam = FromSchema<typeof schemas.ShippingRulesUpdate.metadata>;
export type ShippingRulesUpdateResponse200 = FromSchema<typeof schemas.ShippingRulesUpdate.response['200']>;
export type ShippingRulesUpdateResponse403 = FromSchema<typeof schemas.ShippingRulesUpdate.response['403']>;
export type StatesIndexMetadataParam = FromSchema<typeof schemas.StatesIndex.metadata>;
export type StatesIndexResponse200 = FromSchema<typeof schemas.StatesIndex.response['200']>;
export type StoresIndexMetadataParam = FromSchema<typeof schemas.StoresIndex.metadata>;
export type StoresIndexResponse200 = FromSchema<typeof schemas.StoresIndex.response['200']>;
export type StripesShowResponse200 = FromSchema<typeof schemas.StripesShow.response['200']>;
export type TagsCreateBodyParam = FromSchema<typeof schemas.TagsCreate.body>;
export type TagsCreateMetadataParam = FromSchema<typeof schemas.TagsCreate.metadata>;
export type TagsCreateResponse201 = FromSchema<typeof schemas.TagsCreate.response['201']>;
export type TagsCreateResponse422 = FromSchema<typeof schemas.TagsCreate.response['422']>;
export type TagsIndexMetadataParam = FromSchema<typeof schemas.TagsIndex.metadata>;
export type TagsIndexResponse200 = FromSchema<typeof schemas.TagsIndex.response['200']>;
export type TaxesAndDutiesCalculateBodyParam = FromSchema<typeof schemas.TaxesAndDutiesCalculate.body>;
export type TaxesAndDutiesCalculateResponse200 = FromSchema<typeof schemas.TaxesAndDutiesCalculate.response['200']>;
export type TaxesAndDutiesCalculateResponse402 = FromSchema<typeof schemas.TaxesAndDutiesCalculate.response['402']>;
export type TaxesAndDutiesCalculateResponse422 = FromSchema<typeof schemas.TaxesAndDutiesCalculate.response['422']>;
export type TrackingsCreateBodyParam = FromSchema<typeof schemas.TrackingsCreate.body>;
export type TrackingsCreateResponse201 = FromSchema<typeof schemas.TrackingsCreate.response['201']>;
export type TrackingsCreateResponse422 = FromSchema<typeof schemas.TrackingsCreate.response['422']>;
export type TrackingsDeleteMetadataParam = FromSchema<typeof schemas.TrackingsDelete.metadata>;
export type TrackingsDeleteResponse200 = FromSchema<typeof schemas.TrackingsDelete.response['200']>;
export type TrackingsDeleteResponse404 = FromSchema<typeof schemas.TrackingsDelete.response['404']>;
export type TrackingsIndexMetadataParam = FromSchema<typeof schemas.TrackingsIndex.metadata>;
export type TrackingsIndexResponse200 = FromSchema<typeof schemas.TrackingsIndex.response['200']>;
export type TrackingsListSupportedCouriersMetadataParam = FromSchema<typeof schemas.TrackingsListSupportedCouriers.metadata>;
export type TrackingsListSupportedCouriersResponse200 = FromSchema<typeof schemas.TrackingsListSupportedCouriers.response['200']>;
export type TrackingsShowMetadataParam = FromSchema<typeof schemas.TrackingsShow.metadata>;
export type TrackingsShowResponse200 = FromSchema<typeof schemas.TrackingsShow.response['200']>;
export type TrackingsShowResponse404 = FromSchema<typeof schemas.TrackingsShow.response['404']>;
export type TransactionsIndexMetadataParam = FromSchema<typeof schemas.TransactionsIndex.metadata>;
export type TransactionsIndexResponse200 = FromSchema<typeof schemas.TransactionsIndex.response['200']>;
export type TransactionsIndexResponse422 = FromSchema<typeof schemas.TransactionsIndex.response['422']>;
export type WebhooksActivateMetadataParam = FromSchema<typeof schemas.WebhooksActivate.metadata>;
export type WebhooksActivateResponse200 = FromSchema<typeof schemas.WebhooksActivate.response['200']>;
export type WebhooksActivateResponse400 = FromSchema<typeof schemas.WebhooksActivate.response['400']>;
export type WebhooksCreateBodyParam = FromSchema<typeof schemas.WebhooksCreate.body>;
export type WebhooksCreateResponse201 = FromSchema<typeof schemas.WebhooksCreate.response['201']>;
export type WebhooksCreateResponse422 = FromSchema<typeof schemas.WebhooksCreate.response['422']>;
export type WebhooksDeactivateMetadataParam = FromSchema<typeof schemas.WebhooksDeactivate.metadata>;
export type WebhooksDeactivateResponse200 = FromSchema<typeof schemas.WebhooksDeactivate.response['200']>;
export type WebhooksDeactivateResponse400 = FromSchema<typeof schemas.WebhooksDeactivate.response['400']>;
export type WebhooksDeleteMetadataParam = FromSchema<typeof schemas.WebhooksDelete.metadata>;
export type WebhooksDeleteResponse200 = FromSchema<typeof schemas.WebhooksDelete.response['200']>;
export type WebhooksDeleteResponse400 = FromSchema<typeof schemas.WebhooksDelete.response['400']>;
export type WebhooksIndexMetadataParam = FromSchema<typeof schemas.WebhooksIndex.metadata>;
export type WebhooksIndexResponse200 = FromSchema<typeof schemas.WebhooksIndex.response['200']>;
export type WebhooksShowMetadataParam = FromSchema<typeof schemas.WebhooksShow.metadata>;
export type WebhooksShowResponse200 = FromSchema<typeof schemas.WebhooksShow.response['200']>;
export type WebhooksTestBodyParam = FromSchema<typeof schemas.WebhooksTest.body>;
export type WebhooksTestMetadataParam = FromSchema<typeof schemas.WebhooksTest.metadata>;
export type WebhooksTestResponse200 = FromSchema<typeof schemas.WebhooksTest.response['200']>;
export type WebhooksTestResponse400 = FromSchema<typeof schemas.WebhooksTest.response['400']>;
export type WebhooksTestResponse422 = FromSchema<typeof schemas.WebhooksTest.response['422']>;
export type WebhooksTestResponse429 = FromSchema<typeof schemas.WebhooksTest.response['429']>;
export type WebhooksUpdateBodyParam = FromSchema<typeof schemas.WebhooksUpdate.body>;
export type WebhooksUpdateMetadataParam = FromSchema<typeof schemas.WebhooksUpdate.metadata>;
export type WebhooksUpdateResponse200 = FromSchema<typeof schemas.WebhooksUpdate.response['200']>;
export type WebhooksUpdateResponse422 = FromSchema<typeof schemas.WebhooksUpdate.response['422']>;
