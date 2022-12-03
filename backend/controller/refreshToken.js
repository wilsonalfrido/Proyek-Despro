const { MsPeminjam } = require("../db/models/index.js");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");


const refreshToken = async(req,res) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const peminjam = await MsPeminjam.findAll({
            where:{
                refresh_token:refreshToken
            }
        });
        if(!peminjam[0]) return res.sendStatus(403);
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
            if(err) return res.sendStatus(403);
            const idPeminjam = peminjam[0].id;
            const name = peminjam[0].name;
            const email = peminjam[0].email;
            const npm = peminjam[0].npm;
            const denda = peminjam[0].denda;
            const accessToken = jwt.sign({idPeminjam,name,email,npm,denda},process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        })

    } catch(error){
        console.log(error);
    }
}

exports.refreshToken = refreshToken;