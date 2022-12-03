const express = require('express');


const { getMsAlatLab, getMsAlatLabId,  saveMsAlatLab, deleteMsAlatLab } = require("../controller/msAlatLab.js");

const router = express.Router();

router.get('/alat',getMsAlatLab);
router.get('/alat/:id',getMsAlatLabId);
router.post('/alat',saveMsAlatLab);
// router.patch('/product/:id',updateProduct);
router.delete('/alat/:id',deleteMsAlatLab);



module.exports = router;