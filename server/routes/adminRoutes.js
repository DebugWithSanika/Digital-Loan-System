const express = require("express");
const Loan = require("../models/Loan");
const router = express.Router();

router.get("/loans", async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const loans = await Loan.find(filter);
  res.json(loans);
});

// Existing generic update (kept as is)
router.put("/loan/:id", async (req, res) => {
  await Loan.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Status updated" });
});

// ➕ Approve button API
router.put("/loan/:id/approve", async (req, res) => {
  await Loan.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ message: "Loan Approved" });
});

// ➕ Reject button API
router.put("/loan/:id/reject", async (req, res) => {
  await Loan.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ message: "Loan Rejected" });
});

module.exports = router;
