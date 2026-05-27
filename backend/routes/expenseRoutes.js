const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    addExpense,
    deleteExpense,
    getAllExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);

module.exports = router;