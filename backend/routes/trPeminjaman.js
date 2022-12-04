const express = require('express');


const { getTrPeminjaman, getTrPeminjamanUserID, saveTrPeminjaman, deleteTrPeminjamanID, ambilAlat,kembalikanAlat } = require("../controller/trPeminjaman");

const router = express.Router();

router.get('/trPinjam',getTrPeminjaman);
router.get('/trPinjam/:id',getTrPeminjamanUserID);
router.post('/trPinjam',saveTrPeminjaman);
router.delete('/trPinjam/:id',deleteTrPeminjamanID);
router.post('/pinjam/:qrcode',ambilAlat);
router.post('/kembali',kembalikanAlat);




module.exports = router;