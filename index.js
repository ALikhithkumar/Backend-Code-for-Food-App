const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const app = express()

const path = require('path')
const PORT = process.env.PORT || 4000
dotEnv.config()
console.log("Hi")
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Successfully connected"))
    .catch((error) => console.log("error"))
app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)
app.use('/firm', firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads', express.static('/uploads'))
app.listen(PORT, () => {
    console.log("server listening ")
})
app.use('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})
