const { functions, db, stripe } = require("../configuration");
const { addData, updateData } = require("../firebase/addData");
const { getData } = require("../firebase/getData");

async function createStripeCheckout(data, type) {
  const user = await getData("customers", data.userId);

  if (!user) throw new Error("User not found");

  if (type === "single") {
    const product = await stripe.products.retrieve(data.productId);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: product.default_price,
          quantity: data.quantity,
        },
      ],
      mode: "payment",
      customer: user.stripeId,
      billing_address_collection: "required",
      success_url: data.base_url + `/success`,
      cancel_url: data.base_url + `/cancel`,
    });

    return { url: session.url };
  } else {
    const line_itemsPromises = await data.data.map(async (item) => {
      const product = await stripe.products.retrieve(item.product_id);
      return {
        price: product.default_price,
        quantity: item.quantity,
      };
    });
    const line_items = await Promise.all(line_itemsPromises);
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer: user.stripeId,
      billing_address_collection: "required",
      // ui_mode: "custom",
      // return_url: data.base_url + `/success`,
      success_url: data.base_url + `/success`,
      cancel_url: data.base_url + `/cancel`,
    });
    return { url: session.url };
  }
}

async function createPaymentIntent(currency, amount) {
  return await stripe.paymentIntents.create({
    currency: "vnd",
    amount: amount.price,
    automatic_payment_methods: {
      enabled: true,
    },
  });
}

module.exports = { createStripeCheckout, createPaymentIntent };
