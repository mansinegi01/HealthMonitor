const express = require("express");
const router = express.Router();

// ✅ Match your project: backend/middlewares/auth.js
const { restrictUser } = require("../middlewares/auth");

const {
  getMedications,
  addMedication,
  logDose,
  getAdherenceStats,
  deleteMedication,
} = require("../controller/MedicationController");

// /adherence must come before /:id to avoid route conflict
router.get("/adherence", restrictUser, getAdherenceStats);
router.get("/", restrictUser, getMedications);
router.post("/", restrictUser, addMedication);
router.patch("/:id/log", restrictUser, logDose);
router.delete("/:id", restrictUser, deleteMedication);

module.exports = router;