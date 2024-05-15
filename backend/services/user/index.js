const { db, stripe } = require("../configuration");
const { ref, set } = require("firebase/database");
const { getData } = require("../firebase/getData");
const { updateData } = require("../firebase/addData");

async function addToCart(userId, productId, quantity) {
  const user = await getData("users", userId);
  const product = await stripe.products.retrieve(productId);

  if (!user) {
    throw new Error("User not found.");
  }

  const newItem = {
    name: product.name,
    product_id: productId,
    quantity: quantity,
    price: product.metadata.price,
    color: "",
    image: product.images[0],
  };
  const { result, error } = await updateData("users", userId, {
    cart: [...user.cart, newItem],
  });

  return { newItem, result, error };
}

async function updateCart(userId, productId, quantity) {
  const user = await getData("users", userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const cart = [
    ...user.cart.map((product) => {
      if (product.product_id === productId) {
        return { ...product, quantity: quantity };
      }
      return product;
    }),
  ];

  return await updateData("users", userId, {
    cart,
  });
}

async function deleteFromCart(userId, productId) {
  const user = await getData("users", userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return await updateData("users", userId, {
    cart: user.cart.filter((product) => product.product_id !== productId),
  });
}

async function deleteAllFromCart(userId) {
  const user = await getData("users", userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return await updateData("users", userId, { cart: [] });
}

module.exports = { addToCart, updateCart, deleteFromCart, deleteAllFromCart };
