const express = require("express");
const router = express.Router();
const {createClient, getClient, deleteClient, updateClient, singleClient} = require("../controllers/client")

router.get("/",getClient);
router.post("/", createClient);
router.delete("/:id", deleteClient)
router.patch("/:id", updateClient);
router.get("/:id",singleClient);

module.exports = router;