import * as type from "@/constants/constants";

export const clearProfile = () => ({
  type: type.CLEAR_PROFILE,
});

export const setProfile = (user) => ({
  type: type.SET_PROFILE,
  payload: user,
});

export const updateEmail = (password, newEmail) => ({
  type: type.UPDATE_EMAIL,
  payload: {
    password,
    newEmail,
  },
});

export const updateProfile = (newProfile) => ({
  type: type.UPDATE_PROFILE,
  payload: newProfile,
});

export const updateProfileSuccess = (updates) => ({
  type: type.UPDATE_PROFILE_SUCCESS,
  payload: updates,
});

export const makePayment = (payment) => ({
  type: type.MAKE_PAYMENT,
  payload: payment,
});

export const addToCart = (item) => ({
  type: type.ADD_TO_CART,
  payload: item,
});

export const setQuantity = (product_id, quantity) => ({
  type: type.SET_QUANTITY,
  payload: { product_id, quantity },
});

export const removeFromCart = (item) => ({
  type: type.REMOVE_FROM_CART,
  payload: item,
});

export const removeCartAll = () => ({
  type: type.REMOVE_CART_ALL,
});
