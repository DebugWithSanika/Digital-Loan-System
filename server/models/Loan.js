const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  loanType: {
    type: String,
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  monthlyIncome: {
    type: Number,
    required: true
  },
  incomeProof: {
    type: String
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Loan", loanSchema);
