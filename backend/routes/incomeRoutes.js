const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    addIncome,
    deleteIncome,
    getAllIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

module.exports = router;