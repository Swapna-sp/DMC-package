const functions = require("firebase-functions");
const admin = require("firebase-admin");
import * as admin from 'firebase-admin';
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

// Existing submitSearch function to save search data to Firestore
exports.submitSearch = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Method not allowed" });
    }

    try {
      const { type, search, travelDate, pax, rooms, phone, email } = req.body;

      await db.collection("travelSearches").add({
        type,
        search,
        travelDate,
        pax,
        rooms,
        phone,
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ message: "Data submitted successfully!" });
    } catch (err) {
      console.error("Error saving data:", err);
      return res.status(500).json({ message: "Submission failed" });
    }
  });
});

// New getTravelPackages function to fetch travel packages from Firestore
exports.getTravelPackages = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // Only allow GET requests
    if (req.method !== "GET") {
      return res.status(405).send({ message: "Method not allowed" });
    }

    try {
      // Fetch all documents from the 'travelPackages' collection
      const snapshot = await db.collection("packages").get();

      // If no packages are found
      if (snapshot.empty) {
        return res.status(404).json({ message: "No packages found" });
      }

      // Map through the snapshot and return the data
      const packages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // Include all fields of the document
      }));

      // Return the packages as a JSON response
      return res.status(200).json(packages);
    } catch (err) {
      console.error("Error fetching travel packages:", err);
      return res.status(500).json({ message: "Failed to fetch packages" });
    }
  });
});






// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const cors = require("cors");

// admin.initializeApp();
// const db = admin.firestore();
// const corsHandler = cors({ origin: true });

// // ✅ Define your static token here (keep it secret!)
// const API_KEY = "your-super-secret-token"; // Make sure this matches your frontend

// // 🔒 Secure endpoint for submitting travel search
// exports.submitSearch = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, async () => {
//     if (req.method !== "POST") {
//       return res.status(405).send({ message: "Method not allowed" });
//     }

//     const token = req.headers.authorization?.replace("Bearer ", "");
//     if (token !== API_KEY) {
//       return res.status(401).send({ message: "Unauthorized" });
//     }

//     try {
//       const { type, search, travelDate, pax, rooms, phone, email } = req.body;

//       await db.collection("travelSearches").add({
//         type,
//         search,
//         travelDate,
//         pax,
//         rooms,
//         phone,
//         email,
//         timestamp: admin.firestore.FieldValue.serverTimestamp(),
//       });

//       return res.status(200).json({ message: "Search submitted successfully!" });
//     } catch (err) {
//       console.error("Error saving data:", err);
//       return res.status(500).json({ message: "Submission failed" });
//     }
//   });
// });
