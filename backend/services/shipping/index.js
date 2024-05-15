const { getDownloadURL } = require("firebase/storage");
const { ref, uploadBytesResumable } = require("firebase/storage");
const { db, auth, storage, stripe } = require("../configuration");
const { addData, createData } = require("../firebase/addData");
const getData = require("../firebase/getData");
const { default: axios } = require("axios");
const sdk = require("@api/easyship");

// sdk.auth("prod_bJrB1bB+tHybxW/966EoGfZVXtvKbYmLEHPlFxHuL6E=");
sdk.auth("sand_MmlsMd5/IUN4sYqsK3IdLbzFFlC5gXAS+DfMWArYpCk=");

// SHIPMENTS
async function createShipment(data) {
  console.log(data);
  return await sdk
    .shipments_create({
      origin_address: data.origin_address,
      destination_address: data.destination_address,
      parcels: data.parcels,
      regulatory_identifiers: {
        eori: "DE 123456789 12345",
        ioss: "IM1234567890",
        vat_number: "EU1234567890",
      },
      buyer_regulatory_identifiers: {
        ein: "12-3456789",
        vat_number: "EU1234567890",
      },
      incoterms: "DDU",
      insurance: { is_insured: false },
      order_data: {
        buyer_selected_courier_name: "test_courier",
        platform_name: "test plat_form",
        platform_order_number: "250587",
        order_created_at: "2024-01-31T18:00:00Z",
      },
      courier_selection: {
        apply_shipping_rules: false,
        selected_courier_id: "c3e97b11-2842-44f1-84d1-afaa6b3f0a7c",
        list_unavailable_couriers: false,
        allow_courier_fallback: false,
      },
      shipping_settings: {
        units: { weight: "kg", dimensions: "cm" },
        buy_label: true,
        buy_label_synchronous: true,
        printing_options: {
          format: "png",
          label: "4x6",
          commercial_invoice: "A4",
          packing_slip: "4x6",
        },
      },
      metadata: {
        order_id: "250587",
      },
    })
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    });
}

async function getAllShipments() {
  return await sdk
    .shipments_index()
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    });
}

module.exports = {
  createShipment,
  getAllShipments,
};
