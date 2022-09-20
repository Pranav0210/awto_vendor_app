const jwt = require('jsonwebtoken')
const {hash, compare} = require('bcryptjs')
const Vendor = require('../db/models/vendor')
require('dotenv').config();

const login = (req, res)=>{
    // console.log("login triggered")
    const {email, password} = req.body;
    const authHead = req.headers.authorization;
    console.log(authHead)
        Vendor.findOne({email: `${email}`}).exec()
        .then((doc)=>{
            console.log(doc); 

            if(password === doc.password){
                if(authHead && authHead.startsWith("Bearer ")){
                    jwtToken = authHead.split(' ')[1];
                    
                    const extract = jwt.verify(jwtToken, process.env.JWT_SECRET)
                    console.log(extract)
                    if(extract.email === doc.email)
                    res.send(`Token already present: Authorized`)
                }
                res.send({
                    token: `${getAccessToken(req.body)}`,
                })
            }
            else
            res.status(401).send("Unauthorised!")
        })
        .catch(()=>{
            res.status(401).send(`User id does not exist!`)
        })
    }
const getAccessToken = ({email})=>{
    const accessToken = jwt.sign({email},process.env.JWT_SECRET, {expiresIn: '15m'})
    return accessToken;
}

module.exports = login;