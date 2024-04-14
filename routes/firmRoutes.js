const express = require('express')
const firmController = require('../controllers/firmController')
const app = express.Router()
const verifyToken = require('../middlewares/verifytoken')

app.post('/add-Firm', verifyToken, firmController.addFirm)
app.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName
    req.headers('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})
app.delete('/:firmId', firmController.deleteFirmById)
module.exports = app