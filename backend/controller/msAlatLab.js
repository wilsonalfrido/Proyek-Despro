const { MsAlatLab } = require("../db/models/index");
const path = require("path");
const { fs } = require("fs");


const getMsAlatLab = async(req, res)=>{
    try{
        const response = await MsAlatLab.findAll();
        res.json(response);
    } catch (error){
        // next(error);
        console.log(error.message);
    }
}

const getMsAlatLabId = async(req,res)=>{
    try{
        const response = await MsAlatLab.findOne(
            {
                where: {id:req.params.id}
            }
        );
        res.json(response);
    } catch (error){
        console.log(error.message);
    }
}

const saveMsAlatLab = async(req,res)=>{
    if(req.files === null) return res.status(400).json({msg:"No File Uploaded"});
    const lokasi = req.body.lokasi;
    const nama = req.body.nama;
    const status = req.body.status;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await MsAlatLab.create({namaAlat: nama, lokasiAlat: lokasi, statusAlat: status,url: url,image:fileName});
            res.status(201).json({msg: "Product Created Successfuly"});
        } 
        catch (error) {
            // next(error);
            console.log(error.message);
        } 
    });

}

const deleteMsAlatLab = async(req,res) =>{
    const product = await MsAlatLab.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});

    try {
        // const filepath = `/public/images/${product.image}`;
        // fs.unlinkSync(filepath);
        await MsAlatLab.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

exports.getMsAlatLab = getMsAlatLab;
exports.saveMsAlatLab = saveMsAlatLab;
exports.getMsAlatLabId = getMsAlatLabId;
exports.deleteMsAlatLab = deleteMsAlatLab;