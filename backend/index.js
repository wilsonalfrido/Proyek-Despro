const express  = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
var multer = require('multer');
var upload = multer();
const FileUpload = require("express-fileupload");

const msPeminjamRoute = require("./routes/msPeminjam.js");
const msAlatLabRoute = require("./routes/msAlatLab.js");
const trPeminjamanRoute = require("./routes/trPeminjaman.js")
dotenv.config();


const app = express();
app.use(cors({ credentials:true, origin : ['http://localhost:3000','http://localhost:80']}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(upload.array()); 
app.use(FileUpload());
app.use(msAlatLabRoute);
app.use(msPeminjamRoute);
app.use(trPeminjamanRoute);
app.use(express.static("public"));


app.listen(5000,()=> console.log('Server running at port 5000'));