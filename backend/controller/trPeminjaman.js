const { TrPeminjaman,MsPeminjam } = require("../db/models/index.js");
const path = require("path");
const { fs } = require("fs");
const nodemailer = require("nodemailer");


const getTrPeminjaman = async(req, res)=>{
    try{
        const response = await TrPeminjaman.findAll();
        res.json(response);
    } catch (error){
        // next(error);
        console.log(error.message);
    }
}

const getTrPeminjamanUserID = async(req,res)=>{
    try{
        const response = await TrPeminjaman.findOne(
            {
                where: {id_peminjam:req.params.id}
            }
        );
        res.json(response);
    } catch{
        console.log(error.message);
    }
}

const saveTrPeminjaman = async(req,res)=>{
    
    const id_peminjam = req.body.id_peminjam
    const id_alat = req.body.id_alat;
    const tgl_pinjam = req.body.tgl_pinjam;
    const tgl_kembali = req.body.tgl_kembali;
    const qrcode = `${id_alat}/${id_peminjam}/${(new Date(tgl_pinjam)).getTime()}`;

    try {
        await TrPeminjaman.create({
            id_peminjam: id_peminjam,
            tgl_pinjam: tgl_pinjam,
            tgl_kembali:tgl_kembali,
            qrcode:qrcode,
            status:0,
            id_alat:id_alat
        });
        res.status(201).json({msg: "Berhasil"});
    } 
    catch (error) {
        console.log(error.message);
    } 

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user: "wilsonalfridositumorang@gmail.com",
            pass: "xwogrisznrplqkit"
        }
    });
    try{
        let info = await transporter.sendMail({
            from: "wilsonalfridositumorang@gmail.com",
            to: "acongcong00@gmail.com",
            subject: "Test",
            text: `Hello world ${qrcode}`,
            attachments: [{
                // filename: `${qrcode}`,
                path: "D:/Sem 7/Despro 2/Project/Project V.1/backend/public/images/cf704b5fa4e095f0c941fedd79aed8e3.jpg"
            }]
        })
    } catch(error){
        res.status(201).json({msg: info.messageId});
        console.log(info.messageId);
    }


    // res.status(201).json({msg: info.messageId});
    
}

exports.getTrPeminjaman = getTrPeminjaman;
exports.getTrPeminjamanUserID = getTrPeminjamanUserID;
exports.saveTrPeminjaman = saveTrPeminjaman;
// exports.saveQrCode = saveQrCode;