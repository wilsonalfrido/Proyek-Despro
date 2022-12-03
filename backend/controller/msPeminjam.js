const { MsPeminjam } = require("../db/models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getPeminjam = async(req,res) =>{
    try{
        const peminjam = await MsPeminjam.findAll({
            attributes:['id','name','email']
        });
        res.json(peminjam);
    } catch (error) {
        console.log(error);
    }
}

const getPeminjamId = async(req,res) =>{
    try{
        const peminjam = await MsPeminjam.findAll({
            attributes:['id','name','email'],
            where:{
                id:req.params.id_peminjam
            }
        });
        if(peminjam[0] == null) return res.status(400).json({msg: "Data Tidak Ditemukan"}) ;
        res.json(peminjam);
    } catch (error) {
        console.log(error);
    }
}

const registerPeminjam = async(req,res) => {
    const { name,email,password,confPassword } = req.body;
    // const peminjam = await MsPeminjam.findAll({
    //     where:{
    //         email: email
    //     }
    // });
    // if(email === peminjam[0].email) return res.status(400).json({msg:"Email sudah terdaftar"}) ;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirmation Password Tidak Sesuai"}) ;
    const salt  = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password,salt);
    try{
        await MsPeminjam.create({
            name:name,
            email:email,
            password: hashPass,
        });
        res.json({msg: "Registrasi Berhasil"});
    } catch(error){
        console.log(error);
    }
}

const loginPeminjam = async(req,res) =>{
    const { email, password } = req.body ;

    try{
        const peminjam = await MsPeminjam.findAll({
            where:{
                email: email
            }
        });
        const match = await bcrypt.compare(password, peminjam[0].password);
        if(!match) return res.status(400).json({msg: "Password Tidak Sesuai"});
        const idPeminjam = peminjam[0].id;
        const name_ = peminjam[0].name;
        const email_ = peminjam[0].email;
        const accessToken = jwt.sign({idPeminjam,name_,email_},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({idPeminjam,name_,email_},process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await MsPeminjam.update({refresh_token: refreshToken},{
            where:{
                id:idPeminjam
            }
        });
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            maxAge: 24*60*60*1000,
            // secure=true not use when in local
        });
        res.json({ accessToken,refreshToken });
        

    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"E-Mail Tidak Ditemukan"});
    }
}

const logoutPeminjam = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const peminjam = await MsPeminjam.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!peminjam[0]) return res.sendStatus(204);
    const idPeminjam = peminjam[0].id;
    await MsPeminjam.update({refresh_token: null},{
        where:{
            id:idPeminjam
        }
    });
    res.clearCookie();
    return res.sendStatus(200);

} 

exports.getPeminjam = getPeminjam;
exports.registerPeminjam = registerPeminjam;
exports.loginPeminjam = loginPeminjam;
exports.logoutPeminjam = logoutPeminjam;
exports.getPeminjamId = getPeminjamId