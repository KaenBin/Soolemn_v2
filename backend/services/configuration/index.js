const functions = require("firebase-functions");
// const stripe = require("stripe")(
//   "sk_test_51P4emDIcJNDJCIe2S5d5KZViJAHfWV45vjCZ4VloaX7jH6ektWN6UaG0lt6W5sNa0c22FqNjwtCch2z9yzmNB9Ko00DyF4CpuJ",
//   {
//     apiVersion: "2024-04-10; custom_checkout_beta=v1",
//   }
// );
const stripe = require("stripe")(
  "sk_test_51PKu7WKAxOJ3FFjyfC987sYaKcyw53NC8O2AFZdi3lPUOobBn7qpTSq8pARt8LzFbR64Yfyfrvc7qjWb4UHRNgKt00Cg5lImBE"
);
const admin = require("firebase-admin");

const serviceAccount = require("./ServiceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount[2]),
  storageBucket: "gs://soolemn-cc5b9.appspot.com",
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
db.settings({ ignoreUndefinedProperties: true });

module.exports = {
  db,
  auth,
  storage,
  functions,
  stripe,
};
