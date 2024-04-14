const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotEnv = require('dotenv')
dotEnv.config()
const vendorRegister = async (req,res) => {
    
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already registered")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save()
        res.status(200).json({ message: "Vendor saved successfully" });
        console.log("Vendor saved successfully")
    } catch (err) {

        res.status(500).json({error: "Internal Server error" })

        console.log(err)
    }
    
}

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const vendor = await Vendor.findOne({ email })
        if (!vendor || !(await bcrypt.compare(password, vendor.password)))
            return res.status(401).json({ error: "Invalid username or password" })
        const secretKey = process.env.WhatIsYourName
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })
        res.status(200).json({ success: "Login successfully" ,token})
        console.log(email)
        console.log(token)
    }catch (err) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }

}

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getVendor = async (req, res) => {
    const vendorId = req.params.id
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" })
        }
        return res.status(200).json({ vendor })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendor}