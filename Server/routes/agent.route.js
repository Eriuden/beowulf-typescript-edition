const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const agentController = require("../controllers/agent.controller");

const multer = require("multer");
const upload = multer();

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);


router.get("/", agentController.getAllAgents);
router.get("/:id", agentController.agentInfo);
router.put("/:id", agentController.updateAgent);
router.delete("/:id", agentController.deleteAgent);

module.exports = router;