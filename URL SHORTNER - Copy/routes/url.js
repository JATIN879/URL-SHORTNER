const express = require('express')
const router = express.Router();
const {genrateShortUrl,getAnalytics,} = require('../controllers/url');


router.post("/" ,genrateShortUrl);
router.get("/analytics/:shortId",getAnalytics)

module.exports = router;