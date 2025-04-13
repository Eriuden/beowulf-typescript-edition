const router = require("express").Router();
const kaijuController = require("../controllers/kaiju.controller");
const multer = require("multer");
const upload = multer();

router.get("/", kaijuController.readKaiju);
router.post("/", upload.single("file"), kaijuController.createKaiju);
router.put("/:id", kaijuController.updateKaiju);
router.delete("/:id", kaijuController.deleteKaiju);

module.exports = router;