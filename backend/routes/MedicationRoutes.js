// // const express = require("express");
// // const router = express.Router();

// // // ✅ Match your project: backend/middlewares/auth.js
// // const { restrictUser } = require("../middlewares/auth");

// // const {
// //   getMedications,
// //   addMedication,
// //   logDose,
// //   getAdherenceStats,
// //   deleteMedication,
// // } = require("../controller/MedicationController");

// // // /adherence must come before /:id to avoid route conflict
// // router.get("/adherence", restrictUser, getAdherenceStats);
// // router.get("/", restrictUser, getMedications);
// // router.post("/", restrictUser, addMedication);
// // router.patch("/:id/log", restrictUser, logDose);
// // router.delete("/:id", restrictUser, deleteMedication);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const protect = require("../middlewares/auth"); // adjust path as needed
// const {
//   getMedications,
//   addMedication,
//   logDose,
//   getAdherenceStats,
//   deleteMedication,
// } = require("../controller/MedicationController");



// router.use(protect); // all medication routes require auth

// // ── static routes FIRST ──────────────────────────────────────────────────────
// router.get("/adherence", getAdherenceStats);   // GET  /api/medications/adherence
// router.get("/",          getMedications);       // GET  /api/medications
// router.post("/",         addMedication);        // POST /api/medications

// // ── param routes AFTER ───────────────────────────────────────────────────────
// router.patch("/:id/log", logDose);             // PATCH /api/medications/:id/log
// router.delete("/:id",    deleteMedication);    // DELETE /api/medications/:id

// module.exports = router;

const express = require("express");
const router = express.Router();

const { restrictUser } = require("../middlewares/auth");

const {
  getMedications,
  addMedication,
  logDose,
  getAdherenceStats,
  deleteMedication,
} = require("../controller/MedicationController");

// Protect all medication routes
router.use(restrictUser);

// GET /api/medications/adherence
router.get("/adherence", getAdherenceStats);

// GET /api/medications
router.get("/", getMedications);

// POST /api/medications
router.post("/", addMedication);

// PATCH /api/medications/:id/log
router.patch("/:id/log", logDose);

// DELETE /api/medications/:id
router.delete("/:id", deleteMedication);

module.exports = router;