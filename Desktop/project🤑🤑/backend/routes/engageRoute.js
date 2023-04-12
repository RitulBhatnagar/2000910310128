const express = require("express");
const router = express.Router();
const {createEngage, getEngage, deleteEngage, updateEngage, singleEngage} = require("../controllers/engagement")

router.get("/",getEngage);
router.post("/", createEngage);
router.delete("/:id", deleteEngage)
router.patch("/:id", updateEngage);
router.get("/:id",singleEngage);

module.exports = router;