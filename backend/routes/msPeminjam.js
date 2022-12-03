const express = require("express");
const { getPeminjam, getPeminjamId, registerPeminjam, loginPeminjam, logoutPeminjam } = require("../controller/msPeminjam.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const { refreshToken } = require("../controller/refreshToken.js");


const router = express.Router();

router.get('/peminjam',verifyToken, getPeminjam);
router.get('/peminjam/:id_peminjam',getPeminjamId);
router.post('/peminjam',registerPeminjam);
router.post('/login',loginPeminjam);
router.get('/token',refreshToken);
router.delete('/logout',logoutPeminjam);



module.exports = router;