const express = require("express");
const router = express.Router();
const {createEntity, getEntity, deleteEntity, updateEntity, singleUser} = require("../controllers/entity")

router.get("/", getEntity);
router.post("/", createEntity);
router.delete("/:id", deleteEntity)
router.patch("/:id", updateEntity);
router.get("/:id", singleUser);

module.exports = router;