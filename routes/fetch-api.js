const express = require("express");
const router = express.Router();

const apiController = require("../controller/fetch-api");

router.get("/get-api", apiController.getApi);

router.get("/fetch-api", apiController.fetchApi);

router.get("/telegram-page", apiController.getTelegram);

module.exports = router;
