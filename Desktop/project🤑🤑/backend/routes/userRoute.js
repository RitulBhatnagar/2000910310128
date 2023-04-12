const express = require("express");
const router = express.Router();
const {createUser, getUser, deleteUser, updateUser, singleUser} = require("../controllers/user")

router.get("/",getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser);
router.get("/:id",singleUser);

module.exports = router;