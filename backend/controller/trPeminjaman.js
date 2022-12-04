const { TrPeminjaman,MsPeminjam,MsAlatLab } = require("../db/models/index.js");
const path = require("path");
const { fs } = require("fs");
const nodemailer = require("nodemailer");
const QRCode = require('qrcode');


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
        const response = await TrPeminjaman.findAll(
            {
                attributes:['id','id_peminjam','tgl_pinjam','tgl_kembali','id_alat','status','waktu_diambil','waktu_dikembalikan','denda'],
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
    const email = req.body.email;
    const qrcode = `${id_alat}${id_peminjam}${(new Date(tgl_pinjam)).getTime()}`;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user: "wilsonalfridositumorang@gmail.com",
            pass: "xwogrisznrplqkit"
        }
    });



    try {
        var qrcodeURI = await QRCode.toDataURL(qrcode);
    } catch(error){
        return res.json({msg: error.message});
    }


    try{
        let info = await transporter.sendMail({
            from: "wilsonalfridositumorang@gmail.com",
            to: "acongcong00@gmail.com",
            subject: "Test",
            text: `Hello world ${qrcode}`,
            attachments: [{
                path: qrcodeURI
            }]
        })
        res.status(201).json({msg: `QR Code telah dikirimkan melalui email ${email}`});

    } catch(error){
        res.status(201).json({msg: info.messageId});
        console.log(info.messageId);
    }

    try {
        await TrPeminjaman.create({
            id_peminjam: id_peminjam,
            tgl_pinjam: tgl_pinjam,
            tgl_kembali:tgl_kembali,
            qrcode:qrcode,
            status:0,
            id_alat:id_alat,
            url_qr_code: qrcodeURI,
        });
    } 
    catch (error) {
        return res.json({msg: error.message});
    }     
}

const deleteTrPeminjamanID = async(req,res)=>{
    const trPeminjaman = await TrPeminjaman.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!trPeminjaman) return res.status(404).json({msg: "No Data Found"});

    try{
        await TrPeminjaman.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "History Deleted Successfuly"});
    } catch(error){
        return error.messsage
    }
}

const ambilAlat = async(req,res)=>{
    const dateNow = new Date();
    const trPeminjaman = await TrPeminjaman.findAll({
        where:{
            qrcode: req.body.qrcode,
            status: 0
        }
    })
    if(!trPeminjaman) return res.status(404).json({msg: "No Data Found"});
    // return res.json(trPeminjaman[0]);
    try{
        await TrPeminjaman.update({status: 1,waktu_diambil:dateNow.toISOString()},{
            where:{
                id:trPeminjaman[0].id
            }
        });
        await MsAlatLab.update({statusAlat:1},{
            where : {
                id:trPeminjaman[0].id_alat
            } 
        })
        return res.status(200).json({msg:"Berhasil"});
    } catch(error){
        return res.json({msg: error.message});
    }
}

const kembalikanAlat = async(req,res)=>{
    const dateNow = new Date();
    const trPeminjaman = await TrPeminjaman.findAll({
        where:{
            qrcode: req.body.qrcode,
            status: 1
        }
    })
    if(!trPeminjaman) return res.status(404).json({msg: "No Data Found"});
    // return res.json(trPeminjaman[0]);
    try{
        await TrPeminjaman.update({status: 2,waktu_dikembalikan:dateNow.toISOString()},{
            where:{
                id:trPeminjaman[0].id
            }
        });
        return res.status(200).json({msg:"Berhasil"});
    } catch(error){
        return res.json({msg: error.message});
    }
}

exports.getTrPeminjaman = getTrPeminjaman;
exports.getTrPeminjamanUserID = getTrPeminjamanUserID;
exports.saveTrPeminjaman = saveTrPeminjaman;
exports.deleteTrPeminjamanID = deleteTrPeminjamanID;
exports.ambilAlat = ambilAlat;
exports.kembalikanAlat = kembalikanAlat;
// exports.saveQrCode = saveQrCode;