const { getDownloadURL } = require("firebase/storage");
const { ref, uploadBytesResumable } = require("firebase/storage");
const { db, auth, storage, stripe } = require("../configuration");
const { addData, createData } = require("../firebase/addData");
const getData = require("../firebase/getData");

// PRODUCTS
async function addProduct({
  vendorId,
  name,
  description,
  price,
  currency,
  category,
  stock,
  size,
  images = [],
}) {
  return await stripe.products
    .create({
      name,
      description,
      default_price_data: {
        unit_amount: price,
        currency,
      },
      images,
      metadata: {
        vendorId,
        category,
        price,
        currency,
        stock,
      },
      package_dimensions: size,
    })
    .then((data) => data)
    .catch((e) => e);
}

async function getProduct(id) {
  return await stripe.products
    .retrieve(id)
    .then((data) => data)
    .catch((e) => console.log(e));
}

async function getProducts(req, res) {
  return await getData
    .getAllData("products")
    .then((data) => data)
    .catch((e) => console.log(e));
}

// IMAGES
async function getImageDownloadUrl(filePath) {
  try {
    // Create a reference to the file
    const fileRef = storage.bucket().file(filePath);

    // Get the download URL
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw error;
  }
}

async function uploadImage(file, quantity) {
  try {
    const bucket = storage.bucket();

    if (quantity === "single") {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`;
      const metadata = {
        contentType: file.mimetype,
      };

      bucket.upload(file.buffer, { destination: fileName, metadata });
    }
    if (quantity === "multiple") {
      for (const element of file.images) {
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`;
        const storageRef = ref(storage, fileName);
        const metadata = {
          contentType: element.mimetype,
        };

        const saveImage = await Image.create({ imageUrl: fileName });
        file.item.imageId.push({ _id: saveImage._id });
        await file.item.save();

        await uploadBytesResumable(storageRef, element.buffer, metadata);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  getImageDownloadUrl,
  uploadImage,
};
