const express = require('express');


const { getTrPeminjaman, getTrPeminjamanUserID, saveTrPeminjaman } = require("../controller/trPeminjaman");

const router = express.Router();

router.get('/trPinjam',getTrPeminjaman);
router.get('/trPinjam/:id',getTrPeminjamanUserID);
router.post('/trPinjam',saveTrPeminjaman);




module.exports = router;