const mongoose = require('mongoose')
const {compare} = require('bcryptjs');
const Vendor = require('../db/models/vendor')
require('dotenv').config();

const register = async (req,res)=>{
    const {email} = req.body;
    console.log(req.body)
        var exists = await Vendor.exists({email: `${email}`})
        if(!exists){
            let vendorInstance = new Vendor(req.body,()=>{
                console.log(`Instance created...`)
            })
            vendorInstance.save()
            .then(()=>{
                res.status(201).send(`Vendor registered successfully!`)
            })
            .catch(()=>{
                res.status(502).send(`Bad Gateway: database error`)
            })
        }
        else{
            res.send(`The user already exists. Login instead.`)
        }
    
}
module.exports = register;