import axios from "axios";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db, storage, analytics } from "./firebase";
import { getCheckoutUrl, getPortalUrl } from "./stripePayment";
import { readFile, encodeImage } from "@/utils/utils";
import { logEvent } from "firebase/analytics";

class API {
  createAccount = async (form) => {
    const userId = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    )
      .then((userCredential) => userCredential._tokenResponse.localId)
      .catch((error) => {
        const newError = new Error(error);
        newError.code = error.code;
        newError.message = error.message;
        throw newError;
      });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    await axios
      .post("http://localhost:4000/signup", { ...form, userId }, config)
      .catch((e) => console.log(e));
  };

  signIn = (form) =>
    signInWithEmailAndPassword(auth, form.email, form.password);

  // signInWithGoogle = () =>
  //   this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  // signInWithFacebook = () =>
  //   this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  // signInWithGithub = () =>
  //   this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  signOut = () => auth.signOut();

  // passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // addUser = (id, user) => this.db.collection("users").doc(id).set(user);

  getUser = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    return await axios
      .get(
        `http://localhost:4000/user/${id}`,
        { params: { email: id } },
        config
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));
  };

  getCurrentUser = () => auth.currentUser;

  updateUserData = async (updates, id = auth.currentUser.uid) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updates);
  };
  // updateMyProfile = (id, updates) => {
  //   updateProfile(auth.currentUser, updates)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // changePassword = (currentPassword, newPassword) =>
  //   new Promise((resolve, reject) => {
  //     this.reauthenticate(currentPassword)
  //       .then(() => {
  //         const user = this.auth.currentUser;
  //         user
  //           .updatePassword(newPassword)
  //           .then(() => {
  //             resolve("Password updated successfully!");
  //           })
  //           .catch((error) => reject(error));
  //       })
  //       .catch((error) => reject(error));
  //   });

  // reauthenticate = (currentPassword) => {
  //   const user = this.auth.currentUser;
  //   const cred = app.auth.EmailAuthProvider.credential(
  //     user.email,
  //     currentPassword
  //   );

  //   return user.reauthenticateWithCredential(cred);
  // };

  // updateEmail = (currentPassword, newEmail) =>
  //   new Promise((resolve, reject) => {
  //     this.reauthenticate(currentPassword)
  //       .then(() => {
  //         const user = this.auth.currentUser;
  //         user
  //           .updateEmail(newEmail)
  //           .then(() => {
  //             resolve("Email Successfully updated");
  //           })
  //           .catch((error) => reject(error));
  //       })
  //       .catch((error) => reject(error));
  //   });

  // updateProfile = (id, updates) =>
  //   this.db.collection("users").doc(id).update(updates);

  // onAuthStateChanged = () =>
  //   new Promise((resolve, reject) => {
  //     this.auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         resolve(user);
  //       } else {
  //         reject(new Error("Auth State Changed failed"));
  //       }
  //     });
  //   });

  // saveBasketItems = (items, userId) =>
  //   this.db.collection("users").doc(userId).update({ basket: items });

  // setAuthPersistence = () =>
  //   this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // PRODUCT
  // uploadImage = async (file, quantity) => {
  //   if (quantity === "single") {
  //     const dateTime = Date.now();
  //     const fileName = `images/${dateTime}`;
  //     const storageRef = ref(storage, fileName);
  //     const metadata = {
  //       contentType: file.type,
  //     };
  //     await uploadBytesResumable(storageRef, file.buffer, metadata);
  //     return fileName;
  //   }

  //   if (quantity === "multiple") {
  //     for (let i = 0; i < file.images.length; i++) {
  //       const dateTime = Date.now();
  //       const fileName = `images/${dateTime}`;
  //       const storageRef = ref(storage, fileName);
  //       const metadata = {
  //         contentType: file.images[i].mimetype,
  //       };

  //       const saveImage = await Image.create({ imageUrl: fileName });
  //       file.item.imageId.push({ _id: saveImage._id });
  //       await file.item.save();

  //       await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
  //     }
  //   }
  // };

  loadImage = async (url) => {
    return getDownloadURL(ref(storage, url))
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  uploadImage = async (file) => {
    /** @type {any} */
    const metadata = {
      contentType: "image/png",
    };

    const storageRef = ref(storage, "images/");
    return await uploadBytes(
      storageRef,
      encodeImage(file)
      // metadata
    )
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      });
  };

  getProduct = async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    console.log(id);
    if (productSnap.exists()) {
      const data = productSnap.data();
      logEvent(analytics, "view_item", {
        ...data,
        items: [
          {
            item_id: id,
            price: data.stripe_metadata_price,
            quantity: data.stripe_metadata_stock,
          },
        ],
      });
      return productSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  getProducts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await axios
      .get("http://localhost:4000/get-products", config)
      .then((res) => {
        console.log(res.data);
        logEvent(analytics, "view_item_list", {
          ...res.data,
          items: [
            {
              item_id: id,
              price: res.data.stripe_metadata_price,
              quantity: res.data.stripe_metadata_stock,
            },
          ],
        });
        return { products: res.data, total: res.data.length };
      })
      .catch((e) => console.log(e));
  };

  addProduct = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");

    const imageUrl = await this.uploadImage(data.images);

    return await axios
      .post(
        "http://localhost:4000/product/add",
        {
          ...data,
          vendorId: userId,
          name: data.productName,
          stock: data.quantity,
          size: {},
          images: [imageUrl],
          currency: "vnd",
        },
        config
      )
      .then((res) => {
        console.log(res);
        return {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          images: [imageUrl],
          stripe_metadata_price: res.data.metadata.price,
          stripe_metadata_currency: res.data.metadata.currency,
          stripe_metadata_category: res.data.metadata.category,
          stripe_metadata_stock: res.data.metadata.stock,
          stripe_metadata_vendorId: res.data.metadata.vendorId,
        };
      })
      .catch((e) => console.log(e));
  };

  //ADD PRODUCT TO CART
  addToCart = async (item) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000", // add your domain here
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:4000/add_to_cart/${auth.currentUser?.uid}/${item.productId}`,
        { quantity: item.quantity },
        config
      );
      console.log(item);
      logEvent(analytics, "add_to_cart", {
        items: [{ ...item, item_id: item.productId }],
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  updateCartQuantity = async (productId, quantity) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:4000/update_cart/${auth.currentUser?.uid}/${productId}`,
        { quantity },
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  };

  deleteFromCart = async (productId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await axios.delete(
        `http://localhost:4000/delete_from_cart/${auth.currentUser?.uid}/${productId}`,
        config
      );
      logEvent(analytics, "remove_from_cart", productId);
      return response.data;
    } catch (error) {
      console.error("Error deleting from cart:", error);
      throw error;
    }
  };

  deleteAllFromCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await axios.delete(
        `http://localhost:4000/delete_all_cart/${auth.currentUser?.uid}`,
        config
      );
      logEvent(analytics, "remove_from_cart");
      return response.data;
    } catch (error) {
      console.error("Error deleting all from cart:", error);
      throw error;
    }
  };

  // payByStrip = async (data) => {
  //   const priceId = "price_1P7KQuIcJNDJCIe2JE6XaVpN";
  //   return await getCheckoutUrl(app, priceId);
  // };

  getCheckoutUrl = async (productId, quantity) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");

    try {
      const response = await axios.post(
        `http://localhost:4000/payment/checkout/${userId}/${productId}`,
        {
          quantity,
          base_url: window.location.origin,
        },
        config
      );
      logEvent(analytics, "begin_checkout", response.data);
      window.location.replace(response.data.url);
    } catch (error) {
      console.error("Error paying product:", error);
      throw error;
    }
  };

  createCreateOut = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");

    try {
      const response = await axios.post(
        `http://localhost:4000/payment/checkout/${userId}`,
        {
          data,
          base_url: window.location.origin,
        },
        config
      );
      logEvent(analytics, "begin_checkout", response.data);
      window.location.replace(response.data.url);
    } catch (error) {
      console.error("Error creating checkout:", error);
      throw error;
    }
  };

  getOrder = async (orderId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");
    console.log(userId);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:4000/order/get-orders/${userId}/${orderId}`,
        config
      );
      return response;
    } catch (error) {
      console.error("Error getting order:", error);
      throw error;
    }
  };

  getOrders = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");
    console.log(userId);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:4000/order/get-orders/${userId}`,
        config
      );
      return response;
    } catch (error) {
      console.error("Error getting orders:", error);
      throw error;
    }
  };

  getAllOrders = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");
    console.log(userId);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:4000/order/get-all",
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error getting all orders:", error);
      throw error;
    }
  };

  updateOrder = async (orderId, data) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated.");
    console.log(userId);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(orderId, data);
    try {
      const response = await axios.post(
        `http://localhost:4000/order/update/${orderId}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  };

  createPaymentIntent = async (cart) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(cart);
    try {
      const response = await axios.post(
        `http://localhost:4000/create-payment-intent`,
        {
          price: cart
            .map((product) => product.price * product.quantity)
            .reduce((a, b) => a + b),
        },
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error paying product:", error);
      throw error;
    }
  };

  getCoordinates = async (address) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(address);
    try {
      const response = await axios.post(
        `https://api.mapbox.com/search/geocode/v6/forward`,
        {
          params: {
            address_line1: address.line1,
            region: address.state,
            postcode: address.postal_code,
            country: address.country,
            access_token:
              "pk.eyJ1IjoicGhhbm1haXRhbmxvaSIsImEiOiJjbHc1NjUxM3QwcTJtMnJxZXNoOXVibG92In0.3qD6h1Bpb71JDF20zjFAnA",
          },
        },
        config
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error getting coordinates:", error);
      throw error;
    }
  };

  calculateAllMinMax = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:4000/inventory/calculate-all-min-max`,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error calculating all min max:", error);
      throw error;
    }
  };
}

const apiInstance = new API();
export default apiInstance;
