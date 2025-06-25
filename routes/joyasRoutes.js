const express = require("express");
const router = express.Router();
const { getJoyas, getJoyasByFilters } = require("../controllers/joyasController");

router.get("/joyas", getJoyas);
router.get("/joyas/filtros", getJoyasByFilters);

module.exports = router;
