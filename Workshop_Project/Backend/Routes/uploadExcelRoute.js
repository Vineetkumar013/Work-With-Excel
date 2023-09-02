const express = require("express");
const router = express.Router();
const {
  createExcel,
  getAllData,
  getByIdData,
  deleteAllData
} = require("../Controller/uploadExcel");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/excel", upload.single("file"), createExcel);
router.get("/data", getAllData);
router.get("/:id", getByIdData);
router.delete("/deleteAll", deleteAllData);

module.exports = router;
