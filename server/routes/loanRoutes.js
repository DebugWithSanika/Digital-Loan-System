const express = require("express");
const router = express.Router();
const multer = require("multer");
const Loan = require("../models/Loan");

// Multer setup (unchanged)
const upload = multer({ dest: "uploads/" });

/* =========================
   APPLY FOR LOAN (EXISTING)
========================= */
router.post("/apply", upload.single("incomeProof"), async (req, res) => {
  try {
    const loan = new Loan({
      fullName: req.body.fullName,
      accountNumber: req.body.accountNumber,
      loanType: req.body.loanType,
      loanAmount: req.body.loanAmount,
      monthlyIncome: req.body.monthlyIncome,
      incomeProof: req.file ? req.file.filename : null
    });

    await loan.save();
    res.status(201).json({ message: "Loan saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving loan" });
  }
});

/* =========================
   GET LOAN HISTORY (USER)
========================= */
router.get("/user/:accountNumber", async (req, res) => {
  try {
    const loans = await Loan.find({
      accountNumber: req.params.accountNumber
    }).sort({ appliedAt: -1 });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan history" });
  }
});

/* =========================
   UPDATE LOAN STATUS (ADMIN)
========================= */
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await Loan.findByIdAndUpdate(req.params.id, { status });

    res.json({ message: "Loan status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating loan status" });
  }
});

module.exports = router;
